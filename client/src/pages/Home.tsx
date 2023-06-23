import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import 'animate.css';
import StaticDiv from '../components/home/StaticDiv';

import LeftSidebar from '../components/sidebar/LeftSidebar';
import { leftSidebarDropdown } from '../recoil/atom';
import GradientDiv from '../components/home/GradientDiv';
import SpotDiv from '../components/home/SpotDiv';
import { FlexCol } from '../styles/styles';

function Home() {
  const Words = [
    'developer',
    'data scientist',
    'system admin',
    'mobile developer',
    'game developer',
  ];

  const StaticWords = [
    {
      title: '100+ million',
      content1: 'monthly visitors to Stack',
      content2: 'Overflow & Stack Exchange',
    },
    {
      title: '45.1+ billion',
      content1: 'Times a developer got help',
      content2: 'since 2008',
    },
    {
      title: '191% ROI',
      content1: 'from companies using Stack',
      content2: 'Overflow for Teams',
    },
    {
      title: '5,000+',
      content1: 'Stack Overflow for Teams',
      content2: 'instances active every day',
    },
  ];

  const showDropdown = useRecoilValue(leftSidebarDropdown);
  const [wordIdx, setWordIdx] = useState(0);

  const savedCallback = useRef<() => void>();

  const callback = () => {
    if (wordIdx === Words.length - 1) setWordIdx(0);
    else setWordIdx(wordIdx + 1);
  };

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const timer = setInterval(tick, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <FlexCol>
      <div className="absolute z-50 ml-9">{showDropdown && <LeftSidebar />}</div>
      <FlexCol className="relative items-center bg-blackDark px-8 pt-8 pb-32 mx-15">
        <SpotDiv />
        <h1 className="py-16 text-center text-[30px] font-semibold text-white">
          <div className="flex justify-center gap-2">
            Every
            <p className="text-main animate__animated animate__fadeInDown animate__slow animate__infinite">
              {Words[wordIdx]}
            </p>
            has a
          </div>
          tab open to Stack Overflow
        </h1>
        <span className="w-[63px] h-[8px] bg-blacklight rounded" />
        <div className="relative flex text-[15px] text-white gap-2 pt-8 px-3 pb-16">
          {StaticWords.map((word) => (
            <StaticDiv
              title={word.title}
              key={word.title}
              content1={word.content1}
              content2={word.content2}
            />
          ))}
          <GradientDiv />
        </div>
      </FlexCol>
      <div className="h-[750px] bg-white" />
    </FlexCol>
  );
}

export default Home;
