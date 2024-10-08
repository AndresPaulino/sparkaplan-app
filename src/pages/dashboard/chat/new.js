// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// sections
import { Chat } from '../../../sections/@dashboard/chat';

// ----------------------------------------------------------------------

ChatPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Head>
        <title> Chat | Sparkaplan</title>
      </Head>

      <Chat />
    </>
  );
}
