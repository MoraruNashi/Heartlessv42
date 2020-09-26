const Discord = require('discord.js');
const client = new Discord.Client();
const puppeteer = require('puppeteer');
const hyuga2 = require('./hyuga2')
hyuga2();


var prefix = 'h!' //le prefix du bot
 //le token du bots

client.login(process.env.BOT_TOKEN)


client.on('ready', function () {
    client.user.setActivity("moraru_nashi | mr_shoco => h!help", { type: `WATCHING` });


});














client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    
    
  



    



   
    
});







client.on("message", message => {





    if (message.author.bot) { return }
    if (!message.guild) { return }



    /////////////////////////////////////

    if (message.content.startsWith(prefix + 'ping')) {
        let début = Date.now();
        message.channel.send("Calcul ...").then(async (m) => await m.edit(`Latence de : ${Date.now() - début} ms`));
        console.log(message.author.tag + '--> ping')
    }

    /////////////////////////////////////
    
    /////////////////////////


    if (message.content.startsWith(prefix + 'ui') ||  message.content.startsWith(prefix + 'userinfo')) {
        const user = message.mentions.users.first() ? message.mentions.users.first() : message.author;


        if ((!user) || (!user.tag)) return message.channel.send("Mentionnez un membre.")
        else {
            
            let Activité = user.presence.activities.map(act => act.name).toString().toLowerCase();

            

            let ui = new Discord.MessageEmbed()
                .setTitle(`${(user.tag)}`)
                .setDescription(`
    
                **ID :  ${(user.id)} **

                **Activité : ${Activité} **
     
                **Date de création du compte : ${(user.createdAt.toLocaleString("fr-FR", {hour12: false}))}**
    
                **${user.username} a rejoint le serveur le : ${message.guild.member(user).joinedAt.toLocaleString("fr-FR", {hour12: false})}**
    
                **Rôles de l'utilisateur :** 
    
                ${message.guild.member(user).roles.cache.array().sort((a, b) => b.position - a.position).map(r => r.name).toLocaleString().replace(/,/g, "\n\n").replace('@everyone', "\n")}`)

                .setColor('BLUE')
                
                .setThumbnail((user.avatarURL({ format: "png", dynamic: true })))

            message.channel.send(ui)
        }

    }

    /////////////////////////////////////////////////////////


    if (message.content.startsWith(prefix + 'si') || message.content.startsWith(prefix + 'serverinfo')) {
        if (!message.guild) return message.reply("Commande impossible si elle n'est pas exécutée sur un serveur.")
        else {
            let serv = message.guild


            const si = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle((serv.name))
                .setDescription(
                    "\n\n\n**Owner** : " + (serv.owner.user.tag) +
                    "\n\n\n**Nombre de bots/membres** : " + (message.guild.members.cache.filter(val => val.user.bot).size) + ("/") + (serv.memberCount) +
                    "\n\n\n**Nombre de salons** : " + (serv.channels.cache.size) +
                    "\n\n\n**Nombre de rôles** : " + (serv.roles.cache.size) +
                    "\n\n\n**Admin** : \n\n" +
                    (serv.members.cache.filter(memb => memb.hasPermission('ADMINISTRATOR')).filter(meb => !meb.user.bot).array().toLocaleString().replace(/,/g, "\n\n")) +
                    "\n\n\n**Date de création du serveur** : " + (serv.createdAt.toLocaleString('fr-FR')))
                .setThumbnail(serv.iconURL({ format: "png", dynamic: true }))
                .setFooter('u!serverinfo by mr_shoco','https://images-ext-2.discordapp.net/external/HsMb4ZEcrvMxwaG8Y3b43daCDj3jE2MkS99UgR_ywdc/https/cdn.discordapp.com/avatars/439129442972073984/017edd7317279c6c58f23363cb9f22ee.png')
            message.channel.send(si)
        }
    }
    

    //////////////////////////////////////////////////////


    if (message.content.startsWith(prefix + 'servpp')) {

        message.channel.send(message.guild.iconURL({ format: "png", dynamic: true }))

    }

    //////////////////////////////////////////////////////

    if (message.content.startsWith(prefix + 'pp')) {
        const user = message.mentions.users.first();
        if (user) return message.channel.send(user.avatarURL({ format: "png", dynamic: true }));
        if (!user) return message.channel.send(message.author.avatarURL({ format: "png", dynamic: true }));
    }


    //////////////////////////////////////////////////////



    if (message.content.startsWith(prefix + 'help')) {
        const help = new Discord.MessageEmbed()
            .setTitle('Liste des commandes de Heartless')
            .setColor('BLUE')
            .setDescription(
                `**➥ Help d'Heartless**

    ❔ **Voici la page d'aide d'Heartless, de nouvelles commandes pourraient être implémenté sur cette page.**
    
    👮 **Commandes de modération**

    h!ban : Permet de bannir un joueur. h!ban {@Joueur} {Raison}
    h!kick : Permet d'expulser un joueur. h!kick {@Joueur} {Raison}
    h!clear : Permet de supprimer des messages. h!clear {Nombre de messages à clear}
    h!admin kick : Permet de kick un utilisateur peu importe ses permissions. h!admin kick {user}
    h!admin ban : Permet de bannir un utilisateur peu importe ses permissions. h!admin ban {user}
    
    🔨  **Commandes Utiles**
    
    h!pp : Permet de voir la photo de profile d'un joueur. h!pp {@Joueur}
    h!servpp : Permet de voir la photo de profile du serveur. h!servpp
    h!botinfo : Montre les informations concernant Heartless. h!botinfo
    h!userinfo : Montre les informations concernant un utilisateur du serveur. h!ui {pseudo}
    h!suggestion: Envoie une suggestion au staff. h!suggestion {Votre suggestion}
    h!showdown : Donne les stats du compte showdown choisis. h!showdown {pseudo}
   
    
    🎮  **Commandes Minecraft**
    
    h!skin : Affiche le skin d'un joueur. h!skin {Joueur}
    h!head : Affiche la tête d'un joueur. h!head {Joueur}
    h!rinaorc : Permet d'avoir le profil rinaorc d'un joueur. h!rinaorc {pseudo}
    
    🎉  **Commandes fun** 
    
    h!say : Fait parler le bot. h!say {Votre message}
    h!succès : Créer un succès minecraft personnalisé. h!succès {Texte}
    h!embed : Créer un embed. h!embed {Message}
    h!hug : Fait un calin à quelqu'un. h!hug {@Joueur} 
    h!slap : Fait une grosse claque sa mère à quelqu'un. h!slap {@Connard}


    `)
    .setFooter(`Heartless by Moraru Nashi`, "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
        message.channel.send(help)
    }


    /////////////////////////////////////////////////////////////

    if (message.content.startsWith(prefix + 'dé')) {

        var min = 1;
        var max = 7;
        var random = Math.floor(Math.random() * (max - min)) + min;

        message.channel.send(`Le lancé de dé a donné ${random} :game_die:`)
    }

    ////////////////////////////////////////////////////////////////
    if (message.content.startsWith(prefix + 'botinfo') || message.content.startsWith(prefix + 'bi')) {
        console.log(message.author.tag + " ->  botinfo")

        const botinfo = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('Heartless by mr_shoco & Moraru_Nashi')
            .setDescription(
                `**Heartless** est un bot créé le **05/01/2020**
            Il est basé sur **la modération, le fun et l'utilitaire.**
            Les fonctionnalités vont des **commandes basiques (kick ; ban)** 
            aux commandes donnant accès aux **skin minecraft des joueurs du monde entier et bien plus.**
            
            Le bot est et sera toujours en développement, il sera toujours amélioré, aura des nouvelles
            fonctionnalités.

            Pour add mon bot a votre serveur, veuillez utiliser ce lien => 
            https://discordapp.com/api/oauth2/authorize?client_id=663090502081445918&permissions=8&scope=bot

            Pour toute demandes en rapport avec le développement ou juste en rapport avec le bot, vous pouvez
            venir poser vos questions ici : https://discord.gg/FuaZtpj

            Merci de votre implication dans le développement de mon projet Heartless.
            :D
        `)
            .setFooter("botinfo by Moraru Nashi", "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
            .setThumbnail('https://images-ext-2.discordapp.net/external/EwaG2SuSfOixdpHSEns9i0_xH3_1VBF1AKvtwz5Pthk/https/cdn.discordapp.com/avatars/663090502081445918/a290d88cdafa63da777e967674afc80a.png')
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
    ////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////



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
                        .setImage(`${user.avatarURL}`)
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
            .setTitle('Voici le serveur à la base du bot Heartless')
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

    if (message.content.startsWith(prefix + 'heartless') || message.content.startsWith(prefix + 'Heartless')) {
        message.channel.send(`Salut ${message.author.username} :) pense à faire h!help pour connaitre l'entièreté des commandes disponibles :)`)
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
        const target = client.channels.cache.get('731587275221368962');
        let args = message.content.split(' ').slice(1)
        const suggestion = args.join(' ');

        if (!suggestion) return message.reply('veuillez ajouter un argument.')
        else
            message.channel.send('Votre suggestion a bien été envoyée, merci de votre participation pour l\'avenir de Heartless :thumbsup:')
        target.send(`Suggestion de ${message.author} : ${suggestion}`)

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



    if (message.content.startsWith(prefix + 'hug')) {
        const user = message.mentions.users.first();
        const args = message.content.split(' ').slice(1);
        const say = args.join(' ');
        var calin = ['https://33.media.tumblr.com/680b69563aceba3df48b4483d007bce3/tumblr_mxre7hEX4h1sc1kfto1_500.gif'];
        

        const random = (Math.floor(Math.random() * 1))
    
        if (user) {

            const hug = new Discord.MessageEmbed()
                .setDescription(`${message.author} fait un calin à ${user}`)
                .setImage('https://33.media.tumblr.com/680b69563aceba3df48b4483d007bce3/tumblr_mxre7hEX4h1sc1kfto1_500.gif')
                .setColor('BLUE')
            message.channel.send(hug)
        }
        else {

            if (say) {
                const hug = new Discord.MessageEmbed()
                    .setDescription(`${message.author} fait un calin à ${say}`)
                    .setImage('https://33.media.tumblr.com/680b69563aceba3df48b4483d007bce3/tumblr_mxre7hEX4h1sc1kfto1_500.gif')
                    .setColor('BLUE')
                message.channel.send(hug)
            }

            else {

                if ((!user) || (!say)){
                    
                     const hug = new Discord.MessageEmbed()
                        .setDescription(`${message.author} fait un calin à Heartless`)
                        .setImage('https://33.media.tumblr.com/680b69563aceba3df48b4483d007bce3/tumblr_mxre7hEX4h1sc1kfto1_500.gif')
                        .setColor('BLUE')
                    message.channel.send(hug)
                    }
                }
            }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (message.content.startsWith(prefix + 'slap')) {
        const user = message.mentions.users.first();
        const args = message.content.split(' ').slice(1);
        const say = args.join(' ');

        if (user) {

            const hug = new Discord.MessageEmbed()
                .setDescription(`${message.author} frappe violemment  ${user}`)
                .setImage('https://cdn.discordapp.com/attachments/580508395803508749/749774313892347914/yoshi.gif')
                .setColor('BLUE')
            message.channel.send(hug)
        }
        else {

            if (say) {
                const hug = new Discord.MessageEmbed()
                    .setDescription(`${message.author} frappe violemment  ${say}`)
                    .setImage('https://cdn.discordapp.com/attachments/580508395803508749/749774313892347914/yoshi.gif')
                    .setColor('BLUE')
                    message.channel.send(hug)

            }

            else {

                if ((!user) || (!say)) {
                    const hug = new Discord.MessageEmbed()
                        .setDescription(`${message.author} frappe violemment Heartless`)
                        .setImage('https://cdn.discordapp.com/attachments/580508395803508749/749774313892347914/yoshi.gif')
                        .setColor('BLUE')
                    message.channel.send(hug)
                }

            }
        }
    }

    if(message.content.startsWith(prefix + 'showdown')){
        let args = message.content.split(' ').slice(1);
        let say = args.join(' ');

        let embed = new Discord.MessageEmbed()
        .setTitle(`Voici le profil showdown de ${say}`)
        .setColor('BLUE')
        .setURL(`https://pokemonshowdown.com/users/${say}`)
        .setFooter(`Heartless by Moraru Nashi`, "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
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

     let embed = new Discord.MessageEmbed()
        .setTitle(`Stats de ${args}`)
        .setDescription(`
        
            ➥ **Stats de ${args}**
        
           📆\`Dernière connexion: Il y'a ${value.lastconnection}\`
           👥\`Première connexion: ${value.firsthour}\`
           ⭐\`Grade: ${value.badge}\`
           🕐\`Temps de jeu: ${value.time}\``)
           .setThumbnail(`https://mc-heads.net/body/${args}/100`)
           .setFooter(`Heartless by Moraru Nashi`, "https://images-ext-2.discordapp.net/external/SFQ5ptg4l-PlS2LKuydPHCZ96c7zR_w6OQhzAurSHBM/https/cdn.discordapp.com/avatars/344452433327554563/737410c13e9312eb1e38c5af65ebe807.png")
           message.channel.send(embed)
        }).catch(err => {
        message.reply("Le pseudo n'existe pas.");
        console.error(err);
    
    })
}
    




});


client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.get('672141962324869120');

    if (!channel) { return }

    

    channel.send(`:partying_face: **Bienvenue sur le serveur ${member.user.username} ! Nous sommes maintenant ${member.guild.memberCount}** :partying_face:`);


});


client.on('guildMemberRemove', member => {

    const channel = member.guild.channels.cache.get('672494723164012583');

    if (!channel) { return }

    channel.send(`**:wave: Au revoir ${member.user.username} ! Nous sommes maintenant ${member.guild.memberCount} :wave:**`);


});

client.on('guildCreate', guild => {

    let target = client.channels.cache.get('641712943771156556');

   target.send(`
        Heartless a été ajouté sur ${guild.name}
        Guild Owner : ${guild.owner}
        Guild Owner ID : ${guild.owner.id}
        Membres : ${guild.memberCount}
        

    `)


});

