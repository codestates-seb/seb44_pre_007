import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import tw from 'tailwind-styled-components';
import { useEffect, useRef, useState } from 'react';
import RightSidebar from '../components/sidebar/RightSidebar';
import { FetchQuestion } from '../api/api';
import { ContentDiv } from '../styles/styles';
import AnswerEditor from '../components/question/AnswerEditor';
import { AnswerT } from '../types/types';
import scrollToTop from '../utils/scrollToTop';
import useMovePage from '../hooks/useMovePage';
import AnswerBtn from '../components/edit/answer/AnswerBtn';

const H2 = tw.h2`
mt-4 mb-[19px] text-[19px]
`;

type ParmT = {
  id: string;
  answerId: string;
};

function AnswerEdit() {
  const param = useParams() as ParmT;
  const PreviewRef = useRef<HTMLDivElement>(null);
  const { id, answerId } = param;
  const [text, setText] = useState<string>('');

  const { isLoading, data, error } = useQuery({
    queryKey: ['question', id, answerId],
    queryFn: () => FetchQuestion(Number(id)),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (data) {
      const filterAnswer = data.data.answerList.filter(
        (answer: AnswerT) => answer.answerId === Number(answerId)
      );
      setText(filterAnswer[0].answerContent);
    }
  }, [data]);

  // Todo ux를 위해 돌아간다는 경고 모달 띄우면 좋음
  const HandleCancelAnswer = useMovePage(`/questions/${id}`);

  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  return (
    <div className="flex p-6 border-l border-brgray">
      <div className="w-[662px]">
        {!!data && (
          <>
            <H2 className="text-Link cursor-pointer" onClick={HandleCancelAnswer}>
              {data.data.questionTitle}
            </H2>
            <ContentDiv dangerouslySetInnerHTML={{ __html: data.data.questionContent }} />
            <H2 className="text-blackDark">Answer</H2>
            <AnswerEditor text={text} setText={setText} />
            <AnswerBtn id={id} answerId={answerId} text={text} />
            <section className="break-words">
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
