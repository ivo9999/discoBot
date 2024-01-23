require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === '5v5') {
    if (interaction.member.voice.channel?.name == undefined) {
      return interaction.reply('mistake');
    }

    const vc = interaction.member.voice.channel.name;
    const chann = interaction.guild.channels.cache.find((c) => c.name === vc);

    if (!chann) {
      return interaction.reply('mistake');
    } else {
      let users = [];
      users = chann.members.map((user) => user.user.displayName);

      if (!(interaction.options.get('teko')?.value == undefined)) {
        users = users.filter(
          (user) => user !== interaction.options.get('teko').value
        );
      }

      if (!(interaction.options.get('teko2')?.value == undefined)) {
        users = users.filter(
          (user) => user !== interaction.options.get('teko2').value
        );
      }

      if (!(interaction.options.get('teko3')?.value == undefined)) {
        users = users.filter(
          (user) => user !== interaction.options.get('teko3').value
        );
      }

      if (!(interaction.options.get('teko4')?.value == undefined)) {
        users = users.filter(
          (user) => user !== interaction.options.get('teko4').value
        );
      }

      if (users.length < 10) {
        return interaction.reply('mnogo malko hora');
      }

      const roles = ['top', 'jungle', 'mid', 'adc', 'support'];

      shuffleArray(users);

      let out = '';

      for (let i = 0; i < users.length; i += 2) {
        out += roles[i / 2] + ' ' + users[i] + '  -  ' + users[i + 1] + ' \n';
      }

      return interaction.reply(out);
    }
  }
  if (interaction.commandName === 'custom') {
    if (interaction.member.voice.channel?.name == undefined) {
      return interaction.reply('mistake');
    }

    const vc = interaction.member.voice.channel.name;
    const chann = interaction.guild.channels.cache.find((c) => c.name === vc);

    if (!chann) {
      return interaction.reply('mistake');
    } else {
      let users = [];

      users = chann.members.map((user) => user.user.username);

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
});

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];

    array[i] = array[j];

    array[j] = temp;
  }
}

client.login(process.env.TOKEN);
