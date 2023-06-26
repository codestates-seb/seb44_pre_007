import { AiOutlineSearch } from 'react-icons/ai';

function NoResult({ tag }: { tag: string }) {
  return (
    <div className="flex flex-col items-center w-full mt-8">
      <AiOutlineSearch size="50" />
      <p className="text-[24px] mt-6">
        <span className="text-main">{tag}</span> 에 대한 검색 결과가 없습니다.
      </p>
    </div>
  );
}

export default NoResult;
