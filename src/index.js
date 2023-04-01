require('dotenv/config');
const { Client, IntentsBitField, Embed, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
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
const questions = [];
const answers = [];
counter = 0;
//currentAmount = 0;

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName === 'gpt'){
        const question = interaction.options.getString('input');
       // send question to open ai

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
            .setColor('#d24c06')
            .setTitle(`\`\`\`prompt: ${question}\`\`\``)
            .setDescription(`\`\`\`${res.choices[0].message.content.trim()}\`\`\``)
            .setThumbnail('https://img.favpng.com/11/16/11/watercolor-painting-tomato-drawing-png-favpng-1L92WQZfLbwAg0kCXE11yy7WR.jpg')
            await interaction.editReply({embeds: [embed]});

        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }
    if(interaction.commandName === 'bored'){
        let getAct = async () => {
            let response = await axios.get('https://www.boredapi.com/api/activity');
            let act = response.data;
            return act;
        }
        let actValue = await getAct();
        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`\`\`\`${actValue.activity}\`\`\``)
        .setDescription('bancanshat?  L_o_/')
        .setThumbnail('https://img.favpng.com/11/16/11/watercolor-painting-tomato-drawing-png-favpng-1L92WQZfLbwAg0kCXE11yy7WR.jpg')
        interaction.reply({embeds: [embed]});
    }
    if(interaction.commandName === 'randomize'){
        const rand = interaction.options.getString('random');
        const question = 'Give me a random ' + rand + ', dont make any explanations just give me a random:' + rand + '. ';
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
            .setColor('#d24c06')
            .setDescription(`\`\`\`${res.choices[0].message.content.trim()}\`\`\``)
            .setThumbnail('https://img.favpng.com/11/16/11/watercolor-painting-tomato-drawing-png-favpng-1L92WQZfLbwAg0kCXE11yy7WR.jpg')
            await interaction.editReply({embeds: [embed]});

        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }

    
    if(interaction.commandName === 'flashcards'){
        const amount = interaction.options.get('amount').value + 1;
        //amount++;
        questions.splice(0, questions.length);
        answers.splice(0, questions.length);
        counter = 0;
        const topic = interaction.options.getString('topic');
        //create prompt with given topic
        const question = 'I am studying for an exam on ' + topic + ' and I need quizzing flashcards on the most important aspects of this topic with the answers to help me study. Reply with only ' + amount+' flashcards in numbered bullet points'
        // send topic to open ai

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

            //const embed = new EmbedBuilder()
            //.setColor('#0099ff')
            //.setDescription(`\`\`\`${res.choices[0].message.content.trim()}\`\`\``)
            //await interaction.editReply({embeds: [embed]});
            
            const str = res.choices[0].message.content.trim();     

            const regex = /\d+\.\s(.+?)\n-\s(.+?)\n/g;
            let match;
            while ((match = regex.exec(str)) !== null) {
                questions.push(match[1]);
                answers.push(match[2]);
            }
            console.log(questions);
            console.log(answers);
            
            //for loop to send each flashcard
            //for(let i = 0; i < 5; i++){
            //console.log(questions[0]);
            //res = questions[0];
            //await interaction.editReply(questions[0]);
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Question:')
                    .setDescription(`\`\`\`${questions[0]}\`\`\`\n\`\`\`${answers[0]}\`\`\``)
                await interaction.editReply({embeds: [embed]});
            //}
            //console.log(questions);
            //console.log(answers);

        } catch (error) {
            console.log(`ERR: ${error}`);
        }
        
    }
    if(interaction.commandName === 'next'){
        console.log(questions);
        console.log(answers);
        counter = (counter + 1) % 5;
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Question:')
            .setDescription(`\`\`\`${questions[counter]}\`\`\`\n\`\`\`${answers[counter]}\`\`\``)
        await interaction.reply({embeds: [embed]});
    }
    if(interaction.commandName === 'add'){
        const res = interaction.options.getNumber('num1') + interaction.options.getNumber('num2');
        interaction.reply(res.toString());
    }
    if(interaction.commandName === 'help'){
        const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Help')
        .setDescription('All Commands: \n -help: list of all commands \n -flashcards: name a topic, we will give you flashcards on it! \n -gpt: answers any question! \n -pomodoro: study using the pomodoro method')
        interaction.reply({embeds: [embed]});
    }
    if(interaction.commandName === 'get-creative'){
        const question = 'Give me only one simple artistic and creative thing to do in 10 minutes time, and dont give any reasoning for it, just name the topic and what i should do. For example "Dance: to techno" or "Draw: a sunflower" or "Invent: a machine" or "Listen to: a beattles song"'
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
            .setColor('#d24c06')
            .setDescription(`\`\`\`${res.choices[0].message.content.trim()}\`\`\``)
            await interaction.editReply({embeds: [embed]});

        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }
});

client.login(process.env.TOKEN);