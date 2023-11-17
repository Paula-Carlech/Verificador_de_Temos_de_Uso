import React from 'react';
import './Sobre.css';

function Sobre() {
  return (
    <>
      <h2 className='tituloSobre'>Bem-vindo ao SysATU!</h2>

      <div className='textoSobre'>
        <p>
          Desenvolvido como parte de um Trabalho de Conclusão de Curso (TCC), nosso compromisso é oferecer informações valiosas e pertinentes para os usuários. Nosso foco principal é simplificar a compreensão dos intricados termos de uso que frequentemente encontramos na web.
        </p>
        <h3>Como Funciona:</h3>
        <p>
          O SysATU é uma ferramenta intuitiva projetada para tornar a leitura e entendimento dos termos de uso uma tarefa fácil. Você pode simplesmente inserir o texto dos termos no espaço fornecido, e nossa aplicação destacará e explicará os pontos mais importantes. Isso permite que você navegue pelos termos de maneira mais eficiente, economizando tempo e esforço.
        </p>

        <h3>Nosso Compromisso:</h3>
        <p>
          Estamos dedicados a proporcionar a melhor experiência possível. Seja para esclarecer dúvidas ou receber sugestões de aprimoramento, valorizamos o contato direto com nossos usuários. Sua satisfação é a nossa prioridade.
        </p>
        <p>
          Agradecemos por escolher o SysATU. Esperamos que encontre tudo o que precisa para uma compreensão mais clara e descomplicada dos termos de uso.
          Para qualquer dúvida ou sugestão, não hesite em entrar em contato conosco. Estamos aqui para ajudar!
        </p>
      </div>
    </>
  );
}

export default Sobre;
