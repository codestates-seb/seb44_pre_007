import tw from 'tailwind-styled-components';
import LiItems from './LiItems';
import useMediaQuery from '../../hooks/useMediaQuery';

const StyledGuideWrapper = tw.div`
flex flex-col w-[412px] mr-12 bp2:mr-0
`;
const StyledTitle = tw.h1`
text-2xl mb-4 bp2:text-xl text-center
`;

export default function Commuity() {
  const isDesktop = useMediaQuery('(min-width: 817px)');
  return (
    <StyledGuideWrapper>
      <StyledTitle>
        {isDesktop
          ? 'Join the Stack Overflow community'
          : 'Create your Stack Overflow account. It’s free and only takes a minute.'}
      </StyledTitle>
      <LiItems />
    </StyledGuideWrapper>
  );
}
