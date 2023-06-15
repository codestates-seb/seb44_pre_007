/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from 'styled-components';
import tw from 'tailwind-styled-components';
import { Ellipsis } from '../../styles/sidebarstyle';
import { Question } from '../../types/types';

const Summarydiv = tw.div`
p-4 flex border-b border-brgray
`;

const Content = styled(Ellipsis)`
  font-size: 13px;
`;

function SummaryDiv({ question }: { question: Question }) {
  const {
    id,
    user_id,
    question_content,
    question_created,
    question_tag,
    question_title,
    question_updated,
  } = question;
  return (
    <Summarydiv>
      <div className="w-[108px] flex gap-2 items-start justify-end mr-4 mb-1">
        <span className="text-blacklight text-[13px]">0</span>
        <span className="text-blacklight text-[13px]">answers</span>
      </div>
      <div className="w-[595px]">
        <h3 className="pr-6 text-[17px] text-[#0063BF]">{question_title}</h3>
        <Content className="mb-2 text-[13px] text-[#3B4045]">{question_content}</Content>
        <div>
          <div>{question_tag}</div>
          <div className="flex gap-2 justify-end text-[12px]">
            <div>{user_id}</div>
            <div className="text-blacklight">{question_created}</div>
          </div>
        </div>
      </div>
    </Summarydiv>
  );
}

export default SummaryDiv;
