const { Client, Intents } = require('discord.js');
require('dotenv/config')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] })

client.on("guildMemberAdd", message => {

    const nickname = message.user.username;

    message.guild.channels.cache.get('571752920685477889').send(`${nickname}, seja muito bem vindo ao servidor`);
})

client.on("messageCreate", message => {

    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    const commandsBot = {
        async ping() {
            const m = await message.channel.send("Ping?");
            m.edit(`Pong! A latência é ${m.createdTimestamp}ms`)
            return;
        }
    }

    const verifyCommand = commandsBot[comando];

    if(verifyCommand) {
        verifyCommand()
    }
})

client.login(process.env.TOKEN);
