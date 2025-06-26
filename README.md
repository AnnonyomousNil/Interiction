# Interiction

Interiction is a secure, command-line-based file storage system built with **Node.js**, enabling you to:
- 🔐 Encrypt any file using AES-256-GCM
- 🔓 Decrypt previously encrypted files
- 🧾 Store file metadata (filename, hash, timestamp)
- 🛡️ Validate file integrity after decryption

---

## 📦 Features

- AES-256-GCM encryption using a password
- Random salt and IV generation for each encryption
- SHA-256 hashing for file integrity
- Metadata embedded in encrypted file
- Simple CLI interface with prompts
- Encrypted files saved with `.enc` extension
- Works with **any file type**

---

## 🛠️ Tech Stack

- Node.js
- `crypto` module (built-in)
- `fs` module (built-in)
- `path` module (built-in)
- CLI interface (via `readline`)
- No external dependencies required

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AnnonyomousNil/Interiction.git
```

### 2. Run the CLI tool
```bash
node cli.js
```

You will be prompted to:

- Choose mode: encrypt or decrypt
- Enter file path
- Provide password

---

## 🔐 Encrypting a File
-  Select encrypt mode

-  Provide the path to the file (e.g., ./secret.pdf)

-  Enter a strong password

-  Encrypted file is saved as secret.pdf.enc



## 🔓 Decrypting a File
- Select decrypt mode

- Provide path to .enc file (e.g., secret.pdf.enc)

- Enter the correct password

- If the hash matches the original file is restored as restored_secret.pdf

- If the password is incorrect or file was tampered, decryption fails



## 📄 Metadata Included in Encrypted Files
Each encrypted file contains:

- Original filename

- Timestamp of encryption

- SHA-256 hash of the original content

- All encrypted using AES



## 🧪 Example
```bash
$ node cli.js

INTERICTION

Choose mode (encrypt/decrypt): encrypt

Enter the file path: ./notes.txt

Enter password: ********


✅ Encrypted file saved as: notes.txt.enc
```




## 📌 Security Notes
- Uses crypto.scryptSync() to derive a secure AES key from a password

- Uses AES-256-GCM for authenticated encryption

- All metadata is included and encrypted inside the .enc file

- Integrity is verified using SHA-256




