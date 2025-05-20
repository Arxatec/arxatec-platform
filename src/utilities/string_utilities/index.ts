export const toSnakeCase = (text: string) =>
  text
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const getFirstTwoWords = (fullName: string): string => {
  const words = fullName.trim().split(/\s+/);
  return words.slice(0, 2).join(" ");
};
