import { IconStyle } from '../../types/types';

function DownVote({ style }: { style: IconStyle }) {
  return (
    <svg
      aria-hidden="true"
      className="svg-icon iconArrowDown"
      width={style.width}
      height={style.height}
      viewBox="0 0 18 18"
    >
      <path d="M1 6h16l-8 8-8-8Z" />
    </svg>
  );
}

export default DownVote;
