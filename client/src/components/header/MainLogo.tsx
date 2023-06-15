import tw from 'tailwind-styled-components';
import LogoImg from '../../public/Icons/LogoImg';

const StyledLogo = tw.div`
flex items-center px-3 cursor-pointer h-full hover:bg-gray-200
`;

export default function MainLogo() {
  return (
    <StyledLogo>
      <LogoImg />
    </StyledLogo>
  );
}
