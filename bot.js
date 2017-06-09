var fs = require('fs');
var redis = require('redis');
var http = require('http');
var https = require('https');
var request = require("request");
var Redisclient = redis.createClient();
var Discord = require('discord.js');
const client = new Discord.Client();
var osu = new(require("./osu_utils.js"));
const util = require('util');
const config = JSON.parse(fs.readFileSync('config.json'));

client.login(config.DiscordToken);

client.on("ready", () => {
  console.log("Discord Bot runned!");
});

var Discordchannel = null;
client.on("message", (message) => {
	if(Discordchannel != null) return;
  if (message.content.startsWith("!start")) {
    Discordchannel = message.channel;
    message.delete();
    return;
  }
});


Redisclient.on("message", function(channel, message) {
	console.log("got score");
	if(Discordchannel == null) return;
	Score = JSON.parse(message);
	console.log(Score);
	const embed = new Discord.RichEmbed()
  	.setAuthor(Score.user.username, "https://a.gatari.pw/"+Score.user.userID)
  	.setColor(0x00AE86)
  	.setDescription(util.format("__New score! **%spp** __\n",Score.score.pp)
  	+ util.format("▸ osu! • #%s • %spp\n",Score.user.rank,Score.user.pp)
	+ util.format("▸ %s • %s • %s% • %s\n",osu.getFc(Score.score.combo,Score.beatmap.max_combo,Score.score.missess), "{ranking}" ,(Score.score.accuracy * 100).toFixed(2),osu.getScoreMods(Score.score.mods))
	+ util.format("[%s](https://osu.gatari.pw/b/%s)",Score.beatmap.song_name,Score.beatmap.beatmapID))
  .setThumbnail(util.format("https://b.ppy.sh/thumb/%s.jpg",Score.beatmap.beatmapID))
  Discordchannel.send({embed});
});



Redisclient.on('connect', function() {
    console.log('Redis client connected!');
    
});

Redisclient.subscribe("scores:new_score");

