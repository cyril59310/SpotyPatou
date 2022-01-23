module.exports = {
  name: "queueEnd",
  execute(bot, queue) {
    return bot.say.queueMessage(queue, "Je n'ai plus de titre dans la liste d'attente , j'ai donc quitter le salon vocal.");
  }
};