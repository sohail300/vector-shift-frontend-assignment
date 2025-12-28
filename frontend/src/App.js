import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <PipelineToolbar />
      <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
