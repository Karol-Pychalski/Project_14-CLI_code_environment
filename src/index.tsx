//wiedo 58:
import 'bulmaswatch/superhero/bulmaswatch.min.css'; //video 130
import '@fortawesome/fontawesome-free/css/all.min.css'; //video 208
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //video 187
import {store} from './state'; //video 187
//import CodeCell from './components/code-cell';
import CellList from './components/cell-list'; //video 199

const App = () => {
  //onChange in CodeEditor - callback function to what a user will type (video 126) - set in code-editor.tsx in interface
  //jsx block:
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
