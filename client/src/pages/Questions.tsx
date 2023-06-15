/* eslint-disable operator-linebreak */
import { useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Btn from '../ui/Btn';
import addCommasToNumber from '../utils/addCommasToNumber';
import { Question } from '../types/types';
import SummaryDiv from '../components/questions/SummaryDiv';

const AskBtn = tw.button`
flex justify-center items-center text-[13px] rounded-[3px] text-white 
bg-bubg shadow-btn border-bubg border border-solid p-[10.4px]
`;

function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsCount, setQuestionsCount] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:5000/questions?_limit=10').then((res) => {
      setQuestions(res.data);
      const dataLength = addCommasToNumber(res.data.length);
      setQuestionsCount(dataLength);
    });
  }, []);

  const navigate = useNavigate();
  const goToAsk = () => {
    navigate('/questions/ask');
  };
  return (
    <div className="w-[751px]">
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

export default Questions;
