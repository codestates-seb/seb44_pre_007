import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import QuestionContainer from '../components/question/QuestionContainer';
import RightSidebar from '../components/sidebar/RightSidebar';
import { FetchQuestion } from '../api/api';
import { QueT } from '../types/types';
import scrollToTop from '../utils/scrollToTop';
import AnswerContainer from '../components/question/AnswerContainer';
import AskQuestionBtn from '../components/AskQuestionBtn';
import AnswerEditor from '../components/question/AnswerEditor';

const DateDiv = tw.div`
text-blacklight text-[13px] pb-2
`;

function QuestionPage() {
  const { id } = useParams();
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
          {!!data && <h1 className="mr-3 mb-3 text-[27px] text-blackDark">{data.questionTitle}</h1>}
          <AskQuestionBtn />
        </div>
        <div className="flex gap-4 pb-2 mb-4 border-b border-brgray">
          {!!data && (
            <>
              <DateDiv>Asked {data.questionCreated} </DateDiv>
              {data.questionCreated !== data.questionUpdated && (
                <DateDiv>Modified {data.questionUpdated}</DateDiv>
              )}
            </>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            {!!data && <QuestionContainer data={data} />}
            {!!data && data.answerCount > 0 && (
              <AnswerContainer datas={data.answers} id={data.id} answerCnt={data.answerCount} />
            )}
            {/* //Todo 로그인했을 때만 답변 달 수 있도록 */}
            <AnswerEditor />
          </div>
          <RightSidebar />
        </div>
      </main>
    </div>
  );
}

export default QuestionPage;
