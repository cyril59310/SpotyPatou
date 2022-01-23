module.exports = {
  name: "shutdown",
  description: "Arrête le bot",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, interaction) {
    await bot.say.successMessage(interaction, "Arrêter le bot.....", true);

    process.exit(1);
  }
};