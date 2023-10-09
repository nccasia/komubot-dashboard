import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Button,
  Card,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Label from "../components/label";
import {
  UserListToolbar,
  DialogAble,
  DialogEdit,
} from "../sections/@dashboard/usediscord";
import { Iuser } from "../interface/interface";
import { deleteDeactiveUser, getUser, patchUser, postDeactiveUser } from "../api/user/userApi";
import { useDebounce } from "../utils/useDebounce";
import { rowPage } from "../utils/rowPage";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TableHeader from "../components/table/TableHeader";
import Scrollbar from "../components/scrollbar/Scrollbar";

const TABLE_HEAD = [
  { id: "Avatar", label: "Avatar", alignCenter: false },
  { id: "UserId", label: "UserId", alignRight: false },
  { id: "Username", label: "Username", alignRight: false, sort: true },
  { id: "Email", label: "Email", alignRight: false },
  { id: "Roles", label: "Roles", alignRight: false },
  { id: "Roles_discord", label: "Roles_discord", alignRight: false },
  { id: "Status", label: "Status", alignRight: false },
  { id: "Action", label: "Action", alignRight: true },
];

export default function UserDiscord() {
  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState<Iuser[]>([]);
  const [select, setSelect] = useState<string | null>(null);
  const [selectDeactive, setSelectDeactive] = useState<string | null>(null);
  const [selectDelete, setSelectDelete] = useState<string | null>(null);
  const debounce = useDebounce(filterName.trim(), 900);
  const [userllength, setUerLength] = useState<number>(0);
  const [role, setRole] = useState('ALL');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getUser({
      page: page + 1,
      size: rowsPerPage,
      name: debounce,
      deactive: status === 'All' ? null : status === 'Enable' ? false : status === 'Disable' ? true : null,
      roles: role==='ALL' ? [] : [role],
      sort: sort ? "DESC" : "ASC", 
      server_deactive: status === 'Deactive' ? true : status === 'All'? null : false,
    }, setLoading).then((data) => {
      setUsers(data.content);
      setUerLength(data.pageable.total);
    });
  }, [page, rowsPerPage, debounce, status, role, sort]);

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
  const [openEdit, setOpenEdit] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title> User | Komu Dashboard </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
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
                {users ? users.map((row: Iuser) => {
                  const {
                    avatar,
                    userId,
                    username,
                    email,
                    roles,
                    roles_discord,
                    deactive,
                    server_deactive,
                  } = row;
                  return (
                    <TableRow
                      hover
                      key={userId}
                      tabIndex={-1}
                      role="checkbox"
                    >
                      <TableCell align="center">
                        <Stack direction="row" alignItems="center" >
                          <Avatar style={{ marginLeft: "10px" }} src={`https://cdn.discordapp.com/avatars/${userId}/${avatar}`} />
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{userId}</TableCell>
                      <TableCell align="left">{username}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{roles?.join(", ")}</TableCell>
                      <TableCell align="left">
                        {roles_discord?.join(", ")}
                      </TableCell>

                      <TableCell align="left">
                        <Label color={deactive ? "error" : "success"}>
                          {deactive? "Disable":"Enable"}
                        </Label>
                        <Label color={server_deactive ? "error" : "success"} sx={{marginTop: 1}}>
                          {server_deactive? "Deactive":"Active"}
                        </Label>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          id="basic-button"
                          aria-controls={openEl ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={openEl ? 'true' : undefined}
                          variant="outlined"
                          onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleClick(event, userId)}
                        >
                          Action
                        </Button>
                        {userId === anchorElOpen && (
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
                              onClick={() => {
                                handleClose();
                                setOpenEdit(userId);
                              }}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                color: '#212b36c9',
                              }}
                            >
                              <EditIcon sx={{ fontSize: 16}}/> 
                              Edit
                            </MenuItem>

                            <MenuItem 
                              onClick={() => {
                                handleClose();
                                setSelect(userId);
                              }}
                            >
                              {deactive ? 
                                <span 
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    color: '#212b36c9',
                                  }}
                                >
                                  <DoneIcon sx={{ fontSize: 16}}/>
                                  Enable
                                </span>
                              : 
                                <span
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    color: '#212b36c9',
                                  }}
                                >
                                  <CloseIcon sx={{ fontSize: 16}}/> 
                                  Disable
                                </span>
                              }
                            </MenuItem>
                            <MenuItem 
                              onClick={() => {
                                handleClose();
                                setSelectDeactive(userId);
                              }}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px',
                                color: '#212b36c9',
                              }}
                            >
                              {server_deactive ? 
                                <span 
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    color: '#212b36c9',
                                  }}
                                >
                                  <WifiTetheringIcon sx={{ fontSize: 16}}/>
                                  Active
                                </span>
                              : 
                                <span
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    color: '#212b36c9',
                                  }}
                                >
                                  <AirplanemodeActiveIcon sx={{ fontSize: 16}}/>
                                  Deactive
                                </span>
                              }
                            </MenuItem>
                            {server_deactive && (
                              <MenuItem 
                                onClick={() => {
                                  handleClose();
                                  setSelectDelete(userId);
                                }}
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  color: '#212b36c9',
                                }}
                              >
                                <DeleteForeverIcon sx={{ fontSize: 16}}/> 
                                Delete
                              </MenuItem>
                            )}
                          </Menu>
                        )}
                      </TableCell> 
                    </TableRow>
                  );
                }): null}
              </TableBody>
              {users?.length === 0 && filterName !=='' && (
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
            rowsPerPageOptions={rowPage(userllength)}
            component="div"
            count={userllength}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <DialogAble
          type="able" 
          select={select}
          setSelect={setSelect}
          list={users?.filter(item => item?.userId === select)}
          handleClick={(userId: string | null) => {
            patchUser(userId);
            setSelect(null);
            if(status === 'All' || status === 'Deactive'){
              const list = users?.map(item => {
                if(item?.userId === userId){
                    return {...item, deactive: !item?.deactive}
                } else{
                    return item;
                }
              });
              setUsers(list);
            }
            if(status === 'Disable' || status === 'Enable'){
              const list = users?.filter(item => item?.userId !== userId);
              setUsers(list);
            }
          }}
        />
        <DialogAble 
          type="deactive"
          select={selectDeactive}
          setSelect={setSelectDeactive}
          list={users?.filter(item => item?.userId === selectDeactive)}
          handleClick={(userId: string | null) => {
            postDeactiveUser(userId);
            setSelectDeactive(null);
            if(status !== 'Deactive'){
              const list = users?.map(item => {
                if(item?.userId === userId){
                    return {...item, server_deactive: !item?.server_deactive}
                } else{
                    return item;
                }
              });
              setUsers(list);
            }
            if(status === 'Deactive'){
              const list = users?.filter(item => item?.userId !== userId);
              setUsers(list);
            } 
          }}
        />
        <DialogAble 
          type="delete"
          select={selectDelete}
          setSelect={setSelectDelete}
          list={users?.filter(item => item?.userId === selectDelete)}
          handleClick={(userId: string | null) => {
            deleteDeactiveUser(userId);
            setSelectDelete(null);
            const list = users?.filter(item => item?.userId !== userId);
            setUsers(list);
          }}
        />
        <DialogEdit 
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          list={users?.filter(item => item?.userId === openEdit)}
          users={users}
          setUsers={setUsers}
        /> 
      </Container>
    </>
  );
}
