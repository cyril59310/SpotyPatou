module.exports = {
  name: "botDisconnect",
  execute(bot, queue) {
    return bot.say.queueMessage(queue, "La musique a été arrêtée car j'ai été déconnecté du canal vocal.", "RED");
  }
};