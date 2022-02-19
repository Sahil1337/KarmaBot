<<<<<<< Updated upstream:Commands/Info/help.js
const Discord = require('discord.js');



module.exports = {
	help: {
		name: 'help',
		aliases: ['h', 'cmds', 'commands'],
		description: 'Shows all the commands.',
		category: __dirname.split('Commands\\')[1],
	},
	run: async (client, message, args) => {
		const embed = new Discord.MessageEmbed()
			.setColor(config.embedColor)
			.setAuthor(`${message.guild.me.displayName}`, message.guild.iconURL())
			.setThumbnail(client.user.displayAvatarURL());

		const categories = [];
		const commands = client.commands;

		if (!args[0]) {
			let markedNSFW = false;
			commands.forEach((command) => {
				if (!categories.includes(command.help.category)) {
					if (
						config.devs !== message.author.id &&
						command.help.category === 'Owner'
					) {
						return;
					}
					if (!message.channel.nsfw && command.help.category === 'Nsfw') {
						if (!markedNSFW) {
							markedNSFW = true;
							embed.addField(
								`${emotes.nsfw} NSFW [3] -`,
								'This category can only be used in an NSFW channel.',
							);
						}
					} else {
						categories.push(command.help.category);
					}
				}
			});

			categories.forEach((emote) => {
				const cmds = commands.filter((c) => c.help.category === emote);
				embed.setDescription(
					`**Karma's prefix is \`${config.prefix}\`\n\nFor help related to a particular command use: \n\`${config.prefix}help [command name] Or ${config.prefix}help [alias]\`**`,
				);
				embed.addField(
					`${emotes[emote.toLowerCase().replace(/[^a-z0-9]/g, '')]} ${emote} [${
						cmds.size
					}] -`,
					cmds.map((c) => `\`${c.help.name}\``).join(' '),
				);
			});
			embed.setImage(
				'https://i.imgur.com/8u3bG6H.png',
			);
			embed.setTimestamp();

			return message.reply({ embeds: [embed] });
		} else {
			let command =
				client.commands.get(args[0].toLowerCase()) ||
				client.commands.get(client.aliases.get(args[0].toLowerCase()));
			if (!command) {
				embed
					.setTitle('**Invalid Command!**')
					.setDescription(
						`**Do \`${config.prefix}help\` For the List Of the Commands!**`,
					);
				return message.reply({ embeds: [embed] });
			}
			command = command.help;
			embed.setDescription(`
			**Karma Prefix Is \`${config.prefix}\`**\n
            ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
            ** Description -** ${command.description || 'No Description provided.'}\n
            ** Needed Permissions -** ${command.accessableby || 'everyone can use this command!'}\n
            ** Aliases -** ${command.aliases ? command.aliases.join(', ') : 'None.'}`);
			embed.setFooter(message.guild.name, message.guild.iconURL());
			return message.reply({ embeds: [embed] });
		}
	},
};
=======
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
    help: {
        name: 'help',
        aliases: ['help'],
        description: 'Shows all the commands.',
        category: __dirname.split("Commands\\")[1]
    },
    run: async (client, message, args) => {

        const embed = new MessageEmbed()
            .setColor(config.embedcolor)
            .setAuthor(`${message.guild.me.displayName}`, message.guild.iconURL())
            .setThumbnail(client.user.displayAvatarURL());

        if (!args[0]) {

            let commandCategories = [];

            let markedNSFW = false;
            client.commands.forEach(c => {
                if (!commandCategories.includes(c.help.category)) {
                    if (config.devs !== message.author.id && c.help.category === ('Owner')) return;
                    if (!message.channel.nsfw && c.help.category === 'Nsfw') {
                        if (!markedNSFW) {
                            markedNSFW = true;
                            embed.addField(`${emotes.nsfw} NSFW [3] -`, 'This section can only be used in an NSFW channel.');
                        }
                    }
                    else commandCategories.push(c.help.category);
                };
            })

            commandCategories.forEach(emote => {
                let cmds = client.commands.filter(c => c.help.category === (emote));
                embed.setDescription(`**Karma's Prefix Is \`${config.prefix}\`\n\nFor Help Related To A Particular Command Type -\n\`${config.prefix}help [command name] Or ${config.prefix}help [alias]\`**`)
                embed.addField(`${emotes[toID(emote)]} ${emote}  [${cmds.size}] -`, cmds.map(c => `\`${c.help.name}\``).join(" "));
            });
            embed.setImage('https://cdn.discordapp.com/attachments/770248422992248862/780032317909237760/unknown.png');
            embed.setTimestamp();

            return message.channel.send(embed);
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase() || args[0].toLowerCase()));
            if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
            command = command.help

            embed.setDescription(stripIndents`**Karma Prefix Is \`${config.prefix}\`**\n
            ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
            ** Description -** ${command.description || "No Description provided."}\n
            ** Needed Permissions -** ${command.accessableby || "everyone can use this command!"}\n
            ** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
            embed.setFooter(message.guild.name, message.guild.iconURL())

            return message.channel.send(embed)
        }
    }
}
>>>>>>> Stashed changes:old/Commands/Info/help.js
