import { Editor } from './components/editor/Editor';

import './style.css';
import data from './test/test.json';

function App() {
  return (
    <div className="editor-app">
      <Editor data={data as any} />
    </div>
  );
}

export default App;
