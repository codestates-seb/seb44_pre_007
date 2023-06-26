function AskDescriptionDiv({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col my-[2px]">
      <div className="fw-semibold">{title}</div>
      <div className="text-xs">{description}</div>
    </div>
  );
}

export default AskDescriptionDiv;
