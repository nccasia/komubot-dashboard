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
    TableContainer,
    TablePagination,
    CircularProgress,
    Paper,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import ListHead from '../sections/@dashboard/meeting/ListHead';
import UserToolbar from '../sections/@dashboard/meeting/UserToolbar';
import { useDebounce } from "../utils/useDebounce"
import { rowPage } from "../utils/rowPage"
import {ChannelFace} from "../interface/interface"
import {getChannel} from "../api/channelApi/channelApi"
import {getComparator,applySortFilter} from "../utils/applySortFilter"

const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'type', label: 'Type', alignRight: false },
];

export default function ChannelPage() {
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState<any>([]);
    const [orderBy, setOrderBy] = useState('id');
    
    const [filterName, setFilterName] = useState('');
    const [channel, setChannel] = useState<ChannelFace[]>([]);
    const [channellength, setChannelLength] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const debounce=useDebounce(filterName.trim(), 900);
    const [loading, setLoading] = useState<boolean>(false);
    React.useEffect(()=>{ 
        getChannel({page:page+1, size:rowsPerPage, name:debounce},setLoading)
        .then(data=> {
            setChannel(data.content);
            setChannelLength(data.pageable.total)
        })
    },[page,rowsPerPage,debounce]);

    const handleRequestSort = (event: any, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: any) => {
        if (event.target.checked) {
            const newSelecteds: any = channel.map((n: ChannelFace) => n.id);
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

    const filteredUsers = applySortFilter(channel, getComparator(order, orderBy));
    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Helmet>
                <title> Channel | Komu Dashboard </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Channel
                    </Typography>
                </Stack>

                <Card>
                    <UserToolbar 
                        numSelected={selected.length} 
                        filterName={filterName} 
                        onFilterName={handleFilterByName} 
                    />

                    <Scrollbar>
                        <TableContainer >
                            <Table>
                                <ListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={channel.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody >  
                                    {loading?                                  
                                        <TableRow >
                                            <TableCell align="center" colSpan={TABLE_HEAD.length}>  
                                                <CircularProgress sx={{color:'#80808085'}}/>
                                            </TableCell>  
                                        </TableRow>                             
                                    :null}

                                    {filteredUsers && !loading?filteredUsers.map((row: ChannelFace) => {
                                        return (
                                            <TableRow key={Number(row.id)}>           
                                                <TableCell align="left">{row.id}</TableCell>
                                                <TableCell align="left"><b>{(row.name)}</b></TableCell>
                                                <TableCell align="left">{row.type}</TableCell>                                   
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
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={rowPage(channellength)}
                        component="div"
                        count={channellength}
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



