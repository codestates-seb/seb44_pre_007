import { Outlet, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import LeftSidebar from '../components/sidebar/LeftSidebar';

function Root() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (token) {
    localStorage.setItem('token', `Bearer ${token}`);
    window.location.href = `${import.meta.env.VITE_URL}questions`;
  }
  return (
    <>
      <Header handleDropdown={handleDropdown} />
      {showDropdown && (
        <div className="absolute z-50">
          <LeftSidebar />
        </div>
      )}
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
