const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment-timezone');

// Ganti dengan token akses bot Anda
const token = '6771880075:AAG33S6nO7RhRIcM3jv0UbOux6qoYSkEnUw';
const adminId = 5988451717;
const channelUsername = '@COLOURGAME_AVIATOR_51GAME';

// Inisialisasi bot
const bot = new TelegramBot(token, { polling: true });

// Data prediksi BET
const betData = [
    "BIG / RED 🔴",
    "BIG / GREEN 🟢",
    "SMALL / RED 🔴",
    "SMALL / GREEN 🟢"
];

// Pesan yang akan dikirim oleh bot
const messages = [
    {
        type: 'photo',
        file: 'teks1.jpg',
        caption: `🔥 *WINSTREAK BONUS WITH A BET OF ₹10-99* 🔥\n\n⚡️ लगातार 5 जीतें और पाएं ₹ 20\n⚡️ लगातार 8 जीतें और पाएं ₹100\n⚡️ लगातार 10 जीतें और पाएं ₹500\n⚡️ लगातार 15 जीतें और पाएं ₹1000\n\n*REGISTRATION HERE*:\n🌐 https://51game5.com/#/register?invitationCode=84783301688\n\n*CLAIM WIN STRAKE*:\n🦢 https://wa.me/+919794821154 🦢\n\n🟡 गणना में समान अवधि शामिल नहीं है.\n🟡 जिस दिन आप जीतें है उसी दिन बोनस का अनुरोध करें.`
    },
    {
        type: 'photo',
        file: 'teks2.jpg',
        caption: (date, time, startPeriod) => {
            function getRandomBet() {
                return betData[Math.floor(Math.random() * betData.length)];
            }

            function generatePeriodsAndBets(startPeriod) {
                let result = '';
                for (let i = 0; i < 5; i++) {
                    result += `*PERIODE*: ${startPeriod + i}\n*BET*: ${getRandomBet()}\n\n`;
                }
                return result;
            }

            return `‼️ *MY PREDICTION WIN GO 🎱* ‼️\n\n🔉 *WIN GO 1 MINUTE*\n\n*DATE*: ${date}\n*TIME*: ${time}\n*LEVEL 1-5 MAINTAIN*\n\n${generatePeriodsAndBets(startPeriod)}*REGISTER HERE*:\n🌐 https://51game5.com/#/register?invitationCode=84783301688\n\n*🔊 USE THIS PREDICTION WISELY*, Keep a High Balance, Earn High Profits Daily!`;
        }
    },
    {
        type: 'photo',
        file: 'teks3.jpg',
        caption: `*THE BEST PLATFORM 51GAME IN INDIA*
📍Minimum Recharge: ₹100
📍Minimum Withdraw: ₹110

*THE TOTAL BONUS YOU CAN RECEIVE IS ₹2125*
⚠️Welcome Bonus: ₹20
⚠️7 Days Bonus: ₹105
⚠️Weekly Bonus: ₹100
⚠️Winstreak 3 periods: ₹30
⚠️VIP Level 1 Bonus: ₹770
⚠️VIP Level 2 Bonus: ₹1100

*REGISTER HERE* :
🌐 https://51game5.com/#/register?invitationCode=84783301688

*CONTACT TO CLAIM THE BONUSES* :
TELEGRAM: @Mahimawelcomebonus
WHATSAPP: +919794821154`,
    },
    {
        type: 'photo',
        file: 'teks4.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `‼️ *AVIATOR SYSTEM PREDICTION ✈️* ‼️\n\n*DATE*: ${date}\n*TIME*: ${time}\n\nLow Risk 🥰\n\n*CASH OUT AT*: ${cashOutValue.toFixed(2)}\n\n📢 TAKE PROFIT📈 DON'T BE GREEDY🥰\n\n*REGISTRATION HERE*:\n🌐 https://51game5.com/#/register?invitationCode=84783301688`;
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
        if (messageIndex === 1) {
            const baseTime = moment.tz('2024-06-22 16:35:00', 'Asia/Kolkata');
            const diffMinutes = now.diff(baseTime, 'minutes');
            const startPeriod = 20240623010996 + diffMinutes + 2;
            caption = currentMessage.caption(date, time, startPeriod);
        } else if (messageIndex === 3) {
            caption = currentMessage.caption(date, time, (Math.random() * 2 + 1.5).toFixed(2)); // Random cash out between 1.50 and 3.50
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
