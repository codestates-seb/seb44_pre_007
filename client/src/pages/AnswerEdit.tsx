import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import tw from 'tailwind-styled-components';
import { useEffect, useRef, useState } from 'react';
import RightSidebar from '../components/sidebar/RightSidebar';
import { FetchQuestion } from '../api/api';
import { AskBtn, ContentDiv } from '../styles/styles';
import AnswerEditor from '../components/question/AnswerEditor';
import { AnswerT } from '../types/types';
import CancelBtn from '../components/edit/answer/CancelBtn';
import scrollToTop from '../utils/scrollToTop';

const H2 = tw.h2`
mt-4 mb-[19px] text-[19px]
`;

function AnswerEdit() {
  const param = useParams();
  const PreviewRef = useRef<HTMLDivElement>(null);
  const { id, answerId } = param;
  const [text, setText] = useState<string>('');

  const { isLoading, data, error } = useQuery({
    queryKey: ['question', id, answerId],
    queryFn: () => FetchQuestion(Number(id)),
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (data) {
      const filterAnswer = data.data.answers.filter(
        (answer: AnswerT) => answer.answerId === Number(answerId)
      );
      setText(filterAnswer[0].answerContent);
    }
  }, [data]);

  // Todo patch
  const HandlePatchAnswer = () => {};
  // Todo delete
  const HandleDeleteAnswer = () => {};

  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  return (
    <div className="flex p-6">
      <div className="w-[662px]">
        {!!data && (
          <>
            <H2 className="text-Link cursor-pointer">{data.data.questionTitle}</H2>
            <ContentDiv dangerouslySetInnerHTML={{ __html: data.data.questionContent }} />
            <H2 className="text-blackDark">Answer</H2>
            <AnswerEditor text={text} setText={setText} />
            <div className="flex pt-2.5 pb-[15px] gap-2">
              <AskBtn type="submit" onClick={HandlePatchAnswer}>
                Save edits
              </AskBtn>
              <AskBtn
                className="bg-red-500 border-red-500"
                type="submit"
                onClick={HandleDeleteAnswer}
              >
                Delete Answer
              </AskBtn>
              <CancelBtn url={`/questions/${id}`} />
            </div>
            <section>
              <ContentDiv ref={PreviewRef} dangerouslySetInnerHTML={{ __html: text }} />
            </section>
          </>
        )}
      </div>
      <RightSidebar />
    </div>
  );
}

export default AnswerEdit;
