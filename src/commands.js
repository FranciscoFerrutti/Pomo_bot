require('dotenv').config();
const{REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'gpt',
        description: 'Chat with the bot',
        options: [
            {
                name: 'input',
                description: 'Input to the bot',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'add',
        description: 'Adds two numbers',
        options: [
            {
                name: 'num1',
                description: 'Input num1',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'num2',
                description: 'Input num2',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
];

const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body   : commands}
        );
        console.log('Successfully reloaded application (/) commands.'); 
    }catch(e){
        console.log(`Request failed with status code: ${e}`);
    }
})();