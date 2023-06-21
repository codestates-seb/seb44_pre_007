import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { DelQueData } from '../../api/api';
import useMovePage from '../../hooks/useMovePage';
import { ContentDiv } from '../../styles/styles';
import { QueT, TagT } from '../../types/types';
import Tag from '../../ui/Tag';
import formatingDate from '../../utils/formatingDate';

function QuestionContainer({ data }: { data: QueT }) {
  const { id } = useParams() as { id: string };
  const {
    questionContent: content,
    tagList: QTag,
    questionUpdated: updated,
    questionCreated: created,
    questionUserNickname: nickName,
  } = data;

  const mutationDel = useMutation(DelQueData);
  const goToEdit = useMovePage(`/questions/${id}/edit`);

  const HandleDeleteQuestion = () => {
    mutationDel.mutate({ id });
  };
  return (
    <div className="w-[727px] flex justify-end">
      <div className="w-[654px]">
        {!data && <p>Loading...</p>}
        {!!data && (
          <>
            <ContentDiv dangerouslySetInnerHTML={{ __html: content }} />
            <div className="flex gap-2 mt-4 mb-3">
              {QTag.map((tag: TagT) => (
                <Tag key={tag.tagId} content={tag.tagName} />
              ))}
            </div>
            <div className="flex justify-between text-[13px] my-4 pt-1">
              <div className="flex gap-2">
                <span
                  className="text-blacklight cursor-pointer"
                  onClick={goToEdit}
                  role="presentation"
                >
                  Edit
                </span>
                {/* Todo 작성자일 경우에만 버튼 보이도록 해야함 */}
                <span
                  className="text-blacklight cursor-pointer"
                  role="presentation"
                  onClick={HandleDeleteQuestion}
                >
                  Delete
                </span>
              </div>
              {updated !== created && (
                <span className="text-Link">edited {formatingDate(updated)}</span>
              )}
              <span className="text-Link">{nickName}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionContainer;
