const Eris = require("eris");
const Roger = require("Roger");
const keep_alive = require('./keep_alive.js')

// Replace TOKEN with your bot account's token
const bot = new Eris(process.env.token);
const bot1 = new Roger(process.env.process);

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});
bot1.on("error", (err) => {
  console.error(err); // or your preferred logger
});

bot.connect(); // Get the bot to connect to Discord
bot1.connect();