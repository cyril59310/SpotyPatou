module.exports = {
  name: "vaporwave",
  description: "Activé/désactivé le filtre Vaporwave.",
  category: "filters",
  async execute(bot, interaction) {
    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    await queue.setFilters({
      vaporwave: !queue.getFiltersEnabled().includes("vaporwave")
    });

    return bot.say.successMessage(interaction, `${queue.getFiltersEnabled().includes("vaporwave") ? "Appliquer" : "Révoquer"} le filtre vaporwave.`);
  }
};