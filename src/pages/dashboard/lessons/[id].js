// next
import Head from 'next/head';
import { useEffect } from 'react';
// @mui
import { Container, Box, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useRouter } from 'next/router';
import LessonPlan from 'src/sections/@dashboard/lesson/LessonPlan';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

LessonPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LessonPage() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log('Detected id', id);
  }, []);

  return (
    <>
      <Head>
        <title> Lesson Plan </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <CustomBreadcrumbs
          heading="Lesson Plan"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'My Lesson Plans',
              href: PATH_DASHBOARD.myLessonPlans,
            },
            {
              name: 'Lesson',
            },
          ]}
          />
          <Box>
            <Button sx={{
              mr: 2,
            }}>
              Edit
            </Button>
            <Button variant='contained'>
              Download PDF
            </Button>
          </Box>
        </Box>
        

        <LessonPlan id={id} />
      </Container>
    </>
  );
}
