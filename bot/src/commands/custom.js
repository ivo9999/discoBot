function handleCustomCommand(interaction) {
  if (!interaction.member.voice.channel?.name) {
    return interaction.reply('mistake');
  }

  const vc = interaction.member.voice.channel.name;
  const chann = interaction.guild.channels.cache.find((c) => c.name === vc);

  if (!chann) {
    return interaction.reply('mistake');
  } else {
    let users = [];
    users = chann.members.map((user) => user.user.displayName);
    shuffleArray(users);

    let out = '';
    for (let i = 0; i < users.length; i += 2) {
      if (users[i + 1] !== undefined) {
        out += users[i] + '  -  ' + users[i + 1] + ' \n';
      } else {
        out += users[i] + ' e teko';
      }
    }

    return interaction.reply(out);
  }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];

    array[i] = array[j];

    array[j] = temp;
  }
}

module.exports = {
  handleCustomCommand,
};
