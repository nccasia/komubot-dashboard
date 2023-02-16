import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import Iconify from '../../../components/iconify';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from 'react';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }:any) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

DailyListToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
};


export default function DailyListToolbar({ numSelected, filterName, onFilterName }:PropTypes.InferProps<typeof DailyListToolbar.propTypes>) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ]);
 
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
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
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    {/* <div className="my-date-range-wrapper">
      <DateRange
        onChange={(item:any) => setState([item.selection])}
        showDateDisplay={true}
        moveRangeOnFirstSelection={false}
        ranges={state}
        showPreview
        direction="vertical"
      
        
      
      />
    </div> */}
    </StyledRoot>
  );
}
