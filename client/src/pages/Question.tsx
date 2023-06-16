import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Question from '../components/question/QuestionContainer';
import RightSidebar from '../components/sidebar/RightSidebar';
import useMovePage from '../hooks/useMovePage';
import { AskBtn } from '../styles/styles';
import { FetchQuestion } from '../api/api';
import { QueT } from '../types/types';

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
              <div className="text-blacklight text-[13px] pb-2">Asked {data.question_created} </div>
              <div className="text-blacklight text-[13px] pb-2">
                Modified {data.question_updated}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between">
          {!!data && <Question data={data} />}
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}

export default QuestionPage;
