require('dotenv/config');
const { Client, IntentsBitField, Embed, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const prefix = '-';
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
    
});
const openai = new OpenAIApi(configuration);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
/*
module.exports = {
    data: new SlashCommandBuilder()
    .setName('chatgpt')
    .setDescription('Chat with the bot')
    .addStringOption(option => option.setName('input').setDescription('Input to the bot').setRequired(true))
    .setDMPermissions(false),

    async execute(interaction){
        await interaction.deferReply();
        const question = interaction.options.getString('input');

        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setDescription(`\`\`\`${res.data.choices[0].text}\`\`\``)
    
        try {
            const res = await openai.createCompletion({
                model: 'gpt-3.5-turbo',
                messages: conversationLog,
                prompt: question
                
            })
            await interaction.editReply({embeds: [embed]});

        } catch (e) {
            return await interaction.editReply({ content: `Request failed with status code **${e.response.status}**`, ephemeral: true})
        }

    }
}*/


/*
client.on('messageCreate', async (message) => {
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    if(message.author.bot) return;
    
    if(interaction.commandName === 'gpt'){
        const question = interaction.options.getString('input');
        let conversationLog = [{ role: 'system', content: 'You are a friendly chatbot.' }];

        try {
        await message.channel.sendTyping();

        let prevMessages = await message.channel.messages.fetch({ limit: 15 });
        prevMessages.reverse();

        prevMessages.forEach((msg) => {
            if (message.content.startsWith('!')) return;
            if (msg.author.id !== client.user.id && message.author.bot) return;
            if (msg.author.id !== message.author.id) return;

            conversationLog.push({
            role: 'user',
            content: msg.content,
            });
        });

        const result = await openai
            .createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: conversationLog,
            })
            .catch((error) => {
            console.log(`OPENAI ERR: ${error}`);
            });

        message.reply(result.data.choices[0].message);
        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }
  
    
  });
*/


client.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'gpt'){
        const question = interaction.options.getString('input');
       // send question to open ai
        let conversationLog = [{ role: 'system', content: 'You are a friendly chatbot.' }];

        try {
            await interaction.deferReply();
            

            // send question to open ai
            const messages = [
                {
                    role: "system",
                    content: "You are helpful assistant"
                },
                {
                    role: "user",
                    content: question
                }
            ]
            const data = {
                model: "gpt-3.5-turbo",
                messages,
            }
            let res = await fetch("https://api.openai.com/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.API_KEY}`
                    },
                    body: JSON.stringify(data)
                })

            res = await res.json()
            if(res.error){
                console.error(res)
            }

            const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription(`\`\`\`${res.choices[0].message.content.trim()}\`\`\``)
            await interaction.editReply({embeds: [embed]});

        } catch (error) {
            console.log(`ERR: ${error}`);
        }

    }
});




client.login(process.env.TOKEN);