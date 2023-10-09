import { Helmet } from 'react-helmet-async';
import React,{ useEffect, useState} from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TablePagination,
  CircularProgress,
  Paper,
} from '@mui/material';
import Moment from 'moment';
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
import { getPenalty} from '../api/penaltyApi/penaltyApi';
import { useDebounce } from "../utils/useDebounce"
import {rowPage} from "../utils/rowPage";
import {DayTime, Ipenalty} from "../interface/interface"
import { endOfDay, startOfDay } from "date-fns";
import TableHeader from '../components/table/TableHeader';
import TableTool from '../components/table/TableTool';

const TABLE_HEAD = [
  { id: 'ID', label: 'ID', alignRight: false },
  { id: 'Name', label: 'Name', alignRight: false, sort: true },
  { id: 'Reason', label: 'Reason', alignRight: false },
  { id: 'Isreject', label: 'Isreject', alignRight: false},
  { id: 'Channel', label: 'Channel', alignRight: false },
  { id: 'Time', label: 'Time', alignRight: false },
];

export default function Penalty() {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [daytime, setDayTime] = useState<DayTime>({
      startDay:Number(startOfDay(new Date())),
      endDay :Number(endOfDay(new Date())),
  });
  const [penal, setPenal] = useState<Ipenalty[]>([]);
  const [total, setTotal] = useState<number>(0);
  
  const debounce=useDebounce(filterName.trim(), 900);
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(false);
  useEffect(() => {
    getPenalty({
      page:page+1, 
      size:rowsPerPage, 
      username:debounce,
      from:daytime?daytime.startDay:0,
      to:daytime?daytime.endDay:0,
      sort: sort ? "DESC" : "ASC", 
    },setLoading)
    .then(data=> {
      setPenal(data.content);
      setTotal(data.pageable.total)
    });
  }, [page, rowsPerPage, debounce, daytime, sort]);

  const handleChangePage = (event:any, newPage:number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event:any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const isNotFound = !penal.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Penalty | Komu Dashboard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Penalty
          </Typography>
        </Stack>

        <Card>
          <TableTool 
            filterName={filterName} 
            onFilterName={handleFilterByName} 
            setDayTime={setDayTime}
            searchText="Search by name..."
          />
          <Scrollbar>
            <Table>
              <TableHeader 
                headLabel={TABLE_HEAD}
                sort={sort}
                setSort={setSort}
              />
              <TableBody>
                {loading?                                  
                    <TableRow >
                        <TableCell align="center" colSpan={TABLE_HEAD.length}>  
                            <CircularProgress sx={{color:'#80808085'}}/>
                        </TableCell>  
                    </TableRow>                             
                :null}

                {penal && !loading ? penal.map((row:Ipenalty, index:number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="left">{row.userId}</TableCell>
                      <TableCell align="left"><b>{row.username}</b></TableCell>
                      <TableCell align="left">{row.reason}</TableCell>
                      <TableCell align="left">
                        <Label color={row.isReject?'error': 'success'}  disableAnimation={(row.isReject)} >{String(row.isReject)}</Label>
                      </TableCell>
                      <TableCell align="left">{row.channelFullName}</TableCell> 
                      <TableCell align="left">{Moment(Number(row.createdTimestamp)).format('HH:MM DD/MM/YYYY ')}</TableCell>                
                    </TableRow>
                  );
                }):null}
              </TableBody>
              {isNotFound && (
                <TableBody>
                  <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <Paper
                          sx={{
                          textAlign: "center",
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
            rowsPerPageOptions={rowPage(total)}
            component="div"
            count={total}
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
