import useMovePage from '../hooks/useMovePage';
import { AskBtn } from '../styles/styles';

function AskQuestionBtn() {
  // Todo 로그인 안된 상태면 로그인 페이지로 보내야함
  const goToAsk = useMovePage('/questions/ask');
  return (
    <AskBtn className="w-[110px] h-[38px] text-[13px]" onClick={goToAsk}>
      Ask Question
    </AskBtn>
  );
}

export default AskQuestionBtn;
