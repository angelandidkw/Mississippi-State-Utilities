const { TextChannel } = require('discord.js');
const fs = require('fs/promises');
const path = require('path');

const configPath = path.join(__dirname, '..', 'data', 'config.json');

const getConfig = async () => {
  try {
    const data = await fs.readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Using default config due to error:', error.message);
    return { welcomeChannelId: "1330566637874577468" };
  }
};

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    try {
      const config = await getConfig();
      const channel = member.guild.channels.cache.get(config.welcomeChannelId);
      
      if (!(channel instanceof TextChannel)) {
        console.error('Welcome channel not found or invalid');
        return;
      }

      const welcomeMessage = `👋 Welcome, ${member}, to **Mississippi State Roleplay**! We now have **${member.guild.memberCount}** members.`;
      await channel.send(welcomeMessage);
      console.log(`Welcomed ${member.user.tag}`);
    } catch (error) {
      console.error('Error handling guildMemberAdd:', error);
    }
  },
};