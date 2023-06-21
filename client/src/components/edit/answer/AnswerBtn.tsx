import axios from 'axios';
import { AskBtn } from '../../../styles/styles';
import useMovePage from '../../../hooks/useMovePage';

function AnswerBtn({
  id,
  answerId,
  text,
}: {
  id: string | undefined;
  answerId: string | undefined;
  text: string | undefined;
}) {
  // Todo patch
  const HandlePatchAnswer = () => {
    console.log(text);
  };

  // Todo delete
  const HandleDeleteAnswer = () => {
    axios.delete(`http://3.35.43.193:8080/questions/${id}/${answerId}/edit`).then((res) => {
      console.log(res);
    });
  };

  const HandleCancelAnswer = useMovePage(`/questions/${id}`);

  return (
    <div className="flex pt-2.5 pb-[15px] gap-2">
      <AskBtn type="submit" onClick={HandlePatchAnswer}>
        Save edits
      </AskBtn>
      <AskBtn className="bg-red-500 border-red-500" type="submit" onClick={HandleDeleteAnswer}>
        Delete Answer
      </AskBtn>
      <AskBtn className="bg-white text-bubg border-none" type="submit" onClick={HandleCancelAnswer}>
        Cancel
      </AskBtn>
    </div>
  );
}

export default AnswerBtn;
