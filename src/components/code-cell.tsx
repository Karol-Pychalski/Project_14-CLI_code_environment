//wiedo 58:
import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview'; //video 134
import bundle from '../bundler';
import Resizable from './resizable'; //video 139
import { ResizableBox } from 'react-resizable';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  //onChange in CodeEditor - callback function to what a user will type (video 126) - set in code-editor.tsx in interface
  //jsx block:
  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
        <CodeEditor 
          initialValue="const a=1;" 
          onChange={(value) => setInput(value)}
        />
        </Resizable>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
