/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SummaryDiv from '../components/questions/SummaryDiv';
import RightSidebar from '../components/sidebar/RightSidebar';
import PageBtnDiv from '../components/questions/PageBtnDiv';
import AskQuestionBtn from '../components/AskQuestionBtn';
import { FetchQuestions } from '../api/api';
import { LIMIT } from '../constant/constantValue';
import addCommasToNumber from '../utils/addCommasToNumber';
import scrollToTop from '../utils/scrollToTop';
import { PageT, Question } from '../types/types';
import { MainWrapper } from '../styles/styles';
import Btn from '../ui/Btn';
import SummaryLoading from '../components/questions/SummaryLoading';

function Questions() {
  const [currentpage, SetCurrentpage] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pageData, setPageData] = useState<PageT>();
  const [questionsCount, setQuestionsCount] = useState<string>('');

  const { isLoading, data, error } = useQuery({
    queryKey: ['questions', { currentpage, LIMIT }],
    queryFn: () => FetchQuestions(currentpage, LIMIT),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setQuestions(data.data.data);
      setPageData(data.data.pageInfo);
      const dataLength = addCommasToNumber(data.data.pageInfo.totalElement);
      setQuestionsCount(dataLength);
    }
  }, [data]);

  const handleCurrentPage = (page: number) => {
    SetCurrentpage(page);
  };

  useEffect(() => {
    scrollToTop();
  }, [currentpage]);

  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  return (
    <div className="w-[727px]">
      <section className="mb-3">
        <div className="flex justify-between items-center h-[50px] mb-3">
          <h1 className="mr-3 mb-3 text-[27px] text-blackDark">All Questions</h1>
          <AskQuestionBtn />
        </div>
        <div className="flex justify-between items-center text-blackDark">
          <div className="text-[17px] w-[268px] mr-3">
            {questionsCount} questions with no upvoted or accepted answers
          </div>
          <Btn>Newest</Btn>
        </div>
      </section>
      <main className="w-full border-t border-brgray">
        {isLoading && <SummaryLoading />}
        {!!questions.length &&
          questions.map((question: Question) => (
            <SummaryDiv key={question.questionId} question={question} />
          ))}
      </main>
      {pageData && (
        <PageBtnDiv
          handleCurrentPage={handleCurrentPage}
          currentpage={currentpage}
          LastPage={pageData.totalPages}
        />
      )}
    </div>
  );
}

function QuestionsPage() {
  return (
    <MainWrapper className="flex w-[1100px]">
      <Questions />
      <RightSidebar />
    </MainWrapper>
  );
}

export default QuestionsPage;
