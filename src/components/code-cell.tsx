//wiedo 58:
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview'; //video 134
import Resizable from './resizable'; //video 139
import { Cell } from '../state'; //video 205
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector'; //video 229

//interface added in video 205:
interface CodeCellProps {
  cell: Cell;
}

//modified in video 229
//{} inside of the brackets is a received prop
const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const { updateCell, createBundle } = useActions(); //piece of state
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  
  //modified in video 229
  //cell.content is actual code we want to bundle
  //flow of data is explained in video 230 (3:05 min)
  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content)
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content, createBundle]); //[list of dependencies] - hook useEffect runs only when input changes 

  //onChange in CodeEditor - callback function to what a user will type (video 126) - set in code-editor.tsx in interface
  //jsx block:
  //code piece of state goes to preview window
  //{bundle && ...} added in video 230
  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100%-10px)', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
          <CodeEditor 
            initialValue={cell.content} 
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {bundle && <Preview code={bundle.code} err={bundle.err}/>}
      </div>
    </Resizable>
  );
};

export default CodeCell;
