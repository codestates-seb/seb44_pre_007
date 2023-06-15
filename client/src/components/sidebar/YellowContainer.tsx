import { HiPencil } from 'react-icons/hi';
import { TiMessage } from 'react-icons/ti';
import { BsStackOverflow } from 'react-icons/bs';
import { styled } from 'styled-components';
import { TitleLi, Div, ContentLi } from '../../styles/sidebarstyle';

const YelloTitle = styled(TitleLi)`
  color: #525960;
  font-weight: bold;
  background-color: #fbf3d5;
  border-top: rgb(241, 229, 188) solid 1px;
  border-bottom: rgb(241, 229, 188) solid 1px;
`;

const YellowDiv = styled(Div)`
  background-color: rgb(253, 247, 226);
  border: solid 1px rgb(241, 229, 188);
  border-top: none;
`;

function YellowContainer() {
  return (
    <YellowDiv>
      <ul>
        <YelloTitle>The Overflow Blog</YelloTitle>
        <ContentLi>
          <HiPencil size={14} className="mt-1" />
          <p className="w-[244px]">
            <a
              href="https://stackoverflow.blog/2023/06/13/developer-survey-results-are-in/?cb=1"
              target="_blank"
              rel="noreferrer"
            >
              2023 Developer Survey results are in: the latest trends in technology and...
            </a>
          </p>
        </ContentLi>
        <ContentLi>
          <HiPencil size={14} className="mt-1" />
          <p className="w-[244px]">
            <a
              href="https://stackoverflow.blog/2023/06/14/hype-or-not-developers-have-something-to-say-about-ai/?cb=1"
              target="_blank"
              rel="noreferrer"
            >
              Hype or not? AI’s benefits for developers explored in the 2023 Developer Survey
            </a>
          </p>
        </ContentLi>
        <YelloTitle>Featured on Meta</YelloTitle>
        <ContentLi>
          <TiMessage size={14} fill="#379fef" className="mt-1" />
          <p className="w-[244px]">
            <a
              href="https://meta.stackexchange.com/questions/389834/statement-from-so-june-5-2023-moderator-action?cb=1"
              target="_blank"
              rel="noreferrer"
            >
              Statement from SO: June 5, 2023 Moderator Action
            </a>
          </p>
        </ContentLi>
        <ContentLi>
          <TiMessage size={14} fill="#379fef" className="mt-1" />
          <p className="w-[244px]">
            <a
              href="https://meta.stackexchange.com/questions/390234/planned-maintenance-scheduled-for-thursday-june-15-2023-at-2100-utc?cb=1"
              target="_blank"
              rel="noreferrer"
            >
              Planned maintenance scheduled for Thursday, June 15, 2023 at 21:00 UTC
            </a>
          </p>
        </ContentLi>
        <ContentLi>
          <BsStackOverflow size={14} className="mt-1" />
          <p className="w-[244px]">
            <a
              href="https://meta.stackoverflow.com/questions/424910/does-the-policy-change-for-ai-generated-content-affect-users-who-want-to-flag?cb=1"
              target="_blank"
              rel="noreferrer"
            >
              Does the policy change for AI-generated content affect users who (want to)...
            </a>
          </p>
        </ContentLi>
        <ContentLi>
          <BsStackOverflow size={14} className="mt-1" />
          <p className="w-[244px]">
            <a
              href="https://meta.stackoverflow.com/questions/421831/temporary-policy-chatgpt-is-banned?cb=1"
              target="_blank"
              rel="noreferrer"
            >
              Temporary policy: ChatGPT is banned
            </a>
          </p>
        </ContentLi>
        <YelloTitle>Hot Meta Posts</YelloTitle>
        <ContentLi>
          <p className="text-600">19</p>
          <p className="w-[244px]">
            {' '}
            <a
              href="https://meta.stackoverflow.com/questions/425099/should-curators-be-allowed-to-save-questions-with-mostly-code?cb=1"
              target="_blank"
              rel="noreferrer"
            >
              Should curators be allowed to save questions with mostly code?
            </a>
          </p>
        </ContentLi>
        <ContentLi>
          <p className="text-600">9</p>
          <p className="w-[244px]">
            {' '}
            <a
              href="https://meta.stackoverflow.com/questions/425124/can-i-ask-a-question-for-explanations-of-specific-blocks-of-code-instead-of-usi?cb=1"
              target="_blank"
              rel="noreferrer"
            >
              Can I ask a question for explanations of specific blocks of code, instead of...
            </a>
          </p>
        </ContentLi>
      </ul>
    </YellowDiv>
  );
}

export default YellowContainer;
