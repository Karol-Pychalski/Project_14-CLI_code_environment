//wiedo 58:
import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview'; //video 134
import bundle from '../bundler';
import Resizable from './resizable'; //video 139

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState(''); //input piece of state

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]); //[list of dependencies] - hook useEffect runs only when input changes 

  //onChange in CodeEditor - callback function to what a user will type (video 126) - set in code-editor.tsx in interface
  //jsx block:
  //code piece of state goes to preview window
  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
          <CodeEditor 
            initialValue="const a=1;" 
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} err={err}/> 
      </div>
    </Resizable>
  );
};

export default CodeCell;
