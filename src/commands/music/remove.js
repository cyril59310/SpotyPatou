module.exports = {
  name: "remove",
  description: "Supprime une chanson spécifique de la file d'attente",
  usage: "<trackIndex>",
  category: "music",
  options: [{
    name: "index",
    description: "L'index des morceaux à supprimer",
    type: "NUMBER",
    required: true
  }],
  async execute(bot, interaction) {
    if(interaction.member.permissions.has('MUTE_MEMBERS')){
      //Ton Code !
      let index = await interaction.options.getNumber("index", true);

    const queue = bot.player.getQueue(interaction.guild.id);

    if (!queue || !queue.playing)
      return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");

    if (!bot.utils.modifyQueue(interaction)) return;

    if (queue.tracks.length < 1)
      return bot.say.warnMessage(interaction, "Il n'y a pas de chanson à supprimer dans la file d'attente.");

    index = index - 1;

    if (index < 0 || index > queue.tracks.length || !queue.tracks[index])
      return bot.say.warnMessage(interaction, "L'index de morceau fourni n'existe pas.");

    queue.remove(index);

    return bot.say.successMessage(interaction, `Piste supprimée \`${index}\`.`);
   }else{
       return bot.say.warnMessage(interaction, 'Mange tes morts t\'a pas la perm')
   }
    
  }
};