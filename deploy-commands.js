const dotenv = require("dotenv");
dotenv.config();

const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, token } = process.env;

const commands = [
  new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies with a hello world!"),

  new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with the server info"),

  new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with the user info"),

  new SlashCommandBuilder()
    .setName("inspire")
    .setDescription("Replies with a random quote from zenquotes.io"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully deployed commands!"))
  .catch(console.error);
