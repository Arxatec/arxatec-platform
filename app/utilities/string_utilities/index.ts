export const toSnakeCase = (text: string) =>
  text
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
