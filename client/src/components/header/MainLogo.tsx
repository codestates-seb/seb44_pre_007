import tw from 'tailwind-styled-components';
import LogoImg from '../../public/Icons/LogoImg';
import MiniLogo from '../../public/Icons/MiniLogo';
import useMediaQuery from '../../hooks/useMediaQuery';

const StyledLogo = tw.a`
flex items-center px-3 cursor-pointer h-full hover:bg-gray-200
`;

export default function MainLogo() {
  const isDesktop = useMediaQuery('(min-width: 640px)');
  return (
    <StyledLogo href="/">
      {isDesktop ? <LogoImg /> : <MiniLogo style={{ width: '25px', height: '30px' }} />}
    </StyledLogo>
  );
}
