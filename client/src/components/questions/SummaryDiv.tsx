/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from 'styled-components';
import tw from 'tailwind-styled-components';
import { Ellipsis } from '../../styles/sidebarstyle';
import { Question } from '../../types/types';
import AnswerCountSpan from './AnswerCountSpan';

const Summarydiv = tw.div`
p-4 flex border-b border-brgray
`;

const Content = styled(Ellipsis)`
  font-size: 13px;
`;

function SummaryDiv({ question }: { question: Question }) {
  const {
    id,
    questionUserNickname,
    question_title,
    question_content,
    question_tag,
    question_created,
    answerCount,
  } = question;
  return (
    <Summarydiv>
      <div className="w-[108px] flex gap-2 items-start justify-end mr-4 mb-1">
        <AnswerCountSpan answerCount={answerCount} />
      </div>
      <div className="w-[595px]">
        <h3 className="pr-6 text-[17px] text-[#0063BF]">{question_title}</h3>
        <Content className="mb-2 text-[13px] text-[#3B4045]">{question_content}</Content>
        <div>
          <div>{question_tag}</div>
          <div className="flex gap-2 justify-end text-[12px]">
            <div className="text-nickname text-[12px]">{questionUserNickname}</div>
            <div className="text-blacklight">{question_created}</div>
          </div>
        </div>
      </div>
    </Summarydiv>
  );
}

export default SummaryDiv;
