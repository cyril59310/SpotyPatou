module.exports = {
  name: "trackAdd",
  execute(bot, queue, track) {
    if (!queue.playing || queue.tracks.length <= 0) return;

    const embed = bot.say.baseEmbed(queue)
      .setTitle(`Piste en file d'attented - Position ${queue.tracks.indexOf(track) +1}`)
      .setDescription(`[${track.title}](${track.url}) ~ [${track.requestedBy.toString()}]`);

    return queue.metadata.reply({ embeds: [embed] }).catch(console.error);
  }
};