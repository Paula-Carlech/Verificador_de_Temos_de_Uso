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

      <header className="cabecalho">
        <div className="itemCabecalho">LOGO</div>
        <div className="itemCabecalho">Link 1</div>
        <div className="itemCabecalho">Link 2</div>
        <div className="itemCabecalho">Link 3</div>
        <div className="itemCabecalho">Link 4</div>
      </header>

      <h1>INSIRA OS TERMOS DE USO AQUI:</h1>

      <div style={{ position: 'relative', width: '100vw' }}>
        <textarea
          value={markdownText}
          onChange={handleInputChange}
          style={{ width: '90%', height: '35vh' }}
        />
        <LimparInputTexto onClick={limparTexto} />
      </div>

      <MarkdownHighlighter markdownText={markdownText} />

      <footer>Terms Of Use Advisor® 2023</footer>
    </div>
  );
}

export default App;
