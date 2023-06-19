import { IconStyle } from '../../types/types';

export default function Unlock({ style }: { style: IconStyle }) {
  return (
    <svg width={style.width} height={style.height} className="svg-icon mtn2">
      <path
        d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"
        fill={style.color}
      />
      <path
        opacity=".5"
        d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
        fill={style.color}
      />
    </svg>
  );
}
