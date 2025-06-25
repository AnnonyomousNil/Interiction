const readline = require('readline');
const fs = require('fs');
const { encrypt } = require('./encryptor');
const { decrypt } = require('./decryptor');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Choose mode (encrypt/decrypt): ', (mode) => {
    rl.question('Enter the file path: ', (filepath) => {
        if (!fs.existsSync(filepath)) {
            console.error('File does not exist.');
            rl.close();
            return;
        }

        rl.question('Enter password: ', (password) => {
            try {
                if (mode === 'encrypt') {
                    const output = encrypt(filepath, password);
                    console.log(`Encrypted file saved as: ${output}`);
                } else if (mode === 'decrypt') {
                    const { outputPath, fileData } = decrypt(filepath, password);
                    console.log(`Decryption successful!`);
                    console.log(`Original name : ${fileData.fileName}`);
                    console.log(`Encrypted at  : ${fileData.timestamp}`);
                    console.log(`SHA-256 Hash  : ${fileData.hash}`);
                    console.log(`Restored file : ${outputPath}`);
                } else {
                    console.error('Invalid mode.');
                }
            } catch (err) {
                console.error('Error:', err.message);
            }
            rl.close();
        });
    });
});
