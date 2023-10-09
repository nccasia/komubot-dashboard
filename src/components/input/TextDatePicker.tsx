import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import "rsuite/dist/rsuite.min.css";
import { DatePicker } from "rsuite";
import React from "react";

TextDatePicker.propTypes = {
    handleSelect:PropTypes.func.isRequired,
};

const StyledDateRangePicker = styled(DatePicker)(({ theme }) => ({
    width: "90%",
    minWidth:20,
    '& .rs-stack-item':{
      fontSize: 16,
    },
    '& span': {
      '& svg': {
        marginTop: 15,
        fontSize: 14,
      }
    },
    '& svg': {
      marginTop:8,
      fontSize:14,
    },
}));

function TextDatePicker({
    handleSelect,
}: PropTypes.InferProps<typeof TextDatePicker.propTypes>){
    return (
        <StyledDateRangePicker
            placeholder="Select date..."
            format="dd/MM/yyyy"
            onChange={handleSelect}
            defaultValue={new Date()}
            oneTap
            size="xs"
            style={{ 
                textAlign: 'right', 
                paddingRight:0,
                fontSize:18,
            }}
        />
    )
}

export default TextDatePicker;