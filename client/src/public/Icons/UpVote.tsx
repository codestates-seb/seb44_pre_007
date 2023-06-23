import { IconStyle } from '../../types/types';

function UpVote({ style }: { style: IconStyle }) {
  return (
    <svg
      aria-hidden="true"
      className="svg-icon iconArrowUp"
      width={style.width}
      height={style.height}
      viewBox="0 0 18 18"
    >
      <path d="M1 12h16L9 4l-8 8Z" />
    </svg>
  );
}

export default UpVote;
