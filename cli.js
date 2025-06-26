const readline = require('readline');
const readlineSync = require('readline-sync'); // ← added for hidden password
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
            console.error('❌ File does not exist.');
            rl.close();
            return;
        }


        const password = readlineSync.question('Enter password: ', {
            hideEchoBack: true
        });

        try {
            if (mode === 'encrypt') {
                const output = encrypt(filepath, password);
                console.log(`✅ Encrypted file saved as: ${output}`);
            } else if (mode === 'decrypt') {
                const { outputPath, fileData } = decrypt(filepath, password);
                console.log(`🔓 Decryption successful!`);
                console.log(`📄 Original name : ${fileData.fileName}`);
                console.log(`🕒 Encrypted at  : ${fileData.timestamp}`);
                console.log(`🔑 SHA-256 Hash  : ${fileData.hash}`);
                console.log(`📁 Restored file : ${outputPath}`);
            } else {
                console.error('❌ Invalid mode. Use "encrypt" or "decrypt".');
            }
        } catch (err) {
            console.error('❗ Error:', err.message);
        }

        rl.close();
    });
});
