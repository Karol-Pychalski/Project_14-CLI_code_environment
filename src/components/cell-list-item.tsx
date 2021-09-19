import './cell-list-item.css';
import {Cell} from '../state';
import CodeCell from './code-cell';
import TextEditor from './text-editor';
import ActionBar from './action-bar';

//interface created in video 202
interface CellListItemProps {
  cell: Cell;
}

// <> - react fragment
const CellListItem: React.FC<CellListItemProps> = ({cell}) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = <>
      <div className="action-bar-wrapper">
        <ActionBar id={cell.id} /> 
      </div>
      <CodeCell cell={cell}/>
    </>
  //here we communicate 'down' the cell prop to the TextEditor
  } else {
    child = <>
      <TextEditor cell={cell}/>
      <ActionBar id={cell.id} />
    </>
  }

  //child is a text or code cell and is displayed before ActionBar due to added CSS icons in the action bar
  return (
    <div className="cell-list-item">
      {child}
    </div>
  ); 
};

export default CellListItem;