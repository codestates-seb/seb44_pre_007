import { styled } from 'styled-components';
import tw from 'tailwind-styled-components';
import StackOverflow from '../../public/Icons/StackOverflow';
import ForTeams from '../../public/Icons/ForTeams';
import SerchContentP from './SerchContentP';

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
  box-shadow: 0px 30px 100px -12px rgb(0, 0, 0, 0.25);
`;

const BlueGradient = styled(Gradient)`
  background: linear-gradient(0deg, rgb(205, 233, 254) 30%, white);
`;

const Btn = tw.button`
bg-bubg text-white w-fit h-fit p-3 flex justify-center items-center rounded-[3px]
`;

const H2 = tw.h2`
mx-12 mb-3 text-center text-[27px]
`;

const P = tw.p`
mx-12 mb-8 text-blacklight text-[19px] text-cente
`;

function GradientDiv() {
  return (
    <div className="absolute top-[90%] flex justify-center gap-7 mb-6 text-blackDark">
      <Gradient>
        <StackOverflow style={{ width: '190', height: '37' }} />
        <img
          className="my-8"
          src="https://cdn.sstatic.net/Img/home/illo-public.svg?v=14bd5a506009"
          alt="earth"
        />
        <H2>A public platform building the definitive collection of coding questions & answers</H2>
        <P>
          A community-based space to find and contribute answers to technical challenges, and one of
          the most popular websites in the world.
        </P>
        <Btn type="button" className="bg-main">
          Join the community
        </Btn>
        <SerchContentP />
      </Gradient>
      <BlueGradient>
        <ForTeams style={{ width: '190', height: '37' }} />
        <img
          className="my-8"
          src="https://cdn.sstatic.net/Img/home/illo-teams.svg?v=7e543f14fcc0"
          alt="building"
        />
        <H2>A private collaboration & knowledge sharing SaaS platform for companies</H2>
        <P>
          A web-based platform to increase productivity, decrease cycle times, accelerate time to
          market, and protect institutional knowledge.
        </P>
        <div className="flex gap-2">
          <Btn type="button">For large organizations</Btn>
          <Btn type="button">For small teams</Btn>
        </div>
      </BlueGradient>
    </div>
  );
}

export default GradientDiv;
