import { styled } from 'styled-components';
import { Props } from '../types/types';

const Button = styled.button`
  height: 35px;
  padding: 9.6px;
  border: 1px solid rgb(55, 159, 239);
  border-radius: 3px;
  font-size: 12px;
  color: rgb(0, 99, 191);

  &:hover {
    background-color: rgb(55, 159, 239, 0.2);
  }
`;

function Btn({ children }: Props) {
  return (
    <Button type="button" className="flex justify-center items-center">
      {children}
    </Button>
  );
}

export default Btn;
