import tw from 'tailwind-styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import NavBar from './NavBar';
import MainLogo from './MainLogo';
import LeftSidebar from '../sidebar/LeftSidebar';

const StyledHeader = tw.header`
sticky flex justify-center items-center w-full border-b z-50 bg-white
`;
const StyledWrapper = tw.div`
flex items-center w-full max-w-7xl h-full
`;
const StyledMenuBtn = tw.span`
rounded-full hover:bg-gray-200 hover:text-gray-800 p-2 text-sm text-gray-500 translate-y-0.5 cursor-pointer
`;

export default function Header() {
  const location = useLocation();

  const { pathname } = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    setShowDropdown(false);
  }, [location]);
  return (
    <div className="flex flex-col">
      <div className="bg-main h-[3px]" />
      <StyledHeader>
        <div className="relative">
          {showDropdown && (
            <div className="absolute left-0 top-[55px]">
              <LeftSidebar />
            </div>
          )}
          {pathname === '/' && (
            <GiHamburgerMenu onClick={handleDropdown} className="cursor-pointer mx-3" />
          )}
        </div>
        <StyledWrapper>
          <MainLogo />
          <StyledMenuBtn>Products</StyledMenuBtn>
          <SearchBox />
          <NavBar />
        </StyledWrapper>
      </StyledHeader>
    </div>
  );
}
