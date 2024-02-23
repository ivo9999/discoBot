async function handleTimeoutCommand(interaction, options, client) {
  let gerbiId = '';
  let vreme = 1;
  let prichina = '';

  if (!(options.get('jertva')?.value == undefined)) {
    gerbiId = options.get('jertva').value;
  } else {
    return interaction.reply('err');
  }

  if (!(options.get('vreme_v_sekundi')?.value == undefined)) {
    vreme = Number(options.get('vreme_v_sekundi').value);
  } else {
    vreme = 30;
  }

  if (!(options.get('prichina')?.value == undefined)) {
    prichina = options.get('prichina').value;
  } else {
    prichina = 'zashtoto si autist';
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
    const targetUserRolePosition = member.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.reply(
        'choveka koito iskash da mutenesh e po-vish ot teb'
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.reply(
        'choveka koito iskash da mutenesh e po-vish ot bota'
      );
      return;
    }
    try {
      await member.timeout(vreme * 1000, prichina);
      return interaction.reply('leka');
    } catch (error) {
      await interaction.reply('neshto ne si izmislil kakto trqbva');
    }
  } else {
    try {
      const fetchedMember = await guild.members.fetch(userId);
      await fetchedMember.timeout(vreme * 1000, prichina);
      return interaction.reply('leka');
    } catch (error) {
      return interaction.reply('greshka: ' + error);
    }
  }
}

module.exports = {
  handleTimeoutCommand,
};
