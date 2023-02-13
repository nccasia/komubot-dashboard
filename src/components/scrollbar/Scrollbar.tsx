import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Box } from '@mui/material';
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  sx: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

function Scrollbar({ children, sx, ...other }:PropTypes.InferProps<typeof Scrollbar.propTypes>) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|IPad Air|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }
  

  return (
    <StyledRootScrollbar>
      <StyledScrollbar  clickOnTrack={false} sx={sx} {...other}>
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
}

export default memo(Scrollbar);
