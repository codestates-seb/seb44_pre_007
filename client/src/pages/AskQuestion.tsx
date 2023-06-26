import tw from 'tailwind-styled-components';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  TitleSection,
  ProblemSection,
  EffortSection,
  TagsSection,
  ReviewSection,
} from '../styles/askstyles';
import { AskBtn } from '../styles/styles';
import QuestionNotice from '../components/ask/QuestionNotice';
import QuestionEditor from '../components/ask/QuestionEditor';
import NextBtn from '../components/ask/NextBtn';
import { PostQuestionData } from '../api/api';
import Tags from '../components/ask/Tags';
import useMovePage from '../hooks/useMovePage';
import AskDescriptionDiv from '../components/ask/AskDescriptionDiv';

const PostForm = tw.form`
  flex flex-col mb-12
`;

const DiscardBtn = tw.button`
  p-[10.4px] bg-[rgba(0, 0, 0, 0)] text-[#C22E32] hover:bg-[#FDF2F2]
`;

function AskQuestion() {
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState<string>('');
  const [effort, setEffort] = useState<string>('');
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [step, setStep] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const navigate = useNavigate();
  const goToQue = useMovePage('/questions');
  const mutation = useMutation(PostQuestionData, {
    onSuccess(data) {
      if (data.status === 201) {
        navigate(data.headers.location);
      }
    },
  });
  const HandleSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contents = `${problem} \n${effort}`;
    mutation.mutate({ title, contents, tags: [...tags] });
  };

  const askDescription = [
    {
      title: 'Title',
      description: 'Be specific and imagine you&apos;re asking a question to another person.',
    },
    {
      title: 'What are the details of your problem?',
      description:
        ' Introduce the problem and expand on what you put in the title. Minimum 20 characters.',
    },
    {
      title: 'What did you try and what were you expecting?',
      description:
        ' Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.',
    },
    {
      title: 'Tags',
      description:
        'Add up to 5 tags to describe what your question is about. Start typing to see sugestions.',
    },
    {
      title: 'Review questions already on Stack Overflow to see if your question is a duplicate.',
      description:
        'Clicking on these questions will open them in a new tab for you to review. Your progress will be saved so you can come back and continue.',
    },
  ];

  const HandleToStep = (stepNum: number) => {
    setStep(stepNum + 1);
  };

  return (
    <div className="bg-[#F8F9F9] w-full px-6 pb-6">
      <QuestionNotice />
      <PostForm onSubmit={HandleSubmitQuestion}>
        <TitleSection>
          <div className="bg-white w-9/12 p-6 border border-[#E3E6E8]">
            <div className="flex flex-col">
              <AskDescriptionDiv
                title={askDescription[0].title}
                description={askDescription[0].description}
              />
              <div className="flex ps-relative">
                <input
                  type="text"
                  onChange={handleInputChange}
                  maxLength={300}
                  placeholder="e.g. Is there an R function for finding the index of and element in a vector?"
                  className="border border-[#BABFC4] rounded-[3px] w-full my-[2px] p-2 text-[13px]"
                />
              </div>
            </div>
            <NextBtn
              disabled={!title.trim().length}
              callback={() => {
                HandleToStep(0);
              }}
            />
          </div>
        </TitleSection>
        <ProblemSection>
          <div className="bg-white w-9/12 p-6 flex-col border border-[#E3E6E8]">
            <AskDescriptionDiv
              title={askDescription[1].title}
              description={askDescription[1].description}
            />
            <QuestionEditor disabled={step < 1} text={problem} setText={setProblem} />
            <NextBtn
              disabled={!problem.trim().length}
              callback={() => {
                HandleToStep(1);
              }}
            />
          </div>
        </ProblemSection>
        <EffortSection>
          <div className="bg-white w-9/12 p-6 flex-col border border-[#E3E6E8]">
            <AskDescriptionDiv
              title={askDescription[2].title}
              description={askDescription[2].description}
            />
            <QuestionEditor disabled={step < 2} text={effort} setText={setEffort} />
            <NextBtn
              disabled={!effort.trim().length}
              callback={() => {
                HandleToStep(2);
              }}
            />
          </div>
        </EffortSection>
        <TagsSection>
          <div className="bg-white w-9/12 p-6 border border-[#E3E6E8]">
            <div className="flex flex-col">
              <AskDescriptionDiv
                title={askDescription[3].title}
                description={askDescription[3].description}
              />
              <Tags disabled={step < 3} tags={tags} setTags={setTags} edit={false} />
            </div>
            <NextBtn
              disabled={tags.size === 0}
              callback={() => {
                HandleToStep(3);
              }}
            />
          </div>
        </TagsSection>
        <ReviewSection>
          <div className="bg-white w-9/12 p-6 border border-[#E3E6E8]">
            <AskBtn type="submit" disabled={step < 4}>
              Review your question
            </AskBtn>
          </div>
        </ReviewSection>
        <div className="w-full mt-3">
          <div>
            <DiscardBtn type="button" onClick={goToQue}>
              Discard draft
            </DiscardBtn>
          </div>
        </div>
      </PostForm>
    </div>
  );
}

export default AskQuestion;
