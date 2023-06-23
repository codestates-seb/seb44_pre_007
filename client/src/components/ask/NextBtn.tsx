import { styled } from 'styled-components';

const StyledBtn = styled.button`
  margin-top: 12px;
  padding: 10.4px;
  background-color: rgb(10, 149, 255);
  border-color: rgba(0, 0, 0, 0);
  border-style: solid;
  border-width: 1px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 1px 0px 0px inset;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 13px;
  font-stretch: 100%;
  font-weight: 400;
  line-height: 15px;
  text-align: center;
  outline-color: white;
  outline-style: none;
  outline-width: 0px;
  &.disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

function NextBtn() {
  return (
    <StyledBtn>Next</StyledBtn>
  );
}

export default NextBtn;
