import PropTypes from "prop-types";
// @mui
import { alpha, styled } from "@mui/material/styles";

import {
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Typography
} from "@mui/material";
// component
import "rsuite/dist/rsuite.min.css";
import Iconify from "../../../components/iconify";

import { endOfDay, startOfDay } from "date-fns";
import React from "react";
import { DateRangePicker } from "rsuite";
import { DateRange } from "rsuite/esm/DateRangePicker/types";
import { filterDailys } from "../../../Api/Dailys/dailysApi";
// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
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
  numSelected: PropTypes.number.isRequired,
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
  setDailys: PropTypes.func.isRequired,
};

export default function DailyListToolbar({
  numSelected,
  filterName,
  onFilterName,
  setDailys,
}: PropTypes.InferProps<typeof DailyListToolbar.propTypes>) {
  async function handleSelect(
    value: DateRange | null,
    event: React.SyntheticEvent<Element, Event>
  ) {
    if (value) {
      const startDay = startOfDay(value?.[0]).getTime();
      const endDay = endOfDay(value?.[1]).getTime();
      const dailysData = await filterDailys(startDay, endDay);
      setDailys(dailysData);
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
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Search Daily..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: "text.disabled", width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      <DateRangePicker
        format="dd/MM/yyyy"
        onChange={handleSelect}
        showOneCalendar
      />
    </StyledRoot>
  );
}
