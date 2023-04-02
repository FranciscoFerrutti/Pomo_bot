require('dotenv/config');
const { Client, IntentsBitField, Embed, EmbedBuilder, SlashCommandBuilder ,Discord} = require('discord.js');
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
questions = [];
answers = [];
lastRandom = 0;
completedSession = 

//state array will keep a score of how many times a question has been answered correctly
    //if the question has been answered correctly 3 times, it will be removed from the pool of possible questions
    //if a question is answered incorrectly, its state will be set to 0
state = [];
counter = 0;


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
            .setColor('#d1c9be')
            .setTitle(`\`\`\`prompt: ${question}\`\`\``)
            .setDescription(`\`\`\`${res.choices[0].message.content.trim()}\`\`\``)
            .setThumbnail('https://img.favpng.com/11/16/11/watercolor-painting-tomato-drawing-png-favpng-1L92WQZfLbwAg0kCXE11yy7WR.jpg')
            await interaction.editReply({embeds: [embed]});

        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }
    if(interaction.commandName === 'pomodoro'){
    
        const workTime = interaction.options.get('work-time').value;
        const breakTime = interaction.options.get('break-time').value;
        const cycles = interaction.options.get('cycle-amount').value;

        let cycleCount = 0;

        //function that returns true if every entry in state array equals 3
        function checkState(){
            for(let i = 0; i < state.length; i++){
                if(state[i] != 3){
                    return false;
                }   
            }
            return true;
        }
        
        function startWorkSession() {
            cycleCount++;
            const workMessage = `Pomodoro session ${cycleCount}: Work for ${workTime} minutes.`;
            interaction.channel.send(workMessage);
        
            // Start work session
            setTimeout(() => {
              const breakMessage = `Pomodoro session ${cycleCount}: Time's up! Take a break for ${breakTime} minutes.`;
              interaction.channel.send(breakMessage);
              startBreakSession();
            }, workTime * 60 * 1000);
          }
        
          function startBreakSession() {
            const breakMessage = `Pomodoro session ${cycleCount}: Break for ${breakTime} minutes.`;
            interaction.channel.send(breakMessage);
        
            // Start break session
            setTimeout(() => {
              if (cycleCount < cycles) {
                startWorkSession();
              } else {
                const completionMessage = `Pomodoro routine complete. Great work!`;
                interaction.channel.send(completionMessage);
              }
            }, breakTime * 60 * 1000);
          }
        
          // Start the first work session
          startWorkSession();

        const embed = new EmbedBuilder()
        .setColor('#db441a')
        .setTitle('Pomodoro')
        .setDescription('Your own personal timer!')
        interaction.reply({embeds: [embed]});
        
    }
    if(interaction.commandName === 'game'){
       
        function guessingGame() {
            const answer = Math.floor(Math.random() * 100) + 1; // Generate random number between 1 and 100
            let attempts = 0;
            
            return {
              guess: (num) => {
                attempts++;
                
                if (num === answer) {
                  return `You got it! It took you ${attempts} attempts.`;
                } else if (num > answer) {
                  return "Lower.";
                } else {
                  return "Higher.";
                }
              }
            }
          }
        const gu = interaction.options.get('guess').value
        // Usage example:
        const game = guessingGame();
          
        // Call the game when a command is triggered in Discord
        const guess = parseInt(gu);
        const result = game.guess(guess);
        const embed = new EmbedBuilder()
        .setColor('#822e04')
        .setTitle(`\`\`\`${result}\`\`\``)
        .setDescription(''+gu+'')
        .setThumbnail('https://img.favpng.com/11/16/11/watercolor-painting-tomato-drawing-png-favpng-1L92WQZfLbwAg0kCXE11yy7WR.jpg')
        interaction.reply({embeds: [embed]});
    }
    if(interaction.commandName === 'bored'){

        let getAct = async () => {
            let response = await axios.get('https://www.boredapi.com/api/activity');
            let act = response.data;
            return act;
        }
        let actValue = await getAct();
        const embed = new EmbedBuilder()
        .setColor('#822e04')
        .setTitle(`\`\`\`${actValue.activity}\`\`\``)
        .setDescription('bancanshat?')
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
            .setColor('#c300ff')
            .setDescription(`\`\`\`${res.choices[0].message.content.trim()}\`\`\``)
            .setThumbnail('https://img.favpng.com/11/16/11/watercolor-painting-tomato-drawing-png-favpng-1L92WQZfLbwAg0kCXE11yy7WR.jpg')
            await interaction.editReply({embeds: [embed]});

        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }

    
    if(interaction.commandName === 'flashcards'){
        questions.splice(0, questions.length);
        answers.splice(0, questions.length);
        //set state array to 0
        state.splice(0, state.length);
        counter = 0;
        const topic = interaction.options.getString('topic');
        //create prompt with given topic
        const question = 'I am studying for an exam on ' + topic + ' and I need quizzing flashcards on the most important aspects of this topic with the answers to help me study. Reply with only six flashcards in numbered bullet points.'
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

            const str = res.choices[0].message.content.trim();     

            const regex = /\d+\.\s(.+?)\n-\s(.+?)\n/g;
            let match;
            while ((match = regex.exec(str)) !== null) {
                questions.push(match[1]);
                answers.push(match[2]);
            }
            
            completedSession = false;
            
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Question:')
                    .setDescription(`\`\`\`${questions[0]}\`\`\`\n||\`\`\`${answers[0]}\`\`\`||`)
                await interaction.editReply({embeds: [embed]});
            

        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }
    if(interaction.commandName === 'next'){
        if(completedSession)
            //break;
        if(interaction.options.get('yesno').value){
            if(checkState){
                interaction.reply('youve completed the study session');
                completedSession = true;
                //break;
            }
            state[counter]++;
        }
        else{
            state[counter] = 0;
        }
    
        counter = Math.floor(Math.random() * 5);
        
        //if random generated number is same as last one or if state of that number is 3, generate new number
        while(counter === lastRandom || state[counter] >= 3){
            counter = Math.floor(Math.random() * 5) + 1;
        }
        const embed = new EmbedBuilder()
            .setColor('#32a848')
            .setTitle('Question:')
            .setDescription(`\`\`\`${questions[counter]}\`\`\`\n||\`\`\`${answers[counter]}\`\`\`||`)
        await interaction.reply({embeds: [embed]});
    }
    if(interaction.commandName === 'add'){
        const res = interaction.options.getNumber('num1') + interaction.options.getNumber('num2');
        interaction.reply(res.toString());
    }
    if(interaction.commandName === 'help'){
        const embed = new EmbedBuilder()
        .setColor('#1fedd8')
        .setTitle('Help')
        .setDescription('All Commands: \n -help: list of all commands \n -flashcards: name a topic, we will give you flashcards on it!\n next: passes on to the next question in flashcards and prompts you to say if you got the previous question right or wrong \n -gpt: answers any question! \n -pomodoro: study using the pomodoro method \n -get-creative: receive a prompt of something to do during your break \n -randomize: returns something random \n bored: returns a random activity \n ')
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
            .setColor('#ede31f')
            .setDescription(`\`\`\`${res.choices[0].message.content.trim()}\`\`\``)
            await interaction.editReply({embeds: [embed]});

        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    }
    if(interaction.commandName === 'yes'){
        
        state[counter]++;
        lastRandom = counter;
        
        const embed = new EmbedBuilder()
        .setColor('#00ff26')
        .setTitle('Help')
        .setDescription('All Commands: \n -help: list of all commands \n -flashcards: name a topic, we will give you flashcards on it! \n -gpt: answers any question! \n -pomodoro: study using the pomodoro method')
        interaction.reply({embeds: [embed]});
    }
    
});

  

client.login(process.env.TOKEN);