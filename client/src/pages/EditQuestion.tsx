/* eslint-disable object-curly-newline */
import tw from 'tailwind-styled-components';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { TitleSection, ProblemSection, TagsSection, ReviewSection } from '../styles/askstyles';
import { AskBtn } from '../styles/styles';
import QuestionNotice from '../components/ask/QuestionNotice';
import QuestionEditor from '../components/ask/QuestionEditor';
import NextBtn from '../components/ask/NextBtn';
import { FetchQuestion, PatchQuestionData } from '../api/api';
import Tags from '../components/ask/Tags';
import useMovePage from '../hooks/useMovePage';

const PostForm = tw.form`
  flex flex-col mb-12
`;

const DiscardBtn = tw.button`
  p-[10.4px] bg-[rgba(0, 0, 0, 0)] text-[#C22E32] hover:bg-[#FDF2F2]
`;

function EditQuestion() {
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState<string>('');
  const [tags, setTags] = useState<Set<string>>(new Set());
  const [step, setStep] = useState<number>(0);
  const questionId = useParams();
  const goToQue = useMovePage('/questions');

  const { isLoading, data, error } = useQuery({
    queryKey: ['question'],
    queryFn: () => FetchQuestion(Number(questionId.id)),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setTitle(data.data.questionTitle);
      setProblem(data.data.questionContent);
      const tagsArr: string[] = [];
      data.data.tagList.forEach((x: { tagId: number; tagName: string }) => tagsArr.push(x.tagName));
      setTags(new Set(tagsArr));
    }
  }, [data]);

  const mutation = useMutation(PatchQuestionData, {
    onSuccess(res) {
      if (res.status === 200) {
        goToQue();
      }
    },
  });

  if (isLoading) return <p>Loading ...</p>;
  if (error instanceof Error) return <p>`error has ocurred: {error.message}</p>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const HandleSubmitQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      id: questionId.id as string,
      title,
      contents: problem,
      tags: [...tags],
    });
  };

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
              <div className="flex flex-col my-[2px]">
                <div className="fw-semibold">Title</div>
                <div className="text-xs">
                  Be specific and imagine you&apos;re asking a question to another person.
                </div>
              </div>
              <div className="flex ps-relative">
                <input
                  defaultValue={title}
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
            <div className="flex flex-col my-[2px]">
              <div className="fw-semibold">Body</div>
            </div>
            <QuestionEditor disabled={step < 1} text={problem} setText={setProblem} />
            <NextBtn
              disabled={!problem.trim().length}
              callback={() => {
                HandleToStep(1);
              }}
            />
          </div>
        </ProblemSection>
        <TagsSection>
          <div className="bg-white w-9/12 p-6 border border-[#E3E6E8]">
            <div className="flex flex-col">
              <div className="flex flex-col my-[2px]">
                <div className="fw-semibold">Tags</div>
                <div className="text-xs">
                  Add up to 5 tags to describe what your question is about. Start typing to see
                  sugestions.
                </div>
              </div>
              <Tags disabled={step < 2} tags={tags} setTags={setTags} edit />
            </div>
            <NextBtn
              disabled={tags.size === 0}
              callback={() => {
                HandleToStep(2);
              }}
            />
          </div>
        </TagsSection>
        <ReviewSection>
          <div className="bg-white w-9/12 p-6 border border-[#E3E6E8]">
            <div className="flex flex-col">
              <div className="flex flex-col my-[2px]">
                <div className="fw-semibold">
                  Review questions already on Stack Overflow to see if your question is a duplicate.
                </div>
                <div className="text-xs">
                  Clicking on these questions will open them in a new tab for you to review. Your
                  progress will be saved so you can come back and continue.
                </div>
              </div>
            </div>
            <AskBtn type="submit">Review your question</AskBtn>
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

export default EditQuestion;
