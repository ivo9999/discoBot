async function handleTimeoutCommand(interaction, options, client) {
  let gerbiId = '';

  if (!(options.get('jertva')?.value == undefined)) {
    gerbiId = options.get('jertva').value;
  } else {
    return interaction.reply('err');
  }

  const guildId = '688793001258123308';
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.log('Guild not found.');
    return;
  }
  const userId = gerbiId.match(/\d+/)[0];
  const member = guild.members.cache.get(userId);

  if (member) {
    member.timeout(1000, 'putio').then(console.log);
    return interaction.reply('leka');
  } else {
    try {
      const fetchedMember = await guild.members.fetch(userId);
      fetchedMember.timeout(5 * 60 * 1000, 'putio').then(console.log);
      return interaction.reply('leka');
    } catch (error) {
      return interaction.reply('greshka: ' + error);
    }
  }
}

module.exports = {
  handleTimeoutCommand,
};
