/* eslint-disable no-alert */
import { useMutation } from '@tanstack/react-query';
import { AskBtn } from '../../../styles/styles';
import useMovePage from '../../../hooks/useMovePage';
import { DelAnswerData, PatchAnswerData } from '../../../api/api';

function AnswerBtn({
  id,
  answerId,
  text,
  originalText,
}: {
  id: string;
  answerId: string;
  text: string;
  originalText: string;
}) {
  const goToQue = useMovePage(`/questions/${id}`);
  const mutationPatch = useMutation(PatchAnswerData, {
    onSuccess(data) {
      if (data.status === 200) {
        goToQue();
      }
    },
  });

  const mutationDel = useMutation(DelAnswerData, {
    onSuccess(data) {
      if (data.status === 204) {
        goToQue();
      }
    },
  });

  const HandlePatchAnswer = () => {
    if (window.confirm('답변을 수정하시겠습니까?')) {
      mutationPatch.mutate({ id, answerId, text });
    }
  };

  const HandleDeleteAnswer = () => {
    if (window.confirm('답변을 삭제하시겠습니까?')) {
      mutationDel.mutate({ id, answerId });
    }
  };

  const goToQuePge = useMovePage(`/questions/${id}`);
  const HandleCancelAnswer = () => {
    if (originalText !== text) {
      if (window.confirm('수정한 기록이 있습니다. 이전 페이지로 돌아가시겠습니까?')) {
        goToQuePge();
      }
    } else {
      goToQue();
    }
  };

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
