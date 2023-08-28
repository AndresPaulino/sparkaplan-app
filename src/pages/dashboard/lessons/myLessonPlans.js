// next
import Head from 'next/head';
import { useEffect } from 'react';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import LessonPlanList from 'src/sections/@dashboard/lesson/LessonPlanList';
import { useSettingsContext } from '../../../components/settings';
// sections
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

GenerateLesson.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GenerateLesson() {

  return (
    <>
      <LessonPlanList />
    </>
  );
}
