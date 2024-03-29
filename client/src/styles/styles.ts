import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';

export const LiText13px = tw.li`text-[13px]`;

export const FlexDiv = tw.div`
flex items-center`;

export const Ellipsis = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const TagSpan = styled.span`
  display: flex;
  align-items: center;
  padding: 0 4px;
  margin: 0 4px;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 3px;
  background-color: rgb(208, 227, 241);
  font-size: 12px;
  color: rgb(44, 88, 119);
  cursor: pointer;
  min-width: fit-content;
`;

export const AskBtn = tw.button`
flex justify-center items-center text-[13px] rounded-[3px] text-white
bg-bubg shadow-btn border-bubg border border-solid p-[10.4px] disabled:bg-gray-400
`;

export const SubTitle = tw.h2`
mt-3 mb-2 text-blackDark text-[19px]
`;

export const ContentDiv = styled.div`
  font-size: 15px;
  color: rgb(35, 38, 41);

  h1 {
    font-size: 26px;
  }

  h2 {
    font-size: 20px;
  }

  a {
    color: blue;
    border-bottom: 1px solid blue;
  }

  pre {
    background-color: lightgray;
    padding: 10px;
    border-radius: 3px;
    font-size: 13px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

export const FlexJustifyBetweenDiv = tw.div`
flex justify-between`;

export const FlexCol = tw.div`
flex flex-col
`;

export const FlexColJustifyEndDiv = tw.div`
flex flex-col justify-end
`;

export const MainWrapper = tw.div`
p-6 border-l border-brgray
`;

export const StaticSpan = tw.div`
text-blacklight text-[13px] mt-1 w-fit"
`;

export const Summarydiv = tw.div`
p-4 flex border-b border-brgray
`;
export const TitleH3 = tw.div`
pr-6 text-[17px] text-[#0063BF] cursor-pointer
`;
