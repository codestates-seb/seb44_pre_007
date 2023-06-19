import { styled } from 'styled-components';

export const PageButton = styled.button<{ $nowpage?: string }>`
  height: 25px;
  background-color: ${(props) => (props.$nowpage === 'true' ? '#F48225' : 'white')};
  color: ${(props) => (props.$nowpage === 'true' ? 'white' : '#3B4045')};
  padding-left: 8px;
  padding-right: 8px;
  border: 1px solid;
  border-color: ${(props) => (props.$nowpage === 'true' ? 'none' : 'rgba(186, 191, 196)')};
  border-radius: 3px;
  font-size: 13px;
  font-weight: 400;
`;

type BtnT = {
  currentpage: number;
  index: number;
  callback: (pageNumber: number) => void;
};

function PageBtn({ currentpage, index, callback }: BtnT) {
  return (
    <PageButton
      type="button"
      $nowpage={(currentpage === index).toString()}
      onClick={() => {
        callback(index);
      }}
    >
      {index}
    </PageButton>
  );
}

export default PageBtn;
