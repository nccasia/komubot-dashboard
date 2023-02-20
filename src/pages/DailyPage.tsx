import { filter } from "lodash";
import { useEffect, useState } from "react";
// @mui
import {
  Avatar,
  Button, Card, Checkbox, Container, IconButton, MenuItem, Paper, Popover, Stack, Table, TableBody,
  TableCell, TableContainer,
  TablePagination, TableRow, Tooltip, Typography
} from "@mui/material";
// components
import Iconify from "../components/iconify";
// sections
import { DailyListHead, DailyListToolbar } from "../sections/@dashboard/daily";
// mock
// import DailyListHead from './../sections/@dashboard/daily/DailyListHead';
import { dailystype } from "../interface/interface";
import UserDetailsModal from "../sections/@dashboard/daily/DailyDetailsModal";
import { formatDateTime } from './../utils/formatDateTime';
import { getDailys ,filterDailys} from "../Api/Dailys/DailysApi";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "Daily", label: "Daily", alignRight: false },
  { id: "Channel", label: "Channel", alignRight: false },
  { id: "Time", label: "Time", alignRight: false },
  { id: "Detail", label: "Detail", alignRight: false },
  
];

// ----------------------------------------------------------------------

function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any, comparator: any, query: string) {
  const stabilizedThis = Array.isArray(array)
    ? array.map((el: any, index: number) => [el, index])
    : [];
  if (stabilizedThis)
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
  if (query) {
    return filter(
      array,
      (dailys:dailystype) =>
      dailys.email.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el: any) => el[0]);
}

export default function DailyPage() {

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState<number[]>([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);



  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds: any = dailys.map((n: dailystype) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, id: number) => {
    const selectedIndex: number = selected.indexOf(id);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const [dailys, setDailys] = useState<dailystype[]>([]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dailys.length) : 0;

  const filteredUsers = applySortFilter(
    dailys,
    getComparator(order, orderBy),
    filterName
  );
  const [selectedUser, setSelectedUser] = useState<dailystype | null>(null);

  const isNotFound = !filteredUsers.length && !!filterName;

  //call api
  useEffect(() => {
    const fetch = async () => {
      const dailysData = await filterDailys({size: rowsPerPage});
      setDailys(dailysData);
    };
    fetch();
  }, []);

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
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setDailys={setDailys}
          />

          {/* <Scrollbar sx={{}}> */}
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <DailyListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dailys.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: dailystype) => {
                    const {    
                      daily ,
                      email ,
                      channelFullName ,
                      createdAt,
                      id  } = row;
                    const selectedDaily = selected.indexOf(id) !== -1;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={selectedDaily}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedDaily}
                            onChange={(event) => handleClick(event, id)}
                          />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
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
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
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
            count={dailys.length}
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
