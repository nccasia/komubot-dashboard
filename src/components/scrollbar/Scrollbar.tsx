import PropTypes from 'prop-types';
import { Box,styled, } from '@mui/material';

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

const StyledBox = styled(Box)(({ theme }) => ({
    overflow:'auto',
    '& ::-webkit-scrollbar': {
      height:'1px',
      width:'1px',
    },
}));
