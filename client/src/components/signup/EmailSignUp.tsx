import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';

const StyledForm = tw.form`
flex flex-col rounded-md
`;
const StyledLabel = tw.label`
font-semibold mt-3
`;
const StyledInput = tw.input`
focus:shadow-input focus:border-sky-400 rounded border border-gray-400 w-[270px] h-[30px] bp1:w-[220px] px-2 py-4
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
  return (
    <StyledForm action="" method="post">
      <StyledLabel htmlFor="display-name">Display name</StyledLabel>
      <StyledInput id="display-name" type="text" name="userNickname" />
      <StyledLabel htmlFor="email">Email</StyledLabel>
      <StyledInput id="email" type="text" name="userEmail" />
      <StyledLabel htmlFor="password">Password</StyledLabel>
      <StyledInput id="password" type="text" name="userPassword" />
      <Button>Sign up</Button>
    </StyledForm>
  );
}
