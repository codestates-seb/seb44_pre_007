import tw from 'tailwind-styled-components';

const NoitceBox = tw.div`
  flex flex-col w-full
`;

const BlueBox = tw.div`
  flex flex-col w-9/12 p-6 my-4 border border-solid border-[#A6CEED] bg-[#EBF4FB]
`;

function QuestionNotice() {
  const questionSteps = [
    'Summarize your problem in a one-line title',
    'Describe your problem in more detail',
    'Describe what you tried and what you expected to happen.',
    'Add "tags" which help surface your question to members of the community.',
    'Review your question and post it to the site.',
  ];

  return (
    <NoitceBox>
      <div className="bg-no-repeat bg-right-bottom bg-[url(https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368)] h-[130px] flex flex-col justify-center">
        <h1 className="font-bold text-[27px] my-6">Ask a public question</h1>
      </div>
      <div>
        <BlueBox>
          <h2 className="mb-2 text-[21px]">Writing a good question</h2>
          <p>You&apos;re ready to <a href="http://stackoverflow.com/help/how-to-ask">ask</a> a <a href="https://stackoverflow.com/help/on-topic">programming-related question</a> and this form will help guide you through the process.</p>
          <p className="mb-4">Looking to ask a non-programming question? See <a href="https://stackoverflow.com/sites#technology-traffic">the topics here</a> to find a relavant site.</p>
          <h2 className="font-semibold text-[13px] mb-2">Steps</h2>
          <ul className="text-[13px] ml-[30px]">
            {questionSteps.map((text) => (
              <li key={text} className="list-disc">
                {text}
              </li>
            ))}
          </ul>
        </BlueBox>
      </div>
    </NoitceBox>
  );
}

export default QuestionNotice;
