import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';
import { useState } from 'react';
import UserImg from './UserImg';

import Inbox from '../../public/Icons/Inbox';
import Achievement from '../../public/Icons/Achievement';
import Help from '../../public/Icons/Help';
import Switcher from '../../public/Icons/Switcher';
import { IconStyle } from '../../types/types';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import Dropdown from './Dropdown';

const StyledNav = tw.nav`
flex items-center mr-4 gap-2 h-full
`;
const StyledList = tw.ul`
flex items-center mx-2 h-full
`;

const StyledLink = styled.a<{ $primary: boolean | null }>`
  height: 35px;
  padding: 8px;
  border: 1px solid rgb(55, 159, 239);
  border-radius: 3px;
  font-size: 13px;
  box-shadow: ${(props) => (props.$primary ? 'inset 0 1px 0 0 white' : 'inset 0 1px 0 0 #87c1ff')};
  color: ${(props) => (props.$primary ? 'rgb(0, 99, 191)' : 'white')};
  background-color: ${(props) => (props.$primary ? '#e1ecf4' : '#0995FF')};

  &:hover {
    background-color: ${(props) => (props.$primary ? '#b3d3ea' : '#0074CC')};
  }
`;

const navIconStyle: IconStyle = {
  width: '18',
  height: '18',
  color: 'hsl(210,8%,35%)',
};
const StyledIcon = tw.span<{ $drowdown?: boolean }>`
hover:bg-gray-200 h-full flex items-center p-2 cursor-pointer
${(props) => (props.$drowdown ? 'bg-gray-200' : '')}
`;

export default function NavBar() {
  const isLoggedIn = useIsLoggedIn();
  //   const { isLoading, error, data } = useQuery({
  //     queryKey: ['repoData'],
  //     queryFn: () =>
  //       axios.get('url').then((res) => res.data),
  //   });

  // if (isLoading) return 'Loading...';
  // if (error) return `An error has occurred: ${error.message}`;
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <StyledNav>
      {isLoggedIn ? (
        <>
          <UserImg size="25px" />
          <StyledList>
            <StyledIcon>
              <Inbox style={navIconStyle} />
            </StyledIcon>
            <StyledIcon>
              <Help style={navIconStyle} />
            </StyledIcon>
            <StyledIcon>
              <Achievement style={navIconStyle} />
            </StyledIcon>
            <StyledIcon $drowdown={showDropdown} onClick={handleDropdown}>
              <Switcher style={navIconStyle} />
            </StyledIcon>
            {showDropdown && <Dropdown />}
          </StyledList>
        </>
      ) : (
        <>
          <StyledLink $primary href="/users/login">
            Log in
          </StyledLink>
          <StyledLink $primary={false} href="/users/signup">
            Sign up
          </StyledLink>
        </>
      )}
    </StyledNav>
  );
}
