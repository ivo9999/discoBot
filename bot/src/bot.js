require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, Events } = require('discord.js');
const { handle5v5Command } = require('./commands/5v5');
const { handleCustomCommand } = require('./commands/custom');
const { handleKzgCommand } = require('./commands/kzg');
const { handleStartVoteCommand } = require('./commands/vote');
const { handleMuteAction } = require('./commands/mute');
const { handleTimeoutCommand } = require('./commands/timeout');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.GuildMessageTyping,
    IntentsBitField.Flags.GuildModeration,
  ],
});

const { ActivityType } = require('discord.js');
const { handleStartMuteVoteCommand } = require('./commands/voteTimeout');
const { handlerancChamps } = require('./commands/randChamp');

let resp = [];

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  setInterval(() => {
    client.user.setActivity({
      name: getRandomElement(names) + ' e ' + getRandomElement(words),
      type: ActivityType.Custom,
    });
  }, 5000);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;
  const commandName = interaction.commandName;
  const options = interaction.options;

  switch (commandName) {
    case '5v5':
      await handle5v5Command(interaction, options);
      break;
    case 'custom':
      await handleCustomCommand(interaction);
      break;
    case 'champs':
      await handlerancChamps(interaction);
      break
    case 'kzg':
      await handleKzgCommand(interaction, options, client);
      break;
    case 'leka':
      resp = await handleStartMuteVoteCommand(
        interaction,
        options,
        EmbedBuilder
      );
      break;
    case 'mute':
      resp = await handleStartVoteCommand(interaction, options, EmbedBuilder);
      break;
    default:
      break;
  }
});

client.on(Events.MessageReactionAdd, async (reaction) => {
  const thresholds = {
    '✅': 3,
    '❌': 3,
    '👍🏿': 3,
    '👎🏿': 3,
  };

  if (reaction.message.id !== resp[0] || !thresholds[reaction.emoji.name]) {
    return;
  }

  const count = reaction.count - 1;
  if (count !== thresholds[reaction.emoji.name]) {
    return;
  }

  gerbiId = resp[1];

  if (reaction.emoji.name === '✅') {
    await handleMuteAction(
      gerbiId,
      true,
      reaction.message.channel,
      client,
      reaction
    );
  } else if (reaction.emoji.name === '❌') {
    await handleMuteAction(
      gerbiId,
      false,
      reaction.message.channel,
      client,
      reaction
    );
  }

  if (reaction.emoji.name === '👍🏿') {
    await handleTimeoutCommand(reaction, gerbiId, resp[2], resp[3], client);
  } else if (reaction.emoji.name === '👎🏿') {
    await reaction.message.reply('shte jivee');
  }
});

client.login(process.env.TOKEN);

let names = [
  'niki',
  'vizo',
  'ivo',
  'az',
  'nikolai',
  'teodor',
  'vasil',
  'kiko',
  'jelito',
  'kostura',
  'ivanm',
  'stanimir',
  'gerbata',
  'kobaka',
  'chokito',
];
let words = [
  'pederas',
  'gei',
  'autist',
  'maloumen',
  'kaput',
  'iznasilen',
  'slave',
  'rob',
  'izrod',
  'ciganin',
  'hui'
];
function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
