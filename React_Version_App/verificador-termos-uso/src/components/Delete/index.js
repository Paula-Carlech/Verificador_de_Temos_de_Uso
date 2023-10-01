import React from 'react';
import { RiDeleteBin6Fill } from 'react-icons/ri';

function LimparInputTexto({ onClick }) {
  return (
    <button onClick={onClick}>
        <RiDeleteBin6Fill />
    </button>
  );
}

export default LimparInputTexto;
