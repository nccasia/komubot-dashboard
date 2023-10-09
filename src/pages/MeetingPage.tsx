import { Helmet } from 'react-helmet-async';
import React from 'react';
import { useState } from 'react';
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
import Scrollbar from '../components/scrollbar';
import Label from '../components/label';
import {DayTime,MeetingFace} from "../interface/interface"
import {getMeeting} from "../api/meetingApi/meetingApi"
import {rowPage} from "../utils/rowPage";
import { useDebounce } from "../utils/useDebounce"
import { endOfDay, startOfDay } from "date-fns";
import TableHeader from '../components/table/TableHeader';
import { formatDateTime } from '../utils/formatDateTime';
import TableTool from '../components/table/TableTool';

const TABLE_HEAD = [
    { id: 'createdTimestamp', label: 'Time', alignRight: false, sort: true },
    { id: 'task', label: 'Task', alignRight: false },
    { id: 'repeat', label: 'Repeat', alignRight: false },
    { id: 'repeatTime', label: 'Repeat Time', alignRight: false },
    { id: 'channelFullName', label: 'Channel', alignRight: false },
    { id: 'cancel', label: 'Cancel', alignRight: false },
];

export default function MeetingPage() {
    const [filterName, setFilterName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [meeting, setMeeting] = useState<MeetingFace[]>([]);
    const [length, setLength] = useState<number>(0);
    const [daytime, setDayTime] = useState<DayTime>({
        startDay:Number(startOfDay(new Date())),
        endDay :Number(endOfDay(new Date())),
    });
    const debounce=useDebounce(filterName.trim(), 900);
    const [loading, setLoading] = useState<boolean>(true);
    const [sort, setSort] = useState<boolean>(false);
    React.useEffect(()=>{
        getMeeting({
            page: page+1,
            size: rowsPerPage,
            task: debounce,
            from: daytime ? daytime.startDay : 0,
            to: daytime ? daytime.endDay : 0,
            sort: sort ? "DESC" : "ASC", 
        },setLoading)
        .then(data=>{
            setMeeting(data.content);
            setLength(data.pageable.total)
        });
    },[daytime, page, rowsPerPage, debounce, sort]);

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
    const isNotFound = !meeting.length && !!filterName;

    return (
        <>
            <Helmet>
                <title>  Meeting | Komu Dashboard </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Meeting
                    </Typography>
                </Stack>

                <Card>
                    <TableTool
                        filterName={filterName} 
                        onFilterName={handleFilterByName} 
                        setDayTime={setDayTime} 
                        searchText="Search by task..."
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

                                {meeting && !loading ? meeting.map((row: MeetingFace) => {
                                    return (
                                        <TableRow hover key={Number(row.id)}>
                                            <TableCell align="left">{formatDateTime(String(row.createdTimestamp))}</TableCell>
                                            <TableCell align="left"><b>{row.task}</b></TableCell>
                                            <TableCell align="left">{row.repeat}</TableCell>
                                            <TableCell align="left">{row.repeatTime}</TableCell>
                                            <TableCell align="left">{row.channelFullName}</TableCell>
                                            <TableCell align="left">
                                                <Label color={row.cancel?'success':'error'}>{String(row.cancel)}</Label>
                                            </TableCell>
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
                        rowsPerPageOptions={rowPage(length)}
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



