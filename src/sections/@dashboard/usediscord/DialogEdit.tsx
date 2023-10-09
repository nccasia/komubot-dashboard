import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import React from 'react';
import { useForm } from 'react-hook-form';
import {Iuser} from "../../../interface/interface";
import {postEditUser} from "../../../api/user/userApi";
import { styled } from "@mui/material/styles";

const TextInput = styled(TextField)(({ theme }: any) => ({
    marginTop: 15,
    '& input': {
        color: '#212b36c9',
    },
}));

const TextP = styled(Typography)(({ theme }: any) => ({
    color: "red", 
    marginLeft: 5, 
    fontSize: 12, 
    marginTop: 3,
}));

type Props = {
    openEdit: string | null;
    setOpenEdit: React.Dispatch<React.SetStateAction<string | null>>;
    list: Iuser[] | null;
    users: Iuser[];
    setUsers: React.Dispatch<React.SetStateAction<Iuser[]>>;
};

export default function DialogEdit(
{ 
    openEdit,
    setOpenEdit,
    list, 
    users, 
    setUsers,
}: Props) {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
      } = useForm<any>()
    React.useEffect(()=>{
        if(list?.length === 1){
            setValue('username', list[0].username);
            setValue('email', list[0].email);
            setValue('roles', list[0].roles?.join(", "));
            setValue('roles_discord', list[0].roles_discord?.join(", "));
        }
    }, [list, setValue]);

    const onSubmit =(data: any) => {
        if(data && list?.length === 1 && list[0]?.userId){
            setOpenEdit(null);
            postEditUser({
                userId: list[0]?.userId,
                username: data?.username,
                email:data?.email,
                roles: data?.roles.split(', '),
                roles_discord: data?.roles_discord.split(', '),
            })
            const listClick = users?.map(item => {
                if(list?.length === 1 && item?.userId === list[0]?.userId){
                    return {
                        ...item, 
                        username: data?.username,
                        email:data?.email,
                        roles: data?.roles.split(', '),
                        roles_discord: data?.roles_discord.split(', '),
                    }
                } else {
                    return item;
                }
            });
            setUsers(listClick);
        }
    }

    return (
        <Dialog
            open={openEdit ? true : false}
            onClose={() => setOpenEdit(null)}
        >   
            <form  onSubmit={handleSubmit(onSubmit)}>
                <DialogTitle 
                    sx={{
                        color: '#212b36c9', 
                        borderBottom: "1px solid #d9d9d987",
                    }}
                >
                    {"Edit"}
                </DialogTitle>
                <DialogContent sx={{width: 320}}>
                    <TextInput
                        label="Username" 
                        variant="outlined"
                        fullWidth
                        {...register("username", { required: true })}
                    />
                    {errors.username && (
                        <TextP>This field is required</TextP>
                    )}
                    <TextInput
                        label="Email" 
                        variant="outlined" 
                        fullWidth
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <TextP>This field is required</TextP>
                    )}
                    <TextInput
                        label="Roles" 
                        variant="outlined" 
                        fullWidth
                        {...register("roles", { required: true })}
                    />
                    {errors.roles && (
                        <TextP>This field is required</TextP>
                    )}
                    <TextInput
                        label="Roles Discord" 
                        variant="outlined" 
                        fullWidth
                        {...register("roles_discord", { required: true })}
                    />
                    {errors.roles_discord && (
                        <TextP>This field is required</TextP>
                    )}
                </DialogContent>
                <DialogActions sx={{borderTop: "1px solid #d9d9d95c"}}>
                    <Button 
                        type="button"
                        variant="outlined"  
                        onClick={() => setOpenEdit(null)}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit"
                        variant="contained"
                    >
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog> 
    );
}