import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

const TextInput = styled(TextField)(({ theme }: any) => ({
    width: '90%',
    '& .css-znbc8-MuiInputBase-root-MuiOutlinedInput-root': {
      color: '#212b36c9',
    }
}));

TextInputMenu.propTypes = {
    setFilterDaily:PropTypes.func.isRequired,
    filterDaily: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
};

function TextInputMenu({
    filterDaily,
    setFilterDaily,
    list,
    label
}: PropTypes.InferProps<typeof TextInputMenu.propTypes>){
    return (
        <TextInput
            id="outlined-select-currency"
            select
            label={label}
            value={filterDaily}
            onChange={(event)=> setFilterDaily(event.target.value)}
            size="small"
        >
            {list.map((option) => (
                <MenuItem 
                    key={option.value} 
                    value={option.value}
                    sx={{ color: '#212b36c9'}}
                >
                    {option.label}
                </MenuItem>
            ))}
        </TextInput>
    )
}

export default TextInputMenu;