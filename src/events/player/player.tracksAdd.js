module.exports = {
  name: "tracksAdd",
  execute(bot, queue, tracks) {
    return bot.say.queueMessage(queue, `Ajout de(s)   **${tracks.length}** titre(s) dans la file d'attente effectuer avec succées.`);
  }
};