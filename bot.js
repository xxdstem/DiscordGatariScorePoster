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
var alert_threshold = {0: 300, 1:400, 2:450, 3: 520};
modeColors = {0:0x00AE86,1:0xABA900,2:0xAB0075,3:0x0089AB};

Redisclient.on("message", function(channel, message) {
	console.log("got score");
	if(Discordchannel == null) return;
	Score = JSON.parse(message);
	if(alert_threshold[Score.gm] > Score.score.pp) return;
	var gainedPP = Score.user.pp - Score.user.oldpp;
	gainedPP = (gainedPP != 0 ? "("+(gainedPP > 0 ? "+" : "")+gainedPP+"pp)" : "");
	var gainedAcc = (Score.user.accuracy * 100 - Score.user.oldaccuracy * 100).toFixed(2);
	const embed = new Discord.RichEmbed()
  	.setAuthor(Score.user.username, "https://a.gatari.pw/"+Score.user.userID,"https://osu.gatari.pw/u/"+Score.user.userID)
  	.setColor(modeColors[Score.gm])
  	.setDescription(util.format("__New score! **%spp** %s #%s__\n",Score.score.pp, gainedPP,Score.score.rank)
  	+ util.format("▸ %s • #%s • %spp • %s%\n",osu.getGameModeText(Score.gm),Score.user.rank,Score.user.pp,Score.user.accuracy.toFixed(2))
	+ util.format("▸ %s • %s • %s% • %s\n",osu.getFc(Score.score.combo,Score.beatmap.max_combo,Score.score.missess), Score.score.ranking ,(Score.score.accuracy * 100).toFixed(2),osu.getScoreMods(Score.score.mods))
	+ util.format("[%s](https://osu.gatari.pw/b/%s)",Score.beatmap.song_name,Score.beatmap.beatmapID))
  .setThumbnail(util.format("https://b.ppy.sh/thumb/%s.jpg",Score.beatmap.beatmapSetID))
  Discordchannel.send({embed});
});



Redisclient.on('connect', function() {
    console.log('Redis client connected!');
    
});

Redisclient.subscribe("scores:new_score");

