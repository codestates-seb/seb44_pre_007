import { LIMIT } from '../../constant/constantValue';
import { FlexCol, TagSpan } from '../../styles/styles';

function SummaryLoading() {
  const eleArr = [];
  for (let index = 0; index < LIMIT; index += 1) {
    const element = (
      <div className="flex p-4 justify-end animate-pulse">
        <FlexCol className="w-[108px] items-end gap-2 mr-4 mb-1">
          <div className="bg-slate-200 w-[60px] h-3 rounded-md" />
          <div className="bg-slate-200 w-[60px] h-3 rounded-md" />
        </FlexCol>
        <FlexCol className="w-[595px] gap-3">
          <div className="bg-slate-200 w-[300px] h-3 rounded-md" />
          <div className="bg-slate-200 w-[500px] h-3 rounded-md" />
          <TagSpan className="bg-slate-200 w-[50px] h-4 rounded-[3px]" />
          <div className="flex justify-end gap-2">
            <div className="bg-slate-200 w-[60px] h-3 rounded-md" />
            <div className="bg-slate-200 w-[100px] h-3 rounded-md" />
          </div>
        </FlexCol>
      </div>
    );
    eleArr.push(element);
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{eleArr}</>;
}

export default SummaryLoading;
