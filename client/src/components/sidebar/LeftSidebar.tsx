import tw from 'tailwind-styled-components';
import { LiNavDisable, Liml8mt16, Lip8pr6 } from '../../styles/style';
/**
 *
 * @Todo Home, Questions li > NavLink로 바꿔야함
 */

const LiBtn = tw.li`
 border-none p-1.5  flex justify-center text-[11px] cursor-pointer rounded-[3px]
`;

function LeftSidebar() {
  return (
    <ol className="w-[164px] h-[595px] m-3 list-none">
      <li className="pl-2 text-[13px] text-inactive cursor-pointer">Home</li>
      <ol>
        <Liml8mt16 className="mb-1">PUBLIC</Liml8mt16>
        <Lip8pr6>Questions</Lip8pr6>
        <LiNavDisable>Tags</LiNavDisable>
        <LiNavDisable>Users</LiNavDisable>
        <LiNavDisable>Companies</LiNavDisable>
        <Liml8mt16>COLLECTIVES</Liml8mt16>
        <Lip8pr6>Explore Collectives</Lip8pr6>
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
