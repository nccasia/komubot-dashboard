import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Grid, Toolbar } from "@mui/material";
import { endOfDay, startOfDay } from "date-fns";
import React from "react";
import { TextDatePicker, TextInputMenu, TextInputSearch,  } from "../../../components/input";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  padding: 25,
}));

DailyListToolbar.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
  setDayTime: PropTypes.func.isRequired,
  setFilter:PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const listFilterDaily = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Early',
    label: 'Early Daily, before 7:30 AM',
  },
  {
    value: 'Late',
    label: 'Late Daily, before 5:00 PM',
  },
  {
    value: 'Not',
    label: 'Not Daily',
  },
];

export default function DailyListToolbar({
  filterName,
  onFilterName,
  setDayTime,
  filter,
  setFilter,
  placeholder,
  label
}: PropTypes.InferProps<typeof DailyListToolbar.propTypes>) {
  async function handleSelect(
    value: Date | null,
    event: React.SyntheticEvent<Element, Event>
  ) {
    if (value) {
      const startDay = startOfDay(value).getTime();
      const endDay = endOfDay(value).getTime();
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
            placeholder={placeholder}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextInputMenu
            filterDaily={filter}
            setFilterDaily={setFilter}
            list={listFilterDaily}
            label={label}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextDatePicker
            handleSelect={handleSelect}
          />
        </Grid>
      </Grid>
    </StyledRoot>
  );
}
