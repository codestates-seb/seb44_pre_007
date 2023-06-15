import tw from 'tailwind-styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useState } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';

const StyledForm = tw.form`
grow mx-6 h-8 flex items-center
`;
const StyledIconWrapper = tw.div`
absolute text-gray-600 ml-1 text-lg
`;
const StyledInput = tw.input<{ $primary: boolean; $show: boolean }>`
border border-gray-400 rounded grow w-full h-full placeholder:text-sm px-6 focus:shadow-input focus:border-sky-400
${(props) => (props.$primary ? '' : 'absolute translate-y-11 -translate-x-1/2 w-full h-8')}
${(props) => (!props.$show && !props.$primary ? 'hidden' : '')}
  `;

export default function SearchBox() {
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const [showDropSearch, setShowDropSearch] = useState(false);
  const handleShowSearchBar = () => {
    setShowDropSearch(!showDropSearch);
  };

  return (
    <StyledForm>
      <StyledIconWrapper>
        {isDesktop ? <BiSearchAlt2 /> : <BiSearchAlt2 onClick={handleShowSearchBar} />}
      </StyledIconWrapper>
      <StyledInput
        $primary={isDesktop}
        $show={showDropSearch}
        type="text"
        placeholder="Search..."
      />
    </StyledForm>
  );
}