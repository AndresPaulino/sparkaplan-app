// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { Box, Grid, Link, Stack, Divider, Container, Typography, IconButton } from '@mui/material';
// routes
import { PATH_PAGE } from '../../routes/paths';
// _mock
import { _socials } from '../../_mock/arrays';
// components
import Logo from '../../components/logo/Logo';
import SmallLogo from '../../components/logo/SmallLogo';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: 'Sparkaplan',
    children: [
      { name: 'Contact us', href: PATH_PAGE.contact },
      // { name: 'FAQs', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      // { name: 'Terms and Condition', href: '#' },
      { name: 'Privacy Policy', href: '/policy' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'admin@sparkaplan.com', href: 'mailto:admin@sparkaplan.com' }
      // { name: 'Los Angeles, 359  Hidden Valley Road', href: '#' },
    ],
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container>
        <SmallLogo sx={{ mb: 1, mx: 'auto', width: '50px' }} />

        <Typography variant="caption" component="div">
          Sparkaplan
        </Typography>
        <Typography variant="caption" component="div">
          © All rights reserved 2023
        </Typography>
      </Container>
    </Box>
  );

  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' } }} />
          </Grid>

          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              The starting point for your next lesson plan with Sparkaplan, using the latest AI technology to make your life easier.
            </Typography>

            <Stack
              spacing={1}
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 5,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton key={social.name}>
                  <Iconify icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              justifyContent="space-between"
              direction={{ xs: 'column', md: 'row' }}
            >
              {LINKS.map((list) => (
                <Stack
                  key={list.headline}
                  spacing={2}
                  alignItems={{ xs: 'center', md: 'flex-start' }}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={NextLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          variant="caption"
          component="div"
          sx={{
            mt: 10,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Sparkaplan
        </Typography>
        <Typography
          variant="caption"
          component="div"
          sx={{
            pb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © 2021. All rights reserved
        </Typography>
      </Container>
    </Box>
  );

  return isHome ? simpleFooter : mainFooter;
}
