import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

//adding type to CodeEditor and options in video 125:
//adding onEditorDidMount in video 126 - callback to get a code result of what user wrote in console (can't pass onChange to MonacoEditor due to internal limitations of Monaco as React component)
const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) => {
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({tabSize: 2});
  };

  return (
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
  );
};

export default CodeEditor;