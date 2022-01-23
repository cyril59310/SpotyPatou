module.exports = {
  name: "skip",
  description: "Saute la chanson en cours",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1 && queue.repeatMode !== 3)
      return bot.say.warnMessage(interaction, "Plus aucune chanson dans la file d'attente à ignorer.");

    queue.skip();

    return bot.say.successMessage(interaction, "Passé à la chanson suivante.");
  }
};