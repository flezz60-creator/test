const MAX_ATTEMPTS = 6;
const STORAGE_KEYS = {
  settings: "codequest-settings",
  stats: "codequest-stats",
  daily: (day) => `codequest-daily-${day}`,
};

const DEFAULT_SETTINGS = {
  codeType: "word",
  length: 5,
  allowDuplicates: true,
  hardMode: false,
  highContrast: false,
};

const CODE_RULES = {
  word: {
    name: "Wörter",
    lengths: [5],
    allowDuplicateOption: false,
  },
  digits: {
    name: "Zahlen",
    lengths: [4, 5, 6],
    allowDuplicateOption: true,
  },
  emoji: {
    name: "Emoji",
    lengths: [4, 5],
    allowDuplicateOption: true,
  },
};

const EMOJI_POOL = [
  "😀",
  "😂",
  "😉",
  "😍",
  "🤖",
  "🤩",
  "🧠",
  "🦄",
  "🎉",
  "🎧",
  "🎯",
  "🏆",
  "🌈",
  "🌟",
  "🍀",
  "🍕",
  "⚡",
  "🔥",
  "❄️",
  "💎",
  "🚀",
  "🛸",
  "🧩",
  "🥳",
];

const WORD_LIST = [
  "about",
  "actor",
  "acute",
  "adept",
  "admit",
  "adobe",
  "adopt",
  "adore",
  "adult",
  "after",
  "again",
  "agent",
  "agile",
  "agony",
  "agree",
  "ahead",
  "aisle",
  "alarm",
  "album",
  "alert",
  "alike",
  "alive",
  "allow",
  "alpha",
  "alter",
  "amber",
  "amuse",
  "angel",
  "anger",
  "angle",
  "angry",
  "ankle",
  "apple",
  "apply",
  "apron",
  "argue",
  "arise",
  "armed",
  "arrow",
  "aside",
  "asset",
  "audio",
  "audit",
  "aural",
  "avail",
  "awake",
  "award",
  "aware",
  "awful",
  "badge",
  "baker",
  "basil",
  "basic",
  "batch",
  "beach",
  "beard",
  "beast",
  "begin",
  "being",
  "belly",
  "below",
  "bench",
  "berry",
  "birth",
  "black",
  "blade",
  "blame",
  "blank",
  "blaze",
  "bleed",
  "bless",
  "blind",
  "block",
  "blood",
  "bloom",
  "board",
  "boast",
  "bonus",
  "booth",
  "boost",
  "bound",
  "brain",
  "brand",
  "brass",
  "brave",
  "bread",
  "break",
  "brick",
  "bride",
  "brief",
  "bring",
  "brisk",
  "broad",
  "brood",
  "brown",
  "brush",
  "build",
  "bunch",
  "burst",
  "cabin",
  "cable",
  "cache",
  "cadet",
  "camel",
  "cameo",
  "canal",
  "candy",
  "canoe",
  "canon",
  "cargo",
  "carve",
  "catch",
  "cause",
  "cedar",
  "chain",
  "chair",
  "chalk",
  "charm",
  "chart",
  "chase",
  "cheat",
  "check",
  "cheer",
  "chess",
  "chest",
  "chief",
  "child",
  "chili",
  "china",
  "choir",
  "chord",
  "chore",
  "chuck",
  "cider",
  "civic",
  "claim",
  "class",
  "clean",
  "clear",
  "clerk",
  "click",
  "cliff",
  "climb",
  "clock",
  "close",
  "cloud",
  "coach",
  "coast",
  "coral",
  "corgi",
  "could",
  "count",
  "court",
  "craft",
  "crane",
  "crash",
  "crazy",
  "cream",
  "creek",
  "crest",
  "crisp",
  "cross",
  "crowd",
  "crown",
  "crush",
  "crypt",
  "curry",
  "curve",
  "cycle",
  "daily",
  "dairy",
  "dance",
  "datum",
  "dealt",
  "debut",
  "decay",
  "decor",
  "delay",
  "delta",
  "demon",
  "dense",
  "diary",
  "digit",
  "diner",
  "dingo",
  "dirty",
  "dodge",
  "donut",
  "doubt",
  "dozen",
  "draft",
  "drain",
  "drake",
  "drama",
  "drawn",
  "dream",
  "dress",
  "drift",
  "drink",
  "drive",
  "droid",
  "drown",
  "druid",
  "eager",
  "eagle",
  "early",
  "earth",
  "ebony",
  "edict",
  "eight",
  "elbow",
  "elder",
  "elect",
  "elite",
  "elope",
  "ember",
  "emote",
  "empty",
  "enact",
  "endow",
  "enjoy",
  "ensue",
  "enter",
  "envoy",
  "equal",
  "equip",
  "erase",
  "ether",
  "ethic",
  "evade",
  "event",
  "every",
  "exact",
  "exalt",
  "excel",
  "exile",
  "exist",
  "expel",
  "extra",
  "fable",
  "facet",
  "fairy",
  "faith",
  "false",
  "fancy",
  "farce",
  "fatal",
  "favor",
  "feast",
  "fence",
  "ferry",
  "fever",
  "fiber",
  "field",
  "fiery",
  "fifth",
  "fifty",
  "fight",
  "final",
  "finch",
  "flair",
  "flame",
  "flask",
  "fleet",
  "flesh",
  "flick",
  "fling",
  "float",
  "flood",
  "floor",
  "flour",
  "flute",
  "focus",
  "folly",
  "force",
  "forge",
  "forum",
  "found",
  "frame",
  "fresh",
  "fried",
  "frost",
  "fruit",
  "gauge",
  "gavel",
  "gazer",
  "gears",
  "geeky",
  "genie",
  "genre",
  "ghost",
  "giant",
  "giddy",
  "gifts",
  "glade",
  "gland",
  "glare",
  "glass",
  "glide",
  "gloom",
  "glory",
  "glove",
  "gnome",
  "grace",
  "grade",
  "grain",
  "grand",
  "grant",
  "grape",
  "graph",
  "grasp",
  "grass",
  "grave",
  "great",
  "greed",
  "green",
  "greet",
  "grill",
  "grind",
  "groan",
  "groom",
  "group",
  "grove",
  "guard",
  "guess",
  "guide",
  "guild",
  "guilt",
  "habit",
  "haiku",
  "hairy",
  "hands",
  "happy",
  "hardy",
  "hasty",
  "hatch",
  "haunt",
  "haven",
  "hazel",
  "heart",
  "heath",
  "heavy",
  "hedge",
  "heist",
  "hello",
  "hence",
  "heron",
  "hilly",
  "hinge",
  "hobby",
  "honor",
  "honey",
  "horse",
  "hotel",
  "house",
  "hover",
  "human",
  "humid",
  "humor",
  "hurry",
  "hutch",
  "hydra",
  "ideal",
  "idiom",
  "idler",
  "image",
  "imply",
  "index",
  "inept",
  "infer",
  "ingot",
  "inner",
  "input",
  "irony",
  "issue",
  "ivory",
  "jelly",
  "jewel",
  "jolly",
  "judge",
  "juice",
  "jumbo",
  "jumpy",
  "junta",
  "karma",
  "kayak",
  "kebab",
  "khaki",
  "kiosk",
  "kitty",
  "knack",
  "kneel",
  "knife",
  "knock",
  "known",
  "koala",
  "label",
  "labor",
  "laces",
  "lance",
  "lanky",
  "laser",
  "later",
  "laugh",
  "layer",
  "leafy",
  "learn",
  "leash",
  "leave",
  "legal",
  "lemon",
  "level",
  "lever",
  "light",
  "lilac",
  "limit",
  "linen",
  "lithe",
  "liver",
  "livid",
  "lobby",
  "local",
  "logic",
  "loner",
  "loose",
  "loved",
  "lover",
  "lower",
  "loyal",
  "lucky",
  "lumen",
  "lunar",
  "lunch",
  "lyric",
  "magic",
  "maize",
  "major",
  "maker",
  "mango",
  "manor",
  "maple",
  "march",
  "marsh",
  "mason",
  "match",
  "medal",
  "media",
  "merit",
  "metal",
  "meter",
  "micro",
  "might",
  "miner",
  "minor",
  "minty",
  "mirth",
  "model",
  "modem",
  "moist",
  "money",
  "month",
  "moral",
  "motel",
  "motor",
  "mount",
  "mouse",
  "mover",
  "movie",
  "music",
  "musty",
  "nacho",
  "nadir",
  "nanny",
  "nasal",
  "nasty",
  "naval",
  "noble",
  "noise",
  "north",
  "novel",
  "nudge",
  "nurse",
  "oasis",
  "ocean",
  "octet",
  "odium",
  "offer",
  "often",
  "olden",
  "olive",
  "omega",
  "onion",
  "opera",
  "orbit",
  "order",
  "organ",
  "otter",
  "ounce",
  "outer",
  "overt",
  "owner",
  "oxide",
  "ozone",
  "paddy",
  "pagan",
  "paint",
  "panda",
  "panel",
  "panic",
  "paper",
  "pasta",
  "patch",
  "patio",
  "pause",
  "peach",
  "pearl",
  "pecan",
  "pedal",
  "peony",
  "perch",
  "phase",
  "phone",
  "photo",
  "piano",
  "picky",
  "piece",
  "piety",
  "pilot",
  "pinch",
  "piney",
  "pinky",
  "pique",
  "pitch",
  "pixel",
  "pizza",
  "place",
  "plaid",
  "plain",
  "plait",
  "plane",
  "plant",
  "plaza",
  "plead",
  "plush",
  "poems",
  "point",
  "poise",
  "polar",
  "polka",
  "pound",
  "power",
  "press",
  "price",
  "pride",
  "prime",
  "print",
  "prism",
  "privy",
  "prize",
  "probe",
  "prone",
  "proof",
  "proud",
  "prove",
  "proxy",
  "psalm",
  "punch",
  "pupil",
  "puppy",
  "purse",
  "queen",
  "query",
  "quest",
  "quick",
  "quiet",
  "quill",
  "quilt",
  "quirk",
  "quota",
  "quote",
  "radar",
  "radio",
  "rainy",
  "raise",
  "rally",
  "ranch",
  "range",
  "rapid",
  "ratio",
  "reach",
  "ready",
  "realm",
  "rebel",
  "refer",
  "relax",
  "renew",
  "reply",
  "retro",
  "rhyme",
  "rider",
  "ridge",
  "rifle",
  "right",
  "rigid",
  "rival",
  "river",
  "roast",
  "robin",
  "robot",
  "rocky",
  "rogue",
  "roomy",
  "rough",
  "round",
  "route",
  "rover",
  "royal",
  "rugby",
  "rumor",
  "rural",
  "rusty",
  "sable",
  "salsa",
  "salty",
  "sandy",
  "sassy",
  "satin",
  "sauce",
  "scale",
  "scarf",
  "scare",
  "scent",
  "scoop",
  "scope",
  "score",
  "scout",
  "scrap",
  "screw",
  "seize",
  "sense",
  "serum",
  "serve",
  "seven",
  "sewer",
  "shack",
  "shade",
  "shaft",
  "shake",
  "shall",
  "shame",
  "shape",
  "share",
  "shark",
  "sharp",
  "sheep",
  "sheer",
  "sheet",
  "shelf",
  "shell",
  "shift",
  "shine",
  "shiny",
  "shock",
  "shook",
  "shoot",
  "shore",
  "short",
  "shout",
  "shove",
  "shown",
  "shrub",
  "shrug",
  "sight",
  "sigma",
  "silky",
  "silly",
  "since",
  "siren",
  "skate",
  "skill",
  "skirt",
  "skull",
  "slack",
  "slate",
  "slave",
  "sleek",
  "sleep",
  "slice",
  "slide",
  "slope",
  "smack",
  "small",
  "smart",
  "smile",
  "smoke",
  "snack",
  "snake",
  "sneak",
  "snoop",
  "sober",
  "solar",
  "solid",
  "solve",
  "sonic",
  "sound",
  "south",
  "space",
  "spade",
  "spare",
  "spark",
  "speak",
  "spear",
  "speck",
  "speed",
  "spell",
  "spice",
  "spicy",
  "spike",
  "spill",
  "spine",
  "spiny",
  "spire",
  "spite",
  "split",
  "spoil",
  "spoke",
  "spoon",
  "sport",
  "spout",
  "spray",
  "spree",
  "sprig",
  "spunk",
  "squad",
  "squid",
  "stack",
  "stage",
  "stain",
  "stair",
  "stake",
  "stale",
  "stalk",
  "stamp",
  "stand",
  "stare",
  "start",
  "state",
  "steam",
  "steel",
  "steep",
  "steer",
  "stern",
  "stick",
  "stiff",
  "still",
  "sting",
  "stink",
  "stock",
  "stomp",
  "stone",
  "stool",
  "store",
  "storm",
  "story",
  "stout",
  "stove",
  "strap",
  "straw",
  "strip",
  "stuck",
  "study",
  "stuff",
  "style",
  "sugar",
  "suite",
  "sunny",
  "super",
  "surge",
  "sushi",
  "swamp",
  "swear",
  "sweat",
  "sweep",
  "sweet",
  "swell",
  "swept",
  "swift",
  "swing",
  "sword",
  "table",
  "taffy",
  "taken",
  "tango",
  "taper",
  "taste",
  "teach",
  "tease",
  "tempo",
  "tenth",
  "thank",
  "theft",
  "their",
  "theme",
  "there",
  "thick",
  "thief",
  "thing",
  "think",
  "third",
  "thorn",
  "those",
  "three",
  "throb",
  "throw",
  "thumb",
  "tiara",
  "tiger",
  "tight",
  "timer",
  "tired",
  "toast",
  "today",
  "token",
  "tonal",
  "tonic",
  "tooth",
  "topic",
  "torch",
  "total",
  "toxic",
  "trace",
  "track",
  "trade",
  "trail",
  "train",
  "tramp",
  "trash",
  "treat",
  "trend",
  "triad",
  "trial",
  "tribe",
  "trick",
  "tried",
  "tripe",
  "trite",
  "troll",
  "troop",
  "trout",
  "truce",
  "truck",
  "truly",
  "trunk",
  "trust",
  "truth",
  "tulip",
  "tumor",
  "tuned",
  "tunic",
  "turbo",
  "twice",
  "twine",
  "twirl",
  "twist",
  "uncle",
  "under",
  "unite",
  "unity",
  "until",
  "upper",
  "urban",
  "usage",
  "usher",
  "vague",
  "valet",
  "valid",
  "valor",
  "value",
  "valve",
  "vapor",
  "vault",
  "vegan",
  "venom",
  "venue",
  "verse",
  "vivid",
  "vocal",
  "vodka",
  "voice",
  "voids",
  "vogue",
  "voter",
  "vouch",
  "vowel",
  "wacky",
  "wafer",
  "wager",
  "wagon",
  "waist",
  "waltz",
  "watch",
  "water",
  "weary",
  "weave",
  "wedge",
  "weigh",
  "whale",
  "wheat",
  "wheel",
  "where",
  "which",
  "whine",
  "whirl",
  "white",
  "whole",
  "whoop",
  "whose",
  "widow",
  "width",
  "wield",
  "wilds",
  "wince",
  "winch",
  "windy",
  "wiser",
  "witch",
  "witty",
  "woken",
  "woman",
  "wonky",
  "world",
  "worry",
  "wound",
  "woven",
  "wraps",
  "wreck",
  "wrist",
  "write",
  "wrong",
  "yacht",
  "yearn",
  "yeast",
  "yield",
  "young",
  "youth",
  "zebra",
  "zesty",
  "zonal",
];

