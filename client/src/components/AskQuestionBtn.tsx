import useMovePage from '../hooks/useMovePage';
import { AskBtn } from '../styles/styles';

function AskQuestionBtn() {
  const goToAsk = useMovePage('/questions/ask');
  return (
    <AskBtn className="w-[110px] h-[38px] text-[13px]" onClick={goToAsk}>
      Ask Question
    </AskBtn>
  );
}

export default AskQuestionBtn;
