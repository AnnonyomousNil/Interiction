const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { encrypt, sha256 } = require('./encryptor');


function decrypt(encpath, password){
    const raw = fs.readFileSync(encpath);
    const salt = raw.slice(0,16);
    const iv = raw.slice(16,28);
    const tag = raw.slice(28,44);
    const encrypted = raw.slice(44);

    const key = crypto.scryptSync(password, salt, 32);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const payload = JSON.parse(decrypted.toString('utf8'));

    const fileBuffer = Buffer.from(payload.data, 'base64');
    const computedfilehash = sha256(fileBuffer);
    const decomputedfilehash = payload.fileData.hash;

    if(computedfilehash !== decomputedfilehash){
        throw new Error('File hash mismatch: File may be corrupted or tampered with');
    }

    const outputPath = 'restored_' + payload.fileData.fileName;
    fs.writeFileSync(outputPath, fileBuffer);

    return {
        outputPath,
        fileData: payload.fileData
    };


}

module.exports = {decrypt};