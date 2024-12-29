export const spaceClear = (str: string): string => {
  return str.replace(/[\s\u0400-\u04FF]/g, '');
};

export function removeSpacesAndSlashes(str: string): string {
  return str.replace(/[\s/]/g, '');
}

export function removeCyrillic(str: string): string {
  return str.replace(/[\s\u0400-\u04FF]/g, '');
}

export function removeChar(str: string): string {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '.' && str[i] !== '-') {
      result += str[i];
    }
  }
  return result;
}
export function processString(str: string): string {
  const afterFirstSpace = str.substring(str.indexOf(' ') + 1);
  const withoutSpaces = afterFirstSpace.replace(/\s/g, '');
  return withoutSpaces;
}
