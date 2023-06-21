import { Outlet, useSearchParams } from 'react-router-dom';
import Header from '../components/header/Header';
import LeftSidebar from '../components/sidebar/LeftSidebar';
import Footer from '../components/footer/Footer';

function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  if (token) {
    localStorage.setItem('token', token);
    window.location.href = 'http://localhost:5173/questions';
  }
  return (
    <>
      {/* Nav bar */}
      {/* Todo 로그인 상태에 따라 아래 다르게 렌더링 */} <Header />
      <div className="flex justify-center">
        <LeftSidebar />

        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Root;
