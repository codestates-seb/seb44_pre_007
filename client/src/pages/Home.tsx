import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Lock from '../public/Icons/SpotLock';
import Search from '../public/Icons/SpotSearch';
import 'animate.css';
import StaticDiv from '../components/home/StaticDiv';
import StackOverflow from '../public/Icons/StackOverflow';
import ForTeams from '../public/Icons/ForTeams';

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

const Gradient = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(0deg, rgb(254, 227, 205) 30%, white);
  width: 450px;
  height: 863px;
  border-radius: 3px;
  padding-top: 48px;
  padding-bottom: 48px;
`;

const BlueGradient = styled(Gradient)`
  background: linear-gradient(0deg, rgb(205, 233, 254) 30%, white);
`;

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
    <div className="flex flex-col">
      <div className="flex flex-col relative items-center bg-blackDark w-[1200px] px-8 pt-8 pb-32 mx-15 mt-12 rounded">
        <div className="flex gap-6 mb-7">
          <OrangeSpot className="bg-[#FEE3CD]">
            <div className="mb-4">
              <Search style={{ width: '40', height: '40' }} />
            </div>
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
            <div className="mb-4">
              <Lock style={{ width: '40', height: '40' }} />
            </div>
            <h2 className="w-[315px] text-center text-blackDark mb-[19px]">
              Want a secure, private space for your technical knowledge?
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
        <span className="w-[63px] h-[8px] bg-blacklight rounded" />
        <div className="flex text-[15px] text-white gap-2 pt-8 px-3 pb-16">
          {StaticWords.map((word) => (
            <StaticDiv
              title={word.title}
              key={word.title}
              content1={word.content1}
              content2={word.content2}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-7 mb-6">
        <Gradient>
          <StackOverflow style={{ width: '190', height: '37' }} />
          <img
            className="my-8"
            src="https://cdn.sstatic.net/Img/home/illo-public.svg?v=14bd5a506009"
            alt="earth"
          />
          <h2 className="mx-12 mb-3 text-center text-[27px]">
            A public platform building the definitive collection of coding questions & answers
          </h2>
          <p className="mx-12 mb-8 text-blacklight text-[19px] text-center">
            A community-based space to find and contribute answers to technical challenges, and one
            of the most popular websites in the world.
          </p>
          <button
            type="button"
            className="bg-main text-white w-fit h-[40px] px-3 py-8 flex justify-center items-center rounded-[3px]"
          >
            Join the community
          </button>
        </Gradient>
        <BlueGradient>
          <ForTeams style={{ width: '190', height: '37' }} />
          <img
            className="my-8"
            src="https://cdn.sstatic.net/Img/home/illo-teams.svg?v=7e543f14fcc0"
            alt="earth"
          />
          <h2 className="mx-12 mb-3 text-center text-[27px]">
            A private collaboration & knowledge sharing SaaS platform for companies
          </h2>
          <p className="mx-12 mb-8 text-blacklight text-[19px] text-center">
            A web-based platform to increase productivity, decrease cycle times, accelerate time to
            market, and protect institutional knowledge.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-bubg text-white w-fit h-[20px] px-3 py-8 flex justify-center items-center rounded-[3px]"
            >
              For large organizations
            </button>
            <button
              type="button"
              className="bg-bubg text-white w-fit h-[20px] px-3 py-8 flex justify-center items-center rounded-[3px]"
            >
              For small teams
            </button>
          </div>
        </BlueGradient>
      </div>
    </div>
  );
}

export default Home;
