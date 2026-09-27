const crypto = require('crypto');

const randomString = crypto.randomUUID();

function logRandomString() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]: ${randomString}`);
}

setInterval(logRandomString, 5000);