function ActionSpan({ callback, action }: { callback: () => void; action: string }) {
  return (
    <span className="text-blacklight cursor-pointer" onClick={callback} role="presentation">
      {action}
    </span>
  );
}

export default ActionSpan;
