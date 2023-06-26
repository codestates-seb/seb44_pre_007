import tw from 'tailwind-styled-components';
import ErrorMessage from '../components/error/ErrorMessage';

const StyledMain = tw.main`
flex flex-col justify-center items-center bg-users000 h-full
`;
const StyledWrapper = tw.div`
flex bp2:flex-col items-center
`;

export default function ErrorPage() {
  return (
    <StyledMain>
      <StyledWrapper>
        <ErrorMessage />
      </StyledWrapper>
    </StyledMain>
  );
}
