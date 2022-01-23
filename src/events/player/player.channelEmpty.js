module.exports = {
  name: "channelEmpty",
  execute(bot, queue) {
    return bot.say.queueMessage(queue, "J'ai quitté le canal vocal comme on m'a laissé seul.");
  }
};