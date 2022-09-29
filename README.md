# deep-substring

[![npm version](https://badge.fury.io/js/deep-substring.svg)](https://badge.fury.io/js/deep-substring)

A utility function for creating substrings for all values of an object, with
optional support for splitting on a given separator.

## Installation

Install using npm:

```sh
npm install deep-substring -D
```

Or yarn:

```sh
yarn install deep-substring -D
```

## Usage

```js
import { deepSubstring } from 'deep-substring';

deepSubstring('hello', 0, 4);
// => hell

deepSubstring(['hello', 'world'], 1, 4);
// => ['ello', 'orld']

deepSubstring({ hello: { world: 'nested string' } }, 2, 10);
// => { hello: { world: 'sted str' } }
```

### Separators

The `separator` option can be used to drop any values that would otherwise
exceed the start and end index.

```js
import { deepSubstring } from 'deep-substring';

deepSubstring('one,two,three', 0, 10, { separator: ',' });
// => one,two

deepSubstring(['one two', 'three four five'], 0, 10, { separator: ' ' });
// => ['one two', 'three four']

deepSubstring({ hello: { world: ['one|two|three|four'] } }, 2, 15, { separator: '|' });
// => { hello: { world: ['two|three'] } }
```
