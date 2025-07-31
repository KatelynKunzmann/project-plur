const adjectives = [
  "Trippy", "Groovy", "Neon", "Electric", "Cosmic",
  "Vibey", "Plurfect", "Raving", "Blissful", "Bassline",
  "Psychedelic", "ZonedOut", "Hypnotic", "Dreamy", "Glitched"
];

const nouns = [
  "Sunflower", "Llama", "Moonbeam", "Unicorn", "Alien",
  "Firefly", "Sparkle", "Beat", "Dolphin", "Jelly",
  "Phoenix", "Synth", "Glowstick", "Wave", "Pixie"
];

const vibes = [
  "🌀", "🎶", "🌈", "💫", "✨", "🔥", "🎧", "🎉", "🌟", "🍄"
];

function getRandomUsername(forceNew = false) {
  const saved = localStorage.getItem("plur-username");
  if (saved && !forceNew) return saved;

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const vibe = vibes[Math.floor(Math.random() * vibes.length)];
  const username = `${vibe}${adj}${noun}`;

  return username;
}

export default getRandomUsername;
