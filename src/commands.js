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
        name: 'bored',
        description: 'I am bored',
    },
    {
        name: 'game',
        description: 'This is a  guessing game',
        options: [
            {
                name: 'guess',
                description: 'Input your guess:',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'pomodoro',
        description: 'Les gitit',
        options: [
            {
                name: 'work-time',
                description: 'How long do you want to work (minutes):',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'break-time',
                description: 'How long do you want to relax (minutes):',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'cycle-amount',
                description: 'How many cycles:',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ],
    },
    {
        name: 'randomize',
        description: 'RANDOMIZE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!VOY 7 REDBULLLSS!!!!!!!!!!!!!!!!!!!!!!',
        options: [
            {
                name: 'random',
                description: 'Input a random:',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'flashcards',
        description: 'Returns flashcards on a given topic',
        options: [
            {
                name: 'topic',
                description: 'Topic of flashcards',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            // {
            //     name: 'amount',
            //     description: 'Amount of flashcards',
            //     type: ApplicationCommandOptionType.Number,
            //     required: true,
            // },
        ],
    },
   
    {
        name: 'help',
        description: 'List of all bot commands',
    },
    {
        name: 'get-creative',
        description: 'Provides a prompt for a quick sketch during your break',
    },
    {
        name: 'next',
        description: 'displays next flashcard (choose yes if the last flashcard was correct, no if it was wrong)',
        options: [
            {
                name: 'yesno',
                description: 'yes/no choice',
                type: ApplicationCommandOptionType.Boolean,
                required: true,
                choices: [
                    {
                        name: 'yes',
                        value: true,
                    },
                    {
                        name: 'no',
                        value: false,
                    },  
                ], 
            
            }
        ],         
            
        //required: true,
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