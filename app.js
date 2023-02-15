require("dotenv").config();
const { Client, Events, GatewayIntentBits, Intents } = require("discord.js");

// Create a new client instance

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    // Intents.FLAGS.GUILD_MESSAGES,
  ],
}); // In discord.js, the Client class represents a Discord bot. When you create a new instance of Client, you're essentially creating a new bot that you can customize and control programmatically.

//Just like a user account, a Client instance has its own properties and methods that you can use to interact with Discord's servers and the users on them. You can use the Client instance to log in to Discord's API using your bot's token, receive and respond to user events, send messages to channels, and perform a wide variety of other tasks.

//One key difference between a Client instance and a user account is that a Client instance doesn't have a password or login credentials. Instead, you authenticate your bot by providing a token, which you can generate through the Discord developer portal. This token is used to identify your bot to Discord's servers and grant it access to the API features you've requested, such as the ability to send messages or manage server roles.

//this is like specifying what all tools your bot requires to perform those functions
// For example, your bot could use this information to send a welcome message to new members, or to track the number of members in a server. The GatewayIntentBits.Guilds intent gives your bot access to the basic information about a server that it needs to perform these types of functions
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
const PREFIX = "$";
client.once(Events.ClientReady, (c) => {
  console.log(
    `Ready! Logged in as ${c.user.id} and it was created at ${c.user.createdAt}`
  );
});
// --------------------------------------------------------------------------------

// member details

// ------------------------------------

client.on("messageCreate", async (msg) => {
  if (msg.content.startsWith(PREFIX)) {
    const [command, ...arg] = msg.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);
    if (command === "kick") {
      if (arg.length === 0) {
        msg.channel.send("Please provide a user ID to kick.");
      }
      //    else {
      //     const guild = client.guilds.cache.get("927557636130480182");
      //     if (!guild) {
      //       msg.channel.send(
      //         "Invalid guild ID. Please provide a valid guild ID."
      //       );
      //       return;
      //     }
      const member = await msg.guild?.members.fetch(arg[0]).catch(() => null);
      console.log(member);

      if (!member) {
        msg.channel.send(
          "Invalid member ID. Please provide a valid member ID."
        );
        return;
      }
      member
        .kick()
        .then(() => {
          msg.channel.send(
            `The user ${member.user.tag} has been kicked by ${msg.author.tag}.`
          );
        })
        .catch((error) => {
          console.error(error);
          msg.channel.send(`Failed to kick the user. Error: ${error.message}`);
        });
    }
  }
});

// ---------------------------------------------------------------------------------

//By using client.once(Events.ClientReady), you can ensure that your
//initialization code will only be executed once the bot has successfully logged
//in and is ready to receive events. This is important because some operations,
//such as sending messages to a channel or accessing user information, can only
//be performed once the bot is fully connected to the server.

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN);
