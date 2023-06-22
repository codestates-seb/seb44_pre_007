import { useMutation } from '@tanstack/react-query';
import { AskBtn } from '../../../styles/styles';
import useMovePage from '../../../hooks/useMovePage';
import { DelAnswerData, PatchAnswerData } from '../../../api/api';

function AnswerBtn({ id, answerId, text }: { id: string; answerId: string; text: string }) {
  const goToQue = useMovePage(`/questions/${id}`);
  const mutationPatch = useMutation(PatchAnswerData, {
    onSuccess(data) {
      if (data.status === 200) {
        goToQue();
      }
    },
  });
  const mutationDel = useMutation(DelAnswerData);

  // Todo patch error 해결해야함
  const HandlePatchAnswer = () => {
    console.log('patch눌림');

    mutationPatch.mutate({ id, answerId, text });
  };

  const HandleDeleteAnswer = () => {
    mutationDel.mutate({ id, answerId });
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
