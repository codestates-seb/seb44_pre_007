import tw from 'tailwind-styled-components';
import Question from '../../public/Icons/Question';
import Unlock from '../../public/Icons/Unlock';
import Tag from '../../public/Icons/Tag';
import Achievement from '../../public/Icons/Achievement';
import { IconStyle } from '../../types/types';

export interface GuideItem {
  id: number;
  icon: JSX.Element;
  content: string;
}

const liItemStyle: IconStyle = {
  width: '26',
  height: '26',
  color: '#0995FF',
};

const guideItems: GuideItem[] = [
  { id: 1, icon: <Question style={liItemStyle} />, content: 'Get unstuck — ask a question' },
  {
    id: 2,
    icon: <Unlock style={liItemStyle} />,
    content: 'Unlock new privileges like voting and commenting',
  },
  {
    id: 3,
    icon: <Tag style={liItemStyle} />,
    content: 'Save your favorite questions, answers, watch tags, and more',
  },
  { id: 4, icon: <Achievement style={liItemStyle} />, content: 'Earn reputation and badges' },
];

const StyledUl = tw.ul`
bp2:hidden
`;

const StyledLi = tw.li`
flex my-6
`;
const StyledIconWrapper = tw.span`
mr-4
`;

export default function LiItems() {
  return (
    <StyledUl>
      {guideItems.map((item) => (
        <StyledLi key={item.id}>
          <StyledIconWrapper> {item.icon}</StyledIconWrapper>
          {item.content}
        </StyledLi>
      ))}
    </StyledUl>
  );
}
