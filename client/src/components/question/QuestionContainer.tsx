import useMovePage from '../../hooks/useMovePage';
import { ContentDiv } from '../../styles/styles';
import { QueT, TagT } from '../../types/types';
import Tag from '../../ui/Tag';

function QuestionContainer({ data }: { data: QueT }) {
  const {
    id,
    questionContent: content,
    tagList: QTag,
    questionUpdated: updated,
    questionCreated: created,
    questionUserNickname: nickName,
  } = data;

  const goToEdit = useMovePage(`/questions/${id}/edit`);

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
                  // Todo delete onClick 기능 추가
                  role="presentation"
                >
                  Delete
                </span>
              </div>
              {/* Todo 날짜 가공 함수 구현해야함 */}
              {updated !== created && <span className="text-Link">edited {updated}</span>}
              <span className="text-Link">{nickName}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionContainer;