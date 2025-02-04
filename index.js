const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs/promises'); // Change to fs/promises
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Load events and commands
async function loadFiles() {
  try {
    // Load events
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = await fs.readdir(eventsPath);
    for (const file of eventFiles) {
      const event = require(path.join(eventsPath, file));
      client.on(event.name, (...args) => event.execute(...args));
      console.log(`Loaded event: ${event.name}`);
    }

    // Load commands
    client.commands = new Map();
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = await fs.readdir(commandsPath);
    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file));
      client.commands.set(command.name, command);
      console.log(`Loaded command: ${command.name}`);
    }
  } catch (error) {
    console.error('Error loading files:', error);
  }
}

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('?') || message.author.bot) return;

  const args = message.content.slice(1).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('There was an error executing that command.');
  }
});

// Load files and then login
loadFiles().then(() => {
  client.login(process.env.DISCORD_TOKEN);
});