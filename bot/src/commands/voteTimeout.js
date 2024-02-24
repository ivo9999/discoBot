async function handleStartMuteVoteCommand(interaction, options, MessageEmbed) {
  let jertva = '';
  let msg = '';
  let vreme = '';

  if (!(options.get('jertva')?.value == undefined)) {
    jertva = options.get('jertva')?.value;
  }

  if (!(options.get('prichina')?.value == undefined)) {
    msg = options.get('prichina')?.value;
  } else {
    msg = 'autist si';
  }

  if (!(options.get('vreme_v_sekundi')?.value == undefined)) {
    vreme = options.get('vreme_v_sekundi')?.value;
  } else {
    vreme = 30;
  }

  if (vreme > 300) {
    await interaction.reply('maksimuma e 5 min');
    return;
  }

  const voteEmbed = new MessageEmbed()
    .setTitle('Vote')
    .setDescription('da bude li prispan ' + `<@${jertva}>`)
    .setColor('#0099ff');

  const voteMessage = await interaction.reply({
    embeds: [voteEmbed],
    fetchReply: true,
  });
  await voteMessage.react('👍🏿');
  await voteMessage.react('👎🏿');

  return [voteMessage.id, jertva, vreme, msg];
}

module.exports = {
  handleStartMuteVoteCommand,
};
