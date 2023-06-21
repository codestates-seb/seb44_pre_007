import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import tw from 'tailwind-styled-components';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import RightSidebar from '../components/sidebar/RightSidebar';
import { FetchQuestion } from '../api/api';
import { AskBtn, ContentDiv } from '../styles/styles';
import AnswerEditor from '../components/question/AnswerEditor';
import { AnswerT } from '../types/types';
import scrollToTop from '../utils/scrollToTop';
import useMovePage from '../hooks/useMovePage';

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
  const HandlePatchAnswer = () => {
    console.log(PreviewRef.current?.innerText);
  };

  // Todo delete
  const HandleDeleteAnswer = () => {
    axios.delete(`http://3.35.43.193:8080/questions/${id}/${answerId}/edit`).then((res) => {
      console.log(res);
    });
  };
  // Todo ux를 위해 돌아간다는 경고 모달 띄우면 좋음
  const HandleCancelAnswer = useMovePage(`/questions/${id}`);

  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  return (
    <div className="flex p-6">
      <div className="w-[662px]">
        {!!data && (
          <>
            <H2 className="text-Link cursor-pointer" onClick={HandleCancelAnswer}>
              {data.data.questionTitle}
            </H2>
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
              <AskBtn
                className="bg-white text-bubg border-none"
                type="submit"
                onClick={HandleCancelAnswer}
              >
                Cancel
              </AskBtn>
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
