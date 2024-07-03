import React, { useState } from 'react';
import ModelSelector from './components/ModelSelector';
import InputArea from './components/InputArea';
import ResultDisplay from './components/ResultDisplay';
import ExplanationView from './components/ExplanationView';

function App() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [input, setInput] = useState(null);
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const processInput = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: selectedModel, input })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResult(data.result);
      setExplanation(data.explanation);
    } catch (error) {
      console.error('Error processing input:', error);
      setError('An error occurred while processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Explainable AI Dashboard</h1>
      <ModelSelector onSelect={setSelectedModel} />
      <InputArea model={selectedModel} onInputChange={setInput} />
      <button onClick={processInput} disabled={!selectedModel || !input || isLoading}>
        {isLoading ? 'Processing...' : 'Process'}
      </button>
      {error && <p className="error">{error}</p>}
      <ResultDisplay result={result} />
      <ExplanationView explanation={explanation} />
    </div>
  );
}

export default App;