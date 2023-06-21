import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Lock from '../public/Icons/SpotLock';
import Search from '../public/Icons/SpotSearch';
import 'animate.css';

const SpotDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 8px;
  border-radius: 3px;
  height: 253px;
`;

const BlueSpot = styled(SpotDiv)`
  &:after {
    position: absolute;
    top: 99%;
    left: 0px;
    clip-path: polygon(18px 0, 32px 0, 0 40px, 0 38px, 0 0, 18px 0);
    content: '';
    width: 42px;
    height: 32px;
    display: block;
    background-color: #cde9fe;
    border-radius: 0 5px 0;
  }
`;

const OrangeSpot = styled(SpotDiv)`
  &:after {
    position: absolute;
    top: 99%;
    right: 0;
    clip-path: polygon(18px 0, 32px 0, 0 40px, 0 38px, 0 0, 18px 0);
    content: '';
    width: 42px;
    height: 32px;
    display: block;
    background-color: #fee3cd;
    border-radius: 0 5px 0;
    transform: scaleX(-1);
  }
`;

function Home() {
  const Words = [
    'developer',
    'data scientist',
    'system admin',
    'mobile developer',
    'game developer',
  ];

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
    <div className="flex flex-col items-center bg-blackDark w-[1200px] px-8 pt-8 pb-32">
      <div className="flex gap-3 mb-7">
        <OrangeSpot className="bg-[#FEE3CD]">
          <Search style={{ width: '40', height: '40' }} />
          <h2 className="w-[315px] text-center text-blackDark mb-[19px]">
            Find the best answer to your technical question, help others answer theirs
          </h2>
          <button className="text-white bg-main px-8 py-3 rounded-[3px]" type="button">
            Join the community
          </button>
          <div className="flex gap-1">
            <p className="text-[13px]">or</p>
            <p className="text-[13px] border-b border-blackDark">search content</p>
          </div>
        </OrangeSpot>

        <BlueSpot className="bg-[#cde9fe]">
          <Lock style={{ width: '40', height: '40' }} />
          <h2 className="w-[315px] text-center text-blackDark mb-[19px]">
            Find the best answer to your technical question, help others answer theirs
          </h2>
          <button className="text-white bg-blue-600 px-8 py-3 rounded-[3px]" type="button">
            Discover Teams
          </button>
        </BlueSpot>
      </div>
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
    </div>
  );
}

export default Home;
