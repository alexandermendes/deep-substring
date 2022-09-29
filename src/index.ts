type DeepSubstringOptions = {
  separator?: string;
};

const subString = (
  value: string,
  start: number,
  end: number,
  { separator }: DeepSubstringOptions = {},
): string => {
  if (!separator) {
    return value.substring(start, end);
  }

  let iteratedString = '';

  return value
    .split(separator).reduce((joinedString, stringPart) => {
      const shouldStart = iteratedString.length >= start;

      if (iteratedString) {
        iteratedString += separator;
      }

      iteratedString += stringPart;

      if (!shouldStart) {
        return joinedString;
      }

      if (!joinedString) {
        return stringPart;
      }

      const newString = `${joinedString}${separator}${stringPart}`;

      if (iteratedString.length < end) {
        return newString;
      }

      return joinedString;
    }, '').substring(0, end);
};

export const deepSubstring = (
  value: any,
  start: number,
  end: number,
  options?: DeepSubstringOptions,
): any => {
  if (typeof value === 'string') {
    return subString(value, start, end, options);
  }

  if (Array.isArray(value)) {
    return value.map((arrValue) => deepSubstring(arrValue, start, end, options));
  }

  if (typeof value === 'object') {
    return Object.entries(value).reduce((acc, [key, objValue]) => ({
      ...acc,
      [key]: deepSubstring(objValue, start, end, options),
    }), {});
  }

  return value;
};
