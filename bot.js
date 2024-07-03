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
        caption: `*🔵 SHARE THE PRINT IN THE VIP GROUP TO PARTICIPATE*

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
    },
    {
        type: 'photo',
        file: 'teks7.jpg',
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
    {
        type: 'photo',
        file: 'IMG_20240703_125850_633.jpg',
        caption: `🔥 *WINSTREAK BONUS WITH A BET OF ₹10-99* 🔥

⚡️ लगातार 5 जीतें और पाएं ₹ 20
⚡️ लगातार 8 जीतें और पाएं ₹100
⚡️ लगातार 10 जीतें और पाएं ₹500
⚡️ लगातार 15 जीतें और पाएं ₹1000

🟡 गणना में समान अवधि शामिल नहीं है.
🟡 जिस दिन आप जीतें है उसी दिन बोनस का अनुरोध करें.

*REGISTRATION HERE*:
🌐 https://51game5.com/#/register?invitationCode=84783301688

*CONTACT THE TEAM AT BIO*`;
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
    }
];

function sendMessageWithDelay(index) {
    if (index >= messages.length) {
        return;
    }

    const now = moment().tz("Asia/Kolkata");
    const date = now.format('YYYY-MM-DD');
    const time = now.format('HH:mm:ss');
    const startPeriod = Math.floor((now.hours() * 60 + now.minutes()) / 3); // Contoh perhitungan untuk startPeriod

    const message = messages[index];
    let caption = '';
    if (typeof message.caption === 'function') {
        caption = message.caption(date, time, startPeriod);
    } else {
        caption = message.caption;
    }

    chatIds.forEach(chatId => {
        bot.sendPhoto(chatId, message.file, { caption: caption, parse_mode: 'Markdown' })
            .then(() => {
                console.log(`Message sent to ${chatId}`);
            })
            .catch(error => {
                console.error(`Failed to send message to ${chatId}:`, error);
            });
    });

    const nextDelay = 300000; // 30 menit dalam milidetik
    setTimeout(() => sendMessageWithDelay(index + 1), nextDelay);
}

// Mulai mengirim pesan dengan delay
sendMessageWithDelay(0);
