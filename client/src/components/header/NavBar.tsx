import tw from 'tailwind-styled-components';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import Inbox from '../../public/Icons/Inbox';
import Achievement from '../../public/Icons/Achievement';
import Help from '../../public/Icons/Help';
import Switcher from '../../public/Icons/Switcher';

const StyledNav = tw.nav`
flex items-center mr-4 gap-2 h-full
`;
const StyledList = tw.ul`
flex items-center mx-2 h-full
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
        <Inbox />
        <Achievement />
        <Help />
        <Switcher />
      </StyledList>
    </StyledNav>
  );
}
