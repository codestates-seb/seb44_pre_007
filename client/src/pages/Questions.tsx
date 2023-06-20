/* eslint-disable operator-linebreak */
import { useCallback, useEffect, useState } from 'react';
import Btn from '../ui/Btn';
import addCommasToNumber from '../utils/addCommasToNumber';
import { PageT, Question } from '../types/types';
import SummaryDiv from '../components/questions/SummaryDiv';
import { FetchQuestions } from '../api/api';
import RightSidebar from '../components/sidebar/RightSidebar';
import { LIMIT } from '../constant/constantValue';
import AskQuestionBtn from '../components/AskQuestionBtn';
import scrollToTop from '../utils/scrollToTop';
import PageBtnDiv from '../components/questions/PageBtnDiv';

// todo fetch 리액트쿼리 사용하기
function Questions() {
  const [currentpage, SetCurrentpage] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pageData, setPageData] = useState<PageT>();
  const [questionsCount, setQuestionsCount] = useState<string>('');

  const fetchData = useCallback(async () => {
    const res = await FetchQuestions(currentpage, LIMIT);
    setQuestions(res.data.data);
    setPageData(res.data.pageInfo);
    const dataLength = addCommasToNumber(res.data.pageInfo.totalElement);
    setQuestionsCount(dataLength);
  }, [currentpage]);

  const handleCurrentPage = (page: number) => {
    SetCurrentpage(page);
  };

  useEffect(() => {
    fetchData();
    scrollToTop();
  }, [currentpage, fetchData]);

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
    <div className="flex w-[1100px] border-l p-6">
      <Questions />
      <RightSidebar />
    </div>
  );
}

export default QuestionsPage;
