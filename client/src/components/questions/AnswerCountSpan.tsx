import { styled } from 'styled-components';
import { StaticSpan } from '../../styles/styles';

const HasAnswerSpan = styled.span`
  border: 1px solid rgb(47, 111, 68);
  border-radius: 3px;
  color: rgb(47, 111, 68);
`;

function AnswerCountSpan({ answerCount }: { answerCount: number }) {
  // eslint-disable-next-line operator-linebreak
  const Span =
    answerCount > 0 ? (
      <HasAnswerSpan className="w-fit px-1 py-0.5 text-[13px] mt-1">
        {answerCount} answers
      </HasAnswerSpan>
    ) : (
      <StaticSpan>{answerCount} answers</StaticSpan>
    );
  return Span;
}

export default AnswerCountSpan;
