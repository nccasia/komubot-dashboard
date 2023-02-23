import { filter } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Deleteimg from "../images/Deleteimg.png";
// components
import Iconify from "../components/iconify";
import Label from "../components/label";
// sections
import { apiAxios, userLink } from "../axios/apiAxios";
import {
  UserListHead,
  UserListToolbar,
} from "../sections/@dashboard/usediscord";
// mock
import { patchUser } from "../api/userApi/userPatch";
import { AlertTitle } from "@mui/lab";
import { Iuser } from "../interface/interface";
import { getUser } from "../api/user/userApi";
import { useDebounce } from "../utils/useDebounce";
import { rowPage } from "../utils/rowPage";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "Avatar", label: "Avatar", alignRight: false },
  { id: "UserId", label: "UserId", alignRight: false },
  { id: "Username", label: "Username", alignRight: false },
  { id: "Email", label: "Email", alignRight: false },
  { id: "Roles", label: "Roles", alignRight: false },
  { id: "Roles_discord", label: "Roles_discord", alignRight: false },
  { id: "Status", label: "Status", alignRight: false },
  { id: "" },
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

function applySortFilter(
  array: any,
  comparator: any,
) {
  const stabilizedThis = array.map((el: any, index: number) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any) => el[0]);
}

export default function UserDiscord() {
  const [open, setOpen] = useState(null);
  const [openfilter, setOpenFilter] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState<Iuser[]>([]);
  const [select, setSelect] = useState<Iuser>();
  const debounce = useDebounce(filterName, 900);
  const [userllength, setUerLength] = useState<number>(0);
  // console.log(users)

  // call api
  const [filter, setFilter] = useState<boolean |null>(true);
  useEffect(() => {
    getUser({
      page: page + 1,
      size: rowsPerPage,
      name: debounce,
      deactive: filter,
    }).then((data) => {
      setUsers(data.content);
      setUerLength(data.pageable.total);
    });
  }, [page, rowsPerPage, debounce, filter]);

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleOpenFilter = (event: any) => {
    setOpenFilter(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setOpenFilter(null);
  };

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds: any = users.map((n: Iuser) => n.userId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex: number = selected.indexOf(name);
    let newSelected: any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const editUser = (index: string, main: boolean) => {
    const list: Iuser[] = users;
    list.forEach((item: Iuser) => {
      if (item.userId === index) {
        item.deactive = !main;
      }
    });
    patchUser({ index: index, data: list });
    // console.log(patchUser)
    handleCloseMenu();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  
  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
  );
  // console.log(filterName)

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onClickFilter={handleOpenFilter}
          />

          {/* <Scrollbar sx={{}}> */}
          <TableContainer>
            <Table>
              <UserListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers.map((row: Iuser) => {
                  const {
                    avatar,
                    userId,
                    username,
                    email,
                    roles,
                    roles_discord,
                    deactive,
                  } = row;
                  const selectedUser = selected.indexOf(userId) !== -1;
                  return (
                    <TableRow
                      hover
                      key={userId}
                      tabIndex={-1}
                      role="checkbox"
                      selected={selectedUser}
                    >
                      {/* <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, userId)} />
                        </TableCell> */}

                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar style={{ marginLeft: "10px" }} src={avatar} />
                          <Typography variant="subtitle2" noWrap>
                            {/* {avatar} */}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{userId}</TableCell>
                      <TableCell align="left">{username}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{roles?.join(", ")}</TableCell>
                      <TableCell align="left">
                        {roles_discord?.join(", ")}
                      </TableCell>

                      <TableCell align="left">
                        <Label
                          color={deactive ? "success" : "error"}
                          disableAnimation={deactive}
                        >
                          {String(deactive)}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="large"
                          color="inherit"
                          onClick={(e) => {
                            setSelect(row);
                            handleOpenMenu(e);
                          }}
                        >
                          <Iconify icon={"eva:more-vertical-fill"} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}

                {select && (
                  <Dialog
                    open={Boolean(open)}
                    onClose={handleCloseMenu}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        alt=""
                        style={{ height: "100px" }}
                        src={`${Deleteimg}`}
                      />
                    </DialogTitle>
                    {/* {!deactive? 'active':'deactive'} */}
                    <DialogContent sx={{ width: "400px", textAlign: "center" }}>
                      <DialogContent>
                        <b style={{ fontSize: "30px" }}>Are you sure?</b> <br />
                        {!select.deactive ? "deactive" : "active"}
                        {": "}"{select.username}"?
                      </DialogContent>
                    </DialogContent>
                    <DialogActions
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Button onClick={handleCloseMenu}>No</Button>
                      <Button
                        style={{ backgroundColor: "#7cd1f9", color: "#fff" }}
                        onClick={() => editUser(select.userId, select.deactive)}
                        // {!deactive? 'active':'deactive'}
                        autoFocus
                      >
                        Yes
                      </Button>
                    </DialogActions>
                  </Dialog>
                )}
                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
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
            // labelDisplayedRows={({ from, to, count }) =>
            //   ` Showing ${page + 1} ${
            //     count !== -1
            //       ? `of  ${Math.ceil(userllength / rowsPerPage)} results`
            //       : `  `
            //   }`
            // }
            rowsPerPageOptions={rowPage(userllength).main}
            component="div"
            count={userllength}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(openfilter)}
        anchorEl={openfilter}
        onClose={handleCloseFilter}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Button
          sx={{
            color: "gray",
            backgroundColor: filter ===null? "#b6b1b1" : "white",
          }}
          fullWidth
          onClick={() => {
            setFilter(null);
            handleCloseFilter();
          }}
        >
          All
        </Button>
        <Button
          sx={{
            color: "gray",
            backgroundColor: filter === false ? "#b6b1b1" : "white",
          }}
          fullWidth
          onClick={() => {
            setFilter(false);
            handleCloseFilter();
          }}
        >
          Active
        </Button>
        <Button
          sx={{
            color: "gray",
            backgroundColor: filter === true ? "#b6b1b1" : "white",
          }}
          fullWidth
          onClick={() => {
            setFilter(true);
            handleCloseFilter();
          }}
        >
          Deactive
        </Button>
      </Popover>
    </>
  );
}
