//wiedo 58:
import './code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview'; //video 134
import Resizable from './resizable'; //video 139
import { Cell } from '../state'; //video 205
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector'; //video 229
import { useCumulativeCode } from '../hooks/use-cumulative-code';

//interface added in video 205:
interface CodeCellProps {
  cell: Cell;
}

//modified in video 229
//{} inside of the brackets is a received prop
//CodeCell is a boundled component (graph in video 240)
//cumulativeCode added in video 242 (it is an array of strings)
const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const { updateCell, createBundle } = useActions(); //piece of state
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);
  
  //bundling process for CodeCell component (here all cells are bundled)
  //modified in video 229
  //cell.content is actual code we want to bundle (changed to cumulativeCode in v.242)
  //flow of data is explained in video 230 (3:05 min)
  // '\n' means new line (=return element in a new line)
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle]); //[list of dependencies] - hook useEffect runs only when input changes 

  //onChange in CodeEditor - callback function to what a user will type (video 126) - set in code-editor.tsx in interface
  //jsx block:
  //code piece of state goes to preview window
  //{bundle && ...} added in video 230 (deleted in v.234)
  //!bundle || - added in v. 234
  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100%-10px)', display: 'flex', flexDirection: 'row'}}>
        <Resizable direction="horizontal">
          <CodeEditor 
            initialValue={cell.content} 
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err}/>
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
