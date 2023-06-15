import { HiPencil } from 'react-icons/hi';
import { TiMessage } from 'react-icons/ti';
import { BsStackOverflow } from 'react-icons/bs';
import { styled } from 'styled-components';
import { TitleLi, Div, ContentLi } from '../../styles/sidebarstyle';

const YelloTitle = styled(TitleLi)`
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
            2023 Developer Survey results are in: the latest trends in technology and...
          </p>
        </ContentLi>
        <ContentLi>
          <HiPencil size={14} className="mt-1" />
          <p className="w-[244px]">
            Hype or not? AI’s benefits for developers explored in the 2023 Developer Survey
          </p>
        </ContentLi>
        <YelloTitle>Featured on Meta</YelloTitle>
        <ContentLi>
          <TiMessage size={14} fill="#379fef" className="mt-1" />
          <p className="w-[244px]">Statement from SO: June 5, 2023 Moderator Action</p>
        </ContentLi>
        <ContentLi>
          <TiMessage size={14} fill="#379fef" className="mt-1" />
          <p className="w-[244px]">
            Planned maintenance scheduled for Thursday, June 15, 2023 at 21:00 UTC
          </p>
        </ContentLi>
        <ContentLi>
          <BsStackOverflow size={14} className="mt-1" />
          <p className="w-[244px]">
            Does the policy change for AI-generated content affect users who (want to)...
          </p>
        </ContentLi>
        <ContentLi>
          <BsStackOverflow size={14} className="mt-1" />
          <p className="w-[244px]">Temporary policy: ChatGPT is banned</p>
        </ContentLi>
        <YelloTitle>Hot Meta Posts</YelloTitle>
        <ContentLi>
          <p className="text-inactive">19</p>
          <p className="w-[244px]">
            {' '}
            Should curators be allowed to save questions with mostly code?
          </p>
        </ContentLi>
        <ContentLi>
          <p className="text-inactive">9</p>
          <p className="w-[244px]">
            {' '}
            Can I ask a question for explanations of specific blocks of code, instead of...
          </p>
        </ContentLi>
      </ul>
    </YellowDiv>
  );
}

export default YellowContainer;