const SEGMENTER =
  typeof Intl !== "undefined" && Intl.Segmenter
    ? new Intl.Segmenter("de", { granularity: "grapheme" })
    : null;

const KEYBOARD_LAYOUTS = {
  word: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
  ],
  digits: [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["BACK", "0", "ENTER"],
  ],
  emoji: [
    ["😀", "😂", "😉", "😍", "🤖", "🤩"],
    ["🧠", "🦄", "🎉", "🎧", "🎯", "🏆"],
    ["🌈", "🌟", "🍀", "🍕", "⚡", "🔥"],
    ["❄️", "💎", "🚀", "🛸", "🧩", "🥳"],
    ["BACK", "ENTER"],
  ],
};

const DAILY_CONFIG = {
  codeType: "word",
  length: 5,
  allowDuplicates: true,
  hardMode: false,
};

let settings = loadSettings();
let stats = loadStats();
let gameState = null;
let currentGuess = [];
let countdownInterval = null;

const boardEl = document.getElementById("board");
const keyboardEl = document.getElementById("keyboard");
const statusEl = document.getElementById("status-message");
const countdownEl = document.getElementById("countdown");
const countdownTimerEl = document.getElementById("countdown-timer");
const resultDialog = document.getElementById("result-dialog");
const resultTitleEl = document.getElementById("result-title");
const resultDetailsEl = document.getElementById("result-details");
const resultStatsEl = document.getElementById("result-stats");
const playAgainBtn = document.getElementById("play-again");
const shareResultBtn = document.getElementById("share-result");
const settingsDialog = document.getElementById("settings-dialog");
const settingsForm = document.getElementById("settings-form");
const modeButtons = document.querySelectorAll(".mode-button");
const toastEl = createToast();

