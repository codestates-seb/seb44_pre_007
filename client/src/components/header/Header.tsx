import tw from 'tailwind-styled-components';
import SearchBox from './SearchBox';
import NavBar from './NavBar';
import MainLogo from './MainLogo';

export default function Header() {
  const StyledHeader = tw.header`
  sticky flex justify-center items-center w-full border-b
  `;

  const StyledWrapper = tw.div`
  flex items-center w-full max-w-7xl h-full
  `;

  const StyledMenuBtn = tw.span`
  rounded-full hover:bg-gray-200 hover:text-gray-800 p-2 text-sm text-gray-500 translate-y-0.5 cursor-pointer
  `;

  return (
    <StyledHeader>
      <StyledWrapper>
        <MainLogo />
        <StyledMenuBtn>Products</StyledMenuBtn>
        <SearchBox />
        <NavBar />
      </StyledWrapper>
    </StyledHeader>
  );
}
