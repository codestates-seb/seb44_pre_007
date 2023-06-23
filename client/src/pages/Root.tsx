import { Outlet, useSearchParams } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

function Root() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token');

  if (token) {
    localStorage.setItem('token', `Bearer ${token}`);
    window.location.href = `${import.meta.env.VITE_URL}questions`;
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
