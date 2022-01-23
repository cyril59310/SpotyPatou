const { QueueRepeatMode } = require("discord-player");

module.exports = {
  name: "loop",
  description: "Changer le mode de boucle (autoplay|track|queue|off)",
  category: "music",
  options: [
    {
      type: "SUB_COMMAND",
      name: "mode",
      description: "Affiche le mode de boucle actuel."
    },
    {
      type: "SUB_COMMAND",
      name: "off",
      description: "Désactiver la boucle"
    },
    {
      type: "SUB_COMMAND",
      name: "queue",
      description: "Boucler la file d'attente (all songs)"
    },
    {
      type: "SUB_COMMAND",
      name: "track",
      description: "Répéter la chanson en cours"
    },
    {
      type: "SUB_COMMAND",
      name: "autoplay",
      description: "Lecture automatique des chansons liées après la fin de la file d'attente"
    }
  ],
  async execute(bot, interaction) {
    const subCmd = await interaction.options.getSubcommand(true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    let mode;
    switch (subCmd) {
      case "off":
        queue.setRepeatMode(QueueRepeatMode.OFF);
        mode = "Mode boucle désactivé.";
        break;
      case "track":
        queue.setRepeatMode(QueueRepeatMode.TRACK);
        mode = "Piste répétitive activée";
        break;
      case "queue":
        queue.setRepeatMode(QueueRepeatMode.QUEUE);
        mode = "File d'attente en boucle activée.";
        break;
      case "autoplay":
        queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
        mode = "Mode lecture automatique activé.";
        break;
      default:
        let md = "none";
        if (queue.repeatMode === 3) {
          md = "autoplay";
        } else if (queue.repeatMode == 2) {
          md = "queue";
        } else if (queue.repeatMode == 1) {
          md = "track";
        } else if (queue.repeatMode == 0) {
          md = "off";
        }

        const embed = bot.say.baseEmbed(interaction)
          .setDescription(`Le mode boucle est réglé sur: \`${md}\`.`)
          .setFooter(`Utiliser \'\/loop <off|track|queue|autoplay>\' pour changer de mode boucle.`);
        return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
    }

    return bot.say.successMessage(interaction, `${mode}`);
  }
};