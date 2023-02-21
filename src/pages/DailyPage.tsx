import { useEffect, useState } from "react";
// @mui
import {
  Avatar, Card, Container, IconButton, Paper, Stack, Table, TableBody,
  TableCell, TableContainer,
  TablePagination, TableRow, Tooltip, Typography
} from "@mui/material";
// components
import Iconify from "../components/iconify";
// sections
import { DailyListHead, DailyListToolbar } from "../sections/@dashboard/daily";
// mock
// import DailyListHead from './../sections/@dashboard/daily/DailyListHead';
import { useDebounce } from 'use-debounce';
import { filterDailys } from "../api/dailys/DailysApi";
import { dailystype } from "../interface/interface";
import UserDetailsModal from "../sections/@dashboard/daily/DailyDetailsModal";
import { formatDateTime } from './../utils/formatDateTime';
import { endOfDay, startOfDay } from "date-fns";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "Daily", label: "Daily", alignRight: false },
  { id: "Channel", label: "Channel", alignRight: false },
  { id: "Time", label: "Time", alignRight: false },
  { id: "Detail", label: "Detail", alignRight: false },

];

// ----------------------------------------------------------------------

export default function DailyPage() {

  const [page, setPage] = useState<number>(0);

  const [startDay,setStartDay] =useState(startOfDay(new Date()).getTime());

  const [endDay,setEndDay] =useState(endOfDay(new Date()).getTime());

  const [filterName, setFilterName] = useState<string>('');

  const [totalPage, setTotalPage] = useState<number>(0)

  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const [debounce] = useDebounce(filterName, 1000);

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

  //call api
  useEffect(() => {
    const fetch = async () => {
      const dailysData = await filterDailys({ size: rowsPerPage, page:page+1, email: debounce,startDay,endDay });
      const { content, pageable } = dailysData
      setTotalPage(pageable.total)
      setDailys(content);
    };
    fetch();
  }, [page, rowsPerPage, debounce,startDay,endDay]);

  return (
    <>
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
            setPage={setPage}
            setStartDay={setStartDay}
            setEndDay ={setEndDay}
          />
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <DailyListHead headLabel={TABLE_HEAD}/>
              <TableBody>
                {dailys.map((row: dailystype) => {
                  const {
                    daily,
                    email,
                    channelFullName,
                    createdAt,
                    id } = row;

                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                     
                    >
                      <TableCell sx={{p:2}} component="th" scope="row" padding="none">
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={2}
                        >
                          <Avatar alt={email} src={email} />
                          <Typography variant="subtitle2" noWrap>
                            {email}
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
                            {daily}
                          </Typography>
                        </TableCell>
                      </Tooltip>
                      <TableCell align="left">{channelFullName}</TableCell>

                      <TableCell align="left">{formatDateTime(createdAt)}</TableCell>

                      <TableCell align="right">
                        <IconButton
                          size="large"

                          color="inherit"
                          onClick={() => setSelectedUser(row)}
                        >
                          <Iconify icon={"bi:info-circle-fill"} />
                        </IconButton>
                      </TableCell>

                    </TableRow>
                  );
                })}

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
          </TableContainer>
          {/* </Scrollbar> */}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
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
