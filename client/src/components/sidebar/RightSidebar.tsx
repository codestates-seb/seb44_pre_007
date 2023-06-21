import YellowContainer from './YellowContainer';
import LoginContainer from './LoginContainer';
import CollectivesContainer from './CollectivesContainer';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';

function RightSidebar() {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div className="flex flex-col ml-6">
      <YellowContainer />
      {isLoggedIn && <LoginContainer />}
      <CollectivesContainer />
    </div>
  );
}

export default RightSidebar;
