module.exports = {
  name: "connectionCreate",
  execute(bot, queue, connection) {
    const embed = bot.say.baseEmbed(queue)
      .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
      .setDescription(`👍 J'ai bien rejoint le salon :${connection.channel.toString()} , demande faite dans ${queue.metadata.channel.toString()}`);

    return queue.metadata.reply({ embeds: [embed] }).catch(console.error);
  }
};