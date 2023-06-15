import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LiText13px } from './styles';

export const LiNavDisable = tw(LiText13px)`
p-1 pl-[30px] text-black600 cursor-pointer
`;

export const Liml8mt16 = tw.li`
ml-2 mt-4 text-blacklight text-[11px]
`;

export const Lip8pr6 = tw(LiText13px)`
p-2 pr-1.5 text-black600 cursor-pointer
`;

export const LiBtn = tw.li`
border-none p-1.5  flex justify-center text-[11px] cursor-pointer rounded-[3px]
`;

export const NavActive = styled(NavLink)`
  display: block;
  padding: 8px;
  padding-left: 6px;
  font-size: 13px;
  cursor: pointer;
  color: #525960;

  &.active {
    background-color: rgb(241, 242, 243);
    font-weight: bold;
    color: #0c0d0e;
    border-right: 3px solid orange;
  }
`;

export const HomeNav = styled(NavLink)`
  display: flex;
  align-items: center;
  &.active {
    background-color: rgb(241, 242, 243);
    font-weight: bold;
    color: #0c0d0e;
    border-right: 3px solid orange;
  }
`;

export const Div = styled.div`
  width: 298px;
  height: fit-content;
  height: auto;
  border-radius: 3px;
  margin-bottom: 16px;
`;

export const ContentLi = tw.li`
flex justify-center items-start my-3 px-4 text-[13px] gap-2 text-[#232629] break-words
`;

export const TitleLi = styled.li`
  padding: 12px 15px;
  font-size: 12px;
`;

export const WhiteDiv = styled(Div)`
  background-color: white;
  border: 1px solid rgb(214, 217, 220);
  border-top: none;
  border-bottom: none;
`;

export const WhiteTitle = styled(TitleLi)`
  font-size: 15px;
  background-color: rgb(248, 249, 249);
  border-top: rgb(214, 217, 220) solid 1px;
  border-bottom: rgb(214, 217, 220) solid 1px;
  color: rgb(82, 89, 96);
`;

export const CollectName = tw.h1`
  text-blacklight text-[15px]
`;

export const CollectContent = styled.p`
  height: 34px;
  font-size: 12px;
  color: #3b4045;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
