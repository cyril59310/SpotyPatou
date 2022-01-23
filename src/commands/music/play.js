module.exports = {
  name: "play",
  description: "Lire une chanson ou une liste de lecture à partir de l'URL ou du nom (depuis spotify)",
  category: "music",
  usage: "<son url/name>",
  options: [{
    name: "song",
    description: "Le nom/l'url de la chanson que vous voulez jouer.",
    type: "STRING",
    required: true
  }],
  async execute(bot, interaction) {
    try {

      if (!bot.utils.havePermissions(interaction))
        return bot.say.errorMessage(interaction, "j'ai besoin de **\`EMBED_LINKS\`** autorisation.");

      const string = await interaction.options.getString("song", true);

      const guildQueue = bot.player.getQueue(interaction.guild.id);

      const channel = interaction.member?.voice?.channel;

      if (!channel)
        return bot.say.warnMessage(interaction, "Vous devez d'abord rejoindre un canal vocal.");

      if (guildQueue) {
        if (channel.id !== interaction.guild.me?.voice?.channelId)
          return bot.say.warnMessage(interaction, "Je joue déjà sur un autre canal vocal!");
      } else {
        if (!channel.viewable)
          return bot.say.warnMessage(interaction, "j'ai besoin de **\`VIEW_CHANNEL\`** autorisation.");
        if (!channel.joinable)
          return bot.say.warnMessage(interaction, "j'ai besoin de **\`CONNECT_CHANNEL\`** autorisation.");
        if (!channel.speakable)
          return bot.say.warnMessage(interaction, "j'ai besoin de **\`SPEAK\`** autorisation.");
        if (channel.full)
          return bot.say.warnMessage(interaction, "Impossible de rejoindre, le canal vocal est plein.");
      }

      let result = await bot.player.search(string, { requestedBy: interaction.user }).catch(() => { });
      if (!result || !result.tracks.length)
        return bot.say.errorMessage(interaction, `Aucun résultat n'a été trouvé pour \`${string}\`.`);

      let queue;
      if (guildQueue) {
        queue = guildQueue;
        queue.metadata = interaction;
      } else {
        queue = await bot.player.createQueue(interaction.guild, {
          metadata: interaction
        });
      }

      try {
        if (!queue.connection) await queue.connect(channel);
      } catch (error) {
        bot.logger.error("JOIN", error);
        bot.player.deleteQueue(interaction.guild.id);
        return bot.say.errorMessage(interaction, `Impossible de rejoindre votre canal vocal!\n\`${error}\``);
      }

      result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

      if (!queue.playing) await queue.play();
    } catch (e) {
      console.log(e)
    }
  }
};