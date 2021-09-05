//wiedo 58:
import 'bulmaswatch/superhero/bulmaswatch.min.css'; //video 130
import ReactDOM from 'react-dom';
import CodeCell from './components/code-cell';

const App = () => {
  //onChange in CodeEditor - callback function to what a user will type (video 126) - set in code-editor.tsx in interface
  //jsx block:
  return (
    <div>
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
