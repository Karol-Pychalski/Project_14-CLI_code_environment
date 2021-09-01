import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

//adding type to CodeEditor and options in video 125:
//adding onEditorDidMount in video 126 - callback to get a code result of what user wrote in console (can't pass onChange to MonacoEditor due to internal limitations of Monaco as React component)
const CodeEditor: React.FC<CodeEditorProps> = ({onChange, initialValue}) => {
  const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
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