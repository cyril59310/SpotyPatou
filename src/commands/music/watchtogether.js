const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "watchtogether",
  description: "Démarre une session vocale d'activité youtube regarder ensemble.",
  category: "activity",
  options: [
    {
      type: "CHANNEL",
      name: "channel",
      description: "Mentionner le canal vocal. (default: votre canal vocal)",
      required: false
    }
  ],
  async execute(bot, interaction) {
    const channel = (await interaction.options.getChannel("channel", false)) ?? interaction.member?.voice?.channel;

    if (!channel)
      return bot.say.warnMessage(interaction, "Vous devez rejoindre ou mentionner un canal vocal.");

    if (!channel.viewable)
      return bot.say.warnMessage(interaction, "Il me manque  \`View Channel\` comme permission pour rejoindre.");

    if (channel.type !== "GUILD_VOICE")
      return bot.say.warnMessage(interaction, "Fournir un canal vocal de guilde valide.");

    if (!channel.permissionsFor(interaction.guild.me)?.has(1n))
      return bot.say.warnMessage(interaction, "Il me manque \`Create Invite\` comme permission pour inviter.");

    const invite = await channel.createInvite({
      targetApplication: "755600276941176913",
      targetType: 2
    });

    const embed = bot.say.rootEmbed(interaction)
      .setTitle(`Successfully setup **YouTube Watch Together** activity to **${channel.name}** channel.`);

    const btnRow = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Join")
      .setStyle("LINK")
      .setURL(`${invite.url}`)
      ]);

    return interaction.reply({ embeds: [embed], components: [btnRow] }).catch(console.error);
  }
};