import tw from 'tailwind-styled-components';
/**
 *
 * @Todo Home, Questions li > NavLink로 바꿔야함
 */

const LiNavDisable = tw.li`
 p-1 pl-[30px] text-inactive text-13p
`;

const Liml8mt16 = tw.li`
ml-2 mt-4 text-[#6a737c] text-11p
`;

const Lip8pr6 = tw.li`
p-2 pr-1.5 text-inactive text-13p
`;

function LeftSidebar() {
  return (
    <ol className="w-[164px] h-[595px] m-3 list-none">
      <li className="pl-2 text-13p text-bar_label">Home</li>
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
          <span className="text-13p">
            {' '}
            - Start collaborating and sharing organizational knowledge.
          </span>

          <img
            src="https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e"
            alt=""
          />
          <li>Crate a free Team</li>
          <li>Why Teams?</li>
        </div>
      </li>
    </ol>
  );
}

export default LeftSidebar;
