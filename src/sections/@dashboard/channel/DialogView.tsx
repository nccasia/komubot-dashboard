import {
    Dialog,
    DialogContent,
    DialogTitle,
    Avatar,
    IconButton,
    TextField,
    InputAdornment,
    Button,
    CircularProgress,
} from "@mui/material";
import React from 'react';
import { 
    getChannelMember, 
    postRemoteMemberChannel, 
    getSearchMemberChannel,
    postAddMemberChannel
} from "../../../api/channelApi/channelApi";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from "@mui/material/styles";
import Scrollbar from "../../../components/scrollbar/Scrollbar";

const TextInput = styled(TextField)(({ theme }) => ({
    margin: "8px 0",
    '& .css-soky2i-MuiInputBase-root-MuiOutlinedInput-root': {
        paddingRight: 0,
    }
}));

const DivOnclick = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems:'center',
    justifyContent: "space-between",
    padding: "10px 5px",
    color: 'gray',
    borderTop: "1px solid #d9d9d987",
    '&:hover': {
        backgroundColor: '#919eab36',
    }
}));

const DivOnclickSearch = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems:'center',
    gap: "5px",
    padding: '10px 0',
    borderBottom: "1px solid #d9d9d987",
    '&:hover': {
        backgroundColor: '#919eab36',
    }
}));

type Props = {
    open: string | null;
    setOpen: React.Dispatch<React.SetStateAction<string | null>>;
    list: any[],
};