const rowTemplate = document.getElementById("row-template");
const tileTemplate = document.getElementById("tile-template");

init();

function init() {
  applyHighContrast(settings.highContrast);
  setupSettingsForm();
  document.getElementById("open-settings").addEventListener("click", () => {
    openSettingsDialog();
  });
  settingsForm.addEventListener("submit", handleSettingsSubmit);
  settingsForm
    .querySelector('[data-action="close"]')
    .addEventListener("click", () => settingsDialog.close());

  modeButtons.forEach((btn) =>
    btn.addEventListener("click", () => setMode(btn.dataset.mode))
  );

  playAgainBtn.addEventListener("click", handlePlayAgain);
  shareResultBtn.addEventListener("click", shareResult);
  document.addEventListener("keydown", handleKeydown);
  keyboardEl.addEventListener("click", handleKeyboardClick);

  setMode("daily");
  startCountdown();
}

function setMode(mode) {
  if (gameState && gameState.mode === mode) return;
  modeButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.mode === mode)
  );
  if (mode === "daily") {
    startDailyGame();
    countdownEl.hidden = false;
  } else {
    startPracticeGame();
    countdownEl.hidden = true;
  }
}

function startDailyGame() {
  const today = formatDateKey(new Date());
  const secret = generateSecret(DAILY_CONFIG, seedFromDate(new Date()));
  const saved = loadDailyState(today);
  const attempts = saved?.attempts || [];
  const finishedAt = saved?.finishedAt;
  const won = saved?.won;

  gameState = {
    mode: "daily",
    secret,
    secretHash: simpleHash(secret),
    attempts,
    startedAt: saved?.startedAt || Date.now(),
    finishedAt,
    won,
    config: { ...DAILY_CONFIG },
  };
  currentGuess = [];
  buildBoard(DAILY_CONFIG.length);
  renderAttempts();
  buildKeyboard(DAILY_CONFIG.codeType);
  updateKeyboardClasses();
  updateStatus(won
    ? "Daily abgeschlossen – schau dir deine Statistik an!"
    : "Finde den Code des Tages.");
  if (won !== undefined) {
    lockBoard();
  }
}

