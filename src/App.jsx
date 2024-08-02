import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const options = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' },
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      const parsedJson = JSON.parse(jsonInput);
      const res = await axios.post(`${import.meta.env.VITE_Backend_Url}/bfhl`, parsedJson);
      console.log(import.meta.env.Backend_Url);
      
      setResponse(res.data);
    } catch (error) {
      setError('Invalid JSON input or API error');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div className="response">
        {selectedOptions.some(option => option.value === 'numbers') && (
          <div className='options'>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.some(option => option.value === 'alphabets') && (
          <div className='options'>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.some(option => option.value === 'highest_alphabet') && (
          <div className='options'>
            <h3>Highest Alphabet:</h3>
            <p>{response.highest_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Full Stack</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON input, e.g., {"data": ["A","C","z"]}'
          cols={50}
          rows={10}
          className='json-input'
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
      {response && (
        <div className="multi-select">
          <label htmlFor="options">Select options:</label>
          <Select
            id="options"
            isMulti
            options={options}
            onChange={handleOptionChange}
          />
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