function DialogView({
    open,
    setOpen,
    list,
}: Props ) {
    const [listMember, setListMember] = React.useState<any[]>([]);
    const [total, setTotal] = React.useState<number>(0);
    const [text, setText] = React.useState<string>("");
    const [searchList, setSearchList] = React.useState<any>([]);
    const [openAdd, setOpenAdd] = React.useState<boolean>(false);
    const [openMenuId, setOpenMenuId] = React.useState<any>();
    const [textKey, setTextKey] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false);
    React.useEffect(() => {
        if(open){
            if(!textKey){
                getChannelMember({
                    id: open,
                    searchId: openMenuId ? openMenuId?.id : "",
                }, setLoading).then((data: any)=> {
                    if(data){
                        setListMember(data?.list);
                        setTotal(data?.total);
                        setSearchList([]);
                    }
                });
            }
        }  
    }, [open, textKey, openMenuId, openMenuId?.id, openAdd]);

    const handleClickText = (item: any) => {
        setText(item?.username);
        setOpenMenuId(item);
        setTextKey("");
        setOpenAdd(false);
    }

    const handleEnterText =(e: any)=> {
        if(e.key === 'Enter'){
            getSearchMemberChannel(text, setLoadingSearch).then(data => {
                if(data){
                    setSearchList(data?.list);
                }
            });
            setTextKey(text);
        }  
    }
    const handleChangeText = (e: any) => {
        setText(e.target.value);
        if(!e.target.value){
            setOpenMenuId(null);
            setTextKey("");
        }
    }

    return(
        <Dialog
            open={open ? true : false}
            onClose={() => {
                setOpen(null);
                setText("");
                setOpenMenuId(null);
                setTextKey("");
            }}
        >             
            <DialogTitle 
                sx={{
                    display: 'flex',
                    alignItems:'center',
                    justifyContent: "space-between",
                    borderBottom: '1px solid #8080802e',
                    color: '#000000a8',
                    padding: "8px 24px",
                }}
            >
                <p>{list[0]?.name} ({total})</p>
                <IconButton 
                    onClick={() => {
                        setOpen(null);
                        setText("");
                        setOpenMenuId(null);
                        setTextKey("");
                    }}
                >
                    <ClearIcon sx={{ fontSize: 25, color: "#ff6d00bd"}}/>
                </IconButton>
            </DialogTitle>
            <DialogContent 
                sx={{
                    width: 350, 
                    position: "relative",
                    zIndex: 10
                }}
            >
                <TextInput
                    placeholder="Search Users..."
                    size="small"
                    value={text}
                    onChange={handleChangeText}
                    onKeyUp={handleEnterText}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                {text && (
                                    <IconButton 
                                        onClick={() => {
                                            setText("");
                                            setTextKey("");
                                            setOpenMenuId(null);
                                        }}
                                    >
                                        <ClearIcon sx={{fontSize: 16}}/>
                                    </IconButton>
                                )}
                                <Button
                                    disabled={openMenuId && openMenuId?.username === text && listMember?.length === 0 ? false : true}
                                    onClick={() => {
                                        postAddMemberChannel({
                                            userId: openMenuId?.id,
                                            channelId: list[0]?.id,
                                        }).then(data => {
                                            if(data){
                                                setOpenMenuId(null);
                                                setText("");
                                                setOpenAdd(true);
                                            }
                                        })
                                    }}
                                >
                                    Add
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                />
                {textKey &&  (
                    <div 
                        style={{
                            backgroundColor: "white",
                            position: "absolute",
                            top: "50px",
                            left: "18px",
                            zIndex: 100,
                            width: "calc(100% - 35px)",
                            border: "2px solid #d9d9d9",
                            borderRadius: '10px',
                            padding: "5px 0",
                        }}
                    >
                        <Scrollbar>
                            <div 
                                style={{
                                    height: '35vh',
                                    padding:'0 10px', 
                                }}
                            >
                                {loadingSearch ?   (                               
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <CircularProgress sx={{color:'#80808085'}}/>
                                    </div>                             
                                ):null}
                                {!loadingSearch && searchList?.length > 0  ? searchList.map((item: any, index: number) => {
                                    return (
                                        <DivOnclickSearch 
                                            key={index}
                                            onClick={() => handleClickText(item)}
                                        >
                                            <Avatar  
                                                src={item?.avatar? `https://cdn.discordapp.com/avatars/${item?.id}/${item?.avatar}` : ""} 
                                                sx={{ width: 45, height: 45 }}
                                            />
                                            <div>
                                                <p style={{fontSize: 16, fontWeight: 500, color: "#000000c4"}}>{item?.username}</p>
                                                <p style={{fontSize: 12, margin: 0}}>{item?.roles.join(", ")}</p>
                                            </div>        
                                        </DivOnclickSearch>
                                    )
                                }): (
                                    <p 
                                        style={{
                                            textAlign: "center",
                                            color: 'gray',
                                            fontSize: 15,
                                            marginTop: '8px',
                                        }}
                                    >
                                        No User!
                                    </p>
                                )}
                            </div>
                        </Scrollbar>
                    </div>
                )}  
                <Scrollbar>
                    <div style={{height: '50vh' }}>
                        {loading ?   (                               
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <CircularProgress sx={{color:'#80808085'}}/>
                            </div>                             
                        ):null}
                        {!loading && listMember?.length > 0 ? listMember.map((item: any, index: number) => {
                            return(
                                <DivOnclick key={index} >
                                    <div 
                                        style={{
                                            display: 'flex',
                                            alignItems:'center',
                                            gap: "5px",
                                            marginBottom: '8px',
                                            opacity: textKey ?  0.7 : 1,
                                        }}
                                    >
                                        <Avatar  
                                            src={item?.avatar? `https://cdn.discordapp.com/avatars/${item?.id}/${item?.avatar}` : ""} 
                                            sx={{ width: 45, height: 45 }}
                                        />
                                        <div>
                                            <p style={{fontSize: 16, fontWeight: 500, color: "#000000c4"}}>{item?.username}</p>
                                            <p style={{fontSize: 12, margin: 0}}>{item?.roles.join(", ")}</p>
                                        </div>                                  
                                    </div>
                                    <IconButton
                                        onClick={() => {
                                            postRemoteMemberChannel({
                                                userId: item?.id,
                                                channelId: list[0]?.id,
                                            }).then(data => {
                                                if(data){
                                                    const listChange = listMember.filter(item1 => item1?.id !== item?.id)
                                                    setListMember(listChange);
                                                    setTotal(Number(total) - 1);
                                                }
                                            })
                                        }}
                                    >
                                        <ClearIcon sx={{ fontSize: 20}} />
                                    </IconButton>
                                </DivOnclick>
                            )
                        }): (
                            <p 
                                style={{
                                    textAlign: "center",
                                    color: 'gray',
                                    fontSize: 15,
                                    marginTop: '8px',
                                }}
                            >
                                No Member!
                            </p>
                        )}
                    </div>
                </Scrollbar>
            </DialogContent>
        </Dialog> 
    )
}

export default DialogView;