//wiedo 58:
import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview'; //video 134
import bundle from '../bundler';
import Resizable from './resizable'; //video 139
import { Cell } from '../state'; //video 205
import { useActions } from '../hooks/use-actions';

//interface added in video 205:
interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => { //{} inside of the brackets is a received prop
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const {updateCell} = useActions(); //piece of state
  
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content); //(input) changed in video 205
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]); //[list of dependencies] - hook useEffect runs only when input changes 

  //onChange in CodeEditor - callback function to what a user will type (video 126) - set in code-editor.tsx in interface
  //jsx block:
  //code piece of state goes to preview window
  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
          <CodeEditor 
            initialValue={cell.content} 
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} err={err}/> 
      </div>
    </Resizable>
  );
};

export default CodeCell;
