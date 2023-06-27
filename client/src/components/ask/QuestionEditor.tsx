import ReactQuill from 'react-quill';
import { forwardRef } from 'react';
import CustomToolbar from './QuillCustomTool';

const AnswerEditor = forwardRef(
  (
    {
      text,
      setText,
      disabled,
    }: {
      text: string;
      setText: (value: string) => void;
      disabled: boolean;
    },
    ref: any
  ) => {
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
          ref={ref}
          readOnly={disabled}
          className="h-[300px]"
          modules={modules}
          formats={formats}
          value={text}
          onChange={handleText}
        />
      </div>
    );
  }
);

export default AnswerEditor;
