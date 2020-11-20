const hyuga2 = () =>{
  console.log('Module 2 ON');
}
module.exports = hyuga2;
const Discord = require('discord.js'); 
const client = new Discord.Client();
const fs = require('fs');
const config = require('./blacklist.json')
var prefix = 'r!'

client.login(process.env.BOT_TOKEN)





client.on("message", message => {

  let idée = ["439129442972073984","344452433327554563"].includes(message.author.id)




  if(!idée){return}

if(message.content.startsWith(prefix + 'leave')){
  
  const serv = message.guild
  serv.owner.createDM().then(channel => {
  channel.send(`Heartless, Bot présent sur le serveur ${serv.name} a été retiré par ${message.author}`)
  serv.leave()
  })
}
/////////////////////////////////////////////////////////////////////////////////////////////




if(message.content.startsWith(prefix +'creator kick')){
 const user = message.mentions.users.first();
  if (user) {
  const member = message.guild.member(user);
  const reason = message.content.split(' ').slice(3);
  const say = reason.join(' ');
  if (member) {
      message.delete();
      member.user.createDM().then(channel =>{
          channel.send(`Vous avez été kick par **${message.author}** pour : **${say}**`)
      })
      member.kick().then(() => {
          const ban = new Discord.MessageEmbed()
              .setTitle(`${message.author.username} a kick ${user.username}`)
              .setDescription(`**Pour raison : ${say}**`)
              .setImage(`${user.avatarURL({ format: "png", dynamic: true })}`)
              .setThumbnail(message.author.avatarURL({ format: "png", dynamic: true }))
              message.channel.send(ban)
          console.log(message.author.tag + " -> kick -> " + (user.tag))
          })
      }
  }
}
/////////////////////////////////////////////////////////////////////////////////
   if (message.content.startsWith(prefix + "creator ban")) {
        if (!message.guild) return;
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas les permissions requises.");
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous ne pouvez pas ban un modérateur.")

            const reason = message.content.split(' ').slice(2);
            const say = reason.join(' ');
            if (member) {
                member.user.createDM().then(channel => {
                    channel.send(`**Vous avez été banni par ${message.author} pour : ${say}**`)
                })
                member.ban().then(() => {
                    const ban = new Discord.MessageEmbed()
                        .setTitle(`${message.author.username} a ban ${user.username}`)
                        .setColor('BLUE')
                        .setDescription(`**Pour raison : ${say}**`)
                        .setImage(`${user.avatarURL({ format: "png", dynamic: true })}`)
                        .setThumbnail(message.author.avatarURL({ format: "png", dynamic: true }))
                    message.channel.send(ban)
                    console.log(message.author.tag + " -> ban -> " + (user.tag))
                })
            }
        }
    }
  
  
  
  if(message.content.startsWith(prefix + 'admin test' )){
    
    message.channel.send("Le module admin est bien connecté :thumbsup:")
    
  
}

  

if(message.content.startsWith('r?say')){
  if(message.guild){return}

  let args = message.content.split(' ').slice(1)
  let say = args.join(' ')

  let target = client.channels.cache.get('737357263626567790');


  target.send(say)
}


if(message.content.startsWith(prefix + 'creator clear')){
  const args = message.content.split(' ').slice(2); // All arguments behind the command name with the prefix
  const amount = args.join(' '); // Amount of messages which should be deleted

  
  
  if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
  if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
  
  if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
  if (amount < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1
  message.delete();
  message.channel.bulkDelete(amount)
  message.channel.send(`${amount} messages ont été supprimés par ${message.author}`).then(async (m) => await (await m.delete()))
  

 }


 if(message.content.startsWith(prefix + 'creator help')){
  let embed = new Discord.MessageEmbed()

    .setTitle('Liste des commandes Admin :')
    .setDescription(`
    r!leave : \`Fait leave le bot du serveur sur lequel la commande est exécutée.\`
    r!creator kick : \`Permet de kick un membre de serveur sans permission au préalable.\`
    r!creator ban :  \`Permet de ban un membre de serveur sans permission au préalable.\`
    r!creator clear :  \`Permet de clear un channel sans permission au préalable.\`
    r!admin test :  \`Envoie un message pour vérifier si le module est bien connecté.\`
    r!blacklist add : \`Ajoute l'ID d'un serveur à blacklist du bot\`
    r!blackliste : \`Montre les ID de serveurs blacklist par le bot\`
    `)
  .setFooter('By Moraru_Nashi', "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
  message.channel.send(embed)
}


if(message.content.startsWith(prefix + 'blacklist add')){
  let args = message.content.slice(2)
  let black = config.blacklist
 
  black.push(args);
  let json = JSON.stringify({ blacklist: black }, null, '');

  fs.writeFile('blacklist.json', json, function(err){
      if(err) throw err;
      console.log('Blacklist mise à jour.')
      console.log(config.blacklist)
    });
    
}

if(message.content.startsWith(prefix + 'blackliste')){
  message.channel.send(config.blacklist)

}


});
client.on('guildCreate', guild => {
  if(guild.id.includes(config.blacklist)){
    guild.owner.user.dmChannel.send('**Votre serveur est blacklist de Ritsu.**')
    guild.leave()
    
}
})
