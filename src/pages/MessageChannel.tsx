import { Helmet } from 'react-helmet-async';
import React,{ useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import { useDebounce } from 'use-debounce';
import { DayTime, Imessage } from '../interface/interface';
import { filterMessages } from '../api/messageApi/messageApi';
import { endOfDay, startOfDay } from "date-fns";
import { rowPage } from '../utils/rowPage';
import TableHeader from '../components/table/TableHeader';
import Scrollbar from '../components/scrollbar/Scrollbar';
import { formatDateTime } from '../utils/formatDateTime';
import TableTool from '../components/table/TableTool';

const TABLE_HEAD = [
  { id: 'ID', label: 'ID', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Channel', label: 'Channel', alignRight: false },
  { id: 'Time', label: 'Time', alignRight: false, sort: true },
  { id: 'Content', label: 'Content', alignRight: false },
];

export default function Message() {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debounce] = useDebounce(filterName.trim(), 1000);
  const [totalPage, setTotalPage] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Imessage[]>([]);
  const [sort, setSort] = useState<boolean>(false);
  const [daytime, setDayTime] = useState<DayTime>({
    startDay:Number(startOfDay(new Date())),
    endDay :Number(endOfDay(new Date())),
  });
  useEffect(() => {
    const fetch = async () => {
      const messageData = await filterMessages({ 
        size: rowsPerPage, 
        page:page+1, 
        title: debounce,
        sort: sort ? "DESC" : "ASC", 
        from: daytime ? daytime.startDay : 0,
        to: daytime ? daytime.endDay : 0,
      }, setIsLoading);
      const { content, pageable } = messageData
      setTotalPage(pageable.total)
      setMessage(content);
    };
    fetch();
  }, [page, rowsPerPage, debounce, sort, daytime]);

  const handleChangePage = (event:any, newPage:number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setIsLoading(true)
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event:any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const isNotFound = !message.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Message | Komu Dashboard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Message
          </Typography>
        </Stack>

        <Card>
          <TableTool 
            filterName={filterName} 
            onFilterName={handleFilterByName} 
            setDayTime={setDayTime} 
            searchText="Search by email, content..."
          />

          <Scrollbar>
            <Table>
              <TableHeader 
                  headLabel={TABLE_HEAD}
                  sort={sort}
                  setSort={setSort}
              />
              {isLoading ? (
                <TableBody>
                    <TableRow >
                      <TableCell align="center" colSpan={TABLE_HEAD.length}>
                          <CircularProgress sx={{color:'#80808085'}}/>
                      </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {message ? message.map((row:Imessage) => {
                    const {id, email, channelFullName, createdTimestamp, content,} = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell align="center">{id}</TableCell>
                        <TableCell align="center">{email}</TableCell>
                        <TableCell align="center">{channelFullName}</TableCell>
                        <TableCell align="center">{createdTimestamp? formatDateTime(String(createdTimestamp)):null}</TableCell>
                        <TableCell align="center">{content}</TableCell>                                             
                      </TableRow>
                    );
                  }): null}                 
                </TableBody>
              )}
              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="h6" paragraph>
                          Not found
                        </Typography>

                        <Typography variant="body2">
                          No results found for &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>.
                          <br /> Try checking for typos or using complete words.
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={rowPage(totalPage)}
            component="div"
            count={totalPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </>
  );
}