function startPracticeGame() {
  const config = { ...settings };
  config.length = normalizeLength(config.codeType, config.length);
  if (config.codeType === "word") {
    config.allowDuplicates = true;
  }
  const secret = generateSecret(config, Math.floor(Math.random() * 1e9));
  gameState = {
    mode: "practice",
    secret,
    secretHash: simpleHash(secret),
    attempts: [],
    startedAt: Date.now(),
    finishedAt: undefined,
    won: undefined,
    config,
  };
  currentGuess = [];
  buildBoard(config.length);
  renderAttempts();
  buildKeyboard(config.codeType);
  updateKeyboardClasses();
  updateStatus("Practice: Trainiere so lange du möchtest.");
}

function buildBoard(length) {
  boardEl.innerHTML = "";
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const row = rowTemplate.content.firstElementChild.cloneNode(false);
    row.setAttribute("data-row", `${i}`);
    for (let j = 0; j < length; j++) {
      const tile = tileTemplate.content.firstElementChild.cloneNode(false);
      tile.setAttribute("data-col", `${j}`);
      row.appendChild(tile);
    }
    boardEl.appendChild(row);
  }
}

function renderAttempts() {
  if (!gameState) return;
  const { attempts, config } = gameState;
  attempts.forEach((attempt, rowIndex) => {
    const row = boardEl.querySelector(`.row[data-row="${rowIndex}"]`);
    Array.from(row.children).forEach((tile, colIndex) => {
      const tokens = toGraphemes(attempt.guess);
      tile.textContent = formatToken(tokens[colIndex], config.codeType);
      tile.classList.remove("filled");
      tile.classList.add(attempt.result[colIndex]);
      tile.classList.add("flip");
      tile.setAttribute("aria-label", describeResult(attempt.result[colIndex]));
    });
  });
}

