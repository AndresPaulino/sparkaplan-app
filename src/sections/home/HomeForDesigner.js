import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Button, Paper } from '@mui/material';
// utils
import { filterStyles, textGradient, bgGradient } from '../../utils/cssStyles';
// routes
import { PATH_FIGMA_PREVIEW } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

const FEATURES = [
  {
    icon: ' /assets/icons/home/ic_make_brand.svg',
    title: 'Fast and Intuitive',
    description:
      'With our AI-driven design, creating a comprehensive lesson plan takes just a few clicks. Save your precious time for teaching, not typing.',
  },
  {
    icon: ' /assets/icons/home/ic_design.svg',
    title: 'Creative and Flexible',
    description:
      'Sparkaplan adapts to your unique teaching style. Add, remove, or reorder sections in your lesson plan to suit your needs.',
  },
  {
    icon: ' /assets/icons/home/ic_development.svg',
    title: 'User-friendly',
    description:
      'Sparkaplan is easy to use, with a clean interface and helpful prompts guiding you every step of the way. Planning your lesson has never been simpler.  ',
  },
];

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  '&:before': {
    height: 2,
    bottom: -1,
    zIndex: 11,
    content: '""',
    width: '100%',
    position: 'absolute',
    backgroundColor: theme.palette.grey[900],
  },
}));

const StyledWrap = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
}));

const StyledDescription = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  textAlign: 'center',
  position: 'absolute',
  paddingTop: theme.spacing(10),
  ...bgGradient({
    startColor: `${theme.palette.background.default} 25%`,
    endColor: alpha(theme.palette.background.default, 0),
  }),
  [theme.breakpoints.up('md')]: {
    background: 'unset',
    position: 'unset',
    textAlign: 'left',
    padding: theme.spacing(25, 0),
  },
}));

const StyledContent = styled(m.img)(({ theme }) => ({
  minHeight: 560,
  [theme.breakpoints.up('md')]: {
    top: 1,
    zIndex: 8,
    minHeight: 'auto',
    position: 'absolute',
    boxShadow: `-40px 80px 80px ${
      theme.palette.mode === 'light'
        ? alpha(theme.palette.grey[500], 0.4)
        : theme.palette.common.black
    }`,
  },
}));

// ----------------------------------------------------------------------

export default function HomeForDesigner() {
  return (
    <StyledRoot>
      <StyledWrap>
        <Container component={MotionViewport} sx={{ position: 'relative' }}>
          <Grid container>
            <Grid item md={6}>
              <Description />
            </Grid>

            <Grid item md={6}>
              <StyledContent src="/assets/images/services/service2.png" variants={varFade().in} />
            </Grid>
          </Grid>
        </Container>

        <TriangleShape />

        <TriangleShape anchor="bottom" />
      </StyledWrap>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const theme = useTheme();

  return (
    <StyledDescription>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Features
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: 5,
            ...textGradient(
              `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%`
            ),
          }}
        >
          For Teachers
        </Typography>
      </m.div>

      {/* Features Section */}
      <m.div variants={varFade().inUp}>
        <Grid container spacing={3}>
          {FEATURES.map((feature) => (
            <Grid key={feature.title} item xs={12} md={4}>
              <Cards feature={feature} />
            </Grid>
          ))}
        </Grid>
      </m.div>
    </StyledDescription>
  );
}

function Cards({ feature }) {
  const { icon, title, description } = feature;

  return (
    <Paper
      variant="outlined"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        textAlign: 'center',
        borderColor: (theme) => alpha(theme.palette.grey[500], 0.12),
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
      }}
    >
      <Typography variant="subtitle2" persistent>
        {title}
      </Typography>
    </Paper>
  );
}

// ----------------------------------------------------------------------

TriangleShape.propTypes = {
  anchor: PropTypes.oneOf(['top', 'bottom']),
};

function TriangleShape({ anchor = 'top', ...other }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        width: 1,
        position: 'absolute',
        color: 'background.default',
        zIndex: { xs: 0, md: 9 },
        height: { xs: 40, md: 64 },
        ...filterStyles(
          `drop-shadow(320px 20px 80px ${
            isLight ? alpha(theme.palette.grey[700], 0.4) : theme.palette.common.black
          })`
        ),
        ...(anchor === 'bottom' && {
          zIndex: 9,
          bottom: 0,
          top: 'unset',
          color: 'grey.900',
          transform: 'scale(-1)',
          ...filterStyles('none'),
        }),
      }}
      {...other}
    >
      <svg width="100%" height="100%" viewBox="0 0 1440 64" preserveAspectRatio="none">
        <path d="M1440 0H0L1440 64V0Z" fill="currentColor" />
      </svg>
    </Box>
  );
}
