const { supportServer } = require("../../../config.json");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "support",
  description: "Rejoignez le serveur d'assistance Discord",
  category: "utility",
  execute(bot, interaction) {
    const embed = bot.say.baseEmbed(interaction)
      .setDescription(`:arrow_down: **Cliquez ici pour rejoindre notre support.**`);

    const row = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("Lien du serveur")
      .setStyle("LINK")
      .setURL(`${supportServer}`)
    ]);


    return interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
  }
};