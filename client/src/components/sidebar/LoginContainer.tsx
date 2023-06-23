import { useParams } from 'react-router-dom';
import { WhiteDiv, WhiteTitle, ContentLi } from '../../styles/sidebarstyle';
import Tag from '../../ui/Tag';

function LoginContainer() {
  const { questionTag } = useParams();

  return (
    <>
      <WhiteDiv>
        <ul className="border-b rounded-[3px] border-[#d6d9dc]">
          <WhiteTitle className="flex justify-between items-center">
            <span className="text-black600">Custom Filters</span>
          </WhiteTitle>
          <ContentLi className="justify-start text-blue-600">
            <a href="/">Create a custom filter</a>
          </ContentLi>
        </ul>
      </WhiteDiv>
      <WhiteDiv>
        <ul className="border-b rounded-[3px] border-[#d6d9dc]">
          <WhiteTitle className="flex justify-between items-center">
            <span className="text-black600">Watched Tags</span>
            <span className="text-black600 cursor-pointer">edit</span>
          </WhiteTitle>
          <ContentLi className="justify-start">
            {questionTag ? <Tag content={questionTag} /> : '태그를 선택해주세요'}
          </ContentLi>
        </ul>
      </WhiteDiv>
      <WhiteDiv>
        <ul className="border-b rounded-[3px] border-[#d6d9dc]">
          <WhiteTitle className="flex justify-between items-center">
            <span className="text-black600">Ignored Tags</span>
          </WhiteTitle>
          <ContentLi className="justify-start"> Tag 컴포넌트 추가 예정</ContentLi>
        </ul>
      </WhiteDiv>
    </>
  );
}

export default LoginContainer;
