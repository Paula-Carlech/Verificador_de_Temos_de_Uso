function verificarTermo() {
  var termo = document.getElementById("termoUso").value;

  // Extração das informações relevantes
  var resumo = extrairInformacoes(termo);

  // Apresentar resumo para o usuário
  document.getElementById("resumo").innerHTML = resumo;
}

function extrairInformacoes(termo) {
  // Lógica para extrair informações relevantes do termo de uso

  var palavrasChave = ["privacidade", "cookies", "responsabilidade", "acordo"];
  var informacoes = "";

  palavrasChave.forEach(function(palavra) {
      if (termo.includes(palavra)) {
          informacoes += "- " + palavra + "<br>";
      }
  });

  return informacoes;
}

function limparTexto() {
  document.getElementById("termoUso").value = "";
}



// const nltk = require('nltk');

// async function extractKeywords(text, numKeywords) {
//   // Tokenização do texto em palavras
//   const tokens = nltk.tokenize.word_tokenize(text);

//   // Remoção de stopwords
//   await nltk.download('stopwords');
//   const stopWords = new Set(nltk.corpus.stopwords.words('english'));
//   const filteredTokens = tokens.filter((word) => !stopWords.has(word.toLowerCase()));

//   // Stemming
//   const stemmedTokens = filteredTokens.map(nltk.stem.PorterStemmer.stem);

//   // Frequência das palavras
//   const fdist = nltk.probability.FreqDist(stemmedTokens);

//   // Obtenção das palavras mais frequentes (frases-chave)
//   const keywords = fdist.most_common(numKeywords).map(([word]) => word);

//   return keywords;
// }

// // Exemplo de uso
// const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
// extractKeywords(text, 3).then((keywords) => {
//   console.log(keywords);
// });