function handleKeyboardClick(e) {
  const key = e.target.closest(".key");
  if (!key) return;
  const value = key.dataset.key;
  if (!value) return;
  handleInput(value);
}

function handleKeydown(e) {
  if (!gameState || (settingsDialog.open || resultDialog.open)) return;
  const type = gameState.config.codeType;
  if (e.key === "Enter") {
    e.preventDefault();
    handleInput("ENTER");
    return;
  }
  if (e.key === "Backspace") {
    e.preventDefault();
    handleInput("BACK");
    return;
  }
  if (type === "word") {
    if (/^[a-zA-ZäöüÄÖÜß]$/.test(e.key)) {
      handleInput(e.key.toUpperCase());
    }
  } else if (type === "digits") {
    if (/^[0-9]$/.test(e.key)) {
      handleInput(e.key);
    }
  }
}

function handleInput(key) {
  if (!gameState || gameState.finishedAt) return;
  const { config } = gameState;
  if (key === "ENTER") {
    submitGuess();
    return;
  }
  if (key === "BACK") {
    if (currentGuess.length > 0) {
      currentGuess.pop();
      updateCurrentRow();
    }
    return;
  }
  const tokens = toGraphemes(key);
  const token = tokens[0];
  if (config.codeType === "emoji" && token && !EMOJI_POOL.includes(token)) return;
  if (currentGuess.length >= config.length) return;
  currentGuess.push(token);
  updateCurrentRow();
}

function updateCurrentRow() {
  const rowIndex = gameState.attempts.length;
  const row = boardEl.querySelector(`.row[data-row="${rowIndex}"]`);
  if (!row) return;
  Array.from(row.children).forEach((tile, index) => {
    const token = currentGuess[index];
    tile.textContent = token ? formatToken(token, gameState.config.codeType) : "";
    tile.classList.toggle("filled", Boolean(token));
    tile.classList.remove("hit", "present", "miss", "flip");
    tile.setAttribute("aria-label", token ? `Zeichen ${token}` : "");
  });
}

function submitGuess() {
  const { config, secret, attempts } = gameState;
  if (currentGuess.length !== config.length) {
    showToast(`Es werden ${config.length} Zeichen benötigt.`);
    shakeRow(attempts.length);
    return;
  }
  const guessTokens = [...currentGuess];
  if (!validateGuess(guessTokens)) {
    shakeRow(attempts.length);
    return;
  }
  const secretTokens = toGraphemes(secret);
  const result = scoreGuess(guessTokens, secretTokens);
  const guessString = guessTokens.join("");

  const attempt = {
    guess: guessString,
    result,
    timestamp: Date.now(),
  };

  gameState.attempts.push(attempt);
  persistGameState();
  revealAttempt(attempt, attempts.length - 1);
  updateKeyboardClasses();

  if (result.every((r) => r === "hit")) {
    finishGame(true);
  } else if (gameState.attempts.length >= MAX_ATTEMPTS) {
    finishGame(false);
  } else {
    currentGuess = [];
    updateCurrentRow();
  }
}

function validateGuess(tokens) {
  const { config, attempts } = gameState;
  if (config.codeType === "word") {
    const word = tokens.join("").toLowerCase();
    if (!WORD_LIST.includes(word)) {
      showToast("Nicht in der Wörterliste.");
      return false;
    }
  }
  if ((config.codeType === "digits" || config.codeType === "emoji") && !config.allowDuplicates) {
    const seen = new Set(tokens);
    if (seen.size !== tokens.length) {
      showToast(
        config.codeType === "digits"
          ? "Keine doppelten Ziffern erlaubt."
          : "Keine doppelten Emoji erlaubt."
      );
      return false;
    }
  }
  if (config.hardMode) {
    const requirements = deriveHardModeRequirements(attempts);
    for (const [index, token] of requirements.fixed.entries()) {
      if (token && tokens[index] !== token) {
        showToast(`Position ${index + 1} muss ${formatToken(token, config.codeType)} sein.`);
        return false;
      }
    }
    for (const token of requirements.present) {
      if (!tokens.includes(token)) {
        showToast(`Enthaltene Zeichen müssen genutzt werden: ${formatToken(token, config.codeType)}`);
        return false;
      }
    }
  }
  return true;
}

