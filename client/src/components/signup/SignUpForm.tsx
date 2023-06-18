import tw from 'tailwind-styled-components';
import EmailSignUp from './EmailSignUp';
import Policy from './Policy';
import AddtionalInfo from './AdditionalInfo';

const StyledWrapper = tw.div`
flex flex-col items-center
`;
const StyledFormContainer = tw.div`
bg-white rounded-md shadow-md py-10 px-6 flex flex-col justify-center items-center
`;

export default function SignUpForm() {
  return (
    <StyledWrapper>
      <script src="https://accounts.google.com/gsi/client" async defer />
      <div
        id="g_id_onload"
        data-client_id="YOUR_GOOGLE_CLIENT_ID"
        data-login_uri="https://your.domain/your_login_endpoint"
        data-auto_prompt="false"
      />
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      />
      <StyledFormContainer>
        <EmailSignUp />
        <Policy />
      </StyledFormContainer>
      <AddtionalInfo />
    </StyledWrapper>
  );
}
