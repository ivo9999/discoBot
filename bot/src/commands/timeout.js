async function handleTimeoutCommand(
  reaction,
  gerbiId,
  vreme,
  prichina,
  client
) {
  const guildId = reaction.message.guild.id;
  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.log('Guild not found.');
    return;
  }

  // const botUser = await guild.members.fetch(client.user.id);
  const userId = gerbiId.match(/\d+/)[0];
  const member = guild.members.cache.get(userId);

  // const role = guild.roles.cache.find(
  //   (role) => role.name === 'tiranin pederas'
  // );
  // if (!role) {
  //   console.log('Role not found.');
  //   return;
  // }

  // await botUser.roles.add(role);

  if (member) {
    const targetUserRolePosition = member.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition =
      reaction.message.member.roles.highest.position; // Highest role of the user running the cmd
    const botRolePosition =
      reaction.message.guild.members.me.roles.highest.position; // Highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await reaction.message.reply(
        'choveka koito iskash da mutenesh e po-vissh ot teb'
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await reaction.message.reply(
        'choveka koito iskash da mutenesh e po-vissh ot bota'
      );
      return;
    }

    try {
      await member.timeout(vreme * 1000, prichina);

      return reaction.message.reply(
        `<@${gerbiId}>` + ' beshe prispan za ' + vreme + ' sekundi'
      );
    } catch (error) {
      await reaction.message.reply('neshto ne si izmislil kakto trqbva');
    }
  } else {
    try {
      const fetchedMember = await guild.members.fetch(userId);
      await fetchedMember.timeout(vreme * 1000, prichina);
      return reaction.message.reply(
        `<@${gerbiId}>` + ' beshe prispan za ' + vreme + ' sekundi'
      );
    } catch (error) {
      return reaction.message.reply('greshka: ' + error);
    }
  }
}

module.exports = {
  handleTimeoutCommand,
};
