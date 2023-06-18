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
      <StyledFormContainer>
        <EmailSignUp />
        <Policy />
      </StyledFormContainer>
      <AddtionalInfo />
    </StyledWrapper>
  );
}
