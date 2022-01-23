module.exports = {
  name: "nowplaying",
  description: "Affiche les détails de la chanson en cours de lecture.",
  category: "music",
  options: [{
    name: "index",
    type: "NUMBER",
    description: "Cet index de chanson.",
    required: true
  }],
  async execute(bot, interaction) {
    let index = await interaction.options.getNumber("index", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.current)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    index = index - 1;

    if (!queue.tracks[index] || index > queue.tracks.length || index < 0)
      return bot.say.errorMessage(interaction, "L'index de morceau fourni n'existe pas.");

    const song = queue.tracks[index]

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Lecture en cours 🎵")
      .setTitle(`${song.title}`)
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`)
      .setDescription(`~ Demandé par: ${song.requestedBy.toString()}
Durée: ${song.duration}
Position dans la queue: ${index}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
  }
};