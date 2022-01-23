module.exports = {
  name: "vibrato",
  description: "Bascule le filtre de vibrato.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      vibrato: !queue.getFiltersEnabled().includes("vibrato")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("vibrato") ? "Appliquer" : "Révoquer"} le filtre vibrato.`);
  }
};