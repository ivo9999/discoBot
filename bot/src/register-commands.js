require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'custom',
    description: '2 otbora',
  },
  {
    name: '5v5',
    description: 'minimum 10 choveka',
    options: [
      {
        name: 'teko',
        description: 'purvi pederas',
        type: 3,
        required: false,
      },
      {
        name: 'teko2',
        type: 3,
        description: 'vtori pederas',
        required: false,
      },
      {
        name: 'teko3',
        type: 3,
        description: 'treti pederas',
        required: false,
      },
      {
        name: 'teko4',
        type: 3,
        description: 'chetvurti pederas',
        required: false,
      },
    ],
  },
];
console.log(process.env.CLIENT_ID);
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
