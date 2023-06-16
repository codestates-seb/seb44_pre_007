import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';

function Root() {
  return (
    <>
      {/* Nav bar */}
      {/* Todo 로그인 상태에 따라 아래 다르게 렌더링 */}
      <Header />
      <div className="flex justify-center">
        <Sidebar>
          <Outlet />
        </Sidebar>
      </div>
    </>
  );
}

export default Root;
