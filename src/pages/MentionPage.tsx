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
import { useDebounce } from "../utils/useDebounce"
import { rowPage } from "../utils/rowPage"
import { DayTime, MentionFace } from "../interface/interface"
import { getMention } from "../api/mentionApi/appApi";
import TableHeader from '../components/table/TableHeader';
import { formatDateTime } from '../utils/formatDateTime';
import Label from "../components/label";
import { endOfDay, startOfDay } from "date-fns";
import { DailyListToolbar } from '../sections/@dashboard/daily';

const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'author', label: 'Author', alignRight: false },
    { id: 'mention', label: 'Mention', alignRight: false },
    { id: 'channel', label: 'Channel', alignRight: false },
    { id: 'time', label: 'Time', alignRight: false, sort: true },
    { id: 'reaction', label: 'Reaction', alignRight: false },
    { id: 'type', label: 'Type', alignRight: false },
];

export default function MentionPage() {
    const [filterName, setFilterName] = useState('');
    const [mention, setMention] = useState<MentionFace[]>([]);
    const [mentionlength, setMentionLength] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const debounce=useDebounce(filterName.trim(), 900);
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<string>("All");
    const [daytime, setDayTime] = useState<DayTime>({
        startDay:Number(startOfDay(new Date())),
        endDay :Number(endOfDay(new Date())),
    });
    const [sort, setSort] = useState<boolean>(false);
    React.useEffect(()=>{ 
        getMention({
            page:page+1, 
            size:rowsPerPage,
            sort: sort ? "DESC" : "ASC", 
            type: type === "All" ? "" : type === "Punish" ? false : true,
            from:daytime? daytime.startDay : null,
            to:daytime? daytime.endDay : null,
            name: debounce,
        },setLoading)
        .then(data=> {
            if (data?.content) {
                setMention(data.content);
                setMentionLength(data.pageable.total);
            } else {
                //
            }
        })
    },[page, rowsPerPage, debounce, type, daytime, sort]);

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
    const isNotFound = !mention.length && !!filterName;


    return (
        <>
            <Helmet>
                <title> Mention | Komu Dashboard </title>
            </Helmet>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Mention
                    </Typography>
                </Stack>
               
                <Card>         
                    <DailyListToolbar 
                        filterName={filterName} 
                        onFilterName={handleFilterByName} 
                        filter={type}
                        setFilter={setType}
                        setDayTime={setDayTime}
                        label="Type"
                        placeholder="Search by author, mention..."
                    />
                    <Scrollbar>                    
                        <Table>
                            <TableHeader 
                                headLabel={TABLE_HEAD}
                                sort={sort}
                                setSort={setSort}
                            />
                            <TableBody >  
                                {loading?                                  
                                    <TableRow >
                                        <TableCell align="center" colSpan={TABLE_HEAD.length}>  
                                            <CircularProgress sx={{color:'#80808085'}}/>
                                        </TableCell>  
                                    </TableRow>                             
                                :null}

                                {mention && !loading ? mention.map((row: MentionFace, index: number) => {
                                    return (
                                        <TableRow key={index}>           
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell align="center"><b>{row.author}</b></TableCell>
                                            <TableCell align="center"><b>{row.mention}</b></TableCell>    
                                            <TableCell align="center">{row.channel}</TableCell>
                                            <TableCell align="center">{formatDateTime(String(row.time))}</TableCell>
                                            <TableCell align="center">{row.reaction ? formatDateTime(String(row.reaction)) : null}</TableCell>
                                            <TableCell align="center">
                                                <Label color={row.confirm ? "success" : "error"}>
                                                    {row.confirm ? "Spare" : "Punish"}
                                                </Label>
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
                        rowsPerPageOptions={rowPage(mentionlength)}
                        component="div"
                        count={mentionlength}
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