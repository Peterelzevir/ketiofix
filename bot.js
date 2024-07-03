const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment-timezone');

const token = '6771880075:AAHf8GgNw8te-XTRJ4XWHRsZV4Th_rkbCdg'; // Ganti dengan token bot Anda
const adminId = 5988451717; // Ganti dengan ID admin bot Anda
const chatIds = [
    '@PREDICTION_WINGO_AVIATOR_51GAME' // Ganti dengan username channel atau grup yang diinginkan
    // tambahkan lebih banyak chatId sesuai kebutuhan
];

const bot = new TelegramBot(token, { polling: true });

const betData = [
    "BIG / RED 🔴",
    "BIG / GREEN 🟢",
    "SMALL / RED 🔴",
    "SMALL / GREEN 🟢"
];

function getRandomBet() {
    return betData[Math.floor(Math.random() * betData.length)];
}

function generatePeriodsAndBets(startPeriod, count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += `*PERIODE*: ${startPeriod + i}\n*BET*: ${getRandomBet()}\n\n`;
    }
    return result;
}

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
🌐 https://51game5.com/#/register?invitationCode=84783301688`
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
🌐 https://51game5.com/#/register?invitationCode=84783301688`
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
🌐 https://51game5.com/#/register?invitationCode=84783301688`
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
🌐 https://51game5.com/#/register?invitationCode=84783301688`
        }
    },
    {
        type: 'photo',
        file: 'teks5.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `*‼️AVIATOR SYSTEM PREDICTION‼️*

*DATE*: ${date}
*TIME*: ${time}

🥰 *Low Risk* (*EVERY 10 MIN*)✈️

*CASH OUT AT*: ${cashOutValue.toFixed(2)}

📢 *TAKE PROFIT📈 DON'T BE GREEDY*🥰

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`
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
🌐 https://51game5.com/#/register?invitationCode=84783301688`
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
🌐 https://51game5.com/#/register?invitationCode=84783301688`
    },
    {
        type: 'photo',
        file: 'teks8.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `*‼️AVIATOR SYSTEM PREDICTION‼️*

*DATE*: ${date}
*TIME*: ${time}

🥰 *Low Risk* (*EVERY 10 MIN*)✈️

*CASH OUT AT*: ${cashOutValue.toFixed(2)}

📢 *TAKE PROFIT📈 DON'T BE GREEDY*🥰

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`
        }
    },
    // Pesan-pesan tambahan
    {
        type: 'photo',
        file: 'IMG_20240703_125850_633.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `🔥 *WINSTREAK BONUS WITH A BET OF ₹10-99* 🔥

⚡️ लगातार 5 जीतें और पाएं ₹ 20
⚡️ लगातार 8 जीतें और पाएं ₹100
⚡️ लगातार 10 जीतें और पाएं ₹500
⚡️ लगातार 15 जीतें और पाएं ₹1000

🟡 गणना में समान अवधि शामिल नहीं है.
🟡 जिस दिन आप जीतें है उसी दिन बोनस का अनुरोध करें.

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688

*CONTACT THE TEAM AT BIO*`
        }
    },
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
🌐 https://51game5.com/#/register?invitationCode=84783301688`
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
🌐 https://51game5.com/#/register?invitationCode=84783301688`
        }
    },
    {
        type: 'photo',
        file: 'teks12.jpg',
        caption: (date, time, startPeriod) => {
            return `*51GAME* introducing : *AWARD WINNING LIVE* !!

*MORE HOW TO PARTICIPATE* ⁉️

Simple, make sure you are an ACTIVE and a VIP LEVEL member, make sure to register every week to participate!

✅ *Sign up here*: forms.gle/B1vxDzNR6RiK8V6u9

🎁 *BEST PART IS... Your bonus is will calculated with your VIP LEVEL!* उदाहरण के लिए, जब आप 5,000 जीतते हैं, तो हम आपके वी आई पी स्तर की जांच करेंगे, 

यदि आप वी आई पी स्तर 3 पर हैं, तो बोनस 5000 x 3 = 15000 होगा!
यदि आप वीआईपी स्तर 5 पर हैं, तो बोनस 5000 x 5 = 25000 होगा!

अभी भाग लें! बोनस इतना अच्छा कभी नहीं रहा! 🎁`
        }
    },
    {
        type: 'photo',
        file: 'teks1.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `*‼️MY PREDICTION WIN GO‼️*

*WIN GO 1 MINUTE (EVERY 20 MIN)*

*DATE*: ${date}
*TIME*: ${time}
*LEVEL 1-5 MAINTAIN*

${generatePeriodsAndBets(startPeriod, 7)}*REGISTER HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`
        }
    },
    {
        type: 'photo',
        file: 'teks2.jpg',
        caption: (date, time, startPeriod) => {
            return `*‼️AVIATOR SYSTEM PREDICTION‼️*

*DATE*: ${date}
*TIME*: ${time}

🥰 *Low Risk* (*EVERY 10 MIN*)✈️

*CASH OUT AT*: ${cashOutValue.toFixed(2)}

📢 *TAKE PROFIT📈 DON'T BE GREEDY*🥰

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688`
        }
    },
    {
        type: 'photo',
        file: 'teks15.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `*THE BEST PLATFORM 51GAME IN INDIA*
📍Minimum Recharge: ₹100
📍Minimum Withdraw: ₹110
📍Transaction No Fees

*THE TOTAL BONUS YOU CAN RECEIVE IS ₹2125*
⚠️Welcome Bonus: ₹20
⚠️7 Days Bonus: ₹105
⚠️Weekly Bonus: ₹100
⚠️Winstreak 3 periods: ₹30
⚠️VIP Level 1 Bonus: ₹770
⚠️VIP Level 2 Bonus: ₹1100

*REGISTER HERE* :
🌐 https://51game5.com/#/register?invitationCode=84783301688

*CONTACT THE TEAM AT BIO*`
        }
    }
    // tambahkan pesan lain jika diperlukan
];

// Fungsi untuk mengirim pesan dengan delay ke satu chatId tertentu
function sendMessageWithDelay(chatId, message, delay) {
    setTimeout(() => {
        let cashOut = (Math.random() * (5.90 - 1.00) + 1.00).toFixed(2); // Menghasilkan cashOut acak antara 1.00 dan 5.90
        bot.sendPhoto(chatId, message.file, { caption: typeof message.caption === 'function' ? message.caption(date, time, cashOut) : message.caption });
    }, delay);
}

// Fungsi untuk mengirim pesan ke semua chatIds dengan delay
function sendMessagesToAllChannels() {
    chatIds.forEach((chatId, index) => {
        messages.forEach((message, messageIndex) => {
            const delay = (index * messages.length + messageIndex) * 300000; // delay dihitung berdasarkan urutan chatId dan pesan
            sendMessageWithDelay(chatId, message, delay);
        });
    });
}

// Event listener saat pengguna mengirim perintah /pesan
bot.onText(/\/pesan/, (msg) => {
    const chatId = msg.chat.id;
    // Pengecekan adminId
    if (chatId === adminId) {
        sendMessagesToAllChannels();
        bot.sendMessage(chatId, 'Pesan-pesan telah berhasil dikirimkan ke semua channel.');
    } else {
        bot.sendMessage(chatId, 'Maaf, hanya admin yang dapat menggunakan perintah ini.');
    }
});

// Event listener saat pengguna mengirim perintah /help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Kirim /pesan untuk memulai pengiriman pesan ke semua channel.');
});

// Event listener untuk menangani error
bot.on('polling_error', (error) => {
    console.log(error);  // Cetak error jika terjadi
});

console.log('Bot sedang berjalan...');
