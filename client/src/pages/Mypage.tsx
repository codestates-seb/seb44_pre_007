import LeftSidebar from '../components/sidebar/LeftSidebar';
import UserInfo from '../components/mypage/UserInfo';

export default function Mypage() {
  return (
    <div className="flex h-fit py-4 px-9">
      <LeftSidebar />
      <UserInfo />
    </div>
  );
}
