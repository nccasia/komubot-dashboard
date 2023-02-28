import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import {
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Typography
} from "@mui/material";
import "rsuite/dist/rsuite.min.css";
import Iconify from "../../../components/iconify";
import { endOfDay, startOfDay } from "date-fns";
import React from "react";
import { DateRangePicker} from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }: any) => ({
  width: 250,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

const StyledDateRangePicker = styled(DateRangePicker)(({ theme }) => ({
    width:250,
    minWidth:20,
    '& rs-stack':{
      padding:0,
      '& rs-stack-item':{
        padding:0,
      },
    },
    
}));

ListToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
  setDayTime: PropTypes.func.isRequired,
};

export default function ListToolbar({numSelected,filterName,onFilterName,setDayTime,}: PropTypes.InferProps<typeof ListToolbar.propTypes>) {
  async function handleSelect(
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>
  ) {
    if (value) {
      const startDay = startOfDay(value?.[0]).getTime();
      const endDay = endOfDay(value?.[1]).getTime();
      setDayTime({startDay:startDay, endDay:endDay});
    }
    else{
      setDayTime(null);
    }
  }
  
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
        
      <StyledDateRangePicker
        placeholder="Select date-date..."
        format="dd/MM/yyyy"
        onChange={handleSelect}
        style={{ textAlign: 'right', paddingRight:0}}
        caretAs={()=><CalendarMonthIcon sx={{color:"gray", fontSize:21}}/>}
        defaultValue={[startOfDay(new Date()), endOfDay(new Date())]}
        caretPlacement="right"
        showOneCalendar
      />
    </StyledRoot>
  );
}
