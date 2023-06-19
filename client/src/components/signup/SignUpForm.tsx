import tw from 'tailwind-styled-components';
import { GoogleOAuthProvider } from '@react-oauth/google';
import EmailSignUp from './EmailSignUp';
import Policy from './Policy';
import AddtionalInfo from './AdditionalInfo';
import GoogleLoginButton from './GoogleLoginButton';

const StyledOAuthDiv = tw.div`
mb-4 w-full
`;
const StyledWrapper = tw.div`
flex flex-col items-center
`;
const StyledFormContainer = tw.div`
bg-white rounded-md shadow-md py-10 px-6 flex flex-col justify-center items-center
`;
const clientId = import.meta.env.VITE_CLIENT_ID;

export default function SignUpForm() {
  return (
    <StyledWrapper>
      <StyledOAuthDiv>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </StyledOAuthDiv>
      <StyledFormContainer>
        <EmailSignUp />
        <Policy />
      </StyledFormContainer>
      <AddtionalInfo />
    </StyledWrapper>
  );
}
