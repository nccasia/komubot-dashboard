import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Grid, Toolbar } from "@mui/material";
import { endOfDay, startOfDay } from "date-fns";
import React from "react";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { TextDateRange, TextInputSearch,  } from "../../components/input";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  padding: 25,
}));

TableTool.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
  setDayTime: PropTypes.func.isRequired,
  searchText:PropTypes.string.isRequired,
};

export default function TableTool({
  filterName,
  onFilterName,
  setDayTime,
  searchText,
}: PropTypes.InferProps<typeof TableTool.propTypes>) {
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
    <StyledRoot>   
      <Grid container spacing={3} >
        <Grid item xs={12} sm={12} md={4}>
          <TextInputSearch
            filterName={filterName}
            onFilterName={onFilterName}
            placeholder={searchText}
          />
        </Grid>
        <Grid item md={4} display={{ xs: "none", sm: "none", md: "block" }}></Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextDateRange 
            handleSelect={handleSelect}
          />
        </Grid>
      </Grid>
    </StyledRoot>
  );
}