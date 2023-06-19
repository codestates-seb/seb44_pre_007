import tw from 'tailwind-styled-components';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import Inbox from '../../public/Icons/Inbox';
import Achievement from '../../public/Icons/Achievement';
import Help from '../../public/Icons/Help';
import Switcher from '../../public/Icons/Switcher';
import { IconStyle } from '../../types/types';

const StyledNav = tw.nav`
flex items-center mr-4 gap-2 h-full
`;
const StyledList = tw.ul`
flex items-center mx-2 h-full
`;

const navIconStyle: IconStyle = {
  width: '18',
  height: '18',
  color: 'hsl(210,8%,35%)',
};
const StyledIcon = tw.span`
hover:bg-gray-200 h-full flex items-center p-2 cursor-pointer
`;

export default function NavBar() {
  //   const { isLoading, error, data } = useQuery({
  //     queryKey: ['repoData'],
  //     queryFn: () =>
  //       axios.get('url').then((res) => res.data),
  //   });

  // if (isLoading) return 'Loading...';
  // if (error) return `An error has occurred: ${error.message}`;

  return (
    <StyledNav>
      <a href="/">유저</a>
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
        <StyledIcon>
          <Switcher style={navIconStyle} />
        </StyledIcon>
      </StyledList>
    </StyledNav>
  );
}
