const { PermissionsBitField } = require('discord.js');
const developerIds = ['1181444328518856714']; // Replace with your ID

module.exports = {
  name: 'testwelcome',
  description: 'Test the welcome message',
  async execute(message) {
    // Permission check - allow if user is either admin OR developer
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && 
        !developerIds.includes(message.author.id)) {
      return message.reply('❌ You need Administrator permissions or Developer access to use this command.');
    }

    try {
      message.client.emit('guildMemberAdd', message.member);
      message.reply('✅ Welcome message tested!');
    } catch (error) {
      console.error('Test welcome error:', error);
      message.reply('❌ Failed to test welcome message.');
    }
  },
};