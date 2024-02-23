async function handleMuteAction(userId, isMute, channel, client, reaction) {
  const guildId = reaction.message.guild.id;
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.log('Guild not found.');
    return;
  }

  const userId1 = userId.match(/\d+/)[0];
  console.log(userId1);
  try {
    const member = await guild.members.fetch(userId1);
    await member.voice.setMute(isMute);
    if (isMute) {
      await channel.send('muted');
    } else {
      await channel.send('unmuted');
    }
  } catch (error) {
    console.error('Error:', error);
    await channel.send('greshka');
  }
}

module.exports = {
  handleMuteAction,
};
