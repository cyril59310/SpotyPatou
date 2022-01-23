module.exports = {
  name: "seek",
  description: "Recherche une position spécifique dans la chanson en cours.",
  usage: "<mm:ss>",
  category: "music",
  options: [{
    name: "duration",
    description: "La durée à rechercher <mm:ss>",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    let timeString = interaction.options.getString("duration", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue pas dans cette guilde pour le moment.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const song = queue.current;

    if (song.live)
      return bot.say.warnMessage(interaction, "Impossible de rechercher cette chanson en streaming en direct.");

    if (isNaN(timeString) && !timeString.includes(":"))
      return bot.say.errorMessage(interaction, "Impossible de rechercher cette chanson en streaming en direct.");

    if (!isNaN(timeString)) timeString = `00:${timeString}`;

    const time = bot.utils.toMilliseconds(timeString);

    if (!time || isNaN(time) || time > song.durationMS || time < 0)
      return bot.say.warnMessage(interaction, "Fournir une durée valide à rechercher.");

    queue.seek(time);

    return bot.say.successMessage(interaction, `A cherché à \`${timeString}\`.`);
  }
};
