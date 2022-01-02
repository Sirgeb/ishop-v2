function formatLetters(word: string) {
  const arrOfWords = word.split(' ');
  const formattedWordsArr: string[] = [];

  arrOfWords.forEach(word => {
    const firstLetter = word.slice(0, 1).toUpperCase();
    const remainingLetters = word.slice(1).toLowerCase();
    const newWord = firstLetter + remainingLetters;
    formattedWordsArr.push(newWord);
  });

  return formattedWordsArr.join(" ");
}

export default formatLetters;
