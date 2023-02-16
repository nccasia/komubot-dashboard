import { Modal, Box, Typography, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { dailystype } from "../../../interface/interface";
import { formatDateTime } from "../../../utils/formatDateTime";
type Props = {
  user: dailystype | null;
  onClose: () => void;
};
const containerStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 2,
  borderRadius: "8px",
  minWidth:'35%',

};
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#3E50AF",
  p: 4,
  pt: 2,
  pb: 2,
  borderRadius: "8px 8px 0 0",
  color: "white",
};
const bodyStyle = {
  width: "initial",
  bgcolor: "white",
  borderRadius: "0  0 8px 8px",
  p: 4,
  pt: 2,
  gap:1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
};
const SpaceBetween = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
};
const UserDetailsModal = ({ user, onClose }: Props) => {
  console.log(user);

  return (
    <Modal open={user !== null} onClose={onClose}>
      <Box sx={containerStyle}>
        <Box sx={headerStyle}>
           
          <Typography sx={{ textTransform: "capitalize" }} variant="h4">
            {user?.email}
          </Typography>
          <IconButton color="inherit" onClick={onClose}>
            <HighlightOffIcon fontSize='medium' />
          </IconButton>
        </Box>
        <Box sx={bodyStyle}>
          <Box sx={SpaceBetween}>
            <Typography variant="h6">Channel</Typography>
            <Typography variant="h6">Time</Typography>
         
          </Box>
          <Box sx={SpaceBetween}>
          <Typography variant="body2">{user?.channelFullName}</Typography>
            <Typography variant="body2">{user&&formatDateTime(user?.createdAt)}</Typography>
          </Box>
          <Typography variant="h6">Daily</Typography>
          <Typography
            sx={{ whiteSpace: "break-spaces", minWidth: 250 ,padding:'10px',color:'#7C7C8E',borderRadius:'6px',backgroundColor:'#F1F1EF', width:'100%'}}
            variant="body2"
          >
            {user?.daily}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserDetailsModal;
