import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import {
  Avatar,
  Button, Card, Checkbox, Container, IconButton, MenuItem, Paper, Popover, Stack, Table, TableBody,
  TableCell, TableContainer,
  TablePagination, TableRow, Typography
} from '@mui/material';

// components
import Iconify from '../components/iconify';
import Label from '../components/label';
// sections
import { apiAxios, userLink } from '../axios/apiAxios';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/usediscord';
// mock
import { patchUser } from "../api/userApi/userPatch";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Avatar', label: 'Avatar', alignRight: false },
  { id: 'UserId', label: 'UserId', alignRight: false },
  { id: 'Username', label: 'Username', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Roles', label: 'Roles', alignRight: false },
  { id: 'Roles_discord', label: 'Roles_discord', alignRight: false },
  { id: 'Deactive', label: 'Deactive', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------



export interface Iuser{
  
    avatar: string,
    userId: string,
    username: string,
    email: string,
    roles: Array<string>|null,
    roles_discord: Array<string>|null,
    deactive: boolean,
  
}

function descendingComparator(a:any, b:any, orderBy:string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order:string, orderBy:string) {
  return order === 'desc'
    ? (a:any, b:any) => descendingComparator(a, b, orderBy)
    : (a:any, b:any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array:any, comparator:any, query:string, main:string) {
  const stabilizedThis = array.map((el:any, index:number) => [el, index]);
  stabilizedThis.sort((a:any, b:any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user:Iuser) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  if(main==="All"){
    return stabilizedThis.map((el:any) => el[0]);
  }
  if(main==="Active"){
    return filter(array, (_user:Iuser) => _user.deactive===true);
  }
  if(main==="Deactive"){
    return filter(array, (_user:Iuser) => _user.deactive===false);
  }
  
}

export default function UserDiscord() {
  const [open, setOpen] = useState(null);
  const [openfilter, setOpenFilter] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [users, setUsers] = useState<Iuser[]>([]);
  // console.log(users)

    // call api 
  useEffect(() => {
    apiAxios.post(userLink)
        .then(function (response) {
            setUsers(response.data.content);
        })
        .catch(function (error) {
            console.log(error);
        })
  }, []);

  const handleOpenMenu = (event:any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleOpenFilter = (event:any) => {
    setOpenFilter(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setOpenFilter(null);
  };

  const handleRequestSort = (event:any, property:string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event:any) => {
    if (event.target.checked) {
      const newSelecteds:any = users.map((n:Iuser) => n.userId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event:any, name:string) => {
    const selectedIndex:number= selected.indexOf((name));
    let newSelected:any = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

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

  const editUser = (index:string, main:boolean) => {
      const list:Iuser[]=users;
      list.forEach((item:Iuser)=>{
          if(item.userId===index){
            item.deactive=!main;
          }
      })
      patchUser({index:index,data: list})
      handleCloseMenu();
  };

  

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  const [filter, setFilter] = useState<string>('Active');
  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName, filter)
  // console.log(filterName)

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} onClickFilter={handleOpenFilter}/>

          {/* <Scrollbar sx={{}}> */}
            <TableContainer >
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
                 
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:Iuser) => {
                    const { avatar, userId, username, email, roles, roles_discord, deactive } = row;
                    const selectedUser = selected.indexOf((userId)) !== -1;
// roles_discord&&console.log(roles_discord?.[0])
                    return (
                      <TableRow hover key={userId} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, userId)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar src={avatar} />
                            <Typography variant="subtitle2" noWrap>
                              {/* {avatar} */}
                            </Typography>
                          </Stack>
                        </TableCell>


                        <TableCell align="left">{userId}</TableCell>
                        <TableCell align="left">{username}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{roles?.[0]+','+roles?.[1]}</TableCell>
                       { roles_discord&&  <TableCell align="left">{roles_discord?.[0]+','+roles_discord?.[1]}</TableCell>}

                        {/* <TableCell align="left">{deactive ? 'Yes' : 'No'}</TableCell> */}

                        <TableCell align="left">
                          <Label color = {deactive?'error': 'success'}  disableAnimation={(deactive)} >{String(deactive)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                          <Popover
                            open={Boolean(open)}
                            anchorEl={open}
                            onClose={handleCloseMenu}
                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                              sx: {
                                p: 1,
                                width: 140,
                                '& .MuiMenuItem-root': {
                                  px: 1,
                                  typography: 'body2',
                                  borderRadius: 0.75,
                                },
                              },
                            }}
                          >
                            <MenuItem>
                              <Button sx={{color:'gray'}} fullWidth onClick={()=>editUser(userId,deactive)}>
                                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                  {!deactive? 'active':'deactive'}
                              </Button>
                            </MenuItem>
                          </Popover>
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
            </TableContainer>
          {/* </Scrollbar> */}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
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
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{
              sx: {
                p: 1,
                width: 140,
                '& .MuiMenuItem-root': {
                  px: 1,
                  typography: 'body2',
                  borderRadius: 0.75,
                },
              },
            }}
          >
            <Button sx={{color:'gray', backgroundColor:filter==='Active'?'#b6b1b1':'white'}} fullWidth onClick={()=>setFilter('Active')}>Active</Button>
            <Button sx={{color:'gray', backgroundColor:filter==='Deactive'?'#b6b1b1':'white'}} fullWidth onClick={()=>setFilter('Deactive')}>Deactive</Button>
            <Button sx={{color:'gray', backgroundColor:filter==='All'?'#b6b1b1':'white'}} fullWidth onClick={()=>setFilter('All')}>All</Button>
          </Popover>
    </>
  );
}
