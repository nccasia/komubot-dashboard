import PropTypes from 'prop-types';
import { styled, } from '@mui/material';

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
};

function Scrollbar({ children}:PropTypes.InferProps<typeof Scrollbar.propTypes>) {
  

  return (
      <StyledBox>
        {children}
      </StyledBox>
  );
}

export default (Scrollbar);

const StyledBox = styled('div')(({ theme }) => ({
    overflow:'auto',
    '&::-webkit-scrollbar': {
      height:'2px',
      width:'2px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#919eab',
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
}));
