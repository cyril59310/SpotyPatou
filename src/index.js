require("./modules/checkValid");
const request = require('request')
const { Collection, Client, Intents } = require("discord.js");
const { Player } = require("discord-player");

const { botToken } = require("../config.json");
const Logger = require("./modules/Logger");
const Embeds = require("./modules/Embeds");
const Util = require("./modules/Util");

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ],
  allowedMentions: { parse: ["roles", "users"], repliedUser: false }
});

setInterval(() => {
  request("http://45.155.170.110:3001/api/push/sdsYF6gI7R?msg=OK&ping=")
  console.log('ping status page')
}, 20000);

bot.commands = new Collection();

bot.logger = Logger;
bot.utils = Util;
bot.say = Embeds;

bot.player = new Player(bot, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 60000,
  autoSelfDeaf: true,
  initialVolume: 15
});

require("./handler/EventHandler")(bot);

bot.login(botToken);
