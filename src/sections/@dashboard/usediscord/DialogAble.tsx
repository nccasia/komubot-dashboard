import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import {Iuser} from "../../../interface/interface"

type Props = {
    select: string | null;
    setSelect: React.Dispatch<React.SetStateAction<string | null>>;
    list: Iuser[] | null;
    handleClick: (userId: string | null) => void;
    type: string;
};

export default function DialogAble(
{ 
    select,
    setSelect,
    list,
    handleClick,
    type
}: Props) {
    return (
        <Dialog
            open={select ? true : false}
            onClose={() => setSelect(null)}
        >
            <DialogTitle
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <HighlightOffRoundedIcon sx={{ fontSize: 150, color: '#5c6a78' }}/>     
            </DialogTitle>
            <DialogContent sx={{ width: "320px", textAlign: "center",color: '#212b36c9', padding: 0}}>
                <DialogContent>
                    <b style={{ fontSize: "28px" }}>Are you sure?</b> <br />
                    {type === 'able' && (
                        <span>{list && list[0]?.deactive ? "Enable": "Disable"}</span>
                    )}
                    {type === 'deactive' && (
                        <span>{list && list[0]?.server_deactive ? 'Active' : 'Deactive'}</span>
                    )}
                    {type === 'delete' && "Delete"}
                    {": "}"{list?.length === 1 ? list[0]?.email : null}"?
                </DialogContent>
            </DialogContent>
            <DialogActions
                style={{ alignItems: "center", justifyContent: "center" }}
            >
                <Button variant="outlined" onClick={() => setSelect(null)}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => handleClick(list?.length === 1 ? list[0]?.userId : null)}
                    autoFocus
                >
                   Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}