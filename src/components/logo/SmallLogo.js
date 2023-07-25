import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const SmallLogo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const smallLogo = (
    <Box component="img" src="/logo/small_logo.png" sx={{ width: '100px', cursor: 'pointer', ...sx }} />
  );

  if (disabledLink) {
    return smallLogo;
  }

  return (
    <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
      {smallLogo}
    </Link>
  );
});

SmallLogo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default SmallLogo;
