async function handle5v5Command(interaction, options) {
  if (!interaction.member.voice.channel?.name) {
    return interaction.reply('mistake');
  }

  const vc = interaction.member.voice.channel.name;
  const chann = interaction.guild.channels.cache.find((c) => c.name === vc);

  if (!chann) {
    return interaction.reply('mistake');
  } else {
    let users = [];
    users = chann.members.map((user) => user.user.id);

    const excludeOptions = ['teko', 'teko2', 'teko3', 'teko4'];
    for (const option of excludeOptions) {
      if (!(options.get(option)?.value == undefined)) {
        users = users.filter((user) => user !== options.get(option).value);
        users = users.map((el) => el.match(/\d+/)[0]);
      }
    }

    if (users.length < 10) {
      return interaction.reply('mnogo malko hora');
    }

    const roles = ['top', 'jungle', 'mid', 'adc', 'support'];
    shuffleArray(users);

    let out = '';
    for (let i = 0; i < users.length; i += 2) {
      out +=
        roles[i / 2] +
        ' ' +
        `<@${users[i]}>` +
        '  -  ' +
        `<@${users[i + 1]}>` +
        ' \n';
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
  handle5v5Command,
};
