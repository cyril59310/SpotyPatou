const { invitBot } = require("../../../config.json");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite notre bot sur ton Discord !",
  category: "utility",
  execute(bot, interaction) {
    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`[Cliquez pour inviter notre bot.](${invitBot})`);

    const row = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Lien du bot")
      .setStyle("LINK")
      .setURL(`${invitBot}`)
    ]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};