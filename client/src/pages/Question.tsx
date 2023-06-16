import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import QuestionContainer from '../components/question/QuestionContainer';
import RightSidebar from '../components/sidebar/RightSidebar';
import useMovePage from '../hooks/useMovePage';
import { AskBtn } from '../styles/styles';
import { FetchQuestion } from '../api/api';
import { QueT } from '../types/types';
import scrollToTop from '../utils/scrollToTop';
import AnswerContainer from '../components/question/AnswerContainer';

const DateDiv = tw.div`
text-blacklight text-[13px] pb-2
`;

function QuestionPage() {
  const { id } = useParams();
  const goToAsk = useMovePage('/questions/ask');
  const [data, setData] = useState<QueT>();

  const fetchQuestion = async () => {
    const res = await FetchQuestion(Number(id));
    setData(res.data);
  };

  useEffect(() => {
    fetchQuestion();
    scrollToTop();
  }, []);

  return (
    <div className="p-6 border-l border-brgray">
      <main className="w-[1051px]">
        <div className="flex justify-between items-start mb-3">
          {!!data && (
            <h1 className="mr-3 mb-3 text-[27px] text-blackDark">{data.question_title}</h1>
          )}
          <AskBtn className="w-[110px] h-[38px] text-[13px]" onClick={goToAsk}>
            Ask Question
          </AskBtn>
        </div>
        <div className="flex gap-4 pb-2 mb-4 border-b border-brgray">
          {!!data && (
            <>
              <DateDiv>Asked {data.question_created} </DateDiv>
              <DateDiv>Modified {data.question_updated}</DateDiv>
            </>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            {!!data && <QuestionContainer data={data} />}
            {!!data && data.answerCount > 0 && (
              <AnswerContainer datas={data.answers} id={data.id} answerCnt={data.answerCount} />
            )}
          </div>
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}

export default QuestionPage;
