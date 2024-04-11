const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const client1 = new Client({
intents: Object.values(GatewayIntentBits)


});
const client2 = new Client({

  intents: Object.values(GatewayIntentBits)

  
});
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('YaY Your Bot Status Changed✨');
});
app.listen(port, () => {
  console.log(`🔗 Listening to RTX: http://localhost:${port}`);
  console.log(`🔗 Powered By RTX`);
});

const statusMessagesBot1 = ["Listening to Spotify"];
const statusMessagesBot2 = ["Playing Minecraft"];

let currentIndexBot1 = 0;
let currentIndexBot2 = 0;


async function login(client) {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m%s\x1b[0m`, `|   🐇 Logged in as ${client.user.tag}`);
  } catch (error) {
    console.error('Failed to log in:', error);
    process.exit(1);
  }
}

function updateStatusAndSendMessages(client, statusMessages, currentIndex) {
  const currentStatus = statusMessages[currentIndex];
  const nextStatus = statusMessages[(currentIndex + 1) % statusMessages.length];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom }],
    status: 'dnd',
  });
  return (currentIndex + 1) % statusMessages.length;
}

client1.once('ready', () => {
  console.log(`✅ Bot 1 is ready as ${client1.user.tag}`);
  setInterval(() => {
    currentIndexBot1 = updateStatusAndSendMessages(client1, statusMessagesBot1, currentIndexBot1);
  }, 10000);
});

client2.once('ready', () => {
  console.log(`Bot 2 is ready as ${client2.user.tag}`);
  setInterval(() => {
    currentIndexBot2 = updateStatusAndSendMessages(client2, statusMessagesBot2, currentIndexBot2);
  }, 10000);
});

login(client1);
login(client2);
