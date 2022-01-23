module.exports = {
  name: "volume",
  description: "Vérifier ou modifier le volume",
  category: "music",
  options: [{
    name: "amount",
    description: "Modifie le volume de sortie du bot",
    type: "NUMBER",
    required: false
  }],
  async execute(bot, interaction) {
    if(interaction.member.permissions.has('MUTE_MEMBERS')){
      console.log('GG  t\'a la perm !')
      const newVol = await interaction.options.getNumber("amount", false);


      const queue = bot.player.getQueue(interaction.guild.id);
  
      if (!queue || !queue.playing)
        return bot.say.errorMessage(interaction, "Je ne joue actuellement pas dans cette guilde.");
  
      if (!bot.utils.modifyQueue(interaction)) return;
  
      if (!newVol) {
        const embed = bot.say.baseEmbed(interaction)
          .setDescription(`Le volume est à \`${queue.volume}%\`.`)
          .setFooter(`Utiliser \'\/volume <1-200>\' pour changer le volume.`);
  
        return interaction.reply({ ephemeral: true, embeds: [embed] }).catch(console.error);
      }
  
      if (!Number.isInteger(newVol) || newVol > 200 || newVol < 0)
        return bot.say.warnMessage(interaction, "Fournissez un nombre valide entre 1 et 200.");
  
      queue.setVolume(newVol);
  
      return bot.say.successMessage(interaction, `Le volume est mis à jour à \`${queue.volume}%\`.`);
    }else{
        console.log('Mange tes morts t\'a pas la perm')
        return bot.say.warnMessage(interaction, 'Mange tes morts t\'a pas la perm')
    }
   
  }
};