import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useQuery } from '@tanstack/react-query';
import QuestionContainer from '../components/question/QuestionContainer';
import RightSidebar from '../components/sidebar/RightSidebar';
import { FetchQuestion, GetUser } from '../api/api';
import scrollToTop from '../utils/scrollToTop';
import AnswerContainer from '../components/question/AnswerContainer';
import AskQuestionBtn from '../components/AskQuestionBtn';
import AnswerForm from '../components/question/AnswerForm';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import formatingDate from '../utils/formatingDate';
import { FlexJustifyBetweenDiv, MainWrapper } from '../styles/styles';

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

  const { data: user } = useQuery({
    queryKey: ['getUser'],
    queryFn: GetUser,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  return (
    <MainWrapper>
      <main className="w-[1051px]">
        <FlexJustifyBetweenDiv className="items-start mb-3">
          {!!data && (
            <h1 className="mr-3 mb-3 text-[27px] text-blackDark">{data.data.questionTitle}</h1>
          )}
          <AskQuestionBtn />
        </FlexJustifyBetweenDiv>
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
        <FlexJustifyBetweenDiv>
          <div className="flex flex-col">
            {!!data && <QuestionContainer user={user ? user.userEmail : null} data={data.data} />}
            {!!data && data.data.answerList.length > 0 && (
              <AnswerContainer
                user={user ? user.userEmail : null}
                datas={data.data.answerList}
                answerCnt={data.data.answerList.length}
              />
            )}
            {isLoggedIn && <AnswerForm />}
          </div>
          <RightSidebar />
        </FlexJustifyBetweenDiv>
      </main>
    </MainWrapper>
  );
}

export default QuestionPage;
