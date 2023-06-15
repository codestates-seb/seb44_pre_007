import { TagSpan } from '../styles/styles';

function Tag({ content }: { content: string }) {
  return <TagSpan className="py-1.2 px-1.5 mr-0.5 mb-0.5">{content}</TagSpan>;
}

export default Tag;
