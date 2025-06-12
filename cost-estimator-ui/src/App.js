import React, { useState } from 'react';
import axios from 'axios';
import EstimationForm from './EstimationForm';
import ResultsDisplay from './ResultsDisplay';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async (formData) => {
    setIsLoading(true);
    setError('');
    setResults(null);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/calculate/', formData);
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Project for Software economics</h1>
      </header>
      <main className="container">
        <div className="form-container">
          <h2>Project Parameters</h2>
          <EstimationForm onSubmit={handleCalculate} isLoading={isLoading} />
        </div>
        <div className="results-container">
          <h2>Estimation Results</h2>
          {isLoading && <p>Calculating...</p>}
          {error && <p className="error-message">{error}</p>}
          {results && <ResultsDisplay data={results} />}
        </div>
      </main>
    </div>
  );
}

export default App;