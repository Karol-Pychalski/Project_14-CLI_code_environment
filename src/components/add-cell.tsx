//viedo 211, 222

import './add-cell.css';
import { useActions } from '../hooks/use-actions';

// ? means it is optional (v.216)
interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;  //added in video 216 (regards showing the last row with buttons after deleting all of TextEditor cells)
};

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId}) => {
  const { insertCellAfter } = useActions();

  //forceVisible explained in video 216
  //modified in video 222
  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, 'code')}>
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button className="button is-rounded is-primary is-small" onClick={() => insertCellAfter(previousCellId, 'text')}>
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