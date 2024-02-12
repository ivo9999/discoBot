async function handleStartVoteCommand(interaction, options, MessageEmbed) {
  let jertva = '';
  if (!(options.get('jertva')?.value == undefined)) {
    jertva = options.get('jertva')?.value;
  }

  const voteEmbed = new MessageEmbed()
    .setTitle('Vote')
    .setDescription('da go izqde li ' + jertva)
    .setColor('#0099ff');

  const voteMessage = await interaction.reply({
    embeds: [voteEmbed],
    fetchReply: true,
  });
  await voteMessage.react('✅');
  await voteMessage.react('❌');
  // Action thresholds
  return [voteMessage.id, jertva];
}

module.exports = {
  handleStartVoteCommand,
};
