const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(msg) {
  return new Promise((resolve) => {
    rl.question(msg, resolve);
  });
}

module.exports = question;
