const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "trackStart",
  execute(bot, queue, track) {
    if (!bot.utils.havePermissions(queue.metadata.channel)) return;

    const embed = bot.say.baseEmbed(queue)
      .setTitle("Lecture en cours")
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`);

    return queue.metadata.channel.send({ embeds: [embed] });
  }
};