/* eslint-disable operator-linebreak */
import { useEffect, useState } from 'react';
import Btn from '../ui/Btn';
import addCommasToNumber from '../utils/addCommasToNumber';
import { Question } from '../types/types';
import SummaryDiv from '../components/questions/SummaryDiv';
import { FetchQuestions } from '../api/api';
import { AskBtn } from '../styles/styles';
import useMovePage from '../hooks/useMovePage';
import RightSidebar from '../components/sidebar/RightSidebar';

// todo 페이지네이션, fetch 리액트쿼리 사용하기
function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsCount, setQuestionsCount] = useState<string>('');

  const fetchData = async () => {
    const res = await FetchQuestions(10);
    setQuestions(res.data);
    const dataLength = addCommasToNumber(res.data.length);
    setQuestionsCount(dataLength);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToAsk = useMovePage('/questions/ask');

  return (
    <div className="w-[727px]">
      <section className="mb-3">
        <div className="flex justify-between items-center h-[50px] mb-3">
          <h1 className="mr-3 mb-3 text-[27px] text-blackDark">All Questions</h1>
          <AskBtn onClick={goToAsk}>Ask Questions</AskBtn>
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
            <SummaryDiv key={question.id} question={question} />
          ))}
      </main>
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
