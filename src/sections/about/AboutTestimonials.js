import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box, Grid, Link, Paper, Rating, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { bgBlur, bgGradient } from '../../utils/cssStyles';
import { fDate } from '../../utils/formatTime';
// components
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const TESTIMONIALS = [
  {
    name: 'Laura Anderson',
    rating: 5,
    dateCreate: new Date('2023-10-03'),
    content: `Using Sparkaplan was a game-changer for me. The AI-generated lesson plans are a lifesaver for my 2nd grade class. I can focus more on teaching and less on planning.`,
  },
  {
    name: 'Robert Hernandez',
    rating: 5,
    dateCreate: new Date('2023-10-07'),
    content: `As a high school math teacher, lesson planning was always a challenge. But now, with just a title and objective, I get a well-structured plan in seconds. Thank you!`,
  },
  {
    name: 'Monica Sawyer',
    rating: 5,
    dateCreate: new Date('2023-10-10'),
    content: `Sparkaplan's AI is genuinely impressive. I was skeptical at first, but after my first few lesson plans, I was sold. It understands the needs of my 5th graders perfectly.`,
  },
  {
    name: 'Derrick White',
    rating: 5,
    dateCreate: new Date('2023-10-12'),
    content: `The ease of use is phenomenal. With a quick input, I get a full lesson plan, saving me hours every week. I can't thank you enough.`,
  },
  {
    name: 'Samantha Greer',
    rating: 5,
    dateCreate: new Date('2023-10-01'),
    content: `My fellow teachers couldn't believe how detailed and tailored the AI-generated plans were. A must-have for any educator, especially during these challenging times.`,
  },
  {
    name: 'Brian Fletcher',
    rating: 5,
    dateCreate: new Date('2023-10-05'),
    content: `Teaching middle school science requires a lot of meticulous planning. With Sparkaplan, I can generate lessons that are both informative and engaging. Truly a blessing.`,
  },
];


const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/images/about/testimonials.jpg',
  }),
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    height: 840,
    textAlign: 'left',
    overflow: 'hidden',
  },
}));

// ----------------------------------------------------------------------

export default function AboutTestimonials() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <StyledRoot>
      <Container component={MotionViewport} sx={{ position: 'relative', height: 1 }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ height: 1 }}
        >
          <Grid item xs={10} md={4}>
            <Box sx={{ maxWidth: { md: 360 } }}>
              <m.div variants={varFade().inUp}>
                <Typography
                  component="p"
                  variant="overline"
                  sx={{ mb: 2, color: 'text.secondary' }}
                >
                  Testimonials
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography variant="h2" sx={{ mb: 3, color: 'common.white' }}>
                  Why teachers love spark
                  <span
                    style={{
                      color: '#FFC107',
                    }}
                  >
                    a
                  </span>
                  plan
                </Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography sx={{ color: 'common.white' }}>
                  Our aim is to streamline your lesson planning process, making it not just faster,
                  but also easier to use. Your feedback
                  as educators is invaluable to us and we sincerely value your insights to make this application better!
                </Typography>
              </m.div>

              {/* {!isDesktop && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                  <m.div variants={varFade().inUp}>
                    <TestimonialLink />
                  </m.div>
                </Box>
              )} */}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            sx={{
              right: { md: 24 },
              position: { md: 'absolute' },
            }}
          >
            <Grid container spacing={isDesktop ? 3 : 0} alignItems="center">
              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(0, 3).map((testimonial) => (
                  <m.div key={testimonial.name} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </m.div>
                ))}
              </Grid>

              <Grid item xs={12} md={6}>
                {TESTIMONIALS.slice(3, 6).map((testimonial) => (
                  <m.div key={testimonial.name} variants={varFade().inUp}>
                    <TestimonialCard testimonial={testimonial} />
                  </m.div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* {isDesktop && (
          <Box sx={{ bottom: 60, position: 'absolute' }}>
            <m.div variants={varFade().inLeft}>
              <TestimonialLink />
            </m.div>
          </Box>
        )} */}
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    content: PropTypes.string,
    dateCreate: PropTypes.instanceOf(Date),
  }),
};

function TestimonialCard({ testimonial }) {
  const theme = useTheme();

  const { name, rating, dateCreate, content } = testimonial;

  return (
    <Paper
      sx={{
        mt: 3,
        p: 3,
        color: 'common.white',
        ...bgBlur({
          color: theme.palette.common.white,
          opacity: 0.04,
        }),
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {name}
      </Typography>

      <Typography gutterBottom component="div" variant="caption" sx={{ color: 'grey.500' }}>
        {fDate(dateCreate)}
      </Typography>

      <Rating value={rating} readOnly size="small" />

      <Typography variant="body2" sx={{ mt: 1.5 }}>
        {content}
      </Typography>
    </Paper>
  );
}

// ----------------------------------------------------------------------

function TestimonialLink() {
  return (
    <Link href="#" variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
      Read more testimonials
      <Iconify icon="ic:round-arrow-right-alt" sx={{ ml: 1 }} />
    </Link>
  );
}
