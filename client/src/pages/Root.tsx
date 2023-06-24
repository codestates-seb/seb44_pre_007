import { Outlet, useSearchParams, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

function Root() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  const currentToken = useLoaderData();
  if (token) {
    localStorage.setItem('token', `Bearer ${token}`);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 30);
    localStorage.setItem('expiration', expiration.toISOString());
    window.location.href = `${import.meta.env.VITE_URL}questions`;
  }
  useEffect(() => {
    if (currentToken === 'EXPIRED') {
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      window.location.reload();
    }
  }, [currentToken]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
