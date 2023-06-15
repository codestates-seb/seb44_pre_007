import tw from 'tailwind-styled-components';
import { styled } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { LiText13px } from './styles';

export const LiNavDisable = tw(LiText13px)`
p-1 pl-[30px] text-inactive cursor-pointer
`;

export const Liml8mt16 = tw.li`
ml-2 mt-4 text-label text-[11px]
`;

export const Lip8pr6 = tw(LiText13px)`
p-2 pr-1.5 text-inactive cursor-pointer
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
