//source code by @hiyaok

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

//dapetin dari bot father
const token = '7406919687:AAGNLXrAWlNgN1_nz6MWevsBXvSM5klIQBI';
const bot = new TelegramBot(token, { polling: true });

let contactsPerFile = 100; // Default jumlah kontak per file

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '👋🏻 Selamat datang di bot convert file txt ke file vcf 🤩\n\n👉🏻 Kirim file .txt berisi kontak ke bot ya maka secara otomatis akan di convert ke file vcf\n\n➡️ kamu dapat menentukan jumlah kontak per file dengan setting di bot\n\n❗kirim pesan /setsize diikuti angka, misalnya /setsize 100.');
});

bot.onText(/\/setsize (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const size = parseInt(match[1]);
    if (size > 0) {
        contactsPerFile = size;
        bot.sendMessage(chatId, `✅ Success\n\nSekarang jumlah kontak per file diatur ke ${size}`);
    } else {
        bot.sendMessage(chatId, '⚠️ Mohon masukkan angka yang valid.');
    }
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    if (msg.document) {
        const fileId = msg.document.file_id;
        const file = await bot.getFile(fileId);
        const filePath = file.file_path;

        bot.sendMessage(chatId, '📂 file diterima\n\n💡 𝘮𝘰𝘩𝘰𝘯 𝘵𝘶𝘯𝘨𝘨𝘶 𝘴𝘦𝘥𝘢𝘯𝘨 𝘥𝘪 𝘱𝘳𝘰𝘴𝘦𝘴');

        const fileName = `downloaded_${msg.document.file_name}`;
        const dest = fs.createWriteStream(fileName);

        // Import fetch dynamically
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(`https://api.telegram.org/file/bot${token}/${filePath}`);
        response.body.pipe(dest);

        dest.on('finish', () => {
            processFile(fileName, chatId);
        });
    }
});

function processFile(fileName, chatId) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            bot.sendMessage(chatId, '💤 Terjadi kesalahan saat membaca file\n\n📩 note : mungkin format file tidak sesuai');
            return;
        }

        const adminVCF = [];
        const navyVCF = [];
        const memberVCF = [];

        const lines = data.split('\n');
        let currentType = '';
        let adminCount = 1;
        let navyCount = 1;
        let memberCount = 1;

        lines.forEach(line => {
            if (line.startsWith('Admin:')) {
                currentType = 'admin';
            } else if (line.startsWith('Navy:')) {
                currentType = 'navy';
            } else if (line.startsWith('Member:')) {
                currentType = 'member';
            } else if (line.trim()) {
                if (currentType === 'admin') {
                    adminVCF.push(formatAsVCF(line.trim(), `ADMIN${adminCount}`));
                    adminCount++;
                } else if (currentType === 'navy') {
                    navyVCF.push(formatAsVCF(line.trim(), `NAVY${navyCount}`));
                    navyCount++;
                } else if (currentType === 'member') {
                    memberVCF.push(formatAsVCF(line.trim(), `MEMBER${memberCount}`));
                    memberCount++;
                }
            }
        });

        const adminNavyFileName = 'ADMIN+NAVY FILE.vcf';
        const adminNavyVCF = [...adminVCF, ...navyVCF].join('\n');
        fs.writeFileSync(adminNavyFileName, adminNavyVCF, 'utf8');

        bot.sendDocument(chatId, adminNavyFileName).then(() => {
            fs.unlinkSync(adminNavyFileName);
        }).catch(err => {
            console.error('❌ Failed to send admin+navy VCF:', err);
        });

        const memberFiles = splitMembers(memberVCF, contactsPerFile);
        memberFiles.forEach((file, index) => {
            const memberFileName = `MEMBERFILE_${index + 1}.vcf`;
            fs.writeFileSync(memberFileName, file.join('\n'), 'utf8');

            bot.sendDocument(chatId, memberFileName).then(() => {
                fs.unlinkSync(memberFileName);
            }).catch(err => {
                console.error(`❌ Failed to send member VCF ${memberFileName}:`, err);
            });
        });

        fs.unlinkSync(fileName);
        bot.sendMessage(chatId, '✅ 𝙙𝙤𝙣𝙚! 𝙞𝙣𝙞 𝙛𝙞𝙡𝙚 𝙣𝙮𝙖 𝙮𝙖 ⬇️');
    });
}

function formatAsVCF(number, name) {
    return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;TYPE=CELL:${number}\nEND:VCARD`;
}

function splitMembers(members, size) {
    const chunks = [];
    for (let i = 0; i < members.length; i += size) {
        chunks.push(members.slice(i, i + size));
    }
    return chunks;
}
