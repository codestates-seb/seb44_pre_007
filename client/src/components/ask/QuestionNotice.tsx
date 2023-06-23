import tw from 'tailwind-styled-components';

const NoitceBox = tw.div`
  flex flex-col w-full
`;

const BlueBox = tw.div`
  flex flex-col w-9/12 p-6 mb-4 border border-solid border-[#A6CEED] bg-[#EBF4FB]
`;

function QuestionNotice() {
  return (
    <NoitceBox>
      <div>
        <h1 className="font-bold text-[27px] my-6">Ask a public question</h1>
      </div>
      <div>
        <BlueBox>
          <h2>Writing a good question</h2>
          <p>You&apos;re ready to <a href="http://stackoverflow.com/help/how-to-ask">ask</a> a <a href="https://stackoverflow.com/help/on-topic">programming-related question</a> and this form will help guide you through the process.</p>
          <p>Looking to ask a non-programming question? See <a href="https://stackoverflow.com/sites#technology-traffic">the topics here</a> to find a relavant site.</p>
        </BlueBox>
      </div>
    </NoitceBox>
  );
}

export default QuestionNotice;
