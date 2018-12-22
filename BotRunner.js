// Coded by Christopher H::Lyawoo#9768

const Name = "Lyaboo Bot";
const Discord = require('discord.js');
const Commando = require('discord.js-commando');

// Getting Bot Version Information
global.Version = "0.0.3";
global.Testing = false;
global.Prefix = "ly!";
global.Status = `Sector Greeting and Meeting. V: ${Version}`;

// Getting Bot Server Information
global.Bot = new Commando.Client({
    commandPrefix: Prefix
});

// Getting Bot Functions
	// Serving ${Bot.guilds.size} Servers! 

Bot.on("guildCreate", Guild => {
    console.log(`New guild joined: ${Guild.name} (id: ${Guild.id}). This guild has ${Guild.memberCount} members!`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, { type: "STREAMING", url: "https://discord.gg/yS4vmZq" })
});
Bot.on("guildDelete", Guild => {
    console.log(`I have been removed from: ${Guild.name} (id: ${Guild.id})`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, { type: "STREAMING", url: "https://discord.gg/yS4vmZq"})
});

Bot.on("guildMemberAdd", Member => {
    console.log(`${Member.user.username} has joined ${Member.guild.id}`);

    const Role = Member.guild.roles.find(r => r.name === "Sector Noobs");
    Member.addRole(Role)

    const welcomeChannel = Member.guild.channels.find('name', 'general');
    if (welcomeChannel) {
        let WelcomeEmbed = new Discord.RichEmbed()
            .setTitle("Member has joined!")
            .setThumbnail(Member.user.displayAvatarURL)
            .setDescription(`Welcome ${Member.user} to ${Member.guild.name}.`)
            .setColor("#27037e")
            .setFooter(`You are the ${Member.guild.memberCount} member to joined.`)
            .setTimestamp();
        welcomeChannel.send(WelcomeEmbed)
    }
});
Bot.on("guildMemberRemove", Member => {
    console.log(`${Member.user.username} has left ${Member.guild.id}`);
    const leaveChannel = Member.guild.channels.find('name', 'general');
    if (leaveChannel) {
        let LeaveEmbed = new Discord.RichEmbed()
            .setTitle("Member has left!")
            .setThumbnail(Member.user.displayAvatarURL)
            .setDescription(`Sad to see you leave ${Member.user}! We hope you enjoyed your stay at ${Member.guild.name}.`)
            .setColor("#27037e")
            .setFooter(`Member Count is at ${Member.guild.memberCount}.`)
            .setTimestamp();
        leaveChannel.send(LeaveEmbed)
    }
});
Bot.on("ready", function () {
    console.log(`${Name}: Lyaboo Bot has loaded and is ready for Usage. Online at ${Bot.guilds.size}`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, {type: "STREAMING"})
    if(Testing === true){
        Bot.user.setStatus("idle");
        Bot.user.setActivity("Maintenance Mode On, Will Be Back Soon.")
	}	
});

//Bot.login(process.env.BOT_TOKEN)
Bot.login(process.env.BOT_TOKEN)
