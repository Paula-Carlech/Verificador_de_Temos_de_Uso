import React from 'react';
import './Sobre.css';

function Sobre() {
  return (
    <>
      <h2 className='tituloSobre'>Bem-vindo à Página Sobre</h2>

      <div className='textoSobre'>
        <p>
          Nós somos dedicados a fornecer informações úteis e relevantes
          para nossos usuários, com o objetivo de facilitar a compreensão dos termos de uso. Se você tiver
          alguma dúvida ou sugestão, não hesite em entrar em contato conosco.
        </p>
        <p>
          Nosso objetivo é tornar sua experiência a melhor possível. Agradecemos por escolher nosso serviço
          e esperamos que você encontre tudo o que precisa aqui.
        </p>
      </div>
    </>
  );
}

export default Sobre;
