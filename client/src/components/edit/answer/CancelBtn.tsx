import useMovePage from '../../../hooks/useMovePage';
import { AskBtn } from '../../../styles/styles';

function CancelBtn({ url }: { url: string }) {
  const HandleMovePage = useMovePage(url);
  return (
    <AskBtn className="bg-white text-bubg" onClick={HandleMovePage}>
      Cancel
    </AskBtn>
  );
}

export default CancelBtn;
