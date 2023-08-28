import React from 'react';

function Resumo(props) {
    return (
        <div>
            <h3>Resumo:</h3>
            <div>{props.resumo}</div>
        </div>
    );
}

export default Resumo;
