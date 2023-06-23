/* eslint-disable object-curly-newline */
import { VoteDisLikeBtn, VoteLikeBtn } from '../VoteBtn';

type VoteT = {
  isMine: boolean;
  VoteStatus: 'LIKE' | 'DISLIKE' | 'NONE';
  VoteCount: number;
  LikeCallback: () => void;
  DisLikeCallback: () => void;
};
function VoteDiv({ isMine, VoteStatus, VoteCount, LikeCallback, DisLikeCallback }: VoteT) {
  return (
    <div className="w-[45px] flex flex-col items-center justify-start pt-4">
      {!isMine && (
        <>
          <VoteLikeBtn status={VoteStatus} callback={LikeCallback} isMine={isMine} />
          <div className="text-[19px] flex justify-center items-center py-1">{VoteCount}</div>
          <VoteDisLikeBtn status={VoteStatus} callback={DisLikeCallback} isMine={isMine} />
        </>
      )}
    </div>
  );
}

export default VoteDiv;
