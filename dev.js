const concurrently = require('concurrently');

concurrently([
  { 
    command: 'npm run dev:frontend',
    name: 'frontend',
    prefixColor: 'blue'
  },
  { 
    command: 'npm run dev:backend',
    name: 'backend',
    prefixColor: 'green'
  }
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
}).then(
  () => console.log('All processes exited with code 0'),
  (err) => console.error('Error occurred:', err)
); 