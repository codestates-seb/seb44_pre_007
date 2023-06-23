import { useParams } from 'react-router-dom';
import { AnswerT } from '../../types/types';
import useMovePage from '../../hooks/useMovePage';
import { ContentDiv } from '../../styles/styles';
import formatingDate from '../../utils/formatingDate';
import EditSpan from '../edit/EditSpan';

function Answer({ data, user }: { data: AnswerT; user: string }) {
  const {
    answerId,
    answerContent: content,
    answerUpdated: updated,
    answerCreated: created,
    answerUserNickname: nickName,
  } = data;
  const { id } = useParams();
  const goToEdit = useMovePage(`/questions/${id}/${answerId}/edit`);

  return (
    <div className="w-[654px] flex flex-col py-4 border-b border-brgray">
      <ContentDiv dangerouslySetInnerHTML={{ __html: content }} />
      <div className="flex justify-between text-[13px] my-4 pt-1">
        <div className="flex gap-2">{nickName === user && <EditSpan callback={goToEdit} />}</div>
        {updated !== created && <div className="text-Link">edited {formatingDate(updated)}</div>}
        <div className="text-Link">answered {formatingDate(created)}</div>
      </div>
      <div className="text-Link text-[13px] text-right">{nickName}</div>
    </div>
  );
}

export default Answer;
