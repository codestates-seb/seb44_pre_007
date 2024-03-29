/* eslint-disable @typescript-eslint/naming-convention */
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { Ellipsis, StaticSpan, Summarydiv, TitleH3 } from '../../styles/styles';
import { Question, TagT } from '../../types/types';
import AnswerCountSpan from './AnswerCountSpan';
import Tag from '../../ui/Tag';
import useMovePage from '../../hooks/useMovePage';
import formatingDate from '../../utils/formatingDate';
import htmlTagIgnore from '../../utils/htmlTagIgnore';

const Content = styled(Ellipsis)`
  font-size: 13px;
`;

function SummaryDiv({ question }: { question: Question }) {
  const {
    questionId,
    questionUserNickname,
    questionTitle,
    questionContent,
    questionCount,
    tagList,
    questionCreated,
    questionUpdated,
    answerCount,
  } = question;

  const [formateeDate, setFormatedDate] = useState('');

  useEffect(() => {
    const formateDate = formatingDate(questionUpdated);
    if (questionCreated !== questionUpdated) {
      setFormatedDate(`modified ${formateDate}`);
    } else {
      setFormatedDate(`asked ${formateDate}`);
    }
  }, [questionUpdated, questionCreated]);

  const goToQuestion = useMovePage(`/questions/${questionId}`);
  return (
    <Summarydiv>
      <section className="w-[108px] flex flex-col items-end gap-2 mr-4 mb-1">
        <StaticSpan>{questionCount} Views</StaticSpan>
        <AnswerCountSpan answerCount={answerCount} />
      </section>
      <section className="w-[595px]">
        <TitleH3 role="presentation" onClick={goToQuestion}>
          {questionTitle}
        </TitleH3>
        <Content className="mb-2 text-[#3B4045]">{htmlTagIgnore(questionContent)}</Content>
        <div className="grid gap-1">
          <div className="flex gap-1">
            {tagList.map((tag: TagT) => (
              <Tag key={tag.tagId} content={tag.tagName} />
            ))}
          </div>
          <div className="flex gap-2 text-[12px] justify-self-end">
            <div className="text-nickname text-[12px]">{questionUserNickname}</div>
            <div className="text-blacklight">{formateeDate}</div>
          </div>
        </div>
      </section>
    </Summarydiv>
  );
}

export default SummaryDiv;
