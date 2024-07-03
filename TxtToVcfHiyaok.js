const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const fetch = require('node-fetch');
const stringSimilarity = require('string-similarity');

// Replace with your own token
const token = '7406919687:AAGNLXrAWlNgN1_nz6MWevsBXvSM5klIQBI';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  if (msg.document) {
    const caption = msg.caption;
    if (!caption) {
      bot.sendMessage(msg.chat.id, 'Please provide a caption with the format (Nama bagian),(nama file vcf yg dihasilkan mau nama apa),(jumlah kontak per file)', { reply_to_message_id: msg.message_id });
      return;
    }

    const parts = caption.split('\n');
    for (const part of parts) {
      const sectionData = part.split(',');
      if (sectionData.length < 2 || sectionData.length > 3) {
        bot.sendMessage(msg.chat.id, 'Invalid caption format. Please provide a caption with the format (Nama bagian),(nama file vcf yg dihasilkan mau nama apa),(jumlah kontak per file)', { reply_to_message_id: msg.message_id });
        return;
      }

      const sections = sectionData[0].trim().split('+');
      const namaFileVCF = sectionData[1].trim();
      const contactsPerFile = sectionData[2] ? parseInt(sectionData[2].trim()) : null;

      const fileId = msg.document.file_id;
      const file = await bot.getFile(fileId);
      const filePath = file.file_path;
      const fileUrl = `https://api.telegram.org/file/bot${token}/${filePath}`;
      const localFilePath = path.join(__dirname, msg.document.file_name);

      // Download the file
      bot.sendMessage(msg.chat.id, `Sedang Proses File ${msg.document.file_name}`, { reply_to_message_id: msg.message_id });
      const response = await fetch(fileUrl);
      const fileStream = fs.createWriteStream(localFilePath);
      await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on('error', reject);
        fileStream.on('finish', resolve);
      });

      // Process the file
      const contacts = [];
      const sectionNames = [];
      const rl = readline.createInterface({
        input: fs.createReadStream(localFilePath),
        output: process.stdout,
        terminal: false
      });

      let currentSection = '';
      rl.on('line', (line) => {
        if (line.startsWith('(') && line.endsWith(')')) {
          currentSection = line.slice(1, -1).trim();
          sectionNames.push(currentSection);
        } else if (currentSection) {
          const number = line.trim();
          contacts.push({
            section: currentSection,
            number: number.startsWith('+') ? number : `+${number}`
          });
        }
      });

      rl.on('close', () => {
        const matchedSections = sections.map(section => {
          const match = stringSimilarity.findBestMatch(section, sectionNames);
          return match.bestMatch.rating >= 0.8 ? match.bestMatch.target : null;
        });

        if (matchedSections.includes(null)) {
          const missingSections = sections.filter((_, index) => matchedSections[index] === null);
          bot.sendMessage(msg.chat.id, `Halo @${msg.from.username}, nama bagian "${missingSections.join(', ')}" dalam file ${msg.document.file_name} tidak ditemukan.`, { reply_to_message_id: msg.message_id });
          fs.unlinkSync(localFilePath);
          return;
        }

        const filteredContacts = contacts.filter(contact => matchedSections.includes(contact.section));

        if (filteredContacts.length === 0) {
          bot.sendMessage(msg.chat.id, `Halo @${msg.from.username}, nama bagian "${sections.join('+')}" dalam file ${msg.document.file_name} tidak ditemukan.`, { reply_to_message_id: msg.message_id });
          fs.unlinkSync(localFilePath);
          return;
        }

        const createVCF = (contacts, fileName) => {
          let vcfContent = '';
          contacts.forEach((contact, index) => {
            vcfContent += `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.section} ${index + 1}\nTEL:${contact.number}\nEND:VCARD\n`;
          });

          const vcfFilePath = path.join(__dirname, `${fileName}.vcf`);
          fs.writeFileSync(vcfFilePath, vcfContent);
          return vcfFilePath;
        };

        if (contactsPerFile) {
          let fileCounter = 1;
          for (let i = 0; i < filteredContacts.length; i += contactsPerFile) {
            const chunk = filteredContacts.slice(i, i + contactsPerFile);
            const vcfFilePath = createVCF(chunk, `${namaFileVCF}_${fileCounter}`);
            bot.sendDocument(msg.chat.id, vcfFilePath, { reply_to_message_id: msg.message_id });
            fileCounter++;
          }
        } else {
          const vcfFilePath = createVCF(filteredContacts, namaFileVCF);
          bot.sendDocument(msg.chat.id, vcfFilePath, { reply_to_message_id: msg.message_id });
        }

        bot.sendMessage(msg.chat.id, 'Proses selesai.', { reply_to_message_id: msg.message_id });
        fs.unlinkSync(localFilePath);
      });
    }
  }
});

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome! Send a TXT file with the format (Nama bagian),(nama file vcf yg dihasilkan mau nama apa),(jumlah kontak per file)');
});
