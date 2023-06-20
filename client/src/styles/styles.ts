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
  display: inline-block;
  height: 24px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 3px;
  background-color: rgb(208, 227, 241);
  font-size: 12px;
  color: rgb(44, 88, 119);
  cursor: pointer;
`;

export const AskBtn = tw.button`
flex justify-center items-center text-[13px] rounded-[3px] text-white 
bg-bubg shadow-btn border-bubg border border-solid p-[10.4px]
`;

export const SubTitle = tw.h2`
mt-3 mb-2 text-blackDark text-[19px]
`;

export const PreviewDiv = styled.div`
  font-size: 15px;
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
`;
