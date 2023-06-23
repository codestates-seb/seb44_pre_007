import tw from 'tailwind-styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import SearchBox from './SearchBox';
import NavBar from './NavBar';
import MainLogo from './MainLogo';

const StyledHeader = tw.header`
sticky flex justify-center items-center w-full border-b z-50 bg-white
`;
const StyledWrapper = tw.div`
flex items-center w-full max-w-7xl h-full
`;
const StyledMenuBtn = tw.span`
rounded-full hover:bg-gray-200 hover:text-gray-800 p-2 text-sm text-gray-500 translate-y-0.5 cursor-pointer
`;

export default function Header({ handleDropdown }: { handleDropdown: () => void }) {
  const { pathname } = useLocation();
  return (
    <StyledHeader>
      {pathname === '/' && <GiHamburgerMenu onClick={handleDropdown} className="cursor-pointer" />}
      <StyledWrapper>
        <MainLogo />
        <StyledMenuBtn>Products</StyledMenuBtn>
        <SearchBox />
        <NavBar />
      </StyledWrapper>
    </StyledHeader>
  );
}
