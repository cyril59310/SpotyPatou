module.exports = {
  name: "shuffle",
  description: "Mélange la file d'attente.",
  category: "music",
  execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue pas dans cette guilde pour le moment.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 3)
      return bot.say.warnMessage(interaction, "Besoin d'au moins \`3\` chansons dans la file d'attente à mélanger.");

    queue.shuffle();

    return bot.say.successMessage(interaction, "A mélangé la file d'attente.");
  }
};