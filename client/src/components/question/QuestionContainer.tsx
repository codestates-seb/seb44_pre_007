import useMovePage from '../../hooks/useMovePage';
import { QueT, TagT } from '../../types/types';
import Tag from '../../ui/Tag';

function Question({ data }: { data: QueT }) {
  console.log(data);
  const {
    id,
    question_content: Content,
    question_tag: QTag,
    question_updated: Updated,
    questionUserNickname: NickName,
  } = data;

  const goToEdit = useMovePage(`/questions/${id}/edit`);
  return (
    <div className="w-[727px] flex justify-end">
      <div className="w-[654px]">
        {!data && <p>Loading...</p>}
        {!!data && (
          <>
            <div className="text-[15px] text-blackDark">{Content}</div>
            <div className="flex gap-2 mt-4 mb-3">
              {QTag.map((tag: TagT) => (
                <Tag content={tag.tagName} />
              ))}
            </div>
            <div className="flex justify-between text-[13px] my-4 pt-1">
              <span
                className="text-blacklight cursor-pointer"
                onClick={goToEdit}
                role="presentation"
              >
                Edit
              </span>
              <span className="text-Link">edited {Updated}</span>
              <span className="text-Link">{NickName}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Question;
