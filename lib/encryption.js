/*

encryption logic via https://gist.github.com/vlucas/2bd40f62d20c1d49237a109d491974eb
and then wrapped in promises

*/
'use strict';

const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

function encrypt(text) {
  return new Promise (resolve => {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    resolve(iv.toString('hex') + ':' + encrypted.toString('hex'));
  });
}

function decrypt(text) {
  return new Promise(resolve => {
    let textParts = text.split(':');
    let iv = new Buffer(textParts.shift(), 'hex');
    let encryptedText = new Buffer(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    resolve(decrypted.toString());
  });
}

module.exports = { decrypt, encrypt };
