//video 134:
import './preview.css';
import { useEffect } from 'react';
import {useRef} from 'react';

interface PreviewProps {
  code: string;
}

//generating html code:
//adding code to highlight errors (try catch) - video 114
//adding style to html - video 151
const html = `
  <html>
    <head>
      <style>html {background-color: white; {</style>}
    </head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } cacth (err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

//adding iframe with sandbox to increase security level of the application [video 108]
const Preview: React.FC<PreviewProps> = ({code}) => {
  const iframe = useRef<any>();

  useEffect(() => {
    //to avoid deleting the id="root" by user in the app (video 116):
    iframe.current.srcdoc = html;
    setTimeout(() => {
      // setCode(result.outputFiles[0].text); - has changed to code here as Preview components is receiving prop 'code')
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe 
        title="preview" ref={iframe} 
        sandbox="allow-scripts" 
        srcDoc={html} />;
    </div>
  );
};

export default Preview;