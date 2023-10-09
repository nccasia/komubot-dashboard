import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Toolbar } from '@mui/material';
import { TextInputMenu, TextInputSearch,  } from "../../../components/input";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  padding: 25,
}));

const typeList = [
    {
      value: 'All',
      label: 'All',
    },
    {
      value: 'Category',
      label: 'Category',
    },
    {
      value: 'Channel',
      label: 'Channel',
    },
    {
      value: 'Thread',
      label: 'Thread',
    },
];

ToolHeader.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
};


export default function ToolHeader({ 
  filterName, 
  onFilterName,
  type,
  setType
}:PropTypes.InferProps<typeof ToolHeader.propTypes>) {
  
  return (
    <StyledRoot> 
      <Grid container spacing={3} >
        <Grid item xs={12} sm={12} md={4}>
          <TextInputSearch
            filterName={filterName}
            onFilterName={onFilterName}
            placeholder="Search by email..."
          />
        </Grid>
        <Grid item md={4} display={{ xs: "none", sm: "none", md: "block" }}></Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextInputMenu
            filterDaily={type}
            setFilterDaily={setType}
            list={typeList}
            label="Type"
          />
        </Grid>
      </Grid>
    </StyledRoot>
  );
}
