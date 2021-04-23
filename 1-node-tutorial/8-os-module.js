const os = require('os');

// info about current user
const user = os.userInfo();
console.log(user);
const tere3 = os.uptime();
console.log(tere3);

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`);

const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOS);