function deriveHardModeRequirements(attempts) {
  const fixed = [];
  const present = new Set();
  attempts.forEach((attempt) => {
    const guessTokens = toGraphemes(attempt.guess);
    attempt.result.forEach((res, idx) => {
      if (res === "hit") {
        fixed[idx] = guessTokens[idx];
        present.delete(guessTokens[idx]);
      } else if (res === "present") {
        if (!fixed[idx]) {
          present.add(guessTokens[idx]);
        }
      }
    });
  });
  return { fixed, present };
}

function revealAttempt(attempt, rowIndex) {
  const row = boardEl.querySelector(`.row[data-row="${rowIndex}"]`);
  if (!row) return;
  const tokens = toGraphemes(attempt.guess);
  Array.from(row.children).forEach((tile, index) => {
    setTimeout(() => {
      tile.textContent = formatToken(tokens[index], gameState.config.codeType);
      tile.classList.remove("filled");
      tile.classList.add("flip");
      tile.addEventListener("animationend", () => tile.classList.remove("flip"), {
        once: true,
      });
      tile.classList.add(attempt.result[index]);
      tile.setAttribute("aria-label", describeResult(attempt.result[index]));
    }, index * 240);
  });
  currentGuess = [];
}

function updateKeyboardClasses() {
  const keyStatuses = new Map();
  for (const attempt of gameState.attempts) {
    const tokens = toGraphemes(attempt.guess);
    attempt.result.forEach((res, idx) => {
      const key = formatToken(tokens[idx], gameState.config.codeType);
      const existing = keyStatuses.get(key);
      if (res === "hit" || (res === "present" && existing !== "hit")) {
        keyStatuses.set(key, res);
      } else if (!existing) {
        keyStatuses.set(key, res);
      }
    });
  }
  keyboardEl.querySelectorAll(".key").forEach((keyBtn) => {
    const key = keyBtn.dataset.display;
    keyBtn.classList.remove("hit", "present", "miss");
    if (!keyStatuses.has(key)) return;
    const status = keyStatuses.get(key);
    keyBtn.classList.add(status);
  });
}

function finishGame(won) {
  gameState.finishedAt = Date.now();
  gameState.won = won;
  persistGameState();
  lockBoard();
  updateStatus(
    won
      ? "Geschafft! Du hast den Code geknackt."
      : `Leider verloren. Der Code war ${formatSecret(gameState.secret, gameState.config.codeType)}.`
  );
  if (gameState.mode === "daily") {
    updateDailyStats(won);
  }
  openResultDialog(won);
}

function lockBoard() {
  // Simply prevent input by clearing current guess row state
  currentGuess = [];
}

function openResultDialog(won) {
  const { attempts, config, startedAt, finishedAt, mode, secret } = gameState;
  const duration = finishedAt && startedAt ? Math.round((finishedAt - startedAt) / 1000) : null;
  resultTitleEl.textContent = won ? "🎉 Erfolg!" : "Versuch's morgen erneut";
  resultDetailsEl.textContent = won
    ? `Du hast den Code in ${attempts.length} Versuchen geknackt${duration ? ` (⏱️ ${formatDuration(duration)})` : ""}.`
    : `Der Code lautete ${formatSecret(secret, config.codeType)}.`;
  renderStatsOverview();
  playAgainBtn.textContent = mode === "practice" ? "Nochmal" : "Practice starten";
  shareResultBtn.hidden = mode !== "daily" && !won;
  if (!resultDialog.open) {
    resultDialog.showModal();
  }
}

function renderStatsOverview() {
  const statsHtml = [];
  statsHtml.push(
    `<div class="stat-grid">` +
      `<div class="stat-card"><div class="value">${stats.gamesPlayed}</div><div>Games</div></div>` +
      `<div class="stat-card"><div class="value">${stats.gamesWon}</div><div>Siege</div></div>` +
      `<div class="stat-card"><div class="value">${stats.currentStreak}</div><div>Streak</div></div>` +
      `<div class="stat-card"><div class="value">${stats.maxStreak}</div><div>Best</div></div>` +
      `</div>`
  );
  statsHtml.push("<div class=\"guess-distribution\"><h3>Verteilung</h3>");
  for (let i = 1; i <= MAX_ATTEMPTS; i++) {
    const value = stats.guessDistribution[i] || 0;
    const pct = stats.gamesWon ? Math.max(6, (value / stats.gamesWon) * 100) : 0;
    statsHtml.push(
      `<div class="bar"><span>${i}</span><span class="progress" style="width:${pct}%"></span><span>${value}</span></div>`
    );
  }
  statsHtml.push("</div>");
  resultStatsEl.innerHTML = statsHtml.join("");
}

function handlePlayAgain() {
  if (gameState.mode === "practice") {
    startPracticeGame();
  } else {
    settingsForm.querySelector("#setting-code-type").value = settings.codeType;
    setMode("practice");
  }
  resultDialog.close();
}

