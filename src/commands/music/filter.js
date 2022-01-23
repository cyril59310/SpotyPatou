module.exports = {
  name: "filter",
  description: "Commandes de filtres",
  category: "music",
  options: [
    {
      type: "SUB_COMMAND",
      name: "reset",
      description: "Réinitialiser tous les filtres appliqués."
    },
    {
      type: "SUB_COMMAND",
      name: "show",
      description: "Regarder tout les filtres."
    }
  ],
  async execute(bot, interaction) {
    const subCmd = await interaction.options.getSubcommand(true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    const filters = queue.getFiltersEnabled();


    if (subCmd === "reset") {
      if (!filters.length)
        return bot.say.warnMessage(interaction, "Aucun filtre n'est appliqué maintenant.");

      queue.setFilters({});

      return bot.say.successMessage(interaction, "Suppression de tous les filtres appliqués.");
      
    } else {
      const enabledFilters = queue.getFiltersDisabled();
      const disabledFilters = queue.getFiltersDisabled();

      const enFDes = enabledFilters.map((f) => `**${bot.utils.toCapitalize(f)}** --> ✅`).join("\n");

      const disFDes = disabledFilters.map((f) => `**${bot.utils.toCapitalize(f)}** --> ❌`).join("\n");

      const embed = bot.say.baseEmbed(interaction)
        .setTitle("Tous les filtres audio")
        .setDescription(`${enFDes}\n\n${disFDes}`);

      return interaction.reply({ ephemeral: true, embeds: [embed] });
    }
  }
};