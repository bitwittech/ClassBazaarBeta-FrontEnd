export const titleCase = str => {
  if (str === null || str === undefined) return '';
  return str
    .replace(/[a-z]/i, function(letter) {
      return letter.toUpperCase();
    })
    .trim();
};
