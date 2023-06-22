import { useQuery } from '@tanstack/react-query';
import LeftSidebar from '../components/sidebar/LeftSidebar';
import { GetUser } from '../api/api';

export default function Mypage() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
  });
  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;
  return (
    <div className="flex">
      <LeftSidebar />
      <div className="mt-10">
        <div className="text-2xl">{data.userNickname}</div>
        <a href="/users/edit">edit profile</a>
      </div>
    </div>
  );
}
