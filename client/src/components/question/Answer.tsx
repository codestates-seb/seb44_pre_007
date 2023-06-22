import { useParams } from 'react-router-dom';
import { AnswerT } from '../../types/types';
import useMovePage from '../../hooks/useMovePage';
import { ContentDiv } from '../../styles/styles';
import formatingDate from '../../utils/formatingDate';

function Answer({ data }: { data: AnswerT }) {
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
        <div className="flex gap-2">
          {/* Todo 작성자일 경우에만 버튼 보이도록 해야함 */}
          <span className="text-blacklight cursor-pointer" onClick={goToEdit} role="presentation">
            Edit
          </span>
        </div>
        {updated !== created && <span className="text-Link">edited {formatingDate(updated)}</span>}
        <span className="text-Link">answered {formatingDate(created)}</span>
      </div>
      <div className="text-Link text-[13px] text-right">{nickName}</div>
    </div>
  );
}

export default Answer;
