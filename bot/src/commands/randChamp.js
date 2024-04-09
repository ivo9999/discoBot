
function handlerancChamps(interaction) {

  let topLaneChampions = [
    "Aatrox", "Camille", "Darius", "Fiora", "Gangplank",
    "Garen", "Illaoi", "Irelia", "Jayce", "Kennen",
    "Malphite", "Maokai", "Mordekaiser", "Nasus", "Ornn",
    "Poppy", "Quinn", "Renekton", "Riven", "Sett",
    "Shen", "Sion", "Teemo", "Tryndamere", "Urgot",
    "Vladimir", "Wukong", "Yorick"
  ];


  let jungleChampions = [
    "Amumu", "Elise", "Evelynn", "Fiddlesticks", "Graves",
    "Hecarim", "Ivern", "Jarvan IV", "Kha'Zix", "Lee Sin",
    "Lillia", "Master Yi", "Nunu & Willump", "Olaf", "Rammus",
    "Rek'Sai", "Sejuani", "Shaco", "Skarner", "Udyr",
    "Vi", "Volibear", "Warwick", "Xin Zhao", "Zac"
  ];

  let midLaneChampions = [
    "Ahri", "Akali", "Anivia", "Annie", "Aurelion Sol",
    "Azir", "Cassiopeia", "Diana", "Ekko", "Fizz",
    "Galio", "Heimerdinger", "Kassadin", "Katarina", "LeBlanc",
    "Lissandra", "Lux", "Malzahar", "Neeko", "Orianna",
    "Qiyana", "Ryze", "Sylas", "Syndra", "Talon",
    "Twisted Fate", "Veigar", "Viktor", "Yasuo", "Zed",
    "Zoe"
  ];

  let adcChampions = [
    "Aphelios", "Ashe", "Caitlyn", "Draven", "Ezreal",
    "Jhin", "Jinx", "Kai'Sa", "Kalista", "Kog'Maw",
    "Lucian", "Miss Fortune", "Samira", "Sivir", "Tristana",
    "Twitch", "Varus", "Vayne", "Xayah", "Yasuo"
  ];

  let supportChampions = [
    "Alistar", "Bard", "Blitzcrank", "Braum", "Janna",
    "Karma", "Leona", "Lulu", "Morgana", "Nami",
    "Nautilus", "Pyke", "Rakan", "Senna", "Seraphine",
    "Sona", "Soraka", "Taric", "Thresh", "Yuumi",
    "Zilean"
  ];


  shuffleArray(topLaneChampions);
  shuffleArray(jungleChampions);
  shuffleArray(midLaneChampions);
  shuffleArray(adcChampions);
  shuffleArray(supportChampions);
  let out = ''

  out += topLaneChampions[1] + ' - ' + topLaneChampions[0] + '\n'
  out += jungleChampions[1] + ' - ' + jungleChampions[0] + '\n'
  out += midLaneChampions[1] + ' - ' + midLaneChampions[0] + '\n'
  out += adcChampions[1] + ' - ' + adcChampions[0] + '\n'
  out += supportChampions[1] + ' - ' + supportChampions[0]
  return interaction.reply(out);
}


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];

    array[i] = array[j];

    array[j] = temp;
  }
}

module.exports = {
  handlerancChamps,
};
