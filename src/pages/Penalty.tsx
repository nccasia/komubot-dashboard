import { Helmet } from 'react-helmet-async';
import React,{ useEffect, useState} from 'react';
// @mui
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
import Moment from 'moment';
import Label from '../components/label';
import Scrollbar from '../components/scrollbar';
import ListToolbar from '../sections/@dashboard/meeting/ListToolbar';
import ListHead from '../sections/@dashboard/meeting/ListHead';
import { getPenalty,getAmount} from '../api/penaltyApi/penaltyApi';
import { useDebounce } from "../utils/useDebounce"
import {rowPage} from "../utils/rowPage";
import {DayTime, Ipenalty,Amount} from "../interface/interface"
import { endOfDay, startOfDay } from "date-fns";
import {getComparator,applySortFilter} from "../utils/applySortFilter"

const TABLE_HEAD = [
  { id: 'ID', label: 'ID', alignRight: false },
  { id: 'Name', label: 'Name', alignRight: false },
  // { id: 'Amount', label: 'Amount', alignRight: false },
  { id: 'Reason', label: 'Reason', alignRight: false },
  { id: 'Isreject', label: 'Isreject', alignRight: false},
  { id: 'Channel', label: 'Channel', alignRight: false },
  { id: 'Time', label: 'Time', alignRight: false },
];

export default function Penalty() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState<string[]>([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [daytime, setDayTime] = useState<DayTime>({
      startDay:Number(startOfDay(new Date())),
      endDay :Number(endOfDay(new Date())),
  });
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
  const debounce=useDebounce(filterName.trim(), 900);
  // const debounceStart=useDebounce(amo[0], 1200);
  // const debounceEnd=useDebounce(amo[1], 1200)
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getPenalty({
      page:page+1, 
      size:rowsPerPage, 
      username:debounce,
      from:daytime?daytime.startDay:0,
      to:daytime?daytime.endDay:0,
      //amountStart:debounceStart,
      //amountEnd:debounceEnd,
    },setLoading)
    .then(data=> {
            setPenal(data.content);
            setTotal(data.pageable.total)
    });
  }, [page,rowsPerPage,debounce,daytime]);

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
  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Penalty | Komu Dashboard </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Penalty
          </Typography>
        </Stack>

        <Card>
          <ListToolbar 
              numSelected={selected.length} 
              filterName={filterName} 
              onFilterName={handleFilterByName} 
              setDayTime={setDayTime}
              searchText="Search by Name..."
          />
          <Scrollbar>
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
                  {loading?                                  
                      <TableRow >
                          <TableCell align="center" colSpan={TABLE_HEAD.length}>  
                              <CircularProgress sx={{color:'#80808085'}}/>
                          </TableCell>  
                      </TableRow>                             
                  :null}

                  {filteredUsers &&!loading?filteredUsers.map((row:Ipenalty, index:number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="left">{row.userId}</TableCell>
                        <TableCell align="left"><b>{row.username}</b></TableCell>
                        {/* <TableCell align="left">{row.ammount}</TableCell> */}
                        <TableCell align="left">{row.reason}</TableCell>
                        <TableCell align="left">
                          <Label color={row.isReject?'error': 'success'}  disableAnimation={(row.isReject)} >{String(row.isReject)}</Label>
                        </TableCell>
                        <TableCell align="left">{row.channelFullName}</TableCell> 
                        <TableCell align="left">{Moment(Number(row.createdTimestamp)).format('HH:MM DD/MM/YYYY ')}</TableCell>                
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
                  rowsPerPageOptions={rowPage(total)}
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
