import { LIMIT } from '../../constant/constantValue';
import LoadingDiv from './LoadingDiv';

function SummaryLoading() {
  const eleArr = [];
  for (let index = 0; index < LIMIT; index += 1) {
    const element = <LoadingDiv />;
    eleArr.push(element);
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{eleArr}</>;
}

export default SummaryLoading;
