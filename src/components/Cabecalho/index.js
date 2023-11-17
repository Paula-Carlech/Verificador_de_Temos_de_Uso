import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/SysATU.png';
import './Cabecalho.css';

function Cabecalho() {
  const navigate = useNavigate();

  const handleLinkClick = (e) => {
    e.preventDefault();

    if (window.location.pathname === '/sobre') {
      navigate('/');
    } else {
      navigate('/sobre');
    }
  };

  return (
    <header className="cabecalho">
      <div className="itemCabecalho img">
        <img src={logo} alt="SysATU" />
      </div>
      <div className="itemCabecalho">
        <Link to="/sobre" onClick={handleLinkClick}>
          {window.location.pathname === '/sobre' ? 'Voltar' : 'Sobre'}
        </Link>
      </div>
    </header>
  );
}

export default Cabecalho;
