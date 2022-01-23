const { owners } = require("../../../config.json");

module.exports = {
  name: "interactionCreate",
  async execute(bot, interaction) {
    if (!interaction.isCommand()) return;
    if (!interaction.inGuild()) return;

    await bot.application?.commands.fetch(interaction.commandId).catch((e) => console.log(e));

    try {
      const command = bot.commands.get(interaction.command?.name ?? "")

      if (!command) return;
      if (!interaction.commandId) return;

      if ((command.category === "botowner" || command.ownerOnly === true) && !owners.includes(interaction.user.id))
        return bot.say.errorMessage(interaction, "Cette commande ne peut être utilisée que par les propriétaires du bot.");

      await command.execute(bot, interaction);
    } catch (err) {
      bot.utils.sendErrorLog(bot, err, "error");
      if (interaction.replied) return;
      return bot.say.errorMessage(interaction, "Quelque chose s'est mal passé. Désolé pour le dérangement.");
    }
  }
};