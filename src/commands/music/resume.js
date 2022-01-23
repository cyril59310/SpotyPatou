module.exports = {
  name: "resume",
  description: "Reprend la chanson en pause en cours.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue pas dans cette guilde pour le moment.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (!queue.connection.paused)
      return bot.say.warnMessage(interaction, "La chanson n'est pas en pause.");

    queue.setPaused(false);

    return bot.say.successMessage(interaction, "Reprise de la chanson en pause.");
  }
};