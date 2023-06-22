import { useQuery } from '@tanstack/react-query';
import { MdCake } from 'react-icons/md';
import { GetUser } from '../../api/api';
import UserImg from '../header/UserImg';
import Btn from '../../ui/Btn';

export default function UserInfo() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
  });
  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;
  return (
    <div className="flex items-center justify-between w-3/4 h-fit">
      <div className="flex mt-10 h-fit items-center">
        <span className="mr-3">
          <UserImg size="128px" />
        </span>
        <div>
          <div className="text-2xl mb-1">{data.userNickname}</div>
          <div className="flex text-gray-500 text-sm items-center">
            <MdCake className="mr-1" />
            Member for 90 days
          </div>
        </div>
      </div>
      <a href="/users/edit">
        <Btn>Edit Profile</Btn>
      </a>
    </div>
  );
}
