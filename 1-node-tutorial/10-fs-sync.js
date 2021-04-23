const { readFileSync, writeFileSync } = require('fs');
console.log('start');

const first2 = readFileSync('./content/first.txt', 'utf16le');

const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');

writeFileSync(
  './content/result-sync.txt',
  `\nHere is the result : \n${first} \r\n${second}`,
  { flag: 'a' }
);
console.log('done with this task');
console.log('starting the next one');

writeFileSync('./content/result-sync2.txt', `test: ${first2}`);
