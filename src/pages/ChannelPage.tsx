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
import ListHead from '../sections/@dashboard/meeting/ListHead';
import UserToolbar from '../sections/@dashboard/meeting/UserToolbar';
import { textStyle } from "../utils/textStyles"
import { useDebounce } from "../utils/useDebounce"
import { rowPage } from "../utils/rowPage"
import {ChannelFace} from "../interface/interface"
import {getChannel} from "../api/channelApi/channelApi"


const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: true },
    { id: 'name', label: 'Name', alignRight: true },
    { id: 'type', label: 'Type', alignRight: true },
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

function applySortFilter(array: ChannelFace[], comparator: any) {
    const stabilizedThis = array.map((el: any, index: number) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[0] - b[0];
    });
    return stabilizedThis.map((el: any) => el[0]);
}

export default function ChannelPage() {
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState<any>([]);
    const [orderBy, setOrderBy] = useState('id');
    
    const [filterName, setFilterName] = useState('');
    const [channel, setChannel] = useState<ChannelFace[]>([]);
    const [channellength, setChannelLength] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const debounce=useDebounce(filterName, 900);
    React.useEffect(()=>{ 
        getChannel({page:page+1, size:rowsPerPage, name:debounce})
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

    return (
        <>
            <Helmet>
                <title> Channel | Minimal UI </title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Channel
                    </Typography>
                </Stack>

                <Card>
                    <UserToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    {/* <Scrollbar sx={{}}> */}
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
                            <TableBody>
                                {filteredUsers?filteredUsers.map((row: ChannelFace) => {
                                    const selectedUser = selected.indexOf((row.id)) !== -1;
                                    return (
                                        <TableRow hover key={Number(row.id)} tabIndex={-1} role="checkbox" selected={selectedUser}>           
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell align="center"><b>{(row.name)}</b></TableCell>
                                            <TableCell align="center">{row.type}</TableCell>                                   
                                        </TableRow>
                                    );
                                }):null}                         
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* </Scrollbar> */}

                    <TablePagination
                        rowsPerPageOptions={rowPage(channellength).main}
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



