import { styled } from 'styled-components';

const StyledBtn = styled.button`
  background-color: rgb(10, 149, 255);
  padding: 10.4px;
  border-radius: 3px;
  color: white;
  font-size: 13px;
  line-height: 15px;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
  box-sizing: border-box;
  cursor: pointer;
`;

function ReviewBtn() {
  return (
    <StyledBtn>Review your question</StyledBtn>
  );
}

export default ReviewBtn;
