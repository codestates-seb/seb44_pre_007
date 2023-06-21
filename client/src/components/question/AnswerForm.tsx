import { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { AskBtn, ContentDiv, SubTitle } from '../../styles/styles';
import AnswerEditor from './AnswerEditor';

function AnswerForm() {
  const PreviewRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>('');

  const HandleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (PreviewRef.current) {
      if (!PreviewRef.current.innerText.trim().length) return;
      // Todo axios Post
      setText('');
    }
  };

  return (
    <form className="w-[727px]" onSubmit={HandleSubmitAnswer}>
      <SubTitle className="pt-5 mb-[19px]">Your Answer</SubTitle>
      <AnswerEditor text={text} setText={setText} />
      <div className="pt-2.5 pb-[15px]">
        <AskBtn type="submit">Post Your Answer</AskBtn>
      </div>
      <section>
        <ContentDiv ref={PreviewRef} dangerouslySetInnerHTML={{ __html: text }} />
      </section>
    </form>
  );
}

export default AnswerForm;
