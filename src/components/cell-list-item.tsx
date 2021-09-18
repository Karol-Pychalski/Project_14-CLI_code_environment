import {Cell} from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';

//interface created in video 202
interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <CodeCell cell={cell}/>
  } else {
    child = <TextEditor cell={cell}/> //here we communicate 'down' the cell prop to the TextEditor
  }

  //child is a text or code cell
  return (
    <div>
      <ActionBar id={cell.id} />
      {child} 
    </div>
  ); 
};

export default CellListItem;