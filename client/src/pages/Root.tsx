import { Outlet } from 'react-router-dom';
import LeftSidebar from '../components/sidebar/LeftSidebar';

function Root() {
  return (
    <>
      {/* Nav bar */}
      {/* Todo 로그인 상태에 따라 아래 다르게 렌더링 */}
      <div className="flex">
        <LeftSidebar />
        <Outlet />
      </div>
    </>
  );
}

export default Root;
