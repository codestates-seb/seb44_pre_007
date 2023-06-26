import tw from 'tailwind-styled-components';
import ErrorSign from '../../ui/ErrorSign';

const StyledDiv = tw.div`
flex text-[27px]
`;
const StyledWrapper = tw.div`
flex flex-col justify-center px-10
`;
const StyledP = tw.p`
text-[19px] mt-2
`;
export default function ErrorMessage() {
  return (
    <StyledDiv>
      <ErrorSign />
      <StyledWrapper>
        <h1>Page not found</h1>
        <StyledP>We&#39;re sorry, we couldn&#39;t find the page you requested.</StyledP>
      </StyledWrapper>
    </StyledDiv>
  );
}
