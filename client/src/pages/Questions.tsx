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
import scrollToTop from '../utils/scrollToTop';

const PageBtn = styled.button<{ $nowpage?: string }>`
  height: 25px;
  background-color: ${(props) => (props.$nowpage === 'true' ? '#F48225' : 'white')};
  color: ${(props) => (props.$nowpage === 'true' ? 'white' : '#3B4045')};
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid;
  border-color: ${(props) => (props.$nowpage === 'true' ? 'none' : 'rgba(186, 191, 196)')};
  border-radius: 3px;
  font-size: 13px;
  font-weight: 400;
`;

// todo fetch 리액트쿼리 사용하기
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
    scrollToTop();
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
    const centerBtn = currentpage;
    const lastPage = pageData?.totalPages ?? 1;
    const btn = [];
    if (currentpage < 5) {
      const last = lastPage < 5 ? lastPage : 5;
      for (let index = 1; index <= last; index += 1) {
        btn.push(
          <PageBtn
            type="button"
            $nowpage={(currentpage === index).toString()}
            key={index}
            onClick={() => {
              handleMoveToPage(index);
            }}
          >
            {index}
          </PageBtn>
        );
      }
    } else if (currentpage > lastPage - 4) {
      for (let index = lastPage - 4; index <= lastPage; index += 1) {
        btn.push(
          <PageBtn
            type="button"
            $nowpage={(currentpage === index).toString()}
            key={index}
            onClick={() => {
              handleMoveToPage(index);
            }}
          >
            {index}
          </PageBtn>
        );
      }
    } else {
      btn.push(
        <PageBtn
          type="button"
          $nowpage="true"
          key={centerBtn}
          onClick={() => {
            handleMoveToPage(centerBtn);
          }}
        >
          {centerBtn}
        </PageBtn>
      );

      for (let index = 1; index < 3; index += 1) {
        if (centerBtn + index <= lastPage) {
          btn.push(
            <PageBtn
              type="button"
              key={centerBtn + index}
              onClick={() => {
                handleMoveToPage(centerBtn + index);
              }}
            >
              {centerBtn + index}
            </PageBtn>
          );
        }
        if (centerBtn - index > 0) {
          btn.unshift(
            <PageBtn
              type="button"
              key={centerBtn - index}
              onClick={() => {
                handleMoveToPage(centerBtn - index);
              }}
            >
              {centerBtn - index}
            </PageBtn>
          );
        }
      }
    }

    if (centerBtn - 2 > 1 && centerBtn > 4) {
      btn.unshift(
        <div className="flex" key={1}>
          <PageBtn
            type="button"
            onClick={() => {
              handleMoveToPage(1);
            }}
          >
            {1}
          </PageBtn>
          <p className="mx-2"> ... </p>
        </div>
      );
    }

    if (centerBtn + 2 < lastPage && centerBtn < lastPage - 3) {
      btn.push(
        <div className="flex" key={pageData?.totalPages}>
          <p className="mx-2"> ... </p>
          <PageBtn
            type="button"
            onClick={() => {
              handleMoveToPage(lastPage);
            }}
          >
            {lastPage}
          </PageBtn>
        </div>
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
          {pageData.totalPages > 1 && currentpage !== pageData.totalPages && (
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
