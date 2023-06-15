import { styled } from 'styled-components';

const HasAnswerSpan = styled.span`
  border: 1px solid rgb(47, 111, 68);
  border-radius: 3px;
  color: rgb(47, 111, 68);
`;

function AnswerCountSpan({ answerCount }: { answerCount: number }) {
  // eslint-disable-next-line operator-linebreak
  const Span =
    answerCount > 0 ? (
      <HasAnswerSpan className="px-1 py-0.5 text-[13px] mt-1">{answerCount} answers</HasAnswerSpan>
    ) : (
      <span className="text-blacklight text-[13px] mt-1">{answerCount} answers</span>
    );
  return Span;
}

export default AnswerCountSpan;
