import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { Props } from '../../types/types';

function Sidebar({ children }: Props) {
  return (
    <div className="flex">
      <LeftSidebar />
      {children}
      <RightSidebar />
    </div>
  );
}

export default Sidebar;