async function shareResult() {
  if (!gameState) return;
  const { attempts, mode, config, won } = gameState;
  const dayKey = formatDateKey(new Date());
  const header = mode === "daily" ? `CodeQuest Daily ${dayKey}` : `CodeQuest Practice`;
  const score = won ? `${attempts.length}/${MAX_ATTEMPTS}` : "X/" + MAX_ATTEMPTS;
  const missSymbol = document.body.classList.contains("high-contrast") ? "⬜" : "⬛";
  const grid = attempts
    .map((attempt) =>
      attempt.result
        .map((res) => (res === "hit" ? "🟩" : res === "present" ? "🟨" : missSymbol))
        .join("")
    )
    .join("\n");
  const footer = `${config.codeType.toUpperCase()} • Länge ${config.length}`;
  const shareText = `${header} ${score}\n${grid}\n${footer}`;
  try {
    await navigator.clipboard.writeText(shareText);
    showToast("Ergebnis kopiert!");
  } catch (err) {
    showToast("Kopieren fehlgeschlagen");
  }
}

function buildKeyboard(type) {
  keyboardEl.innerHTML = "";
  const layout = KEYBOARD_LAYOUTS[type];
  layout.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "keyboard-row";
    row.forEach((key) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "key";
      if (key === "ENTER" || key === "BACK") {
        button.dataset.key = key === "ENTER" ? "ENTER" : "BACK";
        button.dataset.display = key === "ENTER" ? "ENTER" : "BACK";
        button.textContent = key === "ENTER" ? "Enter" : "⌫";
      } else {
        const token = key;
        const display = formatToken(token, type);
        button.dataset.key = token;
        button.dataset.display = display;
        button.textContent = display;
      }
      rowEl.appendChild(button);
    });
    keyboardEl.appendChild(rowEl);
  });
}

function updateStatus(message) {
  statusEl.textContent = message;
}

function shakeRow(rowIndex) {
  const row = boardEl.querySelector(`.row[data-row="${rowIndex}"]`);
  if (!row) return;
  row.classList.add("shake");
  row.addEventListener(
    "animationend",
    () => {
      row.classList.remove("shake");
    },
    { once: true }
  );
}

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  const update = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    const diff = Math.max(0, tomorrow - now);
    const totalSeconds = Math.floor(diff / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    countdownTimerEl.textContent = `${hours}:${minutes}:${seconds}`;
    if (diff === 0) {
      startDailyGame();
    }
  };
  update();
  countdownInterval = setInterval(update, 1000);
}

function openSettingsDialog() {
  populateSettingsForm();
  if (!settingsDialog.open) {
    settingsDialog.showModal();
  }
}

function populateSettingsForm() {
  settingsForm.querySelector("#setting-code-type").value = settings.codeType;
  const lengthInput = settingsForm.querySelector("#setting-length");
  const lengthOptions = CODE_RULES[settings.codeType].lengths;
  lengthInput.value = normalizeLength(settings.codeType, settings.length);
  lengthInput.min = Math.min(...lengthOptions);
  lengthInput.max = Math.max(...lengthOptions);
  lengthInput.step = 1;
  lengthInput.disabled = lengthOptions.length === 1;
  const duplicatesWrapper = document.getElementById("setting-duplicates-wrapper");
  duplicatesWrapper.style.display = CODE_RULES[settings.codeType].allowDuplicateOption ? "grid" : "none";
  const duplicatesCheckbox = document.getElementById("setting-duplicates");
  duplicatesCheckbox.checked = settings.allowDuplicates;
  duplicatesCheckbox.disabled = settings.codeType !== "digits" && settings.codeType !== "emoji";
  document.getElementById("setting-hardmode").checked = settings.hardMode;
  document.getElementById("setting-contrast").checked = settings.highContrast;
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  const formData = new FormData(settingsForm);
  const formSettings = { ...settings };
  formSettings.codeType = formData.get("codeType");
  formSettings.length = Number(formData.get("length"));
  formSettings.allowDuplicates = Boolean(formData.get("allowDuplicates"));
  formSettings.hardMode = Boolean(formData.get("hardMode"));
  formSettings.highContrast = Boolean(formData.get("highContrast"));
  formSettings.length = normalizeLength(formSettings.codeType, formSettings.length);
  saveSettings(formSettings);
  settings = formSettings;
  applyHighContrast(settings.highContrast);
  settingsDialog.close();
  if (gameState.mode === "practice") {
    startPracticeGame();
  }
}

function setupSettingsForm() {
  settingsForm.querySelector("#setting-code-type").addEventListener("change", (event) => {
    const type = event.target.value;
    const lengthOptions = CODE_RULES[type].lengths;
    const lengthInput = settingsForm.querySelector("#setting-length");
    lengthInput.min = Math.min(...lengthOptions);
    lengthInput.max = Math.max(...lengthOptions);
    lengthInput.disabled = lengthOptions.length === 1;
    lengthInput.value = normalizeLength(type, settings.length);
    const duplicatesWrapper = document.getElementById("setting-duplicates-wrapper");
    duplicatesWrapper.style.display = CODE_RULES[type].allowDuplicateOption ? "grid" : "none";
  });
}

