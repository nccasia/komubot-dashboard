import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Toolbar, Grid } from '@mui/material';
import { TextInputMenu, TextInputSearch,  } from "../../../components/input";

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  padding: 25,
}));

UserListToolbar.propTypes = {
  filterName: PropTypes.string.isRequired,
  onFilterName: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  setStatus: PropTypes.func.isRequired,
};

const roles = [
  {
    value: 'ALL',
    label: 'ALL',
  },
  {
    value: 'PM',
    label: 'PM',
  },
  {
    value: 'STAFF',
    label: 'STAFF',
  },
  {
    value: 'INTERN',
    label: 'INTERN',
  },
];

const statusList = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Enable',
    label: 'Enable',
  },
  {
    value: 'Disable',
    label: 'Disable',
  },
  {
    value: 'Deactive',
    label: 'Deactive',
  },
];

export default function UserListToolbar({ 
  filterName, 
  onFilterName,
  role,
  setRole,
  status,
  setStatus,
}:PropTypes.InferProps<typeof UserListToolbar.propTypes>) {
  
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
        <Grid item xs={12} sm={12} md={4}>
          <TextInputMenu
            filterDaily={role}
            setFilterDaily={setRole}
            list={roles}
            label="Roles"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextInputMenu
            filterDaily={status}
            setFilterDaily={setStatus}
            list={statusList}
            label="Status"
          />
        </Grid>
      </Grid>
    </StyledRoot>
  );
}
