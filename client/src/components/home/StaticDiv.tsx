function StaticDiv({
  title,
  content1,
  content2,
}: {
  title: string;
  content1: string;
  content2: string;
}) {
  return (
    <div className="flex flex-col items-center w-[230px] py-8">
      <h2 className="mb-1 font-extrabold">{title}</h2>
      <p className="text-center text-black300">
        {content1} <br /> {content2}
      </p>
    </div>
  );
}

export default StaticDiv;
