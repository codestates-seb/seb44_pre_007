import { AnswerT } from '../../types/types';
import Answer from './Answer';

function AnswerContainer({
  id,
  datas,
  answerCnt,
}: {
  id: number;
  datas: AnswerT[];
  answerCnt: number;
}) {
  return (
    <div className="w-[727px] flex flex-col">
      <h2 className="mt-3 mb-2 text-blackDark text-[19px]">{answerCnt} Answers</h2>
      <div className="flex flex-col items-end">
        {!!datas && datas.map((data) => <Answer key={data.answerId} id={id} data={data} />)}
      </div>
    </div>
  );
}

export default AnswerContainer;
