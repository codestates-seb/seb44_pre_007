import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { DelQueData, PostQueVoteDislike, PostQueVoteLike } from '../../api/api';
import useMovePage from '../../hooks/useMovePage';
import { ContentDiv } from '../../styles/styles';
import { QueT, TagT } from '../../types/types';
import Tag from '../../ui/Tag';
import ActionSpan from '../edit/ActionSpan';
import DateDiv from '../DateDiv';
import UpVote from '../../public/Icons/UpVote';
import DownVote from '../../public/Icons/DownVote';
import { VoteDisLikeBtn, VoteLikeBtn } from '../VoteBtn';
import VoteDiv from '../vote/VoteDiv';

const VoteButton = tw.button`
border border-gray-400 flex justify-center items-center rounded-full p-2.5
disabled:bg-gray-300
`;

function QuestionContainer({ data: QuestionData, user }: { data: QueT; user: string }) {
  const { id } = useParams() as { id: string };

  const {
    questionContent: content,
    tagList: QTag,
    questionUpdated: updated,
    questionCreated: created,
    userEmail: email,
    questionUserNickname: nickName,
    questionVoteCount,
    questionVoteStatus,
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
    if (window.confirm('잘문을 삭제하시겠습니까?')) {
      mutationDel.mutate({ id });
    }
  };

  const queryClient = useQueryClient();
  const mutationLike = useMutation(PostQueVoteLike, {
    onSuccess() {
      queryClient.invalidateQueries(['question']);
    },
  });
  const mutationDisLike = useMutation(PostQueVoteDislike, {
    onSuccess() {
      queryClient.invalidateQueries(['question']);
    },
  });

  const HandlePostLike = () => {
    mutationLike.mutate({ id });
  };
  const HandlePostDislike = () => {
    mutationDisLike.mutate({ id });
  };

  return (
    <div className="w-[727px] flex justify-between">
      <VoteDiv
        isMine={user === email}
        VoteStatus={questionVoteStatus}
        VoteCount={questionVoteCount}
        LikeCallback={HandlePostLike}
        DisLikeCallback={HandlePostDislike}
      />
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
                {user === email && (
                  <>
                    <ActionSpan callback={goToEdit} action="Edit" />
                    <ActionSpan callback={HandleDeleteQuestion} action="Delete" />
                  </>
                )}
              </div>
              {updated !== created && <DateDiv content="edited" date={updated} />}
              <span className="text-nickname">{nickName}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionContainer;
