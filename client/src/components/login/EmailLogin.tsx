/* eslint-disable no-console */
import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

export default function EmailLogin() {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleuserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  function checkEmail() {
    const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!username) {
      setUsernameError('Email cannot be empty.');
      return false;
    }
    if (!emailRegexp.test(username)) {
      setUsernameError('The email is not a valid email address.');
      return false;
    }
    setUsernameError(null);
    return true;
  }

  function checkuserPassword() {
    if (!password) {
      setPasswordError('Password cannot be empty.');
      return false;
    }
    setPasswordError(null);
    return true;
  }

  function validate() {
    return checkEmail() && checkuserPassword();
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}login`,
          { username, password },
          {
            headers: { 'Content-Type': 'Application/json' },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            const token = res.headers.authorization;
            if (token) {
              localStorage.setItem('token', token);
            }
            navigate('/questions');
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            setLoginError('No user found with matching data.');
            console.error('error: Authentication failed.');
          } else {
            console.error('error:', error);
          }
        });
    }
  };
  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledLabel htmlFor="email">Email</StyledLabel>
      <StyledInput $error={usernameError} type="text" id="email" onChange={handleEmail} />
      {usernameError && <StyledError>{usernameError}</StyledError>}
      <StyledLabel htmlFor="password">Password</StyledLabel>
      <StyledInput
        $error={passwordError}
        type="password"
        id="password"
        onChange={handleuserPassword}
      />
      {passwordError && <StyledError>{passwordError}</StyledError>}
      <Button type="submit">Log in</Button>
      {loginError && <StyledError>{loginError}</StyledError>}
    </StyledForm>
  );
}
