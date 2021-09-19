//viedo 211

import './add-cell.css';
import {useActions} from '../hooks/use-actions';

// ? means it is optional (v.216)
interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;  //added in video 216 (regards showing the last row with buttons after deleting all of TextEditor cells)
};

const AddCell: React.FC<AddCellProps> = ({ forceVisible, nextCellId}) => {
  const {insertCellBefore} = useActions();

  //forceVisible explained in video 216
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button className="button is-rounded is-primary is-small" onClick={() => insertCellBefore(nextCellId, 'code')}>
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={() => insertCellBefore(nextCellId, 'text')}>
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;