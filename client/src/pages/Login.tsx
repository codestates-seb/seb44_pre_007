import tw from 'tailwind-styled-components';
import LoginForm from '../components/login/LoginForm';

const StyledMain = tw.main`
flex flex-col justify-center items-center bg-users000 h-full
`;
const StyledLoginWrapper = tw.div`
flex bp2:flex-col items-center
`;

export default function Login() {
  return (
    <StyledMain>
      <StyledLoginWrapper>
        <LoginForm />
      </StyledLoginWrapper>
    </StyledMain>
  );
}
