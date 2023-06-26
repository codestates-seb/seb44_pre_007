import tw from 'tailwind-styled-components';
import ErrorMessage from '../components/error/ErrorMessage';
import Header from '../components/header/Header';

const StyledMain = tw.main`
flex flex-col justify-center items-center bg-users000 h-full
`;
const StyledWrapper = tw.div`
flex bp2:flex-col items-center
`;

export default function ErrorPage() {
  return (
    <>
      <Header />
      <StyledMain>
        <StyledWrapper>
          <ErrorMessage />
        </StyledWrapper>
      </StyledMain>
    </>
  );
}
