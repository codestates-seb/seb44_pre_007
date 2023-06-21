/* eslint-disable no-console */
import tw from 'tailwind-styled-components';
import MiniLogo from '../../public/Icons/MiniLogo';

const StyledDropdown = tw.div`
z-50 w-[360px] absolute top-0 translate-y-[55px] -translate-x-1/2 bg-white border shadow-md text-[12px] text-darkBlue bp1:inset-x-0 bp1:translate-x-0 bp1:w-full
`;
const StyledTitle = tw.div`
bg-gray-200 font-bold px-2 py-1
`;
const StyledUl = tw.ul`
bg-lightBlue hover:bg-hoverBlue px-2 py-1
`;
const StyledLi = tw.li`
flex justify-between my-0.5
`;
const StyledIconWrapper = tw.span`
mr-1
`;
const StyledSubTitle = tw.span`
flex font-bold hover:text-primaryBlue cursor-pointer
`;
const StyledSubMenu = tw.span`
mr-2 hover:text-primaryBlue cursor-pointer
`;

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = 'http://localhost:5173/';
};

export default function Dropdown() {
  return (
    <StyledDropdown>
      <StyledTitle>CURRENT COMMUNITY</StyledTitle>
      <StyledUl>
        <StyledLi>
          <div>
            <StyledSubTitle>
              <StyledIconWrapper>
                <MiniLogo style={{ width: '16px', height: '16px' }} />
              </StyledIconWrapper>
              Stack Overflow
            </StyledSubTitle>
          </div>
          <div>
            <StyledSubMenu>help</StyledSubMenu>
            <StyledSubMenu>chat</StyledSubMenu>
            <StyledSubMenu onClick={handleLogout}>log out</StyledSubMenu>
          </div>
        </StyledLi>
      </StyledUl>
    </StyledDropdown>
  );
}
