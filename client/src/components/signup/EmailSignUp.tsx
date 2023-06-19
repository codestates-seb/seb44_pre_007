import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UserInfo } from '../../types/types';

const StyledForm = tw.form`
flex flex-col rounded-md
`;
const StyledLabel = tw.label`
font-semibold mt-3 bp1:text-sm
`;
const StyledInput = tw.input<{ $error: string | null }>`
focus:shadow-input focus:border-sky-400 rounded border border-gray-400 w-[270px] h-[30px] bp1:w-[220px] px-2 py-4 text-sm font-light mt-1
${(props) => (props.$error ? 'border-red-500 focus:border-red-500 focus:shadow-error' : '')}
`;
const StyledError = tw.p`
text-red-500 text-[13px] w-[270px] bp1:w-[220px] mt-1
`;
const Button = styled.button`
  height: 40px;
  padding: 9.6px;
  border: 1px solid rgb(55, 159, 239);
  border-radius: 3px;
  font-size: 12px;
  font-weight: 400;
  background-color: #0995ff;
  color: white;
  margin-top: 2rem;
  box-shadow: inset 0 1px 0 0 #87c1ff;

  &:hover {
    background-color: #0074cc;
  }
`;

export default function EmailSignUp() {
  const [userNickname, setUserNickname] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPassword, setUserPassword] = useState<string | null>(null);

  const [userNicknameError, setUserNicknameError] = useState<string | null>(null);
  const [userEmailError, setUserEmailError] = useState<string | null>(null);
  const [userPasswordError, setUserPasswordError] = useState<string | null>(null);

  const handleuserNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNickname(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };
  const handleuserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };

  function checkuserNickname() {
    if (!userNickname) {
      setUserNicknameError('Display name cannot be empty.');
      return false;
    }
    setUserNicknameError(null);
    return true;
  }

  function checkEmail() {
    const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!userEmail) {
      setUserEmailError('Email cannot be empty.');
      return false;
    }
    if (!emailRegexp.test(userEmail)) {
      setUserEmailError(`${userEmail} is not a valid userEmail address.`);
      return false;
    }
    setUserEmailError(null);
    return true;
  }

  function checkuserPassword() {
    const userPasswordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,}$/;

    if (!userPassword) {
      setUserPasswordError('Password cannot be empty.');
      return false;
    }
    if (!userPasswordRegexp.test(userPassword)) {
      setUserPasswordError(
        'Passwords must contain at least eight characters, including at least 1 letter and 1 number.'
      );
      return false;
    }
    setUserPasswordError(null);
    return true;
  }

  function validate() {
    return checkuserNickname() && checkEmail() && checkuserPassword();
  }
  const mutation = useMutation({
    mutationFn: (newUser: UserInfo) => axios.post(import.meta.env.VITE_URL, newUser),
  });

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      mutation.mutate({ userNickname, userEmail, userPassword });
    }
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledLabel htmlFor="display-name">Display name</StyledLabel>
      <StyledInput
        $error={userNicknameError}
        type="text"
        id="display-name"
        onChange={handleuserNickname}
      />
      {userNicknameError && <StyledError>{userNicknameError}</StyledError>}
      <StyledLabel htmlFor="email">Email</StyledLabel>
      <StyledInput $error={userEmailError} type="text" id="email" onChange={handleEmail} />
      {userEmailError && <StyledError>{userEmailError}</StyledError>}
      <StyledLabel htmlFor="password">Password</StyledLabel>
      <StyledInput
        $error={userPasswordError}
        type="password"
        id="password"
        onChange={handleuserPassword}
      />
      {userPasswordError && <StyledError>{userPasswordError}</StyledError>}
      <Button type="submit">Sign up</Button>
    </StyledForm>
  );
}
