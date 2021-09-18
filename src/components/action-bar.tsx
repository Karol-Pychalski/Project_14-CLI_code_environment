//created in video 207:
import {useActions} from '../hooks/use-actions';


interface ActionBarProps {
  id: string;
}

//moveCell and deleteCell come from action-creators/index.ts file
const ActionBar: React.FC<ActionBarProps> = ({id}) => {
  const {moveCell, deleteCell} = useActions();
  return (
    <div>
      <button className="button is-primary is-small" onClick={() => moveCell(id, 'up')}>
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button className="button is-primary is-small" onClick={() => moveCell(id, 'down')}>
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="button is-primary is-small" onClick={() => deleteCell(id)}>
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
