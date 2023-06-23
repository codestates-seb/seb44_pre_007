import tw from 'tailwind-styled-components';
import React, { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  TitleSection, ProblemSection, EffortSection, TagsSection, ReviewSection,
} from '../styles/askstyles';
import { AskBtn } from '../styles/styles';
import QuestionNotice from '../components/ask/QuestionNotice';
import QuestionEditor from '../components/ask/QuestionEditor';
import NextBtn from '../components/ask/NextBtn';
import { PostQuestionData } from '../api/api';

// input창 컴포넌트화?
const PostForm = tw.form`
  flex flex-col mb-12
`;

const DiscardBtn = tw.button`
  p-[10.4px] bg-[rgba(0, 0, 0, 0)] text-[#C22E32] hover:bg-[#FDF2F2]
`;

function AskQuestion() {
  const PreviewRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('title');
  const [problem, setProblem] = useState<string>('');
  const [effort, setEffort] = useState<string>('');
  const [tags, setTags] = useState<string[]>(['tag']);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // TODO: 태그 등록 수정
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags([e.target.value]);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(PostQuestionData, {
    onSuccess: () => queryClient.invalidateQueries(['question']),
  });

  const HandleSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (PreviewRef.current) {
      if (!PreviewRef.current.innerText.trim().length) return;
      const contents = `${problem} \n${effort}`;
      mutation.mutate({ title, contents, tags });
    }
  };

  return (
    <div className="bg-[#F8F9F9] w-full px-6 pb-6">
      <QuestionNotice />
      <PostForm onSubmit={HandleSubmitQuestion}>
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
                <input type="text" value={title} onChange={handleInputChange} maxLength={300} placeholder="e.g. Is there an R function for finding the index of and element in a vector?" className="border border-[#BABFC4] rounded-[3px] w-full my-[2px] p-2 text-[13px]" />
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
          <div className="bg-white w-9/12 p-6 border border-[#E3E6E8]">
            <div className="flex flex-col">
              <div className="flex flex-col my-[2px]">
                <div className="fw-semibold">Review questions already on Stack Overflow to see if your question is a duplicate.</div>
                <div className="text-xs">
                  Clicking on these questions will open them in a new tab for you to review.
                  Your progress will be saved so you can come back and continue.
                </div>
              </div>
              <div className="flex py-3">
                {/* TODO: 드롭다운 추가 */}
              </div>
            </div>
            <AskBtn type="submit">Review your question</AskBtn>
          </div>
        </ReviewSection>
        <div className="w-full mt-3">
          <div>
            <DiscardBtn type="button">Discard draft</DiscardBtn>
          </div>
        </div>
      </PostForm>
    </div>
  );
}

export default AskQuestion;
