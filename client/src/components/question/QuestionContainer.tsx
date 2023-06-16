import useMovePage from '../../hooks/useMovePage';
import { QueT, TagT } from '../../types/types';
import Tag from '../../ui/Tag';

function QuestionContainer({ data }: { data: QueT }) {
  const {
    id,
    question_content: contetn,
    question_tag: QTag,
    question_updated: updated,
    question_created: created,
    questionUserNickname: nickName,
  } = data;

  const goToEdit = useMovePage(`/questions/${id}/edit`);
  return (
    <div className="w-[727px] flex justify-end">
      <div className="w-[654px]">
        {!data && <p>Loading...</p>}
        {!!data && (
          <>
            <div className="text-[15px] text-blackDark">{contetn}</div>
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
                  // delete onClick 기능 추가
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
