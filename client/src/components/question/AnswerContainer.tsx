import { SubTitle } from '../../styles/styles';
import { AnswerT } from '../../types/types';
import Answer from './Answer';

function AnswerContainer({ datas, answerCnt }: { datas: AnswerT[]; answerCnt: number }) {
  return (
    <div className="w-[727px] flex flex-col">
      <SubTitle>{answerCnt} Answers</SubTitle>
      <div className="flex flex-col items-end">
        {!!datas && datas.map((data) => <Answer key={data.answerId} data={data} />)}
      </div>
    </div>
  );
}

export default AnswerContainer;
