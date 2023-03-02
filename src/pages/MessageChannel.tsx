import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import React,{ useEffect, useState, useMemo } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import Moment from 'moment';
import { useDebounce } from 'use-debounce';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/usediscord';
// mock
import { Imessage } from '../interface/interface';
import { filterMessages } from '../api/messageApi/messageApi';
import { endOfDay, startOfDay } from "date-fns";
import { rowPage, rowPageMessage } from '../utils/rowPage';
import {getComparator,applySortFilter} from "../utils/applySortFilter"
import UserToolbar from '../sections/@dashboard/meeting/UserToolbar';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ID', label: 'ID', alignRight: false },
  { id: 'Email', label: 'Email', alignRight: false },
  { id: 'Channel', label: 'Channel', alignRight: false },
  { id: 'Time', label: 'Time', alignRight: false },
  { id: 'Content', label: 'Content', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function Message() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [debounce] = useDebounce(filterName.trim(), 1000);
  const [fromDay,setStartDay] =useState(0);
  const [totalPage, setTotalPage] = useState<number>(0)
  const [toDay,setEndDay] =useState(endOfDay(new Date()).getTime());
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<Imessage[]>([]);
 
  // console.log(message)

    // call api 
    useEffect(() => {
      const fetch = async () => {
        // console.log(fromDay,'sa')
        const messageData = await filterMessages({ size: rowsPerPage, page:page+1, email: debounce,fromDay,toDay });
        const { content, pageable } = messageData
        setTotalPage(pageable.total)
        setIsLoading(true);
        setMessage(content);
        setIsLoading(false);
      };
      fetch();
    }, [page, rowsPerPage, debounce,fromDay,toDay]);

  
  const handleOpenMenu = (event:any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event:any, property:string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event:any) => {
    if (event.target.checked) {
      const newSelecteds:any = message.map((n:Imessage) => n.id);
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
    setIsLoading(true)
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event:any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - message.length) : 0;

  const filteredUsers = applySortFilter(message, getComparator(order, orderBy))
  // console.log(filterName)

  const isNotFound = !filteredUsers.length && !!filterName;

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
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          <UserToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          {/* <Scrollbar sx={{}}> */}
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={message.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                {isLoading ? (
                    <TableRow >
                    <TableCell align="center" colSpan={TABLE_HEAD.length}>
                        <CircularProgress sx={{color:'#80808085'}}/>
                    </TableCell>
                </TableRow>
                ) : (
                  <TableBody>
                  {filteredUsers.map((row:Imessage) => {
                    const {id, email, channelFullName, createdTimestamp, content,} = row;
                    const selectedUser = selected.indexOf((id)) !== -1;
                    // console.log(row)
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>

                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{channelFullName}</TableCell>
                        <TableCell align="left">{createdTimestamp?Moment(Number(createdTimestamp)).format('HH:MM DD/MM/YYYY '):null}</TableCell>
                        <TableCell align="left">{content}</TableCell>                      
                      
                      </TableRow>
                    );
                  })}
                  
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
            </TableContainer>
          {/* </Scrollbar> */}

          <TablePagination
            rowsPerPageOptions={rowPage(totalPage)}
            // rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

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
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        {/* <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem> */}
      </Popover>
    </>
  );
}
