import tw from 'tailwind-styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';

const StyledForm = tw.form`
grow mx-6 h-8 flex items-center
`;
const StyledIconWrapper = tw.div`
absolute text-gray-600 ml-1 text-lg
`;
const StyledInput = tw.input<{ $primary: boolean; $show: boolean }>`
border border-gray-400 rounded grow w-full h-full text-sm font-light placeholder:text-sm px-6 focus:shadow-input focus:border-sky-400
${(props) => (props.$primary ? '' : 'absolute translate-y-11 inset-x-0 w-full h-8')}
${(props) => (!props.$show && !props.$primary ? 'hidden' : '')}
  `;

export default function SearchBox() {
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const [showDropSearch, setShowDropSearch] = useState(false);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const handleShowSearchBar = () => {
    setShowDropSearch(!showDropSearch);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/questions/tagged/${userInput}`);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledIconWrapper>
        {isDesktop ? <BiSearchAlt2 /> : <BiSearchAlt2 onClick={handleShowSearchBar} />}
      </StyledIconWrapper>
      <StyledInput
        $primary={isDesktop}
        $show={showDropSearch}
        type="text"
        placeholder="Search..."
        value={userInput}
        onChange={handleChange}
      />
    </StyledForm>
  );
}
