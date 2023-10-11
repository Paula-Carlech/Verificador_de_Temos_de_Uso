import React from 'react';
import './Cabecalho.css';
import logo from '../../images/tosa.png';

function Cabecalho() {
    return (
        <header className="cabecalho">
            <div className="itemCabecalho image">
                <img src={logo} alt="Tosa" />
            </div>
            <div className="itemCabecalho">Link 1</div>
            <div className="itemCabecalho">Link 2</div>
            <div className="itemCabecalho">Link 3</div>
            <div className="itemCabecalho">Link 4</div>
        </header>
    );
}

export default Cabecalho;