function normalizeLength(type, value) {
  const options = CODE_RULES[type].lengths;
  const min = Math.min(...options);
  const max = Math.max(...options);
  if (!options.includes(value)) {
    return options[0];
  }
  return Math.min(Math.max(value, min), max);
}

function generateSecret(config, seed) {
  const prng = mulberry32(seed);
  if (config.codeType === "word") {
    const word = WORD_LIST[Math.floor(prng() * WORD_LIST.length) % WORD_LIST.length];
    return word.toUpperCase();
  }
  if (config.codeType === "digits") {
    const digits = "0123456789".split("");
    const result = [];
    while (result.length < config.length) {
      const index = Math.floor(prng() * digits.length) % digits.length;
      const digit = digits[index];
      if (!config.allowDuplicates && result.includes(digit)) continue;
      result.push(digit);
    }
    return result.join("");
  }
  // emoji
  const pool = [...EMOJI_POOL];
  const result = [];
  while (result.length < config.length) {
    const index = Math.floor(prng() * pool.length) % pool.length;
    const token = pool[index];
    if (!config.allowDuplicates && result.includes(token)) continue;
    result.push(token);
  }
  return result.join("");
}

function toGraphemes(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.flatMap((entry) => toGraphemes(entry));
  }
  const str = String(value);
  if (SEGMENTER) {
    return Array.from(SEGMENTER.segment(str), (segment) => segment.segment);
  }
  return Array.from(str);
}

function scoreGuess(guessTokens, secretTokens) {
  const n = secretTokens.length;
  const res = Array(n).fill("miss");
  const counts = new Map();
  for (let i = 0; i < n; i++) {
    if (guessTokens[i] === secretTokens[i]) {
      res[i] = "hit";
    } else {
      const key = secretTokens[i];
      counts.set(key, (counts.get(key) || 0) + 1);
    }
  }
  for (let i = 0; i < n; i++) {
    if (res[i] === "hit") continue;
    const key = guessTokens[i];
    const count = counts.get(key) || 0;
    if (count > 0) {
      res[i] = "present";
      counts.set(key, count - 1);
    }
  }
  return res;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromDate(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return y * 10000 + m * 100 + d;
}

function simpleHash(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (err) {
    console.warn("Einstellungen konnten nicht geladen werden", err);
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(nextSettings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(nextSettings));
}

function loadStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.stats);
    if (!raw) {
      return {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        lastWinDate: null,
        guessDistribution: {},
      };
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Stats konnten nicht geladen werden", err);
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
      lastWinDate: null,
      guessDistribution: {},
    };
  }
}

function saveStats(nextStats) {
  localStorage.setItem(STORAGE_KEYS.stats, JSON.stringify(nextStats));
}

function updateDailyStats(won) {
  stats.gamesPlayed += 1;
  if (won) {
    stats.gamesWon += 1;
    const today = formatDateKey(new Date());
    const lastWin = stats.lastWinDate;
    if (!lastWin) {
      stats.currentStreak = 1;
    } else {
      const yesterday = formatDateKey(new Date(Date.now() - 86400000));
      if (lastWin === yesterday) {
        stats.currentStreak += 1;
      } else {
        stats.currentStreak = 1;
      }
    }
    stats.lastWinDate = today;
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
    stats.guessDistribution[gameState.attempts.length] =
      (stats.guessDistribution[gameState.attempts.length] || 0) + 1;
  } else {
    stats.currentStreak = 0;
  }
  saveStats(stats);
}

function loadDailyState(dayKey) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.daily(dayKey));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Daily State konnte nicht geladen werden", err);
    return null;
  }
}

function persistGameState() {
  if (!gameState) return;
  if (gameState.mode !== "daily") return;
  const dayKey = formatDateKey(new Date());
  const payload = {
    attempts: gameState.attempts,
    startedAt: gameState.startedAt,
    finishedAt: gameState.finishedAt,
    won: gameState.won,
  };
  localStorage.setItem(STORAGE_KEYS.daily(dayKey), JSON.stringify(payload));
}

function applyHighContrast(enabled) {
  document.body.classList.toggle("high-contrast", enabled);
}

function formatToken(token, type) {
  if (!token) return "";
  if (type === "word") return token.toUpperCase();
  return token;
}

function formatSecret(secret, type) {
  return toGraphemes(secret)
    .map((token) => formatToken(token, type))
    .join(" ");
}

function describeResult(result) {
  switch (result) {
    case "hit":
      return "Richtige Position";
    case "present":
      return "Enthalten";
    default:
      return "Nicht enthalten";
  }
}

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${String(secs).padStart(2, "0")}s`;
}

function createToast() {
  const toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);
  return toast;
}

let toastTimeout = null;
function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2000);
}

function shakeRowAnimation() {
  const style = document.createElement("style");
  style.textContent = `@keyframes shake {0% {transform: translateX(0);} 20% {transform: translateX(-6px);} 40% {transform: translateX(6px);} 60% {transform: translateX(-6px);} 80% {transform: translateX(6px);} 100% {transform: translateX(0);}} .shake {animation: shake 320ms ease;}`;
  document.head.appendChild(style);
}

shakeRowAnimation();
