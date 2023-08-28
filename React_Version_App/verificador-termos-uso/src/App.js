import React, { useState } from 'react';
import './App.css';
import * as marked from 'marked';
import TermoUsoInput from './components/TermosDeUsoInput';
import Resumo from './components/Resumo';

function App() {
    const [termo, setTermo] = useState('');
    const [resumo, setResumo] = useState('');

    const verificarTermo = () => {
        const parsedTermo = marked(termo);

        setResumo(parsedTermo);
    };

    const limparTexto = () => {
        setTermo('');
    };

    return (
        <div className="App">
            <h1>Verificador de Termos de Uso</h1>
            <TermoUsoInput onChange={(e) => setTermo(e.target.value)} value={termo} />
            <button onClick={verificarTermo}>Verificar</button>
            <Resumo resumo={resumo} />
        </div>
    );
}

export default App;
