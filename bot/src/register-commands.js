require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'custom',
    description: '2 otbora',
  },
  {
    name: 'kzg',
    description: 'izgoni gerbata',
    options: [
      {
        name: 'gerbi',
        type: 6,
        description: 'gerbata',
        required: false,
      },
      {
        name: 'vc',
        type: 3,
        description: 'voice channela',
        required: false,
      },
    ],
  },
  {
    name: 'mute',
    description: 'kur za komunizma',
    options: [
      {
        name: 'jertva',
        type: 6,
        description: 'qnkoi koito da go izqde',
        required: true,
      },
    ],
  },
  {
    name: 'leka',
    description: 'tiho malko',
    options: [
      {
        name: 'jertva',
        type: 6,
        description: 'nqkoi koito da si mulchi malko',
        required: true,
      },
      {
        name: 'vreme_v_sekundi',
        type: 4,
        description: 'ne go jali',
        required: false,
      },
      {
        name: 'prichina',
        type: 3,
        description: 'kakvo e napravil autista',
        required: false,
      },
    ],
  },
  {
    name: '5v5',
    description: 'minimum 10 choveka',
    options: [
      {
        name: 'teko',
        description: 'purvi pederas',
        type: 6,
        required: false,
      },
      {
        name: 'teko2',
        type: 6,
        description: 'vtori pederas',
        required: false,
      },
      {
        name: 'teko3',
        type: 6,
        description: 'treti pederas',
        required: false,
      },
      {
        name: 'teko4',
        type: 6,
        description: 'chetvurti pederas',
        required: false,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
