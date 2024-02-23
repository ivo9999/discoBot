async function handleKzgCommand(interaction, options, client) {
  let gerbiId = '';
  let channelId = '';

  if (!(options.get('gerbi')?.value == undefined)) {
    gerbiId = options.get('gerbi').value;
  }

  if (!(options.get('vc')?.value == undefined)) {
    channelId = options.get('vc').value;
  }

  const guildId = interaction.guild.id;
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.log('Guild not found.');
    return;
  }
  const userId = gerbiId.match(/\d+/)[0];
  const member = guild.members.cache.get(userId);

  if (member) {
    member.voice.setChannel(channelId);
    return interaction.reply('kur');
  } else {
    try {
      const fetchedMember = await guild.members.fetch(userId);
      fetchedMember.voice.setChannel(channelId);
      return interaction.reply('kur');
    } catch (error) {
      return interaction.reply('greshka: ' + error);
    }
  }
}

module.exports = {
  handleKzgCommand,
};
