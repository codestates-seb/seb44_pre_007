import { useParams } from 'react-router-dom';
import { AnswerT } from '../../types/types';
import useMovePage from '../../hooks/useMovePage';
import { ContentDiv, FlexColJustifyEndDiv, FlexJustifyBetweenDiv } from '../../styles/styles';
import ActionSpan from '../edit/ActionSpan';
import DateDiv from '../DateDiv';

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
      <FlexJustifyBetweenDiv className="text-[13px] my-4 pt-1">
        <div className="flex gap-2">
          {nickName === user && <ActionSpan callback={goToEdit} action="Edit" />}
        </div>
        <FlexColJustifyEndDiv>
          {updated !== created && <DateDiv content="edited" date={updated} />}
          <DateDiv content="answered" date={created} />
        </FlexColJustifyEndDiv>
      </FlexJustifyBetweenDiv>
      <div className="text-Link text-[13px] text-right">{nickName}</div>
    </div>
  );
}

export default Answer;
