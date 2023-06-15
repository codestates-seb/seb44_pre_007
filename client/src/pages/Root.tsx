import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';

function Root() {
  return (
    <>
      {/* Nav bar */}
      {/* Todo 로그인 상태에 따라 아래 다르게 렌더링 */}
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
}

export default Root;
