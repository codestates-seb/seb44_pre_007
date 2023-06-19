import tw from 'tailwind-styled-components';
import { TbExternalLink } from 'react-icons/Tb';
import { StyledA } from './Policy';

const StyledDiv = tw.div`
flex flex-col items-center mt-10
`;
const StyledP = tw.p`
text-[13px] my-1
`;

export default function AddtionalInfo() {
  return (
    <StyledDiv>
      <StyledP>
        Already have an account? <StyledA href="/users/login">Log in</StyledA>
      </StyledP>
      <StyledP>
        Are you an employer?{' '}
        <StyledA href="https://talent.stackoverflow.com/users/login">
          Sign up on Talent <TbExternalLink className="inline" />
        </StyledA>
      </StyledP>
    </StyledDiv>
  );
}
