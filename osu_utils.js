
Osu.prototype.getRank = function ( mods, acc, c300, c100, c50, cmiss) {
	var total = c300+c100+c50+cmiss;

	var hdfl = (mods & (Hidden | Flashlight | FadeIn)) > 0;

	var ss = hdfl ? "xh" : "x";
	var s = hdfl ? "sh" : "x";


			var ratio300 = c300 / total;
			var ratio50 = c50 / total;

			if (ratio300 == 1)
				return ss;

			if (ratio300 > 0.9 && ratio50 <= 0.01 && cmiss == 0)
				return s;

			if ((ratio300 > 0.8 && cmiss == 0) || (ratio300 > 0.9))
				return "a";

			if ((ratio300 > 0.7 && cmiss == 0) || (ratio300 > 0.8))
				return "b";

			if (ratio300 > 0.6)
				return "c";

			return "d";
}

Osu.prototype.getFc = function(combo, maxCombo, misses){
	var TotalCombo = combo+"/"+maxCombo;
	if(misses == 0){
		if(combo+12 < maxCombo) return TotalCombo+" SB"; else return "FC";
	}else{
		if (misses < 10)
			return  TotalCombo+" "+misses+"xMiss";  
		else return TotalCombo;
	}
}


Osu.prototype.getScoreMods = function(m) {
	var r = '';
	var hasNightcore = false, hasPF = false;
	if (m & NoFail) {
		r += 'NF';
	}
	if (m & Easy) {
		r += 'EZ';
	}
	if (m & NoVideo) {
		r += 'NV';
	}
	if (m & Hidden) {
		r += 'HD';
	}
	if (m & HardRock) {
		r += 'HR';
	}
	if (m & Nightcore) {
		r += 'NC';
		hasNightcore = true;
	}
	if (!hasNightcore && (m & DoubleTime)) {
		r += 'DT';
	}
    if (m & Perfect) {
		r += 'PF';
        hasPF = true;
	}
	if (m & Relax) {
		r += 'RX';
	}
	if (m & HalfTime) {
		r += 'HT';
	}
	if (m & Flashlight) {
		r += 'FL';
	}
	if (m & Autoplay) {
		r += 'AP';
	}
	if (m & SpunOut) {
		r += 'SO';
	}
	if (m & Relax2) {
		r += 'AP';
	}
	if (!hasPF && (m & SuddenDeath)) {
		r += 'SD';
	}
	if (m & Key4) {
		r += '4K';
	}
	if (m & Key5) {
		r += '5K';
	}
	if (m & Key6) {
		r += '6K';
	}
	if (m & Key7) {
		r += '7K';
	}
	if (m & Key8) {
		r += '8K';
	}
	if (m & keyMod) {
		r += '';
	}
	if (m & FadeIn) {
		r += 'FD';
	}
	if (m & Random) {
		r += 'RD';
	}
	if (m & LastMod) {
		r += 'CN';
	}
	if (m & Key9) {
		r += '9K';
	}
	if (m & Key10) {
		r += '10K';
	}
	if (m & Key1) {
		r += '1K';
	}
	if (m & Key3) {
		r += '3K';
	}
	if (m & Key2) {
		r += '2K';
	}
    if (m & SCOREV2) {
		r += 'V2';
	}
	if (r.length > 0) {
		return r;
	} else {
		return 'NOMOD';
	}
}

var None = 0;
var NoFail = 1;
var Easy = 2;
var NoVideo = 4;
var Hidden = 8;
var HardRock = 16;
var SuddenDeath = 32;
var DoubleTime = 64;
var Relax = 128;
var HalfTime = 256;
var Nightcore = 512;
var Flashlight = 1024;
var Autoplay = 2048;
var SpunOut = 4096;
var Relax2 = 8192;
var Perfect = 16384;
var Key4 = 32768;
var Key5 = 65536;
var Key6 = 131072;
var Key7 = 262144;
var Key8 = 524288;
var keyMod = 1015808;
var FadeIn = 1048576;
var Random = 2097152;
var LastMod = 4194304;
var Key9 = 16777216;
var Key10 = 33554432;
var Key1 = 67108864;
var Key3 = 134217728;
var Key2 = 268435456;
var SCOREV2 = 536870912;

function Osu(){
	return true;
}

module.exports = Osu;