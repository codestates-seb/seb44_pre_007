import { ImEarth } from 'react-icons/im';
import { AiFillInfoCircle } from 'react-icons/ai';
import { TiStarburst } from 'react-icons/ti';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
// eslint-disable-next-line object-curly-newline
import { LiNavDisable, Liml8mt16, Lip8pr6, FlexDiv, LiBtn } from '../../styles/style';

const NavActive = styled(NavLink)`
  display: block;
  padding: 8px;
  padding-left: 6px;
  font-size: 13px;
  cursor: pointer;
  color: #525960;

  &.active {
    background-color: rgb(241, 242, 243);
    font-weight: bold;
    color: #0c0d0e;
    border-right: 3px solid orange;
  }
`;

const HomeNav = styled(NavLink)`
  display: flex;
  align-items: center;
  &.active {
    background-color: rgb(241, 242, 243);
    font-weight: bold;
    color: #0c0d0e;
    border-right: 3px solid orange;
  }
`;

function LeftSidebar() {
  return (
    <ol className="w-[164px] h-[595px] m-3 list-none">
      <HomeNav to="/" className="h-[26px] pl-2 text-[13px] text-inactive cursor-pointer">
        Home
      </HomeNav>
      <ol>
        <Liml8mt16 className="mb-1">PUBLIC</Liml8mt16>
        <NavActive to="/questions" end>
          <FlexDiv className="gap-1">
            <ImEarth size={16} />
            <span>Questions</span>
          </FlexDiv>
        </NavActive>
        <LiNavDisable>Tags</LiNavDisable>
        <LiNavDisable>Users</LiNavDisable>
        <LiNavDisable>Companies</LiNavDisable>
        <Liml8mt16>
          <FlexDiv className="justify-between">
            COLLECTIVES
            <div className="p-3">
              <AiFillInfoCircle />
            </div>
          </FlexDiv>
        </Liml8mt16>
        <Lip8pr6>
          <FlexDiv>
            <TiStarburst className="mr-1" size={18} color="#f48225" />
            Explore Collectives
          </FlexDiv>
        </Lip8pr6>
      </ol>
      <li>
        <Liml8mt16 className="mb-2">TEAMS</Liml8mt16>
        <div className="border p-3 pb-1.5 rounded-[3px]">
          <strong>Stack Overflow for Teams</strong>
          <span className="text-[13px] text-inactive">
            {' '}
            - Start collaborating and sharing organizational knowledge.
          </span>

          <img
            className="mx-2"
            src="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e"
            alt=""
          />
          <LiBtn className="text-white bg-main shadow-btn border-main border border-solid">
            Create a free Team
          </LiBtn>
          <LiBtn className="text-label hover:bg-[#f8f9f9]">Why Teams?</LiBtn>
        </div>
      </li>
    </ol>
  );
}

export default LeftSidebar;
