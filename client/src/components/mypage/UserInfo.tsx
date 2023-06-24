/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable no-confusing-arrow */
import { useQuery } from '@tanstack/react-query';
import { MdCake } from 'react-icons/md';
import { BiPencil } from 'react-icons/bi';
import { useState } from 'react';
import { styled } from 'styled-components';
import { GetUser, instance } from '../../api/api';
import UserImg from './UserImg';

export default function UserInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInput, setUserInput] = useState('');
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    instance
      .patch('/users/edit', { userNickname: userInput })
      .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };
  const { isLoading, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: GetUser,
  });
  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  const StyledButton = styled.button<{ $primary: boolean | null }>`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    height: 35px;
    padding: 8px;
    border: 1px solid rgb(55, 159, 239);
    border-radius: 3px;
    font-size: 13px;
    box-shadow: ${(props) =>
      props.$primary ? 'inset 0 1px 0 0 white' : 'inset 0 1px 0 0 #87c1ff'};
    color: ${(props) => (props.$primary ? 'rgb(0, 99, 191)' : 'white')};
    background-color: ${(props) => (props.$primary ? '#e1ecf4' : '#0995FF')};

    &:hover {
      background-color: ${(props) => (props.$primary ? '#b3d3ea' : '#0074CC')};
    }
  `;
  return (
    <div className="flex flex-col items-center">
      <div className="flex mt-10 h-fit items-center">
        <span className="mr-3">
          <UserImg />
        </span>
        <div>
          <div className="flex items-center text-2xl mb-1">
            {isEditing ? (
              <form className="flex" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="userNickname"
                  defaultValue={data.userNickname}
                  className="border-b border-gray-300 w-[100px] mr-4"
                  onChange={handleInput}
                  autoFocus
                />
                <StyledButton $primary={false} type="submit">
                  Save
                </StyledButton>
                <StyledButton $primary type="button" onClick={handleEdit}>
                  Cancel
                </StyledButton>
              </form>
            ) : (
              <>
                {data.userNickname}
                <BiPencil
                  className="text-lg text-gray-600 ml-2 cursor-pointer"
                  onClick={handleEdit}
                />
              </>
            )}
          </div>
          <div className="flex text-gray-500 text-sm items-center">
            <MdCake className="mr-1" />
            Member for 90 days
          </div>
        </div>
      </div>
    </div>
  );
}
