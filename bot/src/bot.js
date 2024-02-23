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

let voteMessageId = '';
let jertvaId = '';
let resp = [];
client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  client.user.setActivity({
    name: 'qj mi kura',
    type: ActivityType.Custom,
  });
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
    case 'kzg':
      await handleKzgCommand(interaction, options, client);
      break;
    case 'leka':
      await handleTimeoutCommand(interaction, options, client);
      break;
    case 'mute':
      resp = await handleStartVoteCommand(interaction, options, EmbedBuilder);
      voteMessageId = resp[0];
      jertvaId = resp[1];
      break;
    default:
      break;
  }
});

client.on(Events.MessageReactionAdd, async (reaction) => {
  const thresholds = {
    '✅': 3,
    '❌': 3,
  };

  if (
    reaction.message.id !== voteMessageId ||
    !thresholds[reaction.emoji.name]
  ) {
    return;
  }

  const count = reaction.count - 1;
  if (count !== thresholds[reaction.emoji.name]) {
    return;
  }

  gerbiId = jertvaId;

  voteMessageId = '';
  jertvaId = '';

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
});

client.login(process.env.TOKEN);
