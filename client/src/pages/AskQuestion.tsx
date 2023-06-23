import tw from 'tailwind-styled-components';
import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import {
  TitleSection, ProblemSection, EffortSection, TagsSection, ReviewSection,
} from '../styles/askstyles';
import QuestionNotice from '../components/ask/QuestionNotice';
import QuestionEditor from '../components/ask/QuestionEditor';
import NextBtn from '../components/ask/NextBtn';
import ReviewBtn from '../components/ask/ReviewBtn';
import { PostQuestionData } from '../api/api';

type QuestionData = {
  questionTitle: string;
  questionContent: string;
  questionTag: string[] | null;
};

// input창 컴포넌트화?
const PostForm = tw.form`
  flex flex-col mb-12
`;

function AskQuestion() {
  // const { id } = useParams() as { id: string };
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState<string>('');
  const [effort, setEffort] = useState<string>('');

  return (
    <div className="bg-[#F8F9F9] w-full px-6 pb-6">
      <QuestionNotice />
      <PostForm>
        <TitleSection>
          <div className="bg-white w-9/12 p-6 border border-[#E3E6E8]">
            <div className="flex flex-col">
              <div className="flex flex-col my-[2px]">
                <div className="fw-semibold">Title</div>
                <div className="text-xs">
                  Be specific and imagine you&apos;re asking a question to another person.
                </div>
              </div>
              <div className="flex ps-relative">
                <input type="text" maxLength={300} placeholder="e.g. Is there an R function for finding the index of and element in a vector?" className="border border-[#BABFC4] rounded-[3px] w-full my-[2px] p-2 text-[13px]" />
              </div>
            </div>
            <NextBtn />
          </div>
        </TitleSection>
        <ProblemSection>
          <div className="bg-white w-9/12 p-6 flex-col border border-[#E3E6E8]">
            <div className="flex flex-col my-[2px]">
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
          <div className="bg-white w-9/12 p-6 flex-col border border-[#E3E6E8]">
            <div className="flex flex-col my-[2px]">
              <div className="fw-semibold">What did you try and what were you expecting?</div>
              <div className="text-xs">
                Describe what you tried, what you expected to happen, and what actually resulted.
                Minimum 20 characters.
              </div>
            </div>
            <QuestionEditor text={effort} setText={setEffort} />
          </div>
        </EffortSection>
        <TagsSection>
          <div className="bg-white w-9/12 p-6 border border-[#E3E6E8]">
            <div className="flex flex-col">
              <div className="flex flex-col my-[2px]">
                <div className="fw-semibold">Tags</div>
                <div className="text-xs">
                  Add up to 5 tags to describe what your question is about.
                  Start typing to see sugestions.
                </div>
              </div>
              <div className="flex ps-relative">
                <input type="text" placeholder="e.g. (swift spring postgresql)" className="border border-[#BABFC4] rounded-[3px] w-full my-[2px] p-2 text-[13px]" />
              </div>
            </div>
            <NextBtn />
          </div>
        </TagsSection>
        <ReviewSection>
          {/* Todo: 드롭다운 추가 */}
          <ReviewBtn />
        </ReviewSection>
      </PostForm>
    </div>
  );
}

export default AskQuestion;
