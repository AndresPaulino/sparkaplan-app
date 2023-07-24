// next
import Head from 'next/head';
import { useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// redux
// utils
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import { useRouter } from 'next/router';
import LessonPlanList from 'src/sections/@dashboard/lesson/LessonPlanList';
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
      <LessonPlanList />
    </>
  );
}
