const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}!`);

    // Set the bot's status
    client.user.setPresence({
      activities: [{
        name: 'Mississippi State RP',
        type: ActivityType.Playing
      }],
      status: 'online'
    });

    // Rotate status every 30 seconds
    setInterval(() => {
      const activities = [
        {
          name: `with ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} members`,
          type: ActivityType.Playing
        },
        {
          name: 'Mississippi State RP',
          type: ActivityType.Playing
        }
      ];

      const activity = activities[Math.floor(Math.random() * activities.length)];
      client.user.setActivity(activity);
    }, 30000);
  },
};