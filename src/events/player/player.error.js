module.exports = {
  name: "error",
  execute(bot, queue, error) {
    bot.utils.sendErrorLog(bot, error, "error");

    return bot.say.queueMessage(queue, `Une erreur s est produite lors de la lecture.\nRaison: ${error.message}`, "RED");
  }
};