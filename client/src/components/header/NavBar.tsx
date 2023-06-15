import tw from 'tailwind-styled-components';
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
