import React, { useState } from 'react';
import './App.css';
import MarkdownHighlighter from './components/Markdown';
import LimparInputTexto from './components/Delete';

function App() {
  const [markdownText, setMarkdownText] = useState('');

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };

  const limparTexto = () => {
    setMarkdownText('');
  };

  return (
    <div className="App">
      <h1>Verificador de Termos de Uso</h1>
      <textarea
        rows="10"
        cols="50"
        value={markdownText}
        onChange={handleInputChange}
        placeholder="Cole o termo de uso aqui..."
      />
      <MarkdownHighlighter markdownText={markdownText} />
      <LimparInputTexto onClick={limparTexto} />
    </div>
  );
}

export default App;
