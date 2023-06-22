import useMovePage from '../hooks/useMovePage';
import { TagSpan } from '../styles/styles';

function Tag({ content }: { content: string }) {
  const goToTagPage = useMovePage(`/questions/tagged/${content}`);
  return (
    <TagSpan className="py-1.2 px-1.5 mr-0.5 mb-0.5" onClick={goToTagPage}>
      {content}
    </TagSpan>
  );
}

export default Tag;
