import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnswerT } from '../../types/types';
import useMovePage from '../../hooks/useMovePage';
import { ContentDiv, FlexColJustifyEndDiv, FlexJustifyBetweenDiv } from '../../styles/styles';
import ActionSpan from '../edit/ActionSpan';
import DateDiv from '../DateDiv';
import VoteDiv from '../vote/VoteDiv';
import { PostAnsDislike, PostAnsVoteLike } from '../../api/api';

function AnswerDiv({ data, user }: { data: AnswerT; user: string }) {
  const {
    answerId,
    answerContent: content,
    answerUserEmail: email,
    answerUpdated: updated,
    answerCreated: created,
    answerUserNickname: nickName,
    answerVoteCount,
    answerVoteStatus,
  } = data;

  const { id } = useParams();
  const goToEdit = useMovePage(`/questions/${id}/${answerId}/edit`);

  const queryClient = useQueryClient();
  const mutationLike = useMutation(PostAnsVoteLike, {
    onSuccess() {
      queryClient.invalidateQueries(['question']);
    },
  });
  const mutationDisLike = useMutation(PostAnsDislike, {
    onSuccess() {
      queryClient.invalidateQueries(['question']);
    },
  });

  const HandlePostLike = () => {
    mutationLike.mutate({ answerId });
  };
  const HandlePostDislike = () => {
    mutationDisLike.mutate({ answerId });
  };

  return (
    <div className="flex justify-between w-full">
      <VoteDiv
        isMine={user === email}
        VoteStatus={answerVoteStatus}
        VoteCount={answerVoteCount}
        LikeCallback={HandlePostLike}
        DisLikeCallback={HandlePostDislike}
      />
      <div className="w-[654px] flex flex-col py-4 border-b border-brgray">
        <ContentDiv dangerouslySetInnerHTML={{ __html: content }} />
        <FlexJustifyBetweenDiv className="text-[13px] my-4 pt-1">
          <div className="flex gap-2">
            {email === user && <ActionSpan callback={goToEdit} action="Edit" />}
          </div>
          <FlexColJustifyEndDiv>
            {updated !== created && <DateDiv content="edited" date={updated} />}
            <DateDiv content="answered" date={created} />
          </FlexColJustifyEndDiv>
        </FlexJustifyBetweenDiv>
        <div className="text-Link text-[13px] text-right">{nickName}</div>
      </div>
    </div>
  );
}

export default AnswerDiv;
