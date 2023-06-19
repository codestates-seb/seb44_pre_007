import tw from 'tailwind-styled-components';
import Commuity from '../components/signup/Community';
import SignUpForm from '../components/signup/SignUpForm';

const StyledMain = tw.main`
flex flex-col justify-center items-center bg-users000 h-full
`;
const StyledSignUpWrapper = tw.div`
flex bp2:flex-col items-center
`;

export default function SignUp() {
  return (
    <StyledMain>
      <StyledSignUpWrapper>
        <Commuity />
        <SignUpForm />
      </StyledSignUpWrapper>
    </StyledMain>
  );
}
