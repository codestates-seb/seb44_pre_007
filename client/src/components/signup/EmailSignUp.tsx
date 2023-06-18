import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';
import { useState } from 'react';

const StyledForm = tw.form`
flex flex-col rounded-md
`;
const StyledLabel = tw.label`
font-semibold mt-3
`;
const StyledInput = tw.input<{ $error: string | null }>`
focus:shadow-input focus:border-sky-400 rounded border border-gray-400 w-[270px] h-[30px] bp1:w-[220px] px-2 py-4 text-sm font-light
${(props) => (props.$error ? 'border-red-500' : '')}
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
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  function checkUsername() {
    if (!username) {
      setUsernameError('Display name cannot be empty.');
      return false;
    }
    setUsernameError(null);
    return true;
  }

  function checkEmail() {
    const emailRegexp = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!email) {
      setEmailError('Email cannot be empty');
      return false;
    }
    if (!emailRegexp.test(email)) {
      setEmailError(`${email} is not a valid email address.`);
      return false;
    }
    setEmailError(null);
    return true;
  }

  function checkPassword() {
    const passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,}$/;

    if (!password) {
      setPasswordError('Password cannot be empty.');
      return false;
    }
    if (!passwordRegexp.test(password)) {
      setPasswordError(
        'Passwords must contain at least eight characters, including at least 1 letter and 1 number.'
      );
      return false;
    }
    setPasswordError(null);
    return true;
  }

  function validate() {
    return checkUsername() && checkEmail() && checkPassword();
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validate();
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <StyledLabel htmlFor="display-name">Display name</StyledLabel>
      <StyledInput $error={usernameError} type="text" onChange={handleUserName} />
      {usernameError && <StyledError>{usernameError}</StyledError>}
      <StyledLabel htmlFor="email">Email</StyledLabel>
      <StyledInput $error={emailError} type="text" onChange={handleEmail} />
      {emailError && <StyledError>{emailError}</StyledError>}
      <StyledLabel htmlFor="password">Password</StyledLabel>
      <StyledInput $error={passwordError} type="password" onChange={handlePassword} />
      {passwordError && <StyledError>{passwordError}</StyledError>}
      <Button type="submit">Sign up</Button>
    </StyledForm>
  );
}
