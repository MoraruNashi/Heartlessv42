const Discord = require('discord.js');
const client = new Discord.Client();
const puppeteer = require('puppeteer');
const hyuga2 = require('./hyuga2')
hyuga2();


var prefix = 'r!' //le prefix du bot
 //le token du bots

client.login(process.env.BOT_TOKEN)


client.on('ready', function () {
    client.user.setActivity("moraru_nashi | mr_shoco => r!help", { type: `WATCHING` });


    client.user.setUsername('『UD』Ritsu')

    client.user.setAvatar('https://media.discordapp.net/attachments/683333167557378059/764800515728736286/62ed41a30b00b39f03a8c7965214b875.jpg')



});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

 
});


client.on("message", message => {


    if (message.author.bot) { return }
    if (!message.guild) { return }



    /////////////////////////////////////

   if (message.content == prefix + 'ping'){
        let début = Date.now();
        message.channel.send("Calcul ...").then(async (m) => await m.edit(`Latence de : ${Date.now() - début} ms`));
        console.log(message.author.tag + '--> ping')
    }

    /////////////////////////////////////
    
    /////////////////////////


    if (message.content.startsWith(prefix + 'ui') || message.content.startsWith(prefix + 'userinfo')){
        const user = message.mentions.users.first() ? message.mentions.users.first() : message.author;


        if ((!user) || (!user.tag)) return message.channel.send("Mentionnez un membre.")
        else {
            
            


            let activity = message.guild.member(user).presence.activities.map(act => act.name).toString().toLowerCase().trim();
            if (activity === ""){
                activity = "Aucune activité en cours";
            } 
            
            let créé = message.guild.member(user)

            let ui = new Discord.MessageEmbed()
               .setTitle(`➥ ${user.username}`)
               .setDescription(`
               :id: \`${user.id}\`
               :first_place:\`Compte créé le ${user.createdAt.getDay()}/${user.createdAt.getMonth()}/${user.createdAt.getFullYear()}\`
               :calendar:\`Join le ${créé.joinedAt.getDay()}/${créé.joinedAt.getMonth()}/${créé.joinedAt.getFullYear()}\`
               :video_game: \`${activity}\`
               :busts_in_silhouette: \`Liste des roles :\`
               **${message.guild.member(user).roles.cache.sort((a,b)=> b.position - a.position).map(r => r.name).toLocaleString().replace(/,/g,"/").replace('@everyone'," ")}**
               `)
               .setThumbnail(user.avatarURL({ format: "png", dynamic: true }))
               .setFooter('r!userinfo by Blouhh',"https://cdn.discordapp.com/avatars/604701457350000641/970fdee675fae7181683b5bd9dbe3cad.png")
               

            message.channel.send(ui)
        }

    }


    /////////////////////////////////////////////////////////


    if (message.content == prefix + 'si' || message.content == prefix + 'serverinfo') {
        if (!message.guild) return message.reply("Commande impossible si elle n'est pas exécutée sur un serveur.")
        else {
            let serv = message.guild
            let date = serv.createdAt

            const si = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`➥ ${serv.name}`)
                .setDescription(`
                    👑Owner: \`${serv.owner.user.tag}\`
                    👥Nombre de membres: \`${serv.memberCount}\` 
                    🚪Nombre de channels: \`${(serv.channels.cache.size)}\`
                    📜Nombre de rôles: \`${(serv.roles.cache.size)}\`
                    📌Admin : 
                    ${serv.members.cache.filter(memb => memb.hasPermission('ADMINISTRATOR')).filter(meb => !meb.user.bot).array().toLocaleString().replace(/,/g, ", ")}
                    Date de création du serveur: \`${(date.getDay())}/${(date.getMonth())}/${(date.getFullYear())}\``)
                .setThumbnail(serv.iconURL({ format: "png", dynamic: true }))
                .setFooter('r!serverinfo by mr_shoco || Design by Blouhh','https://images-ext-2.discordapp.net/external/HsMb4ZEcrvMxwaG8Y3b43daCDj3jE2MkS99UgR_ywdc/https/cdn.discordapp.com/avatars/439129442972073984/017edd7317279c6c58f23363cb9f22ee.png')
            message.channel.send(si)
        }
    }
    

    //////////////////////////////////////////////////////


    if (message.content == prefix + 'servpp') {

        message.channel.send(message.guild.iconURL({ format: "png", dynamic: true }))

    }

    //////////////////////////////////////////////////////

    if (message.content.startsWith(prefix + 'pp')) {
        const user = message.mentions.users.first();
        if (user) return message.channel.send(user.avatarURL({ format: "png", dynamic: true }));
        if (!user) return message.channel.send(message.author.avatarURL({ format: "png", dynamic: true }));
    }


    //////////////////////////////////////////////////////



     if (message.content == prefix + 'help') {
        const help = new Discord.MessageEmbed()
            .setTitle('Liste des commandes de 『 UD 』Ritsu')
            .setColor('BLUE')
            .setDescription(
                `**➥ Help d'『 UD 』Ritsu**

    ❔ **Voici la page d'aide d'『 UD 』Ritsu, de nouvelles commandes pourraient être implémenté sur cette page.**
    
    👮 **Commandes de modération**

\`r!ban : Permet de bannir un joueur.\`r!ban {@Joueur} {Raison}
\`r!kick : Permet d'expulser un joueur.\`r!kick {@Joueur} {Raison}
\`r!clear : Permet de supprimer des messages.\`r!clear {Nombre de messages à clear}
\`r!admin kick : Permet de kick un utilisateur peu importe ses permissions.\`r!admin kick {user}
\`r!admin ban : Permet de bannir un utilisateur peu importe ses permissions.\`r!admin ban {user}
    
    🔨  **Commandes Utiles**
    
\`r!pp : Permet de voir la photo de profile d'un joueur.\`r!pp {@Joueur}
\`r!servpp : Permet de voir la photo de profile du serveur.\`r!servpp
\`r!botinfo : Montre les informations concernant 『 UD 』Ritsu.\`r!botinfo
\`r!userinfo : Montre les informations concernant un utilisateur du serveur.\`r!ui {pseudo}
\`r!suggestion: Envoie une suggestion au staff.\`r!suggestion {Votre suggestion}
\`r!showdown : Donne les stats du compte showdown choisis.\`r!showdown {pseudo}
   
    
    🎮  **Commandes Minecraft**
    
\`r!skin : Affiche le skin d'un joueur.\`r!skin {Joueur}
\`r!head : Affiche la tête d'un joueur.\`r!head {Joueur}
\`r!rinaorc : Permet d'avoir le profil rinaorc d'un joueur.\`r!rinaorc {pseudo}
    
    🎉  **Commandes fun** 
    
\`r!say : Fait parler le bot.\`r!say {Votre message}
\`r!succès : Créer un succès minecraft personnalisé.\`r!succès {Texte}
\`r!embed : Créer un embed.\`r!embed {Message}
\`r!hug : Fait un calin à quelqu'un.\`r!hug {@Joueur}
\`r!pile ou face : Le bot fait un pile ou face avec un résulat random\`r!pile ou face
\`r!slap : Fait une grosse claque sa mère à quelqu'un.\`r!slap {@Connard}
\`r!kiss : Embrasse la personne que vous voulez ou le bot...\`r!slap {@amouuuuur}
\`r!anger : Montre à quel point vous êtes vénère contre quelqu'un\`r!anger {@fdp}
\`r!cry : Vous fait pleurer en pls car on vous a volé votre gouté LIDL\`r!cry


    `)
    .setFooter(`『 UD 』Ritsu by Moraru Nashi`, "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
        message.channel.send(help)
    }



    /////////////////////////////////////////////////////////////

    if (message.content == prefix + 'dé'){

        var min = 1;
        var max = 7;
        var random = Math.floor(Math.random() * (max - min)) + min;

        message.channel.send(`Le lancé de dé a donné ${random} :game_die:`)
    }

    ////////////////////////////////////////////////////////////////
    if (message.content == prefix + 'botinfo' || message.content == prefix + 'bi'){
        console.log(message.author.tag + " ->  botinfo")

        const botinfo = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('➥ 『 UD 』Ritsu by mr_shoco & Moraru_Nashi')
            .setDescription(
                `
                :wave: **『 UD 』Ritsu est un bot créee le 05/01/2020
                Il est basé du la modérateur, le fun et l'utilitaire. :bulb: 
                Les fonctionnalités vont des commandes basiques comme le kick ou le ban
                aux commandes donnant accès aux skin minecraft et aux stats sur le serveur rinaorc
                
                Le bot est toujours en développement, nous travaillons pour vous ajouter
                plus de nouvelles fonctionnalités.**
                
                :airplane:**Pour add 『 UD 』Ritsu à votre serveur, utilisez directement ce lien 
                ➤ https://discordapp.com/api/oauth2/authorize?client_id=663090502081445918&permissions=8&scope=bot**
                
                :grey_question:**Si vous avez des demandes en rapport avec 
                le développement ou juste avec le bot vous pouvez venir 
                nous poser vos questions ici :
                https://discord.gg/FuaZtpj
                
                Merci d'avoir invité 『 UD 』Ritsu en espérant que le projet vous plaise :D**
        `)
            .setFooter("botinfo by Moraru Nashi", "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
            .setThumbnail('https://media.discordapp.net/attachments/683333167557378059/764800515728736286/62ed41a30b00b39f03a8c7965214b875.jpg')
            .setColor('BLUE')

        message.channel.send(botinfo)

    }
    //////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////

    if (message.content.startsWith(prefix + 'pnj')) {
        const pnj = new Discord.MessageEmbed()
            .setTitle('Le PNJ')
            .setImage('https://fr-minecraft.net/upload/seeds/images/fr-minecraft_seed_5D13_2014-01-15-17-18-16.png')
           .setColor('BLUE')
            .setFooter('By Moraru_Nashi', "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
        message.channel.send(pnj)
    }
    if (message.content.startsWith(prefix + 'skin')) {
        let args = message.content.split(' ').slice(1)
        const skin = new Discord.MessageEmbed()
            .setTitle(`Skin de ${args}`)
            .setImage(`https://mc-heads.net/body/${args}/100`)
            .setColor('BLUE')
            .setFooter('By Moraru Nashi', 'https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png')
        message.channel.send(skin)



    }
    if (message.content.startsWith(prefix + 'head')) {
        let args = message.content.split(' ').slice(1)
        const skin = new Discord.MessageEmbed()
            .setTitle(`Tête de ${args}`)
            .setImage(`https://mc-heads.net/avatar/${args}/100/nohelm.png`)
            .setColor('BLUE')
            .setFooter('By Moraru Nashi', 'https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png')
        message.channel.send(skin)

    }


    if (message.content.startsWith(prefix + "ban")) {
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
                        .setTitle(`${message.author.username} a kick ${user.username}`)
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

    /////////////////////////////////////////////////////////////////////////////////////


   if(message.content.startsWith(prefix + 'clear')){
    const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
    const amount = args.join(' '); // Amount of messages which should be deleted

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Vous n\'avez pas les permissions requises');
    
    if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
    
    if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1
    

    message.delete();
    message.channel.bulkDelete(amount);
    
    message.channel.send(`${amount} messages ont été supprimés par ${message.author}`);

   }
    
    //////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (message.content.startsWith(prefix + "kick")) {
        if (!message.guild) return;
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas les permissions requises.");
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous ne pouvez pas kick un modérateur.")
            const reason = message.content.split(' ').slice(2);
            const say = reason.join(' ');
            if (member) {
                member.user.createDM().then(channel => {
                    channel.send(`Vous avez été banni par **${message.author}** pour : **${say}**`)
                })
                member.kick().then(() => {
                    const ban = new Discord.MessageEmbed()
                        .setTitle(`${message.author.username} a kick ${user.username}`)
                        .setDescription(`**Pour raison : ${say}**`)
                        .setImage(user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setColor('BLUE')
                        .setThumbnail(message.author.avatarURL({ format: "png", dynamic: true }))
                    message.channel.send(ban)
                    console.log(message.author.tag + " -> kick -> " + (user.tag))
                })
            }
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (message.content.startsWith(prefix + 'succès') || message.content.startsWith(prefix + "succes")) {
        let arg = message.content.split(' ')
        arg.shift()
        if (!arg) return message.reply('Met un message dans le succès.');
        const succès = new Discord.MessageEmbed()
            .setImage('https://minecraftskinstealer.com/achievement/13/Achievement+Get%21/' + arg.join('+'))
            .setColor('BLUE')
        message.channel.send(succès)

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    if (message.content.startsWith(prefix + 'ud')) {
        const UD = new Discord.MessageEmbed()
            .setImage('https://images-ext-2.discordapp.net/external/3jDMnWTRtKtSiTWTHkcclNGTTwIUrnA6Wr9r00S5V6E/https/cdn.discordapp.com/icons/580473462523691021/e38b23f31b14dfbc23dbfdad217ecfef.jpg')
            .setTitle('Voici le serveur à la base du bot 『 UD 』Ritsu')
            .setDescription('**https://discord.gg/5GcTqTq**')
            .setColor('BLUE')
        message.channel.send(UD)
    }





    if (message.content.startsWith(prefix + "mr_shoco")) {
        let mr_shoco = new Discord.MessageEmbed()
            .setImage('https://images-ext-1.discordapp.net/external/u3eqVtzhl4Em7p1JQ734OFDKXcpd1Q6Yp6QaZCZey-k/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/439129442972073984/017edd7317279c6c58f23363cb9f22ee.webp')
            .setDescription(`C'est une chèvre ? c'est un avion ? c'est un mouton ?! Nan c'est mr_shoco`)
            .setTitle('Dieu shoco')
            .setColor('BLUE')
        message.channel.send(mr_shoco)
    }

    if (message.content.startsWith(prefix + 'say')) {
        let args = message.content.split(' ').slice(1);
        let say = args.join(' ');
        if (say.includes("@everyone") || (say.includes('@here') || (message.mentions.roles.size > 0))) return message.channel.send('non.');
        message.delete().catch();
        message.channel.send(say)
        console.log(`${message.author} || ${message.author.id} => ${say}`)


    }

    if (message.content.startsWith(prefix + '『 UD 』Ritsu') || message.content.startsWith(prefix + '『 UD 』Ritsu')) {
        message.channel.send(`Salut ${message.author.username} :) pense à faire'r!help pour connaitre l'entièreté des commandes disponibles :)`)
    }

    if (message.content.startsWith(prefix + 'embed')) {
        let args = message.content.split(' ').slice(1);
        let say = args.join(' ');
        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setDescription(`${say}`)
            .setAuthor(message.author.username)
        message.delete();
        message.channel.send(embed)
    }

    if (message.content.startsWith(prefix + 'admin kick')) {
        if (!message.guild) return;
        if (!message.member.hasPermission('ADMINISTRATOR') || (!message.author.id == '344452433327554563')) return message.channel.send("Vous n'avez pas les permissions requises.");
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            const reason = message.content.split(' ').slice(3);
            const say = reason.join(' ');
            if (member) {
                message.delete();
                member.user.createDM().then(channel => {
                    channel.send(`Vous avez été kick par **${message.author}** pour : **${say}**`).catch(err => {
                        console.log(err)
                    })
                })
                member.kick().then(() => {
                    const ban = new Discord.MessageEmbed()
                        .setTitle(`${message.author.username} a kick ${user.username}`)
                        .setDescription(`**Pour raison : ${say}**`)
                        .setImage(`${user.avatarURL({ format: "png", dynamic: true })}`)
                        .setThumbnail(message.author.avatarURL({ format: "png", dynamic: true }))
                        .setColor('BLUE')
                    message.channel.send(ban)
                    console.log(message.author.tag + " -> kick -> " + (user.tag))
                })
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////////
    if (message.content.startsWith(prefix + 'admin ban')) {
        if (!message.guild) return;
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'avez pas les permissions requises.");
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            const reason = message.content.split(' ').slice(3);
            const say = reason.join(' ');
            if (member) {
                member.user.createDM().then(channel => {
                    channel.send(`Vous avez été banni par **${message.author}** pour : **${say}**`).catch(err => {
                        console.log(err)

                    })

                })
                member.ban().then(() => {
                    const ban = new Discord.MessageEmbed()
                        .setTitle(`${message.author.username} a banni ${user.username}`)
                        .setDescription(`**Pour raison : ${say}**`)
                        .setImage(`${user.avatarURL({ format: "png", dynamic: true })}`)
                        .setThumbnail(message.author.avatarURL({ format: "png", dynamic: true }))
                        .setColor('BLUE')
                    message.channel.send(ban)
                    console.log(message.author.tag + " -> ban -> " + (user.tag))
                })
            }
        }
    }

    //////////////////////////////////////////////////////////////////////



    if (message.content.startsWith(prefix + 'raid')) {
        message.channel.send('plif plouf raid un serv c\'est pas ouf')
    }




    if (message.content.startsWith(prefix + 'suggestion')) {
        let target = client.channels.cache.get('764437031610220575')
        let args = message.content.split(' ').slice(1)
        const suggestion = args.join(' ');

        if (!suggestion) return message.reply('veuillez ajouter un argument.');
        
        if(suggestion){
        message.channel.send('Votre suggestion a bien été envoyée, merci de votre participation pour l\'avenir de 『 UD 』Ritsu :thumbsup:')
        target.send(`Suggestion de ${message.author} : ${suggestion}`)
        }
    }



    if (message.content.startsWith(prefix + 'report')) {
        let user = message.mentions.users.first();
        let args = message.content.split(' ').slice(2)
        const report = args.join(' ');
        let target = message.member.guild.channels.cache.find(ch => ch.id === '742695658691231754')

        if (!target) return;
        if (!report) return message.channel.send(`Merci d'ajouter une raison ${message.author} ! L'abus de la commande peut être destiné à un mute ou ban.`)

        message.channel.bulkDelete(2);
        target.send(`**${message.author}** a report ${user} pour **${report}**`);


    }
////////////////////////////////////////////////////////////////////////////////////////////////////


    if (message.content.startsWith(prefix + 'hug')) {
        const user = message.mentions.users.first();
        const args = message.content.split(' ').slice(1);
        const say = args.join(' ');
        var calin = ['https://33.media.tumblr.com/680b69563aceba3df48b4483d007bce3/tumblr_mxre7hEX4h1sc1kfto1_500.gif',"https://cdn.discordapp.com/attachments/587635162309984257/769845669208653834/kiss_milk_and_mocha.gif"];
        var randomItem = calin[Math.floor(Math.random()*calin.length)];
        

        const random = (Math.floor(Math.random() * 1))
    
        if (user) {

            const hug = new Discord.MessageEmbed()
                .setDescription(`${message.author} fait un calin à ${user}`)
                .setImage(randomItem)
                .setColor('BLUE')
            message.channel.send(hug)
        }
        else {

            if (say) {
                const hug = new Discord.MessageEmbed()
                    .setDescription(`${message.author} fait un calin à ${say}`)
                    .setImage(randomItem)
                    .setColor('BLUE')
                message.channel.send(hug)
            }

            else {

                if ((!user) || (!say)){
                    
                     const hug = new Discord.MessageEmbed()
                        .setDescription(`${message.author} fait un calin à 『 UD 』Ritsu`)
                        .setImage(randomItem)
                        .setColor('BLUE')
                    message.channel.send(hug)
                    }
                }
            }
    }
    
    
    if (message.content.startsWith(prefix + 'slap')) {
        const user = message.mentions.users.first();
        const args = message.content.split(' ').slice(1);
        const say = args.join(' ');
        let slap = ['https://cdn.discordapp.com/attachments/580508395803508749/749774313892347914/yoshi.gif',"https://cdn.discordapp.com/attachments/587635162309984257/769846840228839424/tenor_1.gif"]
        var randomItem = slap[Math.floor(Math.random()*slap.length)];

        if (user) {

            const hug = new Discord.MessageEmbed()
                .setDescription(`${message.author} frappe violemment  ${user}`)
                .setImage(randomItem)
                .setColor('BLUE')
            message.channel.send(hug)
        }
        else {

            if (say) {
                const hug = new Discord.MessageEmbed()
                    .setDescription(`${message.author} frappe violemment  ${say}`)
                    .setImage(randomItem)
                    .setColor('BLUE')
                    message.channel.send(hug)

            }

            else {

                if ((!user) || (!say)) {
                    const hug = new Discord.MessageEmbed()
                        .setDescription(`${message.author} frappe violemment 『 UD 』Ritsu`)
                        .setImage(randomItem)
                        .setColor('BLUE')
                    message.channel.send(hug)
                }

            }
        }
    }

    if (message.content.startsWith(prefix + 'cry')) {
        const user = message.mentions.users.first();
        let cry = ['https://cdn.discordapp.com/attachments/587635162309984257/769678888107245588/pikachu.gif','https://cdn.discordapp.com/attachments/587635162309984257/769681375732170772/milk_and_mosha_cry.gif','https://cdn.discordapp.com/attachments/587635162309984257/769685265014718515/cry_stitch.gif']
        var randomItem = cry[Math.floor(Math.random()*cry.length)];

        

            const hug = new Discord.MessageEmbed()
                .setDescription(`${message.author} pleure à gros sanglots`)
                .setImage(randomItem)
                .setColor('BLUE')
            message.channel.send(hug)
        
        
    }



    if (message.content.startsWith(prefix + 'anger')) {
        const user = message.mentions.users.first();
        let anger = ['https://cdn.discordapp.com/attachments/587635162309984257/769845451988926524/sardoche.gif','https://cdn.discordapp.com/attachments/587635162309984257/769846086536921148/tenor.gif',]
        var randomItem = anger[Math.floor(Math.random()*anger.length)];
        const args = message.content.split(' ').slice(1)
        const say = args.join(' ');

        if (user) {

            const hug = new Discord.MessageEmbed()
                .setDescription(`${message.author} est fou de rage envers ${user} :rage:`)
                .setImage(randomItem)
                .setColor('BLUE')
            message.channel.send(hug)
        }
        else {

            if (say) {
                const hug = new Discord.MessageEmbed()
                    .setDescription(`${message.author} est fou de rage envers ${say} :rage:`)
                    .setImage(randomItem)
                    .setColor('BLUE')
                    message.channel.send(hug)

            }

            else {

                if ((!user) || (!say)) {
                    const hug = new Discord.MessageEmbed()
                        .setDescription(`${message.author} est fou de rage envers Ritsu :rage:`)
                        .setImage(randomItem)
                        .setColor('BLUE')
                    message.channel.send(hug)
                }

            }
        }
    }

    if (message.content.startsWith(prefix + 'kiss')) {
        const user = message.mentions.users.first();
        let kiss = ['https://cdn.discordapp.com/attachments/587635162309984257/769847170668298240/tenor_2.gif','https://cdn.discordapp.com/attachments/587635162309984257/769848262881574932/tenor_3.gif']
        var randomItem = kiss[Math.floor(Math.random()*kiss.length)];
        const args = message.content.split(' ').slice(1)
        const say = args.join(' ');

        if (user) {

            const hug = new Discord.MessageEmbed()
                .setDescription(`${message.author} embrasse langoureusement ${user} :heart:`)
                .setImage(randomItem)
                .setColor('BLUE')
            message.channel.send(hug)
        }
        else {

            if (say) {
                const hug = new Discord.MessageEmbed()
                    .setDescription(`${message.author} embrasse langoureusement ${say} :heart:`)
                    .setImage(randomItem)
                    .setColor('BLUE')
                    message.channel.send(hug)

            }

            else {

                if ((!user) || (!say)) {
                    
                    message.channel.send('https://youtu.be/vTWuNeZn1aQ')
                }

            }
        }
    }


/////////////////////////////////////////////////////////


    if(message.content.startsWith(prefix + 'random')){
        let chiffre = [1,2,3,4,5,6,7,8,9,10]
        var randomItem = chiffre[Math.floor(Math.random()*chiffre.length)]

        message.channel.send(`Le chiffre choisi est ${randomItem}`)


    }


    if(message.content.startsWith(prefix + 'showdown')){
        let args = message.content.split(' ').slice(1);
        let say = args.join(' ');

        let embed = new Discord.MessageEmbed()
        .setTitle(`Voici le profil showdown de ${say}`)
        .setColor('BLUE')
        .setURL(`https://pokemonshowdown.com/users/${say}`)
        .setFooter(`『 UD 』Ritsu by Moraru Nashi`, "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
        if(!say){ message.reply('Veuillez ajouter un nom de compte.')
        }
        message.channel.send(embed)
        

        

    }


    





    if(message.content.startsWith(prefix + 'rinaorc')){
    let args = message.content.split(' ').slice(1);
    
    const getData = async () => {
      // 1 - Créer une instance de navigateur
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
      const page = await browser.newPage()
    
      // 2 - Naviguer jusqu'à l'URL cible
      await page.goto(`https://old.rinaorc.com/player/${args}`)
      await page.click(
        '#stats > div > div:nth-child(3) > div > h5','#stats > div > div.col-md-6.right > div > h5','#profile > div > div.col-xl-8.col-lg-7.col-md-6 > span:nth-child(2)','#stats > div > div:nth-child(3)'
      )
      await page.waitFor(1000) // fait une pause d'une seconde
    
      // 3 - Récupérer les données
      const result = await page.evaluate(() => {
        let lastconnection = document.querySelector('h5').textContent
        let firsthour = document.querySelector('#stats > div > div.col-md-6.right > div > h5').textContent.replace('Première connexion', '')
        let badge = document.querySelector('#profile > div > div.col-xl-8.col-lg-7.col-md-6 > span:nth-child(2)').textContent
        let time = document.querySelector('#stats > div > div:nth-child(3) > div > h5').textContent

        return { lastconnection, firsthour, badge, time}
        
      })
    
      // 4 - Retourner les données (et fermer le navigateur)
      browser.close()
      return result
    }
    
    // Appelle la fonction getData() et affichage les données retournées
    getData().then(value => {
        let Grade = value.badge
        if (Grade === "Visiteur"){
            Grade = "Joueur";
        } 

     let embed = new Discord.MessageEmbed()
        
        .setDescription(`
        
            ➥ **Stats de ${args}**
        
           📆\`Dernière connexion: ${value.lastconnection}\`
           👥\`Première connexion: ${value.firsthour}\`
           ⭐\`Grade: ${value.badge}\`
           🕐\`Temps de jeu: ${value.time}\``)
           .setThumbnail(`https://mc-heads.net/body/${args}/100`)
           .setFooter(`『 UD 』Ritsu by Moraru Nashi`, "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
           message.channel.send(embed)
        }).catch(err => {
        message.channel.send("Le pseudo n'existe pas.")
        console.error(err);
    
    })
}
    
if(message.content.startsWith(prefix + 'pile ou face')){
  var coin = ["Pile", "Face"]
  var randomItem = coin[Math.floor(Math.random()*coin.length)];

  message.channel.send(`Le pièce est tombé sur ${randomItem} :coin:`)
}




});

client.on('guildMemberRemove', member => {

    const channel = member.guild.channels.cache.get('672494723164012583');

    if (!channel) { return }

    channel.send(`**:wave: Au revoir ${member.user.username} ! Nous sommes maintenant ${member.guild.memberCount} :wave:**`);
 
 let channelC = member.guild.channels.cache.get("769194586404421672"); 
	let max = member.guild.memberCount;
	let format = "🌹 Membres : " + max;
	if(channelC.name !== format){
		channelC.setName(format);
}


let under = member.guild.channels.cache.get("748134506627596318"); 
    let Nombre = member.guild.memberCount;
	let nom = "Membres : " + Nombre;
	if(under.name !== nom){
		under.setName(nom);
}


});

client.on('guildCreate', guild => {

    let target = client.channels.cache.get('641712943771156556');

   target.send(`
        『 UD 』Ritsu a été ajouté sur ${guild.name}
        Guild Owner : ${guild.owner}
        Guild Owner ID : ${guild.owner.id}
        Membres : ${guild.memberCount}
        

    `)


});

client.on('guildMemberAdd', member => {


const target = member.guild.channels.cache.get('768787120126689291');
const emoji = client.emojis.cache.find(emoji => emoji.name ==='6721_AB_welcome')
const welcomers = member.guild.roles.cache.find(role => role.name === "▪ Welcomers")
let embed = new Discord.MessageEmbed()

.setDescription(`${welcomers}, veuillez accueillir chaleureusement notre **${member.guild.memberCount}** ème membre ${member} ${emoji}`)
.setImage('https://cdn.discordapp.com/attachments/604721365630844928/769108024936890389/DVH0sxL.png')
.setColor('#36393f')


if(!target){return}


target.send(embed)

//////////////////////////////////////////////////////////////////////

const channel = member.guild.channels.cache.get('672141962324869120');

if (!channel) { return }



channel.send(`:partying_face: **Bienvenue sur le serveur ${member.user.username} ! Nous sommes maintenant ${member.guild.memberCount}** :partying_face:`);

/////////////////////////////////////////////////////////////////////////



let under = member.guild.channels.cache.get("748134506627596318"); 
	let max = member.guild.memberCount;
	let format = "Membres : " + max;
	if(under.name !== format){
		under.setName(format);
}
///////////////////////////////////////////////////////////////////////////
let channelC = member.guild.channels.cache.get("769194586404421672"); 
	let Nombre = member.guild.memberCount;
	let nom = "🌹 Membres : " + Nombre;
	if(channelC.name !== nom){
		channelC.setName(nom);
}

    

});
