import tw from 'tailwind-styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionNotice from '../components/ask/QuestionNotice';
import QuestionEditor from '../components/ask/QuestionEditor';
import NextBtn from '../components/ask/NextBtn';

type QuestionData = {
  questionTitle: string;
  questionContent: string;
  questionTag: string[] | null;
};

const PostForm = tw.form`
  flex
`;

const TitleSection = tw.div`
  flex w-full
`;

const ProblemSection = tw.div`
  flex w-full mt-3
`;

const EffortSection = tw.div`
  flex w-full mt-3
`;

function AskQuestion() {
  const { id } = useParams() as { id: string };
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState<string>('');
  const [effort, setEffort] = useState<string>('');

  return (
    <div>
      <QuestionNotice />
      <PostForm>
        <TitleSection>
          <div className="p-6 flex flex-col">
            <div className="flex flex-col">
              <div className="fw-semibold">Title</div>
              <div className="text-xs">
                Be specific and imagine you&apos;re asking a question to another person.
              </div>
            </div>
          </div>
          <div className="flex ps-relative">
            <input id="title" name="title" type="text" maxLength={300} placeholder="e.g. Is there an R function for finding the index of and element in a vector?" />
          </div>
          <NextBtn />
        </TitleSection>
        <ProblemSection>
          <div className="bg-white p-6 flex">
            <div className="flex flex-col">
              <div className="fw-semibold">What are the details of your problem?</div>
              <div className="text-xs">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </div>
            </div>
            <QuestionEditor text={problem} setText={setProblem} />
            <NextBtn />
          </div>
        </ProblemSection>
        <EffortSection>
          <div className="bg-white p-6 flex">
            <div className="flex flex-col">
              <div className="fw-semibold">What did you try and what were you expecting?</div>
              <div className="text-xs">
                Describe what you tried, what you expected to happen, and what actually resulted.
                Minimum 20 characters.
              </div>
            </div>
            <QuestionEditor text={effort} setText={setEffort} />
          </div>
        </EffortSection>
      </PostForm>
    </div>
  );
}

export default AskQuestion;
