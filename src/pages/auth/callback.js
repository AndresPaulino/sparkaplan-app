import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../auth/useAuthContext';

function Callback() {
  const router = useRouter();
  const { auth0Client } = useAuthContext(); // Assuming you expose auth0Client from your AuthContext

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await auth0Client.handleRedirectCallback();
        const user = await auth0Client.getUser();

        if (user) {
          router.push('/dashboard/app/'); // Redirect to dashboard or any desired URL
        } else {
          router.push('/'); // Redirect to home or login
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        router.push('/'); // Redirect to home or login
      }
    };

    handleAuth();
  }, [auth0Client, router]);

  return <div>Loading...</div>;
}

export default Callback;
