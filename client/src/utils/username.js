const adjectives = [
  "Trippy", "Groovy", "Neon", "Electric", "Cosmic", "Vibey", "Plurfect", "Raving", "Blissful", "Bassline"
];

const nouns = [
  "Sunflower", "Llama", "Moonbeam", "Unicorn", "Alien", "Firefly", "Sparkle", "Beat", "Dolphin", "Jelly"
];

function getRandomUsername(forceNew = false) {
  const saved = localStorage.getItem("plur-username");
  if (saved && !forceNew) return saved;

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 100);
  const username = `${adj}${noun}${num}`;

  return username;
}

export default getRandomUsername;
