import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import LeftSidebar from '../components/sidebar/LeftSidebar';
import Footer from '../components/footer/Footer';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import Home from './Home';

function Root() {
  const isLoggedIn = useIsLoggedIn();
  return (
    <>
      <Header />

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
