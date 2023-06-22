import ReactQuill from 'react-quill';
import CustomToolbar from './QuillCustomTool';

function AnswerEditor({ text, setText }: { text: string; setText: (value: string) => void }) {
  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  const handleText = (value: string) => {
    setText(value);
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
  );
}

export default AnswerEditor;
