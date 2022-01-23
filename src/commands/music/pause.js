module.exports = {
  name: "pause",
  description: "Met en pause la chanson en cours de lecture.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.connection.paused)
      return bot.say.warnMessage(interaction, "La chanson est déjà en pause.");

    queue.setPaused(true);

    return bot.say.successMessage(interaction, "Pause de la chanson en cours.");
  }
};