const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();

// Require the neccesary discord.js classes
const { Client, Intents } = require("discord.js");
const token = process.env.token;

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only runs once)
client.once("ready", () => {
  console.log("Ready!");
});

// Get quote from zenquotes.io
const getQuote = () => {
  return fetch("https://zenquotes.io/api/random")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data[0]["q"] + " - " + data[0]["a"];
    });
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "inspire") {
    getQuote().then((quote) => msg.channel.send(quote));
  }
});

// Basic commands to test the bot (hello, server, user)
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "hello") {
    await interaction.reply("Hello world!");
  } else if (commandName === "server") {
    await interaction.reply(`Server name: ${interaction.guild.name}\n
      Total Members: ${interaction.guild.memberCount}`);
  } else if (commandName === "user") {
    await interaction.reply(
      `User tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
    );
  }
});

//Login to Discord with the token
client.login(token);
