export const firstLetterUpperCase = (string: string) => {
  if (!string) return "";
  const word = string.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
};
