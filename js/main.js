const nltk = require('nltk');

async function extractKeywords(text, numKeywords) {
  // Tokenização do texto em palavras
  const tokens = nltk.tokenize.word_tokenize(text);

  // Remoção de stopwords
  await nltk.download('stopwords');
  const stopWords = new Set(nltk.corpus.stopwords.words('english'));
  const filteredTokens = tokens.filter((word) => !stopWords.has(word.toLowerCase()));

  // Stemming
  const stemmedTokens = filteredTokens.map(nltk.stem.PorterStemmer.stem);

  // Frequência das palavras
  const fdist = nltk.probability.FreqDist(stemmedTokens);

  // Obtenção das palavras mais frequentes (frases-chave)
  const keywords = fdist.most_common(numKeywords).map(([word]) => word);

  return keywords;
}

// Exemplo de uso
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
extractKeywords(text, 3).then((keywords) => {
  console.log(keywords);
});
