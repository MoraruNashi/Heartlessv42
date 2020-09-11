const hyuga2 = () =>{
  console.log('Module 2 ON');
}
module.exports = hyuga2;
const Discord = require('discord.js'); 
const client = new Discord.Client();
var prefix = 'h!'

client.login(process.env.BOT_TOKEN)

client.on("message", message => {

  if (message.author.id !== '344452433327554563') {
    return 
}
else{

if(message.content.startsWith(prefix + 'leave')){
  if(!message.author.id == '344452433327554563') return;
  const serv = message.guild
  serv.owner.createDM().then(channel => {
  channel.send(`Heartless, Bot présent sur le serveur ${serv.name} a été retiré par ${message.author}`)
  serv.leave()
  })
}
/////////////////////////////////////////////////////////////////////////////////////////////

if(message.content.startsWith(prefix + 'servlist')){

    
    client.guilds.cache.forEach(g => message.channel.send('Envoi en cours...').then(async (m) => await (await m.edit(`
    Serveur ${g.name} 
    owner : ${g.owner} 
    ID : ${g.owner.id} 
    Nombre de membres : 
    ${g.memberCount}\n\n`))))
  
   

  }

}

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
              .setImage(`${user.avatarURL}`)
              .setThumbnail(`${message.author.avatarURL}`)
              message.channel.send(ban)
          console.log(message.author.tag + " -> kick -> " + (user.tag))
          })
      }
  }
}
/////////////////////////////////////////////////////////////////////////////////
  if(message.content.startsWith(prefix + 'creator ban')){
      const user = message.mentions.users.first();
      if (user) {
          const member = message.guild.member(user);
          const reason = message.content.split(' ').slice(3);
          const say = reason.join(' ');
      if (member) {
          member.user.createDM().then(channel =>{
              channel.send(`Vous avez été banni par **${message.author}** pour : **${say}**`)
          })
          member.ban().then(() => {
              const ban = new Discord.MessageEmbed()
              .setTitle(`${message.author.username} a banni ${user.username}`)
              .setDescription(`**Pour raison : ${say}**`)
              .setImage(`${user.avatarURL}`)
              .setThumbnail(`${message.author.avatarURL}`)
              message.channel.send(ban)
              console.log(message.author.tag + " -> ban -> " + (user.tag))
              })
          }
      }
  }
  if(message.content.startsWith(prefix + 'admin test' )){
    
    message.channel.send("Le module admin est bien connecté :thumbsup:")
    
  
}

  

if(message.content.startsWith('h?say')){
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
  
  message.channel.bulkDelete(amount)
  message.channel.send(`${amount} messages ont été supprimés par ${message.author}`).then(async (m) => await (await m.delete()))
  

 }



    
    

});


















