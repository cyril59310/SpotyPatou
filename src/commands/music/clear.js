module.exports = {
  name: "clear",
  description: "Efface la file d'attente actuelle.",
  category: "music",
  execute(bot, interaction) {
    if(interaction.member.permissions.has('MUTE_MEMBERS')){
      //Ton Code !
      const queue = bot.player.getQueue(interaction.guild.id);

      if (!queue || !queue.playing)
        return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");
  
      if (!bot.utils.modifyQueue(interaction)) return;
  
      if (queue.tracks.length < 1)
        return bot.say.warnMessage(interaction, "Il n'y a actuellement aucune chanson dans la file d'attente.");
  
      queue.clear();
  
      return bot.say.successMessage(interaction, "File d'attende clear avec succées.");
   }else{
       return bot.say.warnMessage(interaction, 'Mange tes morts t\'a pas la perm')
   }
   
  }
};