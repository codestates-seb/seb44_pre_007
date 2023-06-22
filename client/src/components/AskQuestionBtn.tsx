import useIsLoggedIn from '../hooks/useIsLoggedIn';
import useMovePage from '../hooks/useMovePage';
import { AskBtn } from '../styles/styles';

function AskQuestionBtn() {
  const isLoggedIn = useIsLoggedIn();
  const goToAsk = useMovePage('/questions/ask');
  const goToLogin = useMovePage('/users/login');
  const HandleLoginStatus = () => {
    if (isLoggedIn) goToAsk();
    else goToLogin();
  };
  return (
    <AskBtn className="w-[110px] h-[38px] text-[13px]" onClick={HandleLoginStatus}>
      Ask Question
    </AskBtn>
  );
}

export default AskQuestionBtn;
