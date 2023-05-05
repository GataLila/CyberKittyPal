// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const fs = require('fs');
const path = require('node:path'); 
require("dotenv").config(); //to start process from .env file
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
// Log in to Discord with your client's token
// client.login logs the bot in and sets it up for use. You'll enter your token here.
client.login(process.env.TOKEN);
