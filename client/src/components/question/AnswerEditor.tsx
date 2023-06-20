import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AskBtn, ContentDiv, SubTitle } from '../../styles/styles';
import CustomToolbar from './QuillCustomTool';

function AnswerEditor() {
  // Todo 시간된다면 코드 syntax js 색으로 표시하는 기능
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  const [text, setText] = useState<string>('');
  const handleText = (value: any) => {
    setText(value);
  };

  const PreviewRef = useRef<HTMLDivElement>(null);
  const HandleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (PreviewRef.current) {
      if (!PreviewRef.current.innerText.trim().length) return;
      // Todo axios Post
      setText('');
    }
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'list',
    'bullet',
    'align',
    'color',
    'background',
    'link',
    'code-block',
  ];

  return (
    <form className="w-[727px]" onSubmit={HandleSubmitAnswer}>
      <SubTitle className="pt-5 mb-[19px]">Your Answer</SubTitle>
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          className="h-[168px]"
          modules={modules}
          formats={formats}
          value={text}
          onChange={handleText}
        />
      </div>
      <div className="pt-2.5 pb-[15px]">
        <AskBtn type="submit">Post Your Answer</AskBtn>
      </div>
      <section>
        <ContentDiv ref={PreviewRef} dangerouslySetInnerHTML={{ __html: text }} />
      </section>
    </form>
  );
}

export default AnswerEditor;
