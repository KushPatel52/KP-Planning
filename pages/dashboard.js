// pages/dashboard.js
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard, {user.email}!</h1>
      <button onClick={logout} className="mt-4">Logout</button>
    </div>
  );
};

export default DashboardPage;
