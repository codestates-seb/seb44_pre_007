/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from 'styled-components';
import tw from 'tailwind-styled-components';
import { useNavigate } from 'react-router-dom';
import { Ellipsis } from '../../styles/styles';
import { Question } from '../../types/types';
import AnswerCountSpan from './AnswerCountSpan';
import Tag from '../../ui/Tag';

const Summarydiv = tw.div`
p-4 flex border-b border-brgray
`;

const Content = styled(Ellipsis)`
  font-size: 13px;
`;

function SummaryDiv({ question }: { question: Question }) {
  const navigate = useNavigate();
  const {
    id,
    questionUserNickname,
    question_title,
    question_content,
    question_tag,
    question_created,
    answerCount,
  } = question;

  const goToQuestion = () => {
    navigate(`/questions/${id}`);
  };
  return (
    <Summarydiv>
      <section className="w-[108px] flex gap-2 items-start justify-end mr-4 mb-1">
        <AnswerCountSpan answerCount={answerCount} />
      </section>
      <section className="w-[595px]">
        <h3
          role="presentation"
          className="pr-6 text-[17px] text-[#0063BF] cursor-pointer"
          onClick={goToQuestion}
        >
          {question_title}
        </h3>
        <Content className="mb-2 text-[13px] text-[#3B4045]">{question_content}</Content>
        <div>
          <div className="flex gap-1">
            {question_tag.map((tag) => (
              <Tag key={tag} content={tag} />
            ))}
          </div>
          <div className="flex gap-2 justify-end text-[12px]">
            <div className="text-nickname text-[12px]">{questionUserNickname}</div>
            <div className="text-blacklight">asked {question_created}</div>
          </div>
        </div>
      </section>
    </Summarydiv>
  );
}

export default SummaryDiv;
