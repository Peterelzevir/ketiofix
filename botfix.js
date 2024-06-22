const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment-timezone');

// Ganti dengan token akses bot Anda
const token = '6771880075:AAEnI0QXZi2i1TFB4G0BXUEDIDtKf54QEkw';
const adminId = 5988451717;
const channelUsername = '@COLOURGAME_AVIATOR_51GAME';

// Inisialisasi bot
const bot = new TelegramBot(token, { polling: true });

// Pesan yang akan dikirim oleh bot
const messages = [
    {
        type: 'photo',
        file: 'teks1.jpg',
        caption: `🔥 *WINSTREAK BONUS WITH A BET OF ₹10-99* 🔥\n\n⚡️ लगातार 5 जीतें और पाएं ₹ 20\n⚡️ लगातार 8 जीतें और पाएं ₹100\n⚡️ लगातार 10 जीतें और पाएं ₹500\n⚡️ लगातार 15 जीतें और पाएं ₹1000\n\n*REGISTRATION HERE*:\n🌐 https://51game.app/#/register?invitationCode=63556100074\n\n*CLAIM WIN STRAKE*:\n🦢 https://wa.me/+919794821154 🦢\n\n🟡 गणना में समान अवधि शामिल नहीं है.\n🟡 जिस दिन आप जीतें है उसी दिन बोनस का अनुरोध करें.`
    },
    {
        type: 'photo',
        file: 'teks2.jpg',
        caption: (date, time, period) => `‼️ *MY PREDICTION WIN GO 🎱* ‼️\n\n🔉 *WIN GO 1 MINUTE*\n\n*DATE*: ${date}\n*TIME*: ${time}\nPERIODE: ${period}\n\n*LEVEL 3-5 MAINTAIN*\n${getRandomPredictions()}\n\n*REGISTER HERE*:\n🌐 https://51game.app/#/register?invitationCode=63556100074\n\n*🔊 USE THIS PREDICTION WISELY*, Keep a High Balance, Earn High Profits Daily!`
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
🌐 https://51game.app/#/register?invitationCode=63556100074

*CONTACT TO CLAIM THE BONUSES* :
TELEGRAM: @Mahimawelcomebonus
WHATSAPP: +919794821154`
    },
    {
        type: 'photo',
        file: 'teks4.jpg',
        caption: (date, time, cashOut) => {
            const cashOutValue = parseFloat(cashOut);
            return `‼️ *AVIATOR SYSTEM PREDICTION ✈️* ‼️\n\n*DATE*: ${date}\n*TIME*: ${time}\n\nLow Risk 🥰\n\nCASH OUT AT: ${cashOutValue.toFixed(2)}\n\n📢 TAKE PROFIT📈 DON'T BE GREEDY🥰\n\n*REGISTRATION HERE*:\n🌐 https://51game.app/#/register?invitationCode=63556100074`;
        }
    }
];

let stopMessages = false;
let currentIndex = 0;

function getRandomPredictions() {
    const predictionData = [
        "0 SMALL 🔴 🟣",
        "1 SMALL 🟢",
        "2 SMALL 🔴",
        "3 SMALL 🟢",
        "4 SMALL 🔴",
        "5 BIG 🟢 🟣",
        "6 BIG 🔴",
        "7 BIG 🟢",
        "8 BIG 🔴",
        "9 BIG 🟢"
    ];
    let shuffled = predictionData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5).join('\n');
}

async function sendMessage() {
    if (stopMessages) return;

    const now = moment().tz('Asia/Kolkata');
    const date = now.format('YYYY-MM-DD');
    const time = now.format('HH:mm:ss');

    const message = messages[currentIndex];
    let caption = message.caption;

    if (typeof caption === 'function') {
        // If message 2 or 4, calculate period or cashOut accordingly
        if (currentIndex === 1) {
            const baseTime = moment.tz('2024-06-22 13:37:00', 'Asia/Kolkata');
            const diffMinutes = now.diff(baseTime, 'minutes');
            const period = 20240622010818 + diffMinutes;
            caption = caption(date, time, period.toString());
        } else if (currentIndex === 3) {
            const cashOut = (Math.random() * (2.0 - 1.5) + 1.5).toFixed(2); // Example logic for cashOut
            caption = caption(date, time, cashOut);
        }
    }

    try {
        await bot.sendPhoto(channelUsername, message.file, { caption, parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error sending message:', error);
    }

    currentIndex = (currentIndex + 1) % messages.length; // Move to the next message index
    setTimeout(sendMessage, 5 * 60 * 1000); // 5-minute interval
}

// Command /mulai
bot.onText(/\/mulai/, (msg) => {
    if (msg.chat.id === adminId) {
        stopMessages = false;
        currentIndex = 0; // Reset to the first message
        sendMessage(); // Start the message loop
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
