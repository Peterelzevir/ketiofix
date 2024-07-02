//source code by @hiyaok
//not for resale

const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment-timezone');

// Ganti dengan token akses bot Anda
const token = '6771880075:AAG33S6nO7RhRIcM3jv0UbOux6qoYSkEnUw';
const adminId = 5988451717;
const channelUsername = '@PREDICTION_WINGO_AVIATOR_51GAME';

// Inisialisasi bot
const bot = new TelegramBot(token, { polling: true });

// Data prediksi BET
const betData = [
    "BIG / RED 🔴",
    "BIG / GREEN 🟢",
    "SMALL / RED 🔴",
    "SMALL / GREEN 🟢"
];

// Fungsi untuk mendapatkan prediksi BET secara acak
function getRandomBet() {
    return betData[Math.floor(Math.random() * betData.length)];
}

// Fungsi untuk menghasilkan periode dan prediksi BET
function generatePeriodsAndBets(startPeriod, count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += `*PERIODE*: ${startPeriod + i}\n*BET*: ${getRandomBet()}\n\n`;
    }
    return result;
}

// Pesan yang akan dikirim oleh bot
const messages = [
    {
        type: 'photo',
        file: 'teks1.jpg',
        caption: (date, time, startPeriod) => {
            return `*‼️MY PREDICTION WIN GO‼️*

*WIN GO 1 MINUTE (EVERY 20 MIN)*

*DATE*: ${date}
*TIME*: ${time}
*LEVEL 1-5 MAINTAIN*

${generatePeriodsAndBets(startPeriod, 7)}*REGISTER HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`;
        }
    },
    {
        type: 'photo',
        file: 'teks2.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `*‼️AVIATOR SYSTEM PREDICTION‼️*

*DATE*: ${date}
*TIME*: ${time}

🥰 *Low Risk* (*EVERY 10 MIN*)✈️

*CASH OUT AT*: ${cashOutValue.toFixed(2)}

📢 *TAKE PROFIT📈 DON'T BE GREEDY*🥰

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`;
        }
    },
    {
        type: 'photo',
        file: 'teks3.jpg',
        caption: `*👑 ‼️ DAILY ROULETTE VIP ‼️ 👑*

*Climb up on your VIP Level!! It is now time to WIN MEGA REWARDS!*

     🤑 *10* *DRAWED EVERY DAY*
     🤑  *Winner wins: ₹3000*

*RULES*:
❎ *REGISTER NOW tinyurl.com/vip51game*
❎ *REACH VIP LEVEL 3-10 FOR THE FIRST TIME*
❎ *MEMBERS MUST REGISTER TO PARTICIPATE ON THE DAY THEY REACH VIP LEVEL*
❎ *BONUS WILL NOT BE GIVEN IF THE MEMBER VIOLATES REGULATIONS AND ILLEGAL BETTING*
❎ *BONUS HAS TURNOVER 1X*

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`;
    },
    {
        type: 'photo',
        file: 'teks4.jpg',
        caption: (date, time, startPeriod) => {
            return `*‼️MY PREDICTION WIN GO‼️*

*WIN GO 1 MINUTE* (*EVERY 10 MIN*)

*DATE*: ${date}
*TIME*: ${time}
*LEVEL 4-7 MAINTAIN*

${generatePeriodsAndBets(startPeriod, 7)}*REGISTER HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`;
        }
    },
    {
        type: 'photo',
        file: 'teks5.jpg',
        caption: (date, time, startPeriod) => {
            return `*‼️AVIATOR SYSTEM PREDICTION‼️*

*DATE*: ${date}
*TIME*: ${time}

🥰 *Low Risk* (*EVERY 10 MIN*)✈️

*CASH OUT AT*: ${cashOutValue.toFixed(2)}

📢 *TAKE PROFIT📈 DON'T BE GREEDY*🥰

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`;
        }
    },
    {
        type: 'photo',
        file: 'teks6.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `*🔵 SHARE THE PRINT IN THE VIP GROUP TO PARTICIPATE*

*👑‼️ DAILY ROULETTE ‼️👑*

  ➡️ *Get a 3-win streak on WINGO*
  ➡️ *Hit a Big Win (x50) on SLOTS*
  ➡️ *Achieve a x20 multiplier on AVIATOR*

*Please send your screenshots for each Roulette session and remember to recharge required on the day before Roulette.*

*RULES*:
  ✅ *Session 10 winners: Valid recharge must be before posting the screenshot until the winner announcement.*
  ✅ *Session 11 winners: Valid recharge must be after 00:01H.*

  🔴 *REPLY ON THE SAME DAY OTHERWISE IT WILL BE INVALID*
  🔴 *NON-COMPLIANT MEMBERS WILL NOT BE VALIDATED AS WINNERS*
  🔴 *EVENT ABUSE MAY LEAD TO WARNING, VIP GROUP BAN, AND EVENT EXCLUSION*

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`;
        }
    },
    {
        type: 'photo',
        file: 'teks7.jpg',
        caption: `*‼️MY PREDICTION WIN GO‼️*

*WIN GO 1 MINUTE (EVERY 20 MIN)*

*DATE*: ${date}
*TIME*: ${time}
*LEVEL 1-5 MAINTAIN*

${generatePeriodsAndBets(startPeriod, 7)}*REGISTER HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`;
    },
    {
        type: 'photo',
        file: 'teks8.jpg',
        caption: (date, time, startPeriod) => {
            return `*‼️AVIATOR SYSTEM PREDICTION‼️*

*DATE*: ${date}
*TIME*: ${time}

🥰 *Low Risk* (*EVERY 10 MIN*)✈️

*CASH OUT AT*: ${cashOutValue.toFixed(2)}

📢 *TAKE PROFIT📈 DON'T BE GREEDY*🥰

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`;
        }
    }
];

let stopMessages = false;
let messageIndex = 0;

// Fungsi untuk mengirim pesan
async function sendMessage() {
    if (stopMessages) return;

    const now = moment().tz('Asia/Kolkata');
    const date = now.format('YYYY-MM-DD');
    const time = now.format('HH:mm:ss');

    const currentMessage = messages[messageIndex];

    let caption;
    if (typeof currentMessage.caption === 'function') {
        if (messageIndex === 1 || messageIndex === 5) {
            caption = currentMessage.caption(date, time, (Math.random() * 2 + 2.5).toFixed(2)); // Random cash out between 1.00 and 4.00
        } else {
            const totalMinutes = (now.hours() * 60) + now.minutes();
            const startPeriod = parseInt(now.format('YYYYMMDD01')) * 10000 + totalMinutes + 2; // +2 untuk periode awal

            caption = currentMessage.caption(date, time, startPeriod);
        }
    } else {
        caption = currentMessage.caption;
    }

    try {
        await bot.sendPhoto(channelUsername, currentMessage.file, { caption, parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error sending message:', error);
    }

    messageIndex = (messageIndex + 1) % messages.length; // Mengulangi siklus pesan

    setTimeout(sendMessage, 5 * 60 * 1000); // Jeda 5 menit sebelum mengirim pesan berikutnya
}

// Command /mulai
bot.onText(/\/mulai/, (msg) => {
    if (msg.chat.id === adminId) {
        stopMessages = false;
        messageIndex = 0; // Reset indeks pesan
        sendMessage(); // Memulai pengiriman pesan
    }
});

// Command /stop
bot.onText(/\/stop/, (msg) => {
    if (msg.chat.id === adminId) {
        stopMessages = true;
    }
});

// Start the bot
bot.on('polling_error', console.log);

// Log when the bot is active
console.log('Bot is active!');

// Log bot activities
bot.on('message', (msg) => {
    console.log('📈 New message:', msg);
});
