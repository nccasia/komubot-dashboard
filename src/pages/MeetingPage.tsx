import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import React from 'react';
import { useState } from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
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
} from '@mui/material';
// components
import Iconify from '../components/iconify';
import Label from '../components/label';
//import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock

import {apiAxios, meetingLink} from '../axios/ApiAxios';
import Moment from "moment";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'createdTimestamp', label: 'Created Time', alignRight: true },
    { id: 'task', label: 'Task', alignRight: true },
    { id: 'repeat', label: 'Repeat', alignRight: true },
    { id: 'repeatTime', label: 'Repeat Time', alignRight: true },
    { id: 'channelFullName', label: 'Channel', alignRight: true },
    { id: 'cancel', label: 'Cancel', alignRight: true },
    { id: 'action', label: 'Action', alignRight: true  },
];

interface MeetingFace{
    id:number,
    createdTimestamp:string,
    task:string,
    repeat:string,
    cancel:boolean,
    repeatTime:string,
    channelFullName:string, 
}

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
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array: any, comparator: any, query: string) {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[0] - b[0];
    });
    if (query) {
        return filter(array, (_user: any) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el: any) => el[0]);
}

export default function MeetingPage() {
    const [open, setOpen] = useState<Element | ((element: Element) => Element) | null | undefined>();

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState<any>([]);

    const [orderBy, setOrderBy] = useState('id');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [meeting, setMeeting] = useState<MeetingFace[]>([]);

    React.useEffect(()=>{
        apiAxios.get(meetingLink)
        .then(function (response) {
            setMeeting(response.data.content);
        })
        .catch(function (error) {
            console.log(error);
        })
    },[]);

    const handleOpenMenu = (event: any) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const handleRequestSort = (event: any, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds: any = meeting.map((n: MeetingFace) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: any, index: number) => {
        const selectedIndex: number = selected.indexOf((index));
        let newSelected: any = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, index);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - meeting.length) : 0;

    const filteredUsers = applySortFilter(meeting, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title>  Meeting | Minimal UI </title>
            </Helmet>


            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Meeting
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New  Meeting
                    </Button>
                </Stack>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    {/* <Scrollbar sx={{}}> */}
                    <TableContainer >
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={meeting.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: MeetingFace) => {
                                    const selectedUser = selected.indexOf((row.id)) !== -1;
                                    return (
                                        <TableRow hover key={Number(row.id)} tabIndex={-1} role="checkbox" selected={selectedUser}>
                                            
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, row.id)} />
                                            </TableCell>

                                            <TableCell align="center">{Moment(Number(row.createdTimestamp)).format('HH:MM DD/MM/YYYY ')}</TableCell>
                                            <TableCell align="center"><b>{row.task}</b></TableCell>
                                            <TableCell align="center">{row.repeat}</TableCell>
                                            <TableCell align="center">{row.repeatTime}</TableCell>
                                            <TableCell align="center">{row.channelFullName}</TableCell>
                                            <TableCell align="center" >
                                                <Label color={row.cancel?'success':'error'}>{(row.cancel)?"Open":"Close"}</Label>
                                            </TableCell>
                                            
                                            
                                            <TableCell align="center">
                                                <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                                                    <Iconify icon={'eva:more-vertical-fill'} />
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
                        rowsPerPageOptions={meeting.length<5? [0,5]:[5, 10, 25]}
                        component="div"
                        count={meeting.length}
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

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}



