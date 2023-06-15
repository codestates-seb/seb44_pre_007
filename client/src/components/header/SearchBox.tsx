import tw from 'tailwind-styled-components';
import { BiSearchAlt2 } from 'react-icons/bi';

export default function SearchBox() {
  const StyledForm = tw.form`
    grow mx-6 h-8 flex items-center
    `;
  const StyledInput = tw.input`
    border border-gray-400 rounded grow w-full h-full placeholder:text-sm px-5 md:max-sm:hidden
      `;
  const StyledIconWrapper = tw.div`
  absolute text-gray-600 ml-1
`;
  return (
    <StyledForm>
      <StyledIconWrapper>
        <BiSearchAlt2 />
      </StyledIconWrapper>
      <StyledInput type="text" placeholder="Search..." />
    </StyledForm>
  );
}
