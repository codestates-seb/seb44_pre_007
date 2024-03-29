/* eslint-disable object-curly-newline */
import { ImEarth } from 'react-icons/im';
import { AiFillInfoCircle } from 'react-icons/ai';
import { TiStarburst } from 'react-icons/ti';
import { LiNavDisable, Liml8mt16, Lip8pr6, LiBtn, NavActive } from '../../styles/sidebarstyle';
import { FlexDiv } from '../../styles/styles';

function LeftSidebar() {
  return (
    <ol className="w-[164px] h-[595px] mb-3 list-none bg-white">
      <LiNavDisable className="w-[164px] h-[26px] pl-2 text-[13px] text-black600 cursor-pointer">
        Home
      </LiNavDisable>
      <ol className="w-[164px]">
        <Liml8mt16 className="mb-1">PUBLIC</Liml8mt16>
        <NavActive to="/questions">
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
        <div className="border p-3 pb-1.5 rounded-[3px] border-r-0 bg-white">
          <strong>Stack Overflow for Teams</strong>
          <span className="text-[13px] text-black600">
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
          <LiBtn className="text-blacklight hover:bg-[#f8f9f9]">Why Teams?</LiBtn>
        </div>
      </li>
    </ol>
  );
}

export default LeftSidebar;
