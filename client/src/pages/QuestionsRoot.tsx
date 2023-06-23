import { Outlet, useSearchParams } from 'react-router-dom';
import LeftSidebar from '../components/sidebar/LeftSidebar';

function QuestionsLayout() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('access_token');
  if (token) {
    localStorage.setItem('token', `Bearer ${token}`);
    window.location.href = `${import.meta.env.VITE_URL}questions`;
  }
  return (
    <div className="flex justify-center">
      <LeftSidebar />
      <Outlet />
    </div>
  );
}

export default QuestionsLayout;
