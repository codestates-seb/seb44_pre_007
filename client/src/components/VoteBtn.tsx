import tw from 'tailwind-styled-components';
import UpVote from '../public/Icons/UpVote';
import DownVote from '../public/Icons/DownVote';

const VoteButton = tw.button`
border border-gray-400 flex justify-center items-center rounded-full p-2.5
disabled:bg-gray-300
`;

type VoteBtnT = {
  status: 'LIKE' | 'DISLIKE' | 'NONE';
  callback: () => void;
  isMine: boolean;
};

export function VoteLikeBtn({ status, callback, isMine }: VoteBtnT) {
  return (
    <VoteButton type="button" disabled={status === 'LIKE' || isMine} onClick={callback}>
      <UpVote style={{ width: '18', height: '18' }} />
    </VoteButton>
  );
}

export function VoteDisLikeBtn({ status, callback, isMine }: VoteBtnT) {
  return (
    <VoteButton type="button" disabled={status === 'DISLIKE' || isMine} onClick={callback}>
      <DownVote style={{ width: '18', height: '18' }} />
    </VoteButton>
  );
}
