import { deepSubstring } from '../src';

const maxLength = 100;
const longString = Array(100 + 1).fill('x').join('');
const trimmedString = Array(100).fill('x').join('');
const getSeparatedString = (sep: string) => Array(30).fill('xxxxx').join(sep);
const getTrimmedSeparatedString = (sep: string) => Array(16).fill('xxxxx').join(sep);

describe('deepSubstring', () => {
  it.each`
    value                 | start | end          | expectedResult
    ${'hello'}            | ${0}  | ${4}         | ${'hell'}
    ${'hello'}            | ${1}  | ${3}         | ${'el'}
    ${'hello'}            | ${1}  | ${undefined} | ${'ello'}
    ${['hello', 'world']} | ${0}  | ${4}         | ${['hell', 'worl']}
    ${['hello', 'world']} | ${2}  | ${4}         | ${['ll', 'rl']}
    ${['hello', 'world']} | ${2}  | ${undefined} | ${['llo', 'rld']}
    ${{ hello: 'world' }} | ${2}  | ${undefined} | ${{ hello: 'rld' }}
  `('trims $value to $expectedResult', ({
    value,
    start,
    end,
    expectedResult,
  }) => {
    const result = deepSubstring(value, start, end);

    expect(result).toEqual(expectedResult);
  });

  it.each([',', ' ', '|'])('trims a complex object using the separator $separator', (separator) => {
    const result = deepSubstring({
      one: longString,
      two: getSeparatedString(separator),
      three: [
        longString,
        [getSeparatedString(separator)],
        [{ four: longString }],
      ],
      5: longString,
    }, 0, maxLength, { separator });

    expect(result).toEqual({
      one: trimmedString,
      two: getTrimmedSeparatedString(separator),
      three: [
        trimmedString,
        [getTrimmedSeparatedString(separator)],
        [{ four: trimmedString }],
      ],
      5: trimmedString,
    });
  });

  it('drops items before the start index in separator mode', () => {
    const result = deepSubstring({
      hello: {
        world: ['one|two|three|four'],
      },
    }, 2, 15, { separator: '|' });

    expect(result).toEqual({ hello: { world: ['two|three'] } });
  });
});
