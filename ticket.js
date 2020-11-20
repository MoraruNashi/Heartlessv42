const ticket = () =>{
    console.log('Module 2 ON');
  }
  module.exports = ticket;
const Discord = require('discord.js'); 
const client = new Discord.Client();
var prefix = 'r!'
client.login(process.env.BOT_TOKEN);


client.on('ready', function () {
       
console.log('Logger on')
    
    

});


client.on("message", message => {



if(message.content.toLowerCase() === 'r!ticket' && message.channel.id === '779322348716163072'){

    if(message.guild.id !== '580473462523691021'){return}
    
    const categoryId = "778653759491670057";

    var userName = message.author.username;
    // Verkrijg discriminator
    var userDiscriminator = message.author.discriminator;

    // If ticket has been made
    var bool = false;

    // Checking if ticket has been made.
    message.guild.channels.cache.forEach((channel) => {

        // If ticket has been made sent:
        if (channel.name == `${userName.toLowerCase()}-${userDiscriminator}`) {

            message.channel.send("You already made a ticket");

            bool = true;

        }

    });

    // Ticket return code
    
    if (bool == true){return}
    
    var embedCreateTicket = new Discord.MessageEmbed()
        .setTitle("Hey, " + message.author.username)
        .setFooter("Support channel will be made");
    
    message.channel.send(embedCreateTicket);
    
    message.guild.channels.create(`${userName}-${userDiscriminator}`, "text").then((createdChan) => { // Maak kanaal
    
        createdChan.setParent(categoryId).then((settedParent) => { 
            
                settedParent.updateOverwrite(message.author,
                {
                 "VIEW_CHANNEL": true,
                 "SEND_MESSAGES": true,
                 "ATTACH_FILES"  : true,
                 "CREATE_INSTANT_INVITE": false 
                }
            )

            settedParent.updateOverwrite(message.guild.roles.everyone,
            {
                "VIEW_CHANNEL": false,
                "SEND_MESSAGES": false
            })

            
            
            var embedParent = new Discord.MessageEmbed()
                .setTitle("Hey, " + message.author.username.toString())
                .setDescription("Décrivez votre problème ci-dessous :");
    
            settedParent.send(embedParent);

            

        }).catch(err => {
            message.channel.send("Something went wrong.");
            console.log(err)
            
            
        });
    
    }).catch(err => {
        message.channel.send("Something went wrong.");
        console.log(err)
    })

    

    }
});    
