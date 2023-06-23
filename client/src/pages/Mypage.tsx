import LeftSidebar from '../components/sidebar/LeftSidebar';
import UserInfo from '../components/mypage/UserInfo';

export default function Mypage() {
  return (
    <div className="flex">
      <LeftSidebar />
      <UserInfo />
    </div>
  );
}
