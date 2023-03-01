import PropTypes from "prop-types";
// @mui
import { alpha, styled } from "@mui/material/styles";

import {
  InputAdornment,
  OutlinedInput,
  Toolbar,
} from "@mui/material";
// component
import "rsuite/dist/rsuite.min.css";
import Iconify from "../../../components/iconify";

import { endOfDay, startOfDay } from "date-fns";
import React from "react";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
  
  // Add media query for screen width less than 490px
  [theme.breakpoints.down(490)]: {
    flexDirection: "column",
    height: "max-content",
    padding: "11px 0"
  }
}));
const StyledDateRangePicker = styled(DateRangePicker)(({ theme }) => ({
  // styles for larger screens
  '& span': {
    '& svg': {
      marginTop:10,
      fontSize:16,
    }
  },

  [theme.breakpoints.down(490)]: {
    // styles for smaller screens
      marginTop: "10px"
  }
}));
const StyledSearch = styled(OutlinedInput)(({ theme }: any) => ({
  width: 240,
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

// ----------------------------------------------------------------------

DailyListToolbar.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  setStartDay: PropTypes.func.isRequired,
  setEndDay: PropTypes.func.isRequired,
};

export default function DailyListToolbar({
  filterName,
  onFilterName,
  setPage,
  setStartDay,
  setEndDay,
}: PropTypes.InferProps<typeof DailyListToolbar.propTypes>) {
  async function handleSelect(
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>
  ) {
    if (value) {
      setStartDay(startOfDay(value?.[0]).getTime());
      setEndDay(endOfDay(value?.[1]).getTime());
      setPage(0);
    }
  }

  return (
    <StyledRoot>
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Search by name..."
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
        format="dd/MM/yyyy"
        onChange={handleSelect}
        showOneCalendar
        defaultValue={[startOfDay(new Date()), endOfDay(new Date())]}
    
      />
    </StyledRoot>
  );
}
