import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

//installing prettier and parser - video 128
//adding {useRef} in video 129


interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

//adding type to CodeEditor and options in video 125:
//adding onEditorDidMount in video 126 - callback to get a code result of what user wrote in console (can't pass onChange to MonacoEditor due to internal limitations of Monaco as React component)
const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({tabSize: 2});
  };

  //setting of onFormatClick since video 129:
  const onFormatClick = () => {
    //get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    //format that value (everything inside Monaco Editor)
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/,'');

    //set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  }

  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
    <MonacoEditor 
      editorDidMount={onEditorDidMount}
      value={initialValue}
      theme="dark" 
      language="javascript"
      height="500px" 
      options={{
        wordWrap: 'on',
        miniMap: { enabled: false},
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
     }}
    />
    </div>
  );
};

export default CodeEditor;