import YellowContainer from './YellowContainer';
import LoginContainer from './LoginContainer';
import CollectivesContainer from './CollectivesContainer';

function RightSidebar() {
  const isLogged = true;
  return (
    <div className="flex flex-col ml-6">
      <YellowContainer />
      {isLogged && <LoginContainer />}
      <CollectivesContainer />
    </div>
  );
}

export default RightSidebar;
