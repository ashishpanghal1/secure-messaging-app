const crypto = require("crypto");
const fs = require("fs");

const generateKeys = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });

  fs.writeFileSync(__dirname + "/public.pem", publicKey.export({ type: "pkcs1", format: "pem" }));
  fs.writeFileSync(__dirname + "/private.pem", privateKey.export({ type: "pkcs1", format: "pem" }));
};

generateKeys();
console.log("RSA Public and Private Keys Generated.");
