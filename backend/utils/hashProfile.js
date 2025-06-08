const crypto = require("crypto"); // 1. Load the crypto module (built-in in Node.js)

function hashProfile(profile) {
  return crypto
    .createHash("sha256") // SHA-256 = strong hash function
    .update(JSON.stringify(profile)) // Convert the object to a string
    .digest("hex"); // Convert the raw binary to hex
}

module.exports = hashProfile;
