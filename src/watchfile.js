const fs = require('fs');

console.log('Before log-timestamp');
require('log-timestamp');
console.log('After log-timestamp');

const buttonPressesLogFile = './button-presses.log';

console.log(`Watching for file changes on ${buttonPressesLogFile}`);

fs.watchFile(buttonPressesLogFile, { interval: 1000 }, (curr, prev) => {
    console.log(`${buttonPressesLogFile} file Changed`);
});