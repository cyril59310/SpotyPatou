module.exports = {
  name: "stop",
  description: "Arrêter la musique.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    queue.stop();

    return bot.say.successMessage(interaction, "Arrêté la musique.");
  }
};