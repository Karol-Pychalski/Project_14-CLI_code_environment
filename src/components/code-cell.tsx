//wiedo 58:
import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview'; //video 134
import bundle from '../bundler';

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
    <div>
      <CodeEditor 
        initialValue="const a=1;" 
        onChange={(value) => setInput(value)}
        />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
