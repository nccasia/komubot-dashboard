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
    Button,
    Menu,
    MenuItem,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import { useDebounce } from "../utils/useDebounce"
import { rowPage } from "../utils/rowPage"
import {ChannelFace} from "../interface/interface"
import {getChannel} from "../api/channelApi/channelApi"
import { DialogView, ToolHeader } from "../sections/@dashboard/channel";
import TableHeader from '../components/table/TableHeader';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const TABLE_HEAD = [
    { id: 'id', label: 'Id', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false, sort: true },
    { id: 'type', label: 'Type', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
];

export default function ChannelPage() {
    const [filterName, setFilterName] = useState('');
    const [channel, setChannel] = useState<ChannelFace[]>([]);
    const [channellength, setChannelLength] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const debounce=useDebounce(filterName.trim(), 900);
    const [loading, setLoading] = useState<boolean>(false);
    const [type, setType] = useState<string>("All");
    const [sort, setSort] = useState<boolean>(false);
    React.useEffect(()=>{ 
        getChannel({
            page:page+1, 
            size:rowsPerPage, 
            name:debounce, 
            type: type,
            sort: sort ? "DESC" : "ASC", 
        },setLoading)
        .then(data=> {
            setChannel(data.content);
            setChannelLength(data.pageable.total)
        })
    },[page, rowsPerPage, debounce, type, sort]);

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
    const isNotFound = !channel.length && !!filterName;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElOpen, setAnchorElOpen] = useState<null | string>(null);
    const openEl = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, userId: string | null) => {
        setAnchorElOpen(userId);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openView, setOpenView] = useState<string | null>(null);

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
                    <ToolHeader 
                        filterName={filterName} 
                        onFilterName={handleFilterByName} 
                        type={type}
                        setType={setType}
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

                                {channel && !loading ? channel.map((row: ChannelFace, index: number) => {
                                    return (
                                        <TableRow key={index}>           
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell align="center"><b>{(row.name)}</b></TableCell>
                                            <TableCell align="center">{row.type}</TableCell>  
                                            <TableCell align="center">
                                                <Button
                                                    id="basic-button"
                                                    aria-controls={openEl ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={openEl ? 'true' : undefined}
                                                    variant="outlined"
                                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClick(event, row.id)}
                                                >
                                                    Action
                                                </Button>
                                                {row.id === anchorElOpen && (
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={openEl}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem 
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '5px',
                                                                color: '#212b36c9',
                                                            }}
                                                            onClick={() => {
                                                                setOpenView(row.id);
                                                                setAnchorEl(null);
                                                            }}
                                                        >
                                                            <RemoveRedEyeIcon />
                                                            View Member
                                                        </MenuItem>
                                                    </Menu>
                                                )}    
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
                        rowsPerPageOptions={rowPage(channellength)}
                        component="div"
                        count={channellength}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
                <DialogView 
                    open={openView}
                    setOpen={setOpenView}
                    list={channel?.filter(item => item?.id === openView)}
                />
            </Container>
        </>
    );
}



