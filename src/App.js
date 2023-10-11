import React, { useState } from 'react';
import './App.css';
import MarkdownHighlighter from './components/Markdown';
import LimparInputTexto from './components/Delete';
import Cabecalho from './components/Cabecalho';
import Footer from './components/Rodape';

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

      <Cabecalho />

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

      <Footer />
    </div>
  );
}

export default App;
