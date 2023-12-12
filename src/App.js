import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Note a adição do "Routes"
import './App.css';
import MarkdownHighlighter from './components/Markdown';
import LimparInputTexto from './components/Delete';
import Cabecalho from './components/Cabecalho';
import Footer from './components/Rodape';
import Sobre from './Pages/Sobre';

function App() {
  const [markdownText, setMarkdownText] = useState('');

  const handleInputChange = (e) => {
    setMarkdownText(e.target.value);
  };

  const limparTexto = () => {
    setMarkdownText('');
  };

  return (
    <Router>
      <div className="App">
        <Cabecalho />
        <Routes>
          <Route path="/sobre" element={<Sobre />} />
          <Route
            path="/"
            element={
              <div>
                <h1>INSIRA OS TERMOS DE USO AQUI:</h1>
                <div style={{ position: 'relative', width: '100vw' }}>
                  <textarea
                    value={markdownText}
                    onChange={handleInputChange}
                    style={{ width: '90%', height: '35vh', resize: 'none' }}
                  />
                  <LimparInputTexto onClick={limparTexto} />
                </div>
                <MarkdownHighlighter markdownText={markdownText} />
              </div>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
