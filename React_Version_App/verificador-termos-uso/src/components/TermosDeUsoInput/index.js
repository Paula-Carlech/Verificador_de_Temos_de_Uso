import React from 'react';

function TermoUsoInput(props) {
    return (
        <div>
            <label htmlFor="termoUso">Cole o termo de uso aqui:</label>
            <textarea
                id="termoUso"
                onChange={props.onChange}
                value={props.value}
            ></textarea>
        </div>
    );
}

export default TermoUsoInput;
