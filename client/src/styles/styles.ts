import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';

export const LiText13px = tw.li`text-[13px]`;

export const FlexDiv = tw.div`
flex items-center`;

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
