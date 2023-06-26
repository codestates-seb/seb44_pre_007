/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { TagSpan } from '../../styles/styles';

export default function Tags({
  tags,
  setTags,
  disabled,
}: {
  tags: Set<string>;
  setTags: React.Dispatch<React.SetStateAction<Set<string>>>;
  disabled: boolean;
}) {
  const [text, setText] = useState('');
  const [inputSelected, setInputSelected] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.code === 'Space') {
      const newTag = text.trim();
      setTags((prev) => new Set([...prev, newTag]));
      setText('');
      setInputSelected(true);
    }
  };
  const handleDelete = (e: React.MouseEvent) => {
    const tagsArr = [...tags];
    const target = e.target as HTMLElement;
    const newTagsArr = tagsArr.filter((x) => x !== target.parentElement!.id);
    setTags(new Set(newTagsArr));
    if (newTagsArr.length === 0) setInputSelected(false);
  };

  return (
    <div className="flex flex-col ps-relative">
      <div className="flex items-center border border-[#BABFC4] rounded-[3px] w-full my-[2px] px-1 text-[13px]">
        {[...tags].map((tag) => (
          <TagSpan id={tag} key={tag}>
            {tag}
            <FiX
              className="ml-1 text-[14px] hover:text-paleBlue hover:bg-mediumBlue"
              onClick={handleDelete}
            />
          </TagSpan>
        ))}
        {inputSelected || (
          <input
            disabled={disabled}
            type="text"
            value={text}
            placeholder="e.g. (swift spring postgresql)"
            className="py-2 px-1 w-full text-[13px]"
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        )}
        {inputSelected && (
          <input
            type="text"
            value={text}
            className="py-2 px-1 w-full text-[13px]"
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            autoFocus
          />
        )}
      </div>
    </div>
  );
}
