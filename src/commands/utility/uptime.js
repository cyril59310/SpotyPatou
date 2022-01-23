module.exports = {
  name: "uptime",
  description: "Renvoie l'UPTIME du bot",
  category: "utility",
  execute(bot, interaction) {
    const uptime = bot.utils.formatDuration(bot.uptime);

    const embed = bot.say.baseEmbed(interaction)
      .setAuthor("Uptime", bot.user.displayAvatarURL())
      .setDescription(`${uptime}`);

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  }
};