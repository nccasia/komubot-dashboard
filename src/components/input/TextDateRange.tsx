import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import "rsuite/dist/rsuite.min.css";
import { DateRangePicker} from "rsuite";
import React from "react";
import { endOfDay, startOfDay } from "date-fns";

TextDateRange.propTypes = {
    handleSelect:PropTypes.func.isRequired,
};

const StyledDateRangePicker = styled(DateRangePicker)(({ theme }) => ({
    width:"90%",
    minWidth:20,
    '& .rs-stack-item':{
        fontSize: 14,
    },
    '& span': {
      '& svg': {
        marginTop: 15,
        fontSize: 14,
      }
    },
    '& svg': {
        marginTop: 6,
        fontSize: 14,
    },
}));

function TextDateRange({
    handleSelect,
}: PropTypes.InferProps<typeof TextDateRange.propTypes>){
    return (
        <StyledDateRangePicker
            placeholder="Select date-date..."
            format="dd/MM/yyyy"
            onChange={handleSelect}
            defaultValue={[startOfDay(new Date()), endOfDay(new Date())]}
            showOneCalendar
            size="xs"
            style={{ 
                textAlign: 'right', 
                paddingRight:0,
                fontSize:18,
            }}
        />
    )
}

export default TextDateRange;