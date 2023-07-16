// next
import Head from 'next/head';
import { useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// redux
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useRouter } from 'next/router';
import LessonForm from 'src/sections/@dashboard/lesson/LessonForm';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// sections
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

GenerateLesson.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GenerateLesson() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log('Detected id', id);
  }, []);

  return (
    <>
      <Head>
        <title> Sparkaplan - Generate Lesson Plan </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Generate Lesson Plan"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Generate Lesson Plan',
            },
          ]}
        />

        <LessonForm />
      </Container>
    </>
  );
}
