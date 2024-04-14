function handle5v5Command(interaction, options) {
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

    if (users.length < 10) {
      return interaction.reply('mnogo malko hora');
    }


    const players = {
      '631936545481293834': 2,  //gerbito
      '357901694585012229': 10, //niksata
      '229644225287815178': 10, //vizo
      '301041777610194946': 8,  //niki
      '152499303246594048': 8,  //az
      '291991997256826881': 5,  //ivoj
      '289425426944753664': 5,  //kostura
      '418129443010117634': 2,  //stanko
      '303583026502172672': 3,  //vasil
      '689178886495404218': 3,  //kobaka
      '289418665928032257': 6,  //jeli
      '326636517319507968': 7,  //teo
      '917496035591475202': 1,  //spas
      '359052932504748033': 4,  //kiko
      '286204891666317312': 3,  //ivanm
    }

    const roles = ['top', 'jungle', 'mid', 'adc', 'support'];

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function calculateTeamRating(team, players) {
      return team.reduce((sum, userId) => sum + players[userId], 0);
    }


    const totalRating = calculateTeamRating(users, players);

    let team1 = [];
    let team2 = [];
    let difference = Number.MAX_SAFE_INTEGER;

    while (Math.abs(difference) >= totalRating * 0.1) {
      shuffleArray(users);
      team1 = users.slice(0, 5);
      team2 = users.slice(5, 10);

      const team1Rating = calculateTeamRating(team1, players);
      const team2Rating = calculateTeamRating(team2, players);
      difference = Math.abs(team1Rating - team2Rating);
    }

    let out = '';
    for (let i = 0; i < roles.length; i++) {
      out += roles[i] + ' ' + `<@${team1[i]}>` + '  -  ' + `<@${team2[i]}>` + '\n';
    }


    return interaction.reply(out);
  }
}


module.exports = {
  handle5v5Command,
};
