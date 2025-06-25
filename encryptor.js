const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function sha256(buffer){
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

function encrypt(inputpath, password){
    const originalFileName = path.basename(inputpath);
    const fileBuffer = fs.readFileSync(inputpath);
    const fileHash = sha256(fileBuffer);
    const timestamp = new Date().toISOString();

    const fileData = {
        fileName: originalFileName,timestamp,
        hash: fileHash,
    };


    const payload = JSON.stringify({
        fileData,
        data: fileBuffer.toString('base64'),

    });

    const salt = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, salt, 32);
    const iv = crypto.randomBytes(12);
    const cipher =  crypto.createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    const output = Buffer.concat([salt, iv, tag, encrypted]);
    const outputFileName = inputpath + '.enc';
    fs.writeFileSync(outputFileName, output);

    return outputFileName;

}



module.exports = { encrypt , sha256};
