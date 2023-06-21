import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useQuery } from '@tanstack/react-query';
import QuestionContainer from '../components/question/QuestionContainer';
import RightSidebar from '../components/sidebar/RightSidebar';
import { FetchQuestion } from '../api/api';
import scrollToTop from '../utils/scrollToTop';
import AnswerContainer from '../components/question/AnswerContainer';
import AskQuestionBtn from '../components/AskQuestionBtn';
import AnswerForm from '../components/question/AnswerForm';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import formatingDate from '../utils/formatingDate';

const DateDiv = tw.div`
text-blacklight text-[13px] pb-2
`;

function QuestionPage() {
  const isLoggedIn = useIsLoggedIn();
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ['question', id],
    queryFn: () => FetchQuestion(Number(id)),
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  return (
    <div className="p-6 border-l border-brgray">
      <main className="w-[1051px]">
        <div className="flex justify-between items-start mb-3">
          {!!data && (
            <h1 className="mr-3 mb-3 text-[27px] text-blackDark">{data.data.questionTitle}</h1>
          )}
          <AskQuestionBtn />
        </div>
        <div className="flex gap-4 pb-2 mb-4 border-b border-brgray">
          {!!data && (
            <>
              <DateDiv>Asked {formatingDate(data.data.questionCreated)} </DateDiv>
              {data.data.questionCreated !== data.data.questionUpdated && (
                <DateDiv>Modified {formatingDate(data.data.questionUpdated)}</DateDiv>
              )}
            </>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            {!!data && <QuestionContainer data={data.data} />}
            {!!data && data.data.answerList.length > 0 && (
              <AnswerContainer datas={data.data.answerList} answerCnt={data.data.answerCount} />
            )}
            {isLoggedIn && <AnswerForm />}
          </div>
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}

export default QuestionPage;
