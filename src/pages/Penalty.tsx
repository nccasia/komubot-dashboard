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
  Slider,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Moment from 'moment';
import InfoIcon from '@mui/icons-material/Info';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/usediscord';
import ListToolbar from '../sections/@dashboard/meeting/ListToolbar';
import ListHead from '../sections/@dashboard/meeting/ListHead';
import { getPenalty,getAmount} from '../api/penaltyApi/penaltyApi';
import { useDebounce } from "../utils/useDebounce"
import {rowPage} from "../utils/rowPage";
import {DayTime, Ipenalty,Amount} from "../interface/interface"

const TABLE_HEAD = [
  { id: 'ID', label: 'ID', alignRight: true },
  { id: 'Name', label: 'Name', alignRight: true },
  // { id: 'Amount', label: 'Amount', alignRight: true },
  { id: 'Reason', label: 'Reason', alignRight: true },
  { id: 'Isreject', label: 'Isreject', alignRight: true},
  { id: 'Channel', label: 'Channel', alignRight: true },
  { id: 'Time', label: 'Time', alignRight: true },
];

// ----------------------------------------------------------------------


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

function applySortFilter(array:any, comparator:any) {
  const stabilizedThis = array.map((el:any, index:number) => [el, index]);
  stabilizedThis.sort((a:any, b:any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el:any) => el[0]);
}

export default function Penalty() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [daytime, setDayTime] = useState<DayTime>();
  const [penal, setPenal] = useState<Ipenalty[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [amount, setAmount] = useState<Amount>();
  const [amo, setAmo] = useState<number[]>([]);
  // useEffect(() => {
  //   getAmount().then(data=>{
  //     setAmount(data);
  //     setAmo([data.min, data.max]);
  //   });
  // },[])

  // const minDistance = 1000;
  // const handleChange1 = (
  //   event: Event,
  //   newValue: number | number[],
  //   activeThumb: number,
  // ) => {
  //   if (!Array.isArray(newValue)) {
  //     return;
  //   }

  //   if (activeThumb === 0) {
  //     setAmo([Math.min(newValue[0], amo[1] - minDistance), amo[1]]);
  //   } else {
  //     setAmo([amo[0], Math.max(newValue[1], amo[0] + minDistance)]);
  //   }
  // };
  // function valuetext(value: number) {
  //   return `${value}`;
  // }
  const debounce=useDebounce(filterName, 900);
  const debounceStart=useDebounce(amo[0], 1200);
  const debounceEnd=useDebounce(amo[1], 1200)
  useEffect(() => {
    getPenalty({
      page:page+1, 
      size:rowsPerPage, 
      username:debounce,
      from:daytime?daytime.startDay:0,
      to:daytime?daytime.endDay:0,
      //amountStart:debounceStart,
      //amountEnd:debounceEnd,
    }).then(data=> {
            setPenal(data.content);
            setTotal(data.pageable.total)
        });
  }, [page,rowsPerPage,debounce,daytime,debounceStart,debounceEnd]);

  const handleRequestSort = (event:any, property:string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event:any) => {
    if (event.target.checked) {
      const newSelecteds:any = penal.map((n:Ipenalty) => n.userId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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

  const filteredUsers = applySortFilter(penal, getComparator(order, orderBy))

  return (
    <>
      <Helmet>
        <title> Penalty | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Penalty
          </Typography>
        </Stack>

        <Card>
          <ListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} setDayTime={setDayTime}/>
          {/* <Scrollbar sx={{}}> */}
            <TableContainer>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={penal.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers?filteredUsers.map((row:Ipenalty, index:number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{row.userId}</TableCell>
                        <TableCell align="center"><b>{row.username}</b></TableCell>
                        {/* <TableCell align="center">{row.ammount}</TableCell> */}
                        <TableCell align="center">{row.reason}</TableCell>
                        <TableCell align="center">
                          <Label color={row.isReject?'error': 'success'}  disableAnimation={(row.isReject)} >{String(row.isReject)}</Label>
                        </TableCell>
                        <TableCell align="center">{row.channelFullName}</TableCell> 
                        <TableCell align="center">{Moment(Number(row.createdTimestamp)).format('HH:MM DD/MM/YYYY ')}</TableCell>                
                      </TableRow>
                    );
                  }):null}
                </TableBody>
              </Table>
            </TableContainer>
          {/* </Scrollbar> */}

          <div style={{display:'flex', justifyContent:'space-between'}}>
              <div style={{padding:0}}>
                {/* <IconButton sx={{margin:0}}>
                  <InfoIcon/>
                </IconButton>
                <Slider
                  value={amo}
                  onChange={handleChange1}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  // disableSwap
                  //orientation="vertical"
                  min={Number(amount?amount.min:0)}
                  max={Number(amount?amount.max:0)}
                  sx={{width:200, display:'none'}}
                /> */}
              </div>
              <TablePagination
                  rowsPerPageOptions={rowPage(total).main}
                  component="div"
                  count={total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
          </div>
          
        </Card>
      </Container>      
    </>
  );
}
