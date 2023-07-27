import { m } from 'framer-motion';
// @mui
import { Box, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container component={MotionViewport} sx={{ mt: 10 }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          Easy to use dashboard for teachers to create, view, edit and share lesson plans.
        </Typography>
      </m.div>

      <Box
        sx={{
          my: 10,
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Image src="/assets/dashboard_screenshot.png" alt="dashboard_screenshot" />

        {/* <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          sx={{
            bottom: { xs: 24, md: 40 },
            width: 1,
            opacity: 0.48,
            position: 'absolute',
          }}
        >
          {['ibm', 'lya', 'spotify', 'netflix', 'hbo', 'amazon'].map((logo) => (
            <m.div key={logo} variants={varFade().in}>
              <Image
                alt={logo}
                src={`/assets/icons/brands/ic_brand_${logo}.svg`}
                sx={{
                  m: { xs: 1.5, md: 2.5 },
                  height: { xs: 24, md: 40 },
                }}
              />
            </m.div>
          ))}
        </Stack> */}
      </Box>

      {/* <m.div variants={varFade().inUp}>
        <Typography variant="h3" sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          Easy to use dashboard for teachers to create, view, edit and share lesson plans.
        </Typography>
      </m.div> */}
    </Container>
  );
}
