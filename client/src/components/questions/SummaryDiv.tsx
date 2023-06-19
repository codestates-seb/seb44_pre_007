/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from 'styled-components';
import tw from 'tailwind-styled-components';
import { Ellipsis } from '../../styles/styles';
import { Question, TagT } from '../../types/types';
import AnswerCountSpan from './AnswerCountSpan';
import Tag from '../../ui/Tag';
import useMovePage from '../../hooks/useMovePage';

const Summarydiv = tw.div`
p-4 flex border-b border-brgray
`;

const Content = styled(Ellipsis)`
  font-size: 13px;
`;

function SummaryDiv({ question }: { question: Question }) {
  const {
    questionId,
    questionUserNickname,
    questionTitle,
    questionContent,
    tagList,
    questionCreated,
    answerCount,
  } = question;

  const goToQuestion = useMovePage(`/questions/${questionId}`);

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
          {questionTitle}
        </h3>
        <Content className="mb-2 text-[13px] text-[#3B4045]">{questionContent}</Content>
        <div>
          <div className="flex gap-1">
            {tagList.map((tag: TagT) => (
              <Tag key={tag.tagId} content={tag.tagName} />
            ))}
          </div>
          <div className="flex gap-2 justify-end text-[12px]">
            <div className="text-nickname text-[12px]">{questionUserNickname}</div>
            <div className="text-blacklight">asked {questionCreated}</div>
          </div>
        </div>
      </section>
    </Summarydiv>
  );
}

export default SummaryDiv;
