import { useEffect, useState } from "react";
// @mui
import {
  Avatar, Card, CircularProgress, Container, IconButton, Paper, Stack, Table, TableBody,
  TableCell,
  TablePagination, TableRow, Tooltip, Typography
} from "@mui/material";
import Iconify from "../components/iconify";
import { DailyListToolbar } from "../sections/@dashboard/daily";
import { useDebounce } from 'use-debounce';
import { filterDailys } from "../api/dailysApi/dailysApi";
import { DayTime, dailystype } from "../interface/interface";
import UserDetailsModal from "../sections/@dashboard/daily/DailyDetailsModal";
import { formatDateTime } from './../utils/formatDateTime';
import { endOfDay, startOfDay } from "date-fns";
import {rowPage} from "../utils/rowPage"
import { Helmet } from "react-helmet-async";
import TableHeader from '../components/table/TableHeader';
import Scrollbar from "../components/scrollbar/Scrollbar";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "Daily", label: "Daily", alignRight: false },
  { id: "Channel", label: "Channel", alignRight: false },
  { id: "Time", label: "Time", alignRight: false, sort: true },
  { id: "Detail", label: "Detail", alignRight: false },

];

export default function DailyPage() {

  const [page, setPage] = useState<number>(0);

  const [daytime, setDayTime] = useState<DayTime>({
    startDay:Number(startOfDay(new Date())),
    endDay :Number(endOfDay(new Date())),
  });

  const [filterName, setFilterName] = useState<string>('');
  const [filterDaily, setFilterDaily] = useState<string>('All');

  const [totalPage, setTotalPage] = useState<number>(0)

  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [debounce] = useDebounce(filterName.trim(), 1000);

  const [selectedUser, setSelectedUser] = useState<dailystype | null>(null);

  const [dailys, setDailys] = useState<dailystype[]>([]);

  const handleChangePage = async (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = async (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const isNotFound = !dailys.length && !!filterName;
  const [sort, setSort] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      const dailysData = await filterDailys({ 
        size: rowsPerPage, 
        page:page+1, 
        email: debounce,
        from:daytime? daytime.startDay : 0,
        to:daytime? daytime.endDay : 0,
        filter: filterDaily,
        sort: sort ? "DESC" : "ASC", 
      }, setLoading);
      const { content, pageable } = dailysData
      setTotalPage(pageable.total)
      setDailys(content);
    };
    fetch();
  }, [page, rowsPerPage, debounce, daytime, filterDaily, sort]);

  return (
    <>
    <Helmet>
        <title> Daily | Komu Dashboard  </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Daily
          </Typography>

        </Stack>

        <Card>
          <DailyListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            setDayTime={setDayTime}
            filter={filterDaily}
            setFilter={setFilterDaily}
            label="Daily"
            placeholder="Search by name..."
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
                {!loading && dailys ? dailys.map((row: dailystype, index: number) => {
                  return (
                    <TableRow
                      hover
                      key={index}
                      tabIndex={-1}
                     
                    >
                      <TableCell sx={{p:2}} component="th" scope="row" padding="none">
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                        >
                          <Avatar alt={row?.email} src={`https://cdn.discordapp.com/avatars/${ row?.userid}/${row?.avatar}`} />
                          <Typography variant="subtitle2" noWrap>
                            {row?.email}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <Tooltip
                        followCursor={true}
                        placement="right-start"
                        title="detail"
                      >
                        <TableCell sx={{ cursor: "pointer" }} align="left" onClick={() => setSelectedUser(row)}>
                          <Typography
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {row?.daily}
                          </Typography>
                        </TableCell>
                      </Tooltip>
                      <TableCell align="left">{row?.channelFullName}</TableCell>

                      <TableCell align="left">{filterDaily !== 'Not' ? formatDateTime(row?.createdAt) : null}</TableCell>

                      <TableCell align="right">
                        {filterDaily !== 'Not' && (
                          <IconButton
                            size="large"

                            color="inherit"
                            onClick={() => setSelectedUser(row)}
                          >
                            <Iconify icon={"bi:info-circle-fill"} />
                          </IconButton>
                        )}
                      </TableCell>

                    </TableRow>
                  );
                }): null}
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
      <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </>
  );
}
