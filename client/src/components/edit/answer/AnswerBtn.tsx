import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AskBtn } from '../../../styles/styles';
import useMovePage from '../../../hooks/useMovePage';
import { PatchData, instance } from '../../../api/api';

function AnswerBtn({ id, answerId, text }: { id: string; answerId: string; text: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation(PatchData, {
    onSuccess: () => queryClient.invalidateQueries(['question']),
  });

  // Todo patch
  const HandlePatchAnswer = () => {
    mutation.mutate({ id, answerId, text });
  };

  const HandleDeleteAnswer = () => {
    instance
      .delete(`/questions/${id}/${answerId}/edit`)
      .then((res) => {
        if (res.status === 204) {
          window.alert('답변을 삭제했습니다.');
        }
      })
      .catch(() => {
        window.alert('삭제에 실패했습니다.');
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
