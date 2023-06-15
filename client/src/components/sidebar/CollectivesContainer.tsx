import { WhiteTitle, WhiteDiv } from '../../styles/sidebarstyle';
import CollectivesContent from './CollectivesContent';

function CollectivesContainer() {
  return (
    <WhiteDiv>
      <ul>
        <WhiteTitle className="flex justify-between items-center">
          <span className="text-inactive">Collectives</span>
          <span className="text-blue-600 text-[11px]">see all</span>
        </WhiteTitle>
        <CollectivesContent
          name="AWS"
          member={13}
          content="Amazon Web Services (AWS) is the world’s most comprehensive and broadly adopted cloud
            platform, offering over 200 fully featured services from data centers globally. The AWS
            Collective is a community-driven site with resources for developers"
        />
        <CollectivesContent
          name="CI/CD"
          member={5}
          content="A collective where developers focused on continuous integration, delivery, and
          deployment can find, share, and learn about simultaneous development."
        />
        <CollectivesContent
          name="R Language"
          member={4}
          content="A collective where data scientists and AI researchers gather to find, share, and learn about R and other subtags like knitr and dplyr."
        />
      </ul>
    </WhiteDiv>
  );
}

export default CollectivesContainer;
