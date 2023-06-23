/* eslint-disable operator-linebreak */
import { SubTitle } from '../../styles/styles';
import { AnswerT } from '../../types/types';
import AnswerDiv from './AnswerDiv';

function AnswerContainer({
  user,
  datas,
  answerCnt,
}: {
  user: string;
  datas: AnswerT[];
  answerCnt: number;
}) {
  return (
    <div className="w-[727px] flex flex-col">
      <SubTitle>{answerCnt} Answers</SubTitle>
      <div className="flex flex-col items-end">
        {!!datas && datas.map((data) => <AnswerDiv key={data.answerId} data={data} user={user} />)}
      </div>
    </div>
  );
}

export default AnswerContainer;
