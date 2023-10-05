import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import './Delete.css';

function LimparInputTexto({ onClick }) {
  return (
    <button className='delete' onClick={onClick}>
      <RiDeleteBinLine size={20} />
    </button>
  );
}

export default LimparInputTexto;
