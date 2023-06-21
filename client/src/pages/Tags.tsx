import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AskQuestionBtn from '../components/AskQuestionBtn';
import addCommasToNumber from '../utils/addCommasToNumber';
import { Question } from '../types/types';
import Btn from '../ui/Btn';
import SummaryDiv from '../components/questions/SummaryDiv';
import { FetchTags } from '../api/api';
import RightSidebar from '../components/sidebar/RightSidebar';

function Tags() {
  const { questionTag } = useParams() as { questionTag: string };
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsCount, setQuestionsCount] = useState<string>('');

  const { isLoading, data, error } = useQuery({
    queryKey: ['tag'],
    queryFn: () => FetchTags(questionTag),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setQuestions(data.data.data);
      const dataLength = addCommasToNumber(data.data.pageInfo.totalElement);
      setQuestionsCount(dataLength);
    }
  }, [data]);

  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  return (
    <div className="flex w-[1100px] border-l p-6">
      <div className="w-[727px] max-h-[2000px]">
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
      </div>
      <RightSidebar />
    </div>
  );
}

export default Tags;
