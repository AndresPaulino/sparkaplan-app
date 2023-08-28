// next
import Head from 'next/head';
import { useEffect, useContext } from 'react';
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
// PDF
import { saveAs } from '@progress/kendo-file-saver';
import { LessonContext } from 'src/context/LessonContext';
import { pdf } from '@react-pdf/renderer';
import PDFDocument from '../../../sections/@dashboard/lesson/PDF/details/LessonPDF';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

LessonPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function LessonPage() {
  const { themeStretch } = useSettingsContext();
  const router = useRouter();
  const { id } = router.query;
  const { lesson, fetchLessonData } = useContext(LessonContext);

  useEffect(() => {
    console.log(id)
    if (id) {
      fetchLessonData(id);
    }
  }, [id]);

  const handleDownloadPDF = async () => {
    try {
      const blob = await pdf(<PDFDocument lessonPlan={lessonPlan} />).toBlob();
      saveAs(blob, 'lesson-plan.pdf');
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
  };

  return (
    <>
      <Head>
        <title> Sparkaplan - Lesson Plan </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
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
            <Button
              sx={{
                mr: 2,
              }}
            >
              Edit
            </Button>
            <Button variant="contained" onClick={handleDownloadPDF}>
              Download PDF
            </Button>
          </Box>
        </Box>

        <LessonPlan lesson={lesson} />
      </Container>
    </>
  );
}
