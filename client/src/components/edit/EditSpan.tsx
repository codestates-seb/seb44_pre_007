function EditSpan({ callback }: { callback: () => void }) {
  return (
    <span className="text-blacklight cursor-pointer" onClick={callback} role="presentation">
      Edit
    </span>
  );
}

export default EditSpan;
