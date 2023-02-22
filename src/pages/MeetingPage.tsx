import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import React from 'react';
import { useState } from 'react';
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
import Iconify from '../components/iconify';
import Label from '../components/label';
import ListHead from '../sections/@dashboard/meeting/ListHead';
import ListToolbar from '../sections/@dashboard/meeting/ListToolbar';
import {DayTime,MeetingFace} from "../interface/interface"
import Moment from "moment";
import {getMeeting} from "../api/meetingApi/meetingApi"
import {rowPage} from "../utils/rowPage";
import { useDebounce } from "../utils/useDebounce"

const TABLE_HEAD = [
    { id: 'createdTimestamp', label: 'Created Time', alignRight: true },
    { id: 'task', label: 'Task', alignRight: true },
    { id: 'repeat', label: 'Repeat', alignRight: true },
    { id: 'repeatTime', label: 'Repeat Time', alignRight: true },
    { id: 'channelFullName', label: 'Channel', alignRight: true },
    { id: 'cancel', label: 'Cancel', alignRight: true },
];

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

function applySortFilter(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[0] - b[0];
    });
    return stabilizedThis.map((el: any) => el[0]);
}

export default function MeetingPage() {
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState<any>([]);
    const [orderBy, setOrderBy] = useState('id');

    const [filterName, setFilterName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [meeting, setMeeting] = useState<MeetingFace[]>([]);
    const [length, setLength] = useState<number>(0);
    const [daytime, setDayTime] = useState<DayTime>();
    const debounce=useDebounce(filterName, 900);
    
    React.useEffect(()=>{
        getMeeting({
            page:page+1,
            size:rowsPerPage,
            task:debounce,
            from:daytime?daytime.startDay:0,
            to:daytime?daytime.endDay:0,
        }).then(data=>{
            setMeeting(data.content);
            setLength(data.pageable.total)
        });
    },[daytime,page,rowsPerPage,debounce]);

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

    const filteredUsers = applySortFilter(meeting, getComparator(order, orderBy));

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
                </Stack>

                <Card>
                    <ListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} setDayTime={setDayTime} />

                    {/* <Scrollbar sx={{}}> */}
                    <TableContainer >
                        <Table>
                            <ListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={meeting.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {filteredUsers.map((row: MeetingFace) => {
                                    return (
                                        <TableRow hover key={Number(row.id)}>
                                            <TableCell align="center">{Moment(Number(row.createdTimestamp)).format('HH:MM DD/MM/YYYY ')}</TableCell>
                                            <TableCell align="center"><b>{row.task}</b></TableCell>
                                            <TableCell align="center">{row.repeat}</TableCell>
                                            <TableCell align="center">{row.repeatTime}</TableCell>
                                            <TableCell align="center">{row.channelFullName}</TableCell>
                                            <TableCell align="center" >
                                                <Label color={row.cancel?'success':'error'}>{String(row.cancel)}</Label>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* </Scrollbar> */}

                    <TablePagination
                        rowsPerPageOptions={rowPage(length).main}
                        component="div"
                        count={length}
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



