module.exports = {
  name: "jump",
  description: "Sauter à une piste spécifique dans la file d'attente.",
  category: "music",
  usage: "<songIndex>",
  options: [{
    name: "index",
    description: "L'index des chansons vers lequel sauter",
    type: "NUMBER",
    required: true
  }],
  async execute(bot, interaction) {
    let index = await interaction.options.getNumber("index", true);
    index = index - 1;

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.errorMessage(interaction, "Il n'y a pas de chanson dans la file d'attente.");

    if (index > queue.tracks.length || index < 0 || !queue.tracks[index])
      return bot.say.errorMessage(interaction, "L'index de chanson fourni n'existe pas.");

    queue.jump(index);

    return bot.say.successMessage(interaction, `Sauté à la chanson \`${index}\`.`);
  }
};