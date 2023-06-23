import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { DelQueData } from '../../api/api';
import useMovePage from '../../hooks/useMovePage';
import { ContentDiv } from '../../styles/styles';
import { QueT, TagT } from '../../types/types';
import Tag from '../../ui/Tag';
import formatingDate from '../../utils/formatingDate';
import ActionSpan from '../edit/ActionSpan';
import DateDiv from '../DateDiv';

function QuestionContainer({ data: QuestionData, user }: { data: QueT; user: string }) {
  const { id } = useParams() as { id: string };
  const {
    questionContent: content,
    tagList: QTag,
    questionUpdated: updated,
    questionCreated: created,
    questionUserNickname: nickName,
  } = QuestionData;

  const goToQueList = useMovePage('/questions');
  const mutationDel = useMutation(DelQueData, {
    onSuccess(data) {
      if (data.status === 204) {
        goToQueList();
      }
    },
  });

  const goToEdit = useMovePage(`/questions/${id}/edit`);

  const HandleDeleteQuestion = () => {
    mutationDel.mutate({ id });
  };
  return (
    <div className="w-[727px] flex justify-end">
      <div className="w-[654px]">
        {!QuestionData && <p>Loading...</p>}
        {!!QuestionData && (
          <>
            <ContentDiv dangerouslySetInnerHTML={{ __html: content }} />
            <div className="flex gap-2 mt-4 mb-3">
              {QTag.map((tag: TagT) => (
                <Tag key={tag.tagId} content={tag.tagName} />
              ))}
            </div>
            <div className="flex justify-between text-[13px] my-4 pt-1">
              <div className="flex gap-2">
                {user === nickName && (
                  <>
                    <ActionSpan callback={goToEdit} action="Edit" />
                    <ActionSpan callback={HandleDeleteQuestion} action="Delete" />
                  </>
                )}
              </div>
              {updated !== created && <DateDiv content="edited" date={updated} />}
              <span className="text-Link">{nickName}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionContainer;
