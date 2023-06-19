/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Btn from '../ui/Btn';
import addCommasToNumber from '../utils/addCommasToNumber';
import { PageT, Question } from '../types/types';
import SummaryDiv from '../components/questions/SummaryDiv';
import { FetchQuestions } from '../api/api';
import RightSidebar from '../components/sidebar/RightSidebar';
import { LIMIT } from '../constant/constantValue';
import AskQuestionBtn from '../components/AskQuestionBtn';

const PageBtn = styled.button`
  height: 25px;
  background-color: ${(props) => (props.nowPage ? '#F48225' : 'white')};
  color: ${(props) => (props.nowPage ? 'white' : 'color')};
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid;
  border-color: ${(props) => (props.nowPage ? 'rgba(0, 0, 0, 0)' : 'rgba(186, 191, 196)')};
  border-radius: 3px;
  font-size: 13px;
  font-weight: 400;
`;

// todo 페이지네이션, fetch 리액트쿼리 사용하기
function Questions() {
  const [currentpage, SetCurrentpage] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pageData, setPageData] = useState<PageT>();
  const [questionsCount, setQuestionsCount] = useState<string>('');

  const fetchData = async () => {
    const res = await FetchQuestions(currentpage, LIMIT);
    setQuestions(res.data.data);
    setPageData(res.data.pageInfo);
    const dataLength = addCommasToNumber(res.data.pageInfo.totalElement);
    setQuestionsCount(dataLength);
  };

  useEffect(() => {
    fetchData();
  }, [currentpage]);

  const handleMoveToNextPage = () => {
    if (currentpage === pageData?.totalPages) return;
    SetCurrentpage(currentpage + 1);
  };
  const handleMoveToPrevPage = () => {
    SetCurrentpage(currentpage - 1);
  };
  const handleMoveToPage = (pageNumber: number) => {
    SetCurrentpage(pageNumber);
  };

  const pageBtn = () => {
    const btn = [];
    for (let index = 1; index <= pageData!.totalPages; index += 1) {
      btn.push(
        <PageBtn
          type="button"
          nowPage={currentpage === index}
          key={index}
          onClick={() => {
            handleMoveToPage(index);
          }}
        >
          {index}
        </PageBtn>
      );
    }
    return btn;
  };

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
        <div className="flex gap-1 my-5">
          {currentpage > 1 && (
            <PageBtn type="button" onClick={handleMoveToPrevPage}>
              Prev
            </PageBtn>
          )}
          {pageBtn()}
          {pageData.totalPages > 1 && (
            <PageBtn type="button" onClick={handleMoveToNextPage}>
              Next
            </PageBtn>
          )}
        </div>
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
