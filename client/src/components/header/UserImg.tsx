/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
import { useQuery } from '@tanstack/react-query';
import { FaUserCircle } from 'react-icons/fa';
import { BiError } from 'react-icons/bi';
import { GetUser } from '../../api/api';

export default function UserImg({ size }: { size: string }) {
  const { isLoading, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
  });

  if (isLoading)
    return (
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  if (error instanceof Error)
    return (
      <a href="/users/mypage">
        <BiError className="text-2xl text-gray-500" />
      </a>
    );
  return (
    <a href="/users/mypage">
      {data.imgURL ? (
        <img src={data.imgURL} alt="user" className={`w-[${size}] h-[${size}] rounded`} />
      ) : (
        <FaUserCircle className={`text-[${size}] text-main`} />
      )}
    </a>
  );
}
