import { Outlet, useSearchParams } from 'react-router-dom';
import Header from '../components/header/Header';
import LeftSidebar from '../components/sidebar/LeftSidebar';
import Footer from '../components/footer/Footer';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import Home from './Home';

function Root() {
  const isLoggedIn = useIsLoggedIn();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  if (token) {
    localStorage.setItem('token', `Bearer ${token}`);
    window.location.href = `${import.meta.env.VITE_URL}questions`;
  }
  return (
    <>
      {/* Todo 로그인 상태에 따라 아래 다르게 렌더링 */} <Header />
      <div className="flex justify-center">
        {!isLoggedIn && <Home />}
        {isLoggedIn && (
          <>
            <LeftSidebar />
            <Outlet />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Root;
