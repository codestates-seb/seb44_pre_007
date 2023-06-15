import tw from 'tailwind-styled-components';
import { CollectName, CollectContent } from '../../styles/sidebarstyle';
import Btn from '../../ui/Btn';

type Content = {
  name: string;
  member: number;
  content: string;
};

const Member = tw.p`
text-[#3B4045] text-[12px] mb-2
`;

function CollectivesContent({ name, member, content }: Content) {
  return (
    <div className="p-4 border-b rounded-[3px] border-[#d6d9dc]">
      <div className="flex items-start justify-between">
        <div>
          <CollectName>{name}</CollectName>
          <Member>{member}k Members</Member>
        </div>
        <Btn>Join</Btn>
      </div>
      <CollectContent>{content}</CollectContent>
    </div>
  );
}

export default CollectivesContent;
