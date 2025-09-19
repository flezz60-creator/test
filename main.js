(() => {
  const rarityLabels = {
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
  };

  const rarityScore = {
    common: 0,
    uncommon: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
  };

  function estimateCardCost(item) {
    const rarityWeight = (rarityScore[item.rarity] ?? 0) * 0.9;
    const offense = item.damage * 1.35;
    const defense = item.health * 0.55;
    const base = (offense + defense) / 2.4 + rarityWeight + 0.6;
    return base;
  }

  const sets = [
    {
      id: "celestial",
      name: "Celestial Archives",
      description: "Die 13 Götterkarten, die das Firmament beschützen.",
      total: 13,
    },
    {
      id: "clockwork",
      name: "Clockwork Depths",
      description: "Unterwasser-Maschinen und vergessene Automata.",
      total: 10,
    },
    {
      id: "wildwood",
      name: "Wildwood Spirits",
      description: "Wilde Naturgeister aus einem neonfarbenen Wald.",
      total: 8,
    },
  ];

  const allItems = [
    // Celestial Archives
    { id: "aurora-scribe", name: "Aurora Scribe", rarity: "common", setId: "celestial", damage: 2, health: 3 },
    { id: "lumen-oracle", name: "Lumen Oracle", rarity: "common", setId: "celestial", damage: 1, health: 4 },
    { id: "starlit-vanguard", name: "Starlit Vanguard", rarity: "common", setId: "celestial", damage: 3, health: 4 },
    { id: "echo-wanderer", name: "Echo Wanderer", rarity: "common", setId: "celestial", damage: 2, health: 2 },
    { id: "astral-herald", name: "Astral Herald", rarity: "common", setId: "celestial", damage: 3, health: 3 },
    { id: "nebula-mender", name: "Nebula Mender", rarity: "uncommon", setId: "celestial", damage: 2, health: 5 },
    { id: "rift-cartographer", name: "Rift Cartographer", rarity: "uncommon", setId: "celestial", damage: 3, health: 5 },
    { id: "sunscale-sentinel", name: "Sunscale Sentinel", rarity: "uncommon", setId: "celestial", damage: 4, health: 5 },
    { id: "nova-chronicler", name: "Nova Chronicler", rarity: "rare", setId: "celestial", damage: 4, health: 6 },
    { id: "zenith-guardian", name: "Zenith Guardian", rarity: "rare", setId: "celestial", damage: 5, health: 7 },
    { id: "moonweaver-seraph", name: "Moonweaver Seraph", rarity: "epic", setId: "celestial", damage: 6, health: 8 },
    { id: "aether-crown", name: "Aether Crown", rarity: "legendary", setId: "celestial", damage: 4, health: 9 },
    {
      id: "ember-solstice-phoenix",
      name: "Ember Solstice Phoenix",
      rarity: "legendary",
      setId: "celestial",
      isLimited: true,
      damage: 8,
      health: 8,
    },
    // Clockwork Depths
    { id: "cogwhisper-sprite", name: "Cogwhisper Sprite", rarity: "common", setId: "clockwork", damage: 1, health: 3 },
    { id: "emberplated-scout", name: "Emberplated Scout", rarity: "common", setId: "clockwork", damage: 3, health: 3 },
    { id: "copper-harvester", name: "Copper Harvester", rarity: "common", setId: "clockwork", damage: 3, health: 4 },
    { id: "gearworn-scribe", name: "Gearworn Scribe", rarity: "common", setId: "clockwork", damage: 2, health: 3 },
    { id: "chronomancer-apprentice", name: "Chronomancer Apprentice", rarity: "uncommon", setId: "clockwork", damage: 3, health: 4 },
    { id: "steamwright-mediator", name: "Steamwright Mediator", rarity: "uncommon", setId: "clockwork", damage: 2, health: 5 },
    { id: "gilded-engine", name: "Gilded Engine", rarity: "rare", setId: "clockwork", damage: 4, health: 6 },
    { id: "void-chimes", name: "Void Chimes", rarity: "rare", setId: "clockwork", damage: 3, health: 7 },
    { id: "apex-colossus", name: "Apex Colossus", rarity: "epic", setId: "clockwork", damage: 7, health: 8 },
    { id: "heart-of-mechanis", name: "Heart of Mechanis", rarity: "legendary", setId: "clockwork", damage: 5, health: 10 },
    // Wildwood Spirits
    { id: "mossborn-keeper", name: "Mossborn Keeper", rarity: "common", setId: "wildwood", damage: 2, health: 5 },
    { id: "petal-warden", name: "Petal Warden", rarity: "common", setId: "wildwood", damage: 1, health: 4 },
    { id: "glimmer-fox", name: "Glimmer Fox", rarity: "common", setId: "wildwood", damage: 4, health: 2 },
    { id: "embercap-shaman", name: "Embercap Shaman", rarity: "uncommon", setId: "wildwood", damage: 4, health: 4 },
    { id: "thornborn-stalker", name: "Thornborn Stalker", rarity: "uncommon", setId: "wildwood", damage: 5, health: 3 },
    { id: "luminous-hart", name: "Luminous Hart", rarity: "rare", setId: "wildwood", damage: 4, health: 7 },
    { id: "spirit-of-canopy", name: "Spirit of the Canopy", rarity: "epic", setId: "wildwood", damage: 5, health: 8 },
    { id: "ancient-treant", name: "Ancient Treant", rarity: "legendary", setId: "wildwood", damage: 6, health: 10 },
  ];

  allItems.forEach((item) => {
    const estimated = estimateCardCost(item);
    item.cost = Math.max(1, Math.min(10, Math.round(estimated)));
  });

  const statIcons = {
    cost:
      '<svg class="card-stat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2 3 10.5 12 22l9-11.5z" fill="currentColor"/><path d="M12 5 6.4 10.5 12 18l5.6-7.5z" fill="currentColor" opacity="0.45"/></svg>',
    damage:
      '<svg class="card-stat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2l2.7 6.2 6.3 1.1-4.5 3.9 1.3 6.8L12 17.1 6.2 20l1.3-6.8L3 9.3l6.3-1.1z" fill="currentColor"/></svg>',
    health:
      '<svg class="card-stat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 21s-5.7-4-8.6-7.8C0.8 10.6 1.8 5 6.2 5c2.3 0 3.8 1.4 5.8 3.7C14 6.4 15.5 5 17.8 5c4.4 0 5.4 5.6 2.8 8.2C17.7 17 12 21 12 21z" fill="currentColor"/></svg>',
  };

  const cardIllustrations = new Map([
    ["aurora-scribe", { icon: "🖋️" }],
    ["lumen-oracle", { icon: "🔮" }],
    ["starlit-vanguard", { icon: "⚔️" }],
    ["echo-wanderer", { icon: "🌌" }],
    ["astral-herald", { icon: "📯" }],
    ["nebula-mender", { icon: "✨" }],
    ["rift-cartographer", { icon: "🗺️" }],
    ["sunscale-sentinel", { icon: "🌞", gradient: ["#ffd166", "#ff7b54"], accent: "#fff6d5" }],
    ["nova-chronicler", { icon: "📜" }],
    ["zenith-guardian", { icon: "🛡️" }],
    ["moonweaver-seraph", { icon: "🌙", gradient: ["#8b5cf6", "#22d3ee"], accent: "#f5f3ff" }],
    ["aether-crown", { icon: "👑" }],
    ["ember-solstice-phoenix", { icon: "🔥", gradient: ["#ff9f43", "#ff3366"], accent: "#fff4d6" }],
    ["cogwhisper-sprite", { icon: "⚙️" }],
    ["emberplated-scout", { icon: "🤖" }],
    ["copper-harvester", { icon: "⚒️" }],
    ["gearworn-scribe", { icon: "📘" }],
    ["chronomancer-apprentice", { icon: "⏳" }],
    ["steamwright-mediator", { icon: "🔧" }],
    ["gilded-engine", { icon: "🏭" }],
    ["void-chimes", { icon: "🔔" }],
    ["apex-colossus", { icon: "🗼" }],
    ["heart-of-mechanis", { icon: "💠", gradient: ["#ffbe6b", "#f97316"], accent: "#fff1d6" }],
    ["mossborn-keeper", { icon: "🪴" }],
    ["petal-warden", { icon: "🌸" }],
    ["glimmer-fox", { icon: "🦊" }],
    ["embercap-shaman", { icon: "🍄" }],
    ["thornborn-stalker", { icon: "🌿" }],
    ["luminous-hart", { icon: "🦌" }],
    ["spirit-of-canopy", { icon: "🌲" }],
    ["ancient-treant", { icon: "🌳", gradient: ["#34d399", "#166534"], accent: "#e9ffe8" }],
  ]);

  const defaultArtBySet = {
    celestial: {
      icon: "✨",
      motif: "orbit",
      accent: "#f7f3ff",
      secondary: "rgba(233, 225, 255, 0.45)",
      overlay: "rgba(18, 22, 44, 0.45)",
    },
    clockwork: {
      icon: "⚙️",
      motif: "mechanical",
      accent: "#ffe6c9",
      secondary: "rgba(255, 200, 160, 0.45)",
      overlay: "rgba(39, 22, 8, 0.45)",
    },
    wildwood: {
      icon: "🍃",
      motif: "flora",
      accent: "#e6ffe8",
      secondary: "rgba(176, 255, 210, 0.45)",
      overlay: "rgba(6, 32, 18, 0.4)",
    },
  };

  const setGradientBase = {
    celestial: 248,
    clockwork: 32,
    wildwood: 138,
  };

  const cardArtCache = new Map();

  const packDefinitions = [
    {
      id: "celestial-pack",
      name: "Celestial Echo Pack",
      setId: "celestial",
      description: "Standard-Booster für die himmlischen Karten.",
      cardsPerPack: 5,
      dropTable: [
        { rarity: "common", chance: 0.65 },
        { rarity: "uncommon", chance: 0.2 },
        { rarity: "rare", chance: 0.1 },
        { rarity: "epic", chance: 0.04 },
        { rarity: "legendary", chance: 0.01 },
      ],
    },
    {
      id: "clockwork-pack",
      name: "Clockwork Depth Pack",
      setId: "clockwork",
      description: "Mechanische Relikte aus den Tiefen der See.",
      cardsPerPack: 5,
      dropTable: [
        { rarity: "common", chance: 0.6 },
        { rarity: "uncommon", chance: 0.22 },
        { rarity: "rare", chance: 0.12 },
        { rarity: "epic", chance: 0.05 },
        { rarity: "legendary", chance: 0.01 },
      ],
    },
    {
      id: "wildwood-pack",
      name: "Wildwood Bloom Pack",
      setId: "wildwood",
      description: "Flirrende Naturgeister und Neon-Biome.",
      cardsPerPack: 5,
      dropTable: [
        { rarity: "common", chance: 0.6 },
        { rarity: "uncommon", chance: 0.24 },
        { rarity: "rare", chance: 0.1 },
        { rarity: "epic", chance: 0.05 },
        { rarity: "legendary", chance: 0.01 },
      ],
    },
    {
      id: "event-pack",
      name: "Ember Solstice Pack",
      setId: "celestial",
      description: "Event-Booster mit erhöhter Chance auf Event-Legendaries.",
      cardsPerPack: 5,
      dropTable: [
        { rarity: "common", chance: 0.55 },
        { rarity: "uncommon", chance: 0.2 },
        { rarity: "rare", chance: 0.15 },
        { rarity: "epic", chance: 0.07 },
        { rarity: "legendary", chance: 0.03 },
      ],
      isEvent: true,
      specialItemId: "ember-solstice-phoenix",
      specialChance: 0.15,
    },
  ];

  const storageKeys = {
    collection: "cfRareHunt_collection",
    login: "cfRareHunt_login",
    event: "cfRareHunt_event",
  };

  const duelConfig = {
    startingHealth: 30,
    startingHandSize: 3,
    maxCrystals: 10,
    deckSize: 20,
    logLimit: 40,
  };

  const duelDefaultNames = ["Sammler Nova", "Archivjäger Vega"];

  const duelState = {
    status: "idle",
    players: duelDefaultNames.map((name) => createIdlePlayerState(name)),
    activePlayer: 0,
    turnCounter: 0,
    log: [],
    winner: undefined,
  };

  const duelDeckPool = createDeckPool();

  const supportsStorage = (() => {
    try {
      const testKey = "cfRareHunt_test";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  })();

  const setsById = new Map(sets.map((set) => [set.id, set]));
  const itemsById = new Map(allItems.map((item) => [item.id, item]));
  const limitedEventItem = itemsById.get("ember-solstice-phoenix");

  let collectionState = loadCollection();
  let loginState = loadLoginState();
  const eventState = loadEventState();

  const dom = {};

  init();

  function init() {
    dom.packSelect = document.getElementById("pack-select");
    dom.packResults = document.getElementById("pack-results");
    dom.openPackBtn = document.getElementById("open-pack");
    dom.eventPackBtn = document.getElementById("event-pack-btn");
    dom.totalOwned = document.getElementById("total-owned");
    dom.uniqueOwned = document.getElementById("unique-owned");
    dom.completedSets = document.getElementById("completed-sets");
    dom.collectionGrid = document.getElementById("collection-grid");
    dom.tradeList = document.getElementById("trade-list");
    dom.dailyStreak = document.getElementById("daily-streak");
    dom.loginStatus = document.getElementById("login-status");
    dom.claimLogin = document.getElementById("claim-login");
    dom.nextMilestone = document.getElementById("next-milestone");
    dom.dailyReward = document.getElementById("daily-reward-display");
    dom.eventCountdown = document.getElementById("event-countdown");
    dom.eventItem = document.getElementById("event-item");
    dom.heroStreak = document.getElementById("hero-streak");
    dom.activeSetCount = document.getElementById("active-set-count");
    dom.legendaryHighlight = document.getElementById("legendary-highlight");
    dom.ctaOpenPack = document.getElementById("cta-open-pack");
    dom.ctaExplore = document.getElementById("cta-explore");
    dom.duelStart = document.getElementById("duel-start");
    dom.duelEndTurn = document.getElementById("duel-end-turn");
    dom.duelRound = document.getElementById("duel-round");
    dom.duelActive = document.getElementById("duel-active");
    dom.duelLog = document.getElementById("duel-log");

    populatePackSelect();
    renderSetCards();
    updateCollectionUI();
    updateDailyLoginUI();
    setupEventCountdown();
    updateHeroStats();
    handlePackSelection();
    setupMultiplayerArena();

    dom.openPackBtn.addEventListener("click", handlePackOpen);
    dom.packSelect.addEventListener("change", handlePackSelection);
    dom.claimLogin.addEventListener("click", claimDailyReward);
    dom.ctaOpenPack.addEventListener("click", () => scrollToSection("pack-lab"));
    dom.ctaExplore.addEventListener("click", () => scrollToSection("collection"));

    if (dom.eventPackBtn) {
      dom.eventPackBtn.addEventListener("click", () => {
        const eventPack = packDefinitions.find((pack) => pack.isEvent);
        if (!eventPack) {
          return;
        }
        dom.packSelect.value = eventPack.id;
        handlePackOpen();
      });
    }
  }

  function populatePackSelect() {
    dom.packSelect.innerHTML = "";
    packDefinitions.forEach((pack) => {
      const option = document.createElement("option");
      option.value = pack.id;
      option.textContent = pack.isEvent ? `🔥 ${pack.name}` : pack.name;
      dom.packSelect.append(option);
    });
  }

  function renderSetCards() {
    dom.collectionGrid.innerHTML = "";
    sets.forEach((set) => {
      const card = document.createElement("article");
      card.className = "set-card";
      card.dataset.setId = set.id;
      card.innerHTML = `
        <h3>${set.name}</h3>
        <p>${set.description}</p>
        <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${set.total}" aria-valuenow="0">
          <span style="width:0%"></span>
        </div>
        <footer>
          <span class="stat-label">Fortschritt</span>
          <strong class="progress-count">0 / ${set.total}</strong>
        </footer>
      `;
      dom.collectionGrid.append(card);
    });
  }

  function handlePackSelection() {
    const pack = packDefinitions.find((entry) => entry.id === dom.packSelect.value);
    if (!pack) {
      return;
    }
    const description = document.createElement("p");
    description.className = "pack-summary";
    description.textContent = pack.description;
    dom.packResults.innerHTML = "";
    dom.packResults.append(description);
  }

  function handlePackOpen() {
    const pack = packDefinitions.find((entry) => entry.id === dom.packSelect.value);
    if (!pack) {
      return;
    }

    const drops = rollPack(pack);
    drops.forEach((item) => addItemToCollection(item.id, 1));
    saveCollection();
    displayPackResults(pack, drops);
    updateCollectionUI();
    updateHeroStats();
  }

  function rollPack(pack) {
    const drops = [];
    const cardsPerPack = pack.cardsPerPack ?? 5;
    for (let i = 0; i < cardsPerPack; i += 1) {
      if (pack.specialItemId && Math.random() < (pack.specialChance ?? 0)) {
        const special = itemsById.get(pack.specialItemId);
        if (special) {
          drops.push(special);
          continue;
        }
      }
      const rarity = pickRarity(pack.dropTable);
      const pool = allItems.filter((item) => {
        if (item.setId !== pack.setId) {
          return false;
        }
        if (item.isLimited && !pack.isEvent) {
          return false;
        }
        return item.rarity === rarity;
      });
      const candidates = pool.length > 0 ? pool : allItems.filter((item) => item.setId === pack.setId);
      const item = candidates[Math.floor(Math.random() * candidates.length)];
      drops.push(item);
    }
    return drops;
  }

  function pickRarity(table) {
    const roll = Math.random();
    let cumulative = 0;
    for (const entry of table) {
      cumulative += entry.chance;
      if (roll <= cumulative) {
        return entry.rarity;
      }
    }
    return table[table.length - 1]?.rarity ?? "common";
  }

  function addItemToCollection(itemId, quantity) {
    const amount = quantity ?? 1;
    if (!collectionState.items) {
      collectionState.items = {};
    }
    collectionState.items[itemId] = (collectionState.items[itemId] ?? 0) + amount;
  }

  function displayPackResults(pack, drops) {
    dom.packResults.innerHTML = "";
    const summary = document.createElement("div");
    summary.className = "pack-summary";
    const rarityCounts = drops.reduce((acc, item) => {
      acc[item.rarity] = (acc[item.rarity] ?? 0) + 1;
      return acc;
    }, {});
    const summaryText = Object.entries(rarityCounts)
      .map(([rarity, count]) => `${count}× ${rarityLabels[rarity]}`)
      .join(" · ");
    summary.innerHTML = `<span>${pack.name}</span><strong>${summaryText}</strong>`;
    dom.packResults.append(summary);

    const grid = document.createElement("div");
    grid.className = "card-grid";
    drops.forEach((item) => {
      const card = createCardElement(item);
      grid.append(card);
    });
    dom.packResults.append(grid);
  }

  function createCardElement(item, options) {
    const card = document.createElement("article");
    card.className = `card rarity-${item.rarity}`;
    const rarityLabel = rarityLabels[item.rarity] ?? item.rarity;
    const set = setsById.get(item.setId);
    const quantity = options?.quantity ?? 0;
    const artUri = getCardArtUri(item);
    const artAlt = escapeXml(`Illustration von ${item.name}`);
    const limitedTag = item.isLimited ? '<span class="tag limited">Event Limited</span>' : "";
    const quantityTag = quantity > 1 ? `<span class="card-qty">×${quantity}</span>` : "";
    card.innerHTML = `
      <figure class="card-illustration">
        <img src="${artUri}" alt="${artAlt}" loading="lazy" />
      </figure>
      <div class="card-content">
        <div class="card-header">
          <span class="card-rarity">${rarityLabel}</span>
          ${quantityTag}
        </div>
        <strong>${item.name}</strong>
        <p class="card-set">${set ? set.name : ""}</p>
        <div class="card-stats" role="group" aria-label="Kartenwerte">
          <span class="card-stat card-stat--cost">${statIcons.cost}<span>${item.cost}</span></span>
          <span class="card-stat card-stat--damage">${statIcons.damage}<span>${item.damage}</span></span>
          <span class="card-stat card-stat--health">${statIcons.health}<span>${item.health}</span></span>
        </div>
        ${limitedTag ? `<div class="card-flags">${limitedTag}</div>` : ""}
      </div>
    `;
    return card;
  }

  function getCardArtUri(item) {
    const cached = cardArtCache.get(item.id);
    if (cached) {
      return cached;
    }
    const artConfig = cardIllustrations.get(item.id) ?? {};
    const fallbackDefaults = defaultArtBySet.celestial ?? {};
    const defaults = defaultArtBySet[item.setId] ?? fallbackDefaults;
    const icon = artConfig.icon ?? defaults.icon ?? "✨";
    const motif = artConfig.motif ?? defaults.motif ?? "orbit";
    const gradient = deriveGradient(item, artConfig);
    const accent = deriveAccent(item, artConfig);
    const secondary = deriveSecondary(item, artConfig);
    const overlay = deriveOverlay(item, artConfig);
    const svg = createCardArtSvg({ icon, gradient, accent, secondary, motif, overlay });
    const uri = svgToDataUri(svg);
    cardArtCache.set(item.id, uri);
    return uri;
  }

  function createCardArtSvg({ icon, gradient, accent, secondary, motif, overlay }) {
    const [start, end] = gradient;
    const motifShapes = renderMotif(motif, accent, secondary);
    const iconText = escapeXml(icon);
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${start}" />
            <stop offset="100%" stop-color="${end}" />
          </linearGradient>
        </defs>
        <rect fill="url(#bg)" width="160" height="200" rx="22" ry="22" />
        ${motifShapes}
        <rect x="18" y="154" width="124" height="30" rx="14" fill="${overlay}" />
        <text x="50%" y="58%" fill="${accent}" font-size="68" text-anchor="middle" dominant-baseline="middle" font-family="Space Grotesk, 'Segoe UI Symbol', 'Apple Color Emoji', sans-serif">${iconText}</text>
      </svg>
    `;
  }

  function renderMotif(motif, accent, secondary) {
    if (motif === "mechanical") {
      return `
        <g fill="${secondary}" opacity="0.6">
          <circle cx="46" cy="72" r="26" />
          <circle cx="120" cy="58" r="18" />
        </g>
        <g fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round" opacity="0.45">
          <circle cx="46" cy="72" r="14" />
          <path d="M32 138h100" />
          <path d="M96 46l28 12" />
          <path d="M102 88l24 28" />
        </g>
        <g fill="${accent}" opacity="0.45">
          <rect x="76" y="110" width="60" height="12" rx="6" transform="rotate(-8 106 116)" />
          <rect x="34" y="118" width="24" height="24" rx="6" />
        </g>
      `;
    }
    if (motif === "flora") {
      return `
        <g fill="${secondary}" opacity="0.5">
          <path d="M48 132c0-32 30-62 34-86 8 28 36 50 60 54-26 8-42 28-46 52-8-18-24-26-48-20z" />
        </g>
        <g fill="${accent}" opacity="0.55">
          <path d="M58 118c16-6 30-22 34-38 6 14 18 24 30 28-16 6-28 18-30 30-8-8-18-14-34-20z" />
          <circle cx="56" cy="68" r="10" />
          <circle cx="112" cy="72" r="6" />
        </g>
        <g fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" opacity="0.35">
          <path d="M46 152c14-10 44-20 70-12" />
        </g>
      `;
    }
    return `
      <g fill="none" stroke="${secondary}" stroke-width="3" opacity="0.45">
        <circle cx="80" cy="74" r="46" />
        <circle cx="80" cy="98" r="30" stroke-dasharray="12 8" />
        <path d="M20 60c28 18 92 18 120 0" stroke-linecap="round" />
      </g>
      <g fill="${accent}" opacity="0.55">
        <circle cx="126" cy="62" r="8" />
        <circle cx="42" cy="50" r="5" />
        <path d="M82 132c14 8 26 8 40 0" opacity="0.6" />
      </g>
    `;
  }

  function deriveGradient(item, artConfig) {
    if (artConfig.gradient) {
      return artConfig.gradient;
    }
    const baseHue = setGradientBase[item.setId] ?? 220;
    const hash = hashString(item.id);
    const rarityBoost = rarityScore[item.rarity] ?? 0;
    const hueOffset = (hash % 40) - 20;
    const hue1 = (baseHue + hueOffset + 360) % 360;
    const hue2 = (hue1 + 36 + (hash % 12)) % 360;
    const lightnessA = 58 + rarityBoost * 4;
    const lightnessB = 38 + rarityBoost * 3;
    return [`hsl(${hue1}deg, 82%, ${lightnessA}%)`, `hsl(${hue2}deg, 68%, ${lightnessB}%)`];
  }

  function deriveAccent(item, artConfig) {
    if (artConfig.accent) {
      return artConfig.accent;
    }
    const defaults = defaultArtBySet[item.setId];
    if (defaults?.accent) {
      return defaults.accent;
    }
    return "#f5f3ff";
  }

  function deriveSecondary(item, artConfig) {
    if (artConfig.secondary) {
      return artConfig.secondary;
    }
    const defaults = defaultArtBySet[item.setId];
    if (defaults?.secondary) {
      return defaults.secondary;
    }
    return "rgba(233, 225, 255, 0.45)";
  }

  function deriveOverlay(item, artConfig) {
    if (artConfig.overlay) {
      return artConfig.overlay;
    }
    const defaults = defaultArtBySet[item.setId];
    if (defaults?.overlay) {
      return defaults.overlay;
    }
    return "rgba(18, 22, 44, 0.45)";
  }

  function svgToDataUri(svg) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }

  function hashString(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function escapeXml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function updateCollectionUI() {
    const itemCounts = collectionState.items ?? {};
    const allOwned = Object.values(itemCounts).reduce((total, count) => total + count, 0);
    dom.totalOwned.textContent = allOwned;

    const uniqueOwned = Object.keys(itemCounts).filter((itemId) => itemCounts[itemId] > 0).length;
    dom.uniqueOwned.textContent = uniqueOwned;

    let completed = 0;
    let activeSets = 0;

    sets.forEach((set) => {
      const setCard = dom.collectionGrid.querySelector(`[data-set-id="${set.id}"]`);
      if (!setCard) {
        return;
      }
      const setItems = allItems.filter((item) => item.setId === set.id);
      const ownedUnique = setItems.filter((item) => itemCounts[item.id] > 0);
      const progress = ownedUnique.length / set.total;
      const bar = setCard.querySelector(".progress-bar span");
      const progressBar = setCard.querySelector(".progress-bar");
      const count = setCard.querySelector(".progress-count");
      if (bar) {
        bar.style.width = `${Math.floor(progress * 100)}%`;
      }
      if (count) {
        count.textContent = `${ownedUnique.length} / ${set.total}`;
      }
      if (progressBar) {
        progressBar.setAttribute("aria-valuenow", ownedUnique.length);
        progressBar.setAttribute("aria-valuetext", `${ownedUnique.length} von ${set.total}`);
      }
      setCard.classList.toggle("completed", ownedUnique.length >= set.total);
      if (ownedUnique.length > 0) {
        activeSets += 1;
      }
      if (ownedUnique.length >= set.total) {
        completed += 1;
      }
    });

    dom.completedSets.textContent = completed;
    dom.activeSetCount.textContent = activeSets;

    updateTradeHub(itemCounts);
  }

  function updateTradeHub(itemCounts) {
    dom.tradeList.innerHTML = "";
    const duplicates = Object.entries(itemCounts)
      .filter(([, count]) => count > 1)
      .map(([itemId, count]) => ({ item: itemsById.get(itemId), count }));
    if (duplicates.length === 0) {
      const note = document.createElement("li");
      note.textContent = "Noch keine Duplikate – öffne mehr Booster!";
      dom.tradeList.append(note);
      return;
    }

    const missingItems = allItems.filter((item) => !itemCounts[item.id]);
    duplicates.slice(0, 4).forEach(({ item, count }) => {
      if (!item) {
        return;
      }
      const li = document.createElement("li");
      const label = document.createElement("span");
      label.textContent = `${item.name} ×${count}`;
      li.append(label);
      const wanted = missingItems.find((missing) => missing.setId === item.setId);
      if (wanted) {
        const wantedLabel = document.createElement("span");
        wantedLabel.className = "wanted";
        wantedLabel.textContent = `suche ${wanted.name}`;
        li.append(wantedLabel);
      }
      dom.tradeList.append(li);
    });
  }

  function claimDailyReward() {
    if (!canClaimToday()) {
      return;
    }

    const today = new Date();
    const lastClaim = loginState.lastClaim ? new Date(loginState.lastClaim) : undefined;
    const isConsecutive = lastClaim ? isNextDay(lastClaim, today) : false;

    if (isConsecutive) {
      loginState.streak += 1;
    } else {
      loginState.streak = 1;
    }

    loginState.lastClaim = today.toISOString();

    const reward = grantDailyItem(loginState.streak);
    addItemToCollection(reward.id, 1);
    saveCollection();
    saveLoginState();

    showDailyReward(reward);
    updateCollectionUI();
    updateDailyLoginUI();
    updateHeroStats();
  }

  function canClaimToday() {
    if (!loginState.lastClaim) {
      return true;
    }
    const lastClaim = new Date(loginState.lastClaim);
    const today = new Date();
    return !isSameDay(lastClaim, today);
  }

  function grantDailyItem(streak) {
    let rewardRarity = "uncommon";
    if (streak % 14 === 0) {
      rewardRarity = "legendary";
    } else if (streak % 7 === 0) {
      rewardRarity = "epic";
    } else if (streak % 3 === 0) {
      rewardRarity = "rare";
    }

    const available = allItems.filter((item) => item.rarity === rewardRarity && !item.isLimited);
    const choice = available[Math.floor(Math.random() * available.length)] ?? allItems[Math.floor(Math.random() * allItems.length)];
    return choice;
  }

  function showDailyReward(item) {
    dom.dailyReward.innerHTML = "";
    const card = createCardElement(item);
    dom.dailyReward.append(card);
  }

  function updateDailyLoginUI() {
    dom.dailyStreak.textContent = loginState.streak;
    dom.heroStreak.textContent = loginState.streak;

    if (canClaimToday()) {
      dom.claimLogin.disabled = false;
      dom.loginStatus.textContent = "Bereit für deinen Bonus!";
      dom.dailyReward.innerHTML = "<p>Hole dir den Bonus, um deine Überraschung zu enthüllen.</p>";
    } else {
      dom.claimLogin.disabled = true;
      dom.loginStatus.textContent = "Schon abgeholt – komm morgen wieder.";
    }

    const nextMilestone = findNextMilestone(loginState.streak);
    dom.nextMilestone.textContent = nextMilestone;
  }

  function findNextMilestone(streak) {
    const upcoming = [7, 14, 21].find((value) => value > streak);
    if (!upcoming) {
      return "Streak-Legende! Halte deine Serie für weitere Überraschungen.";
    }
    const label = upcoming === 14 ? "Legendäre Auswahl" : upcoming === 7 ? "Epische Karte" : "Mysteriöser Bonus";
    return `Tag ${upcoming}: ${label}`;
  }

  function setupEventCountdown() {
    if (limitedEventItem) {
      dom.eventItem.textContent = limitedEventItem.name;
    }

    const target = eventState.endsAt;
    updateCountdown();
    setInterval(updateCountdown, 1000);

    function updateCountdown() {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const totalSeconds = Math.floor(diff / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      dom.eventCountdown.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
  }

  function updateHeroStats() {
    dom.heroStreak.textContent = loginState.streak;

    const itemCounts = collectionState.items ?? {};
    const ownedItems = Object.keys(itemCounts).filter((id) => itemCounts[id] > 0);
    const highest = ownedItems
      .map((id) => itemsById.get(id))
      .filter(Boolean)
      .sort((a, b) => rarityScore[b.rarity] - rarityScore[a.rarity])[0];
    const fallbackName = limitedEventItem?.name ?? "–";
    dom.legendaryHighlight.textContent = highest ? highest.name : fallbackName;
  }

  function setupMultiplayerArena() {
    const playerNodes = document.querySelectorAll("[data-duel-player]");
    dom.duelPlayers = Array.from(playerNodes).map((node) => ({
      root: node,
      name: node.querySelector(".duel-player-name"),
      status: node.querySelector(".duel-player-status"),
      health: node.querySelector(".duel-health-value"),
      guard: node.querySelector(".duel-guard-value"),
      deck: node.querySelector(".duel-deck-count"),
      handCount: node.querySelector(".duel-hand-count"),
      crystals: node.querySelector(".duel-crystals"),
      hand: node.querySelector("[data-duel-hand]"),
    }));

    if (dom.duelStart) {
      dom.duelStart.addEventListener("click", startDuel);
    }
    if (dom.duelEndTurn) {
      dom.duelEndTurn.addEventListener("click", endTurn);
    }
    if (dom.duelPlayers && dom.duelPlayers.length > 0) {
      dom.duelPlayers.forEach((entry, index) => {
        if (entry.hand) {
          entry.hand.addEventListener("click", (event) => handleHandClick(event, index));
        }
      });
    }

    renderDuel();
  }

  function createIdlePlayerState(name) {
    return {
      name,
      health: duelConfig.startingHealth,
      guard: 0,
      deck: [],
      hand: [],
      crystals: 0,
      maxCrystals: 0,
    };
  }

  function createPlayerState(name) {
    return {
      name,
      health: duelConfig.startingHealth,
      guard: 0,
      deck: buildDeck(),
      hand: [],
      crystals: 0,
      maxCrystals: 0,
    };
  }

  function buildDeck() {
    const shuffled = shuffle(duelDeckPool);
    return shuffled.slice(0, duelConfig.deckSize);
  }

  function createDeckPool() {
    const pool = [];
    allItems.forEach((item) => {
      const copies = item.rarity === "common" ? 3 : item.rarity === "uncommon" ? 2 : 1;
      for (let i = 0; i < copies; i += 1) {
        pool.push(item.id);
      }
    });
    return pool;
  }

  function shuffle(source) {
    const array = source.slice();
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startDuel() {
    duelState.status = "active";
    duelState.players = duelDefaultNames.map((name) => createPlayerState(name));
    duelState.activePlayer = 0;
    duelState.turnCounter = 0;
    duelState.winner = undefined;
    duelState.log = [];
    if (dom.duelLog) {
      dom.duelLog.innerHTML = "";
    }

    duelState.players.forEach((player, index) => {
      const initialDraws = duelConfig.startingHandSize + (index === 1 ? 1 : 0);
      for (let i = 0; i < initialDraws; i += 1) {
        drawCard(player);
      }
    });

    logDuel("Arena geöffnet – Decks wurden gemischt.");
    beginTurn();
  }

  function beginTurn() {
    if (duelState.status !== "active") {
      renderDuel();
      return;
    }

    duelState.turnCounter += 1;
    const player = duelState.players[duelState.activePlayer];
    if (!player) {
      renderDuel();
      return;
    }

    player.maxCrystals = Math.min(duelConfig.maxCrystals, player.maxCrystals + 1);
    player.crystals = player.maxCrystals;
    const drawn = drawCard(player);
    if (drawn) {
      logDuel(
        `${player.name} beginnt den Zug, zieht ${drawn.name} und verfügt über ${player.crystals}/${player.maxCrystals} Kristalle.`
      );
    } else {
      logDuel(`${player.name} beginnt den Zug, aber das Deck ist leer.`);
    }

    renderDuel();
  }

  function endTurn() {
    if (duelState.status !== "active") {
      return;
    }
    const player = duelState.players[duelState.activePlayer];
    if (player) {
      logDuel(`${player.name} beendet den Zug.`);
    }
    duelState.activePlayer = (duelState.activePlayer + 1) % duelState.players.length;
    beginTurn();
  }

  function handleHandClick(event, playerIndex) {
    const button = event.target.closest("button[data-card-index]");
    if (!button || button.disabled) {
      return;
    }
    const cardIndex = Number.parseInt(button.dataset.cardIndex ?? "", 10);
    if (Number.isNaN(cardIndex)) {
      return;
    }
    playCardFromHand(playerIndex, cardIndex);
  }

  function playCardFromHand(playerIndex, cardIndex) {
    if (duelState.status !== "active" || duelState.activePlayer !== playerIndex) {
      return;
    }

    const player = duelState.players[playerIndex];
    if (!player) {
      return;
    }

    const cardId = player.hand[cardIndex];
    const card = cardId ? itemsById.get(cardId) : undefined;
    if (!card || card.cost > player.crystals) {
      return;
    }

    player.crystals -= card.cost;
    player.hand.splice(cardIndex, 1);
    if (card.health > 0) {
      player.guard += card.health;
    }

    const summary = [`${player.name} spielt ${card.name} für ${card.cost} Kristalle.`];
    if (card.health > 0) {
      summary.push(`Barriere +${card.health}.`);
    }
    logDuel(summary.join(" "));

    const opponentIndex = (playerIndex + 1) % duelState.players.length;
    resolveDamage(card.damage, playerIndex, opponentIndex, card);
    renderDuel();
  }

  function resolveDamage(amount, attackerIndex, defenderIndex, card) {
    const attacker = duelState.players[attackerIndex];
    const defender = duelState.players[defenderIndex];
    if (!attacker || !defender) {
      return;
    }

    let remaining = amount;
    if (defender.guard > 0 && remaining > 0) {
      const absorbed = Math.min(defender.guard, remaining);
      defender.guard = Math.max(0, defender.guard - absorbed);
      remaining -= absorbed;
      if (absorbed > 0) {
        logDuel(`${defender.name}s Barriere absorbiert ${absorbed} Schaden.`);
      }
    }

    if (remaining > 0) {
      defender.health = Math.max(0, defender.health - remaining);
      logDuel(`${defender.name} erleidet ${remaining} Schaden durch ${card.name}.`);
    } else if (amount > 0) {
      logDuel(`${attacker.name}s Angriff wird vollständig geblockt.`);
    }

    if (defender.health <= 0) {
      duelState.status = "finished";
      duelState.winner = attackerIndex;
      logDuel(`${attacker.name} gewinnt die Arena!`);
    }
  }

  function drawCard(player) {
    if (!player || !player.deck || player.deck.length === 0) {
      return undefined;
    }
    const cardId = player.deck.pop();
    if (!cardId) {
      return undefined;
    }
    player.hand.push(cardId);
    return itemsById.get(cardId);
  }

  function renderDuel() {
    if (dom.duelPlayers && dom.duelPlayers.length > 0) {
      dom.duelPlayers.forEach((entry, index) => {
        const player = duelState.players[index] ?? createIdlePlayerState(duelDefaultNames[index] ?? `Sammler ${index + 1}`);
        if (entry.name) {
          entry.name.textContent = player.name;
        }
        if (entry.status) {
          entry.status.textContent = getPlayerStatusLabel(player, index);
        }
        if (entry.health) {
          entry.health.textContent = String(player.health);
        }
        if (entry.guard) {
          entry.guard.textContent = String(player.guard);
        }
        if (entry.deck) {
          entry.deck.textContent = String(player.deck ? player.deck.length : 0);
        }
        if (entry.handCount) {
          entry.handCount.textContent = String(player.hand ? player.hand.length : 0);
        }
        if (entry.root) {
          const isActive = duelState.status === "active" && duelState.activePlayer === index;
          const isWinner = duelState.status === "finished" && duelState.winner === index;
          const isDefeated = duelState.status === "finished" && duelState.winner != null && duelState.winner !== index;
          entry.root.classList.toggle("is-active", isActive);
          entry.root.classList.toggle("is-winner", isWinner);
          entry.root.classList.toggle("is-defeated", isDefeated);
        }
        renderCrystals(entry.crystals, player);
        renderPlayerHand(entry.hand, player, index);
      });
    }

    if (dom.duelRound) {
      if (duelState.turnCounter === 0) {
        dom.duelRound.textContent = "–";
      } else {
        const round = Math.max(1, Math.ceil(duelState.turnCounter / duelState.players.length));
        dom.duelRound.textContent = String(round);
      }
    }

    if (dom.duelActive) {
      if (duelState.status === "finished") {
        const winnerName =
          typeof duelState.winner === "number" ? duelState.players[duelState.winner]?.name : undefined;
        dom.duelActive.textContent = winnerName ? `${winnerName} (Sieg)` : "–";
      } else if (duelState.status === "active") {
        const current = duelState.players[duelState.activePlayer];
        dom.duelActive.textContent = current ? current.name : "–";
      } else {
        dom.duelActive.textContent = "–";
      }
    }

    if (dom.duelStart) {
      dom.duelStart.textContent = duelState.status === "idle" ? "Match starten" : "Neu starten";
    }
    if (dom.duelEndTurn) {
      dom.duelEndTurn.disabled = duelState.status !== "active";
    }

    renderDuelLog();
  }

  function getPlayerStatusLabel(player, index) {
    if (duelState.status === "finished") {
      return duelState.winner === index ? "Sieg" : "Besiegt";
    }
    if (duelState.status === "active") {
      return duelState.activePlayer === index ? "Am Zug" : "Wartet";
    }
    return "Bereit";
  }

  function renderCrystals(container, player) {
    if (!container) {
      return;
    }
    const totalSlots = duelConfig.maxCrystals;
    container.innerHTML = "";
    for (let i = 0; i < totalSlots; i += 1) {
      const crystal = document.createElement("span");
      crystal.className = "duel-crystal";
      if (player && i < player.maxCrystals) {
        crystal.classList.add("is-active");
      }
      if (player && i < player.crystals) {
        crystal.classList.add("is-filled");
      }
      container.append(crystal);
    }
    const available = player ? player.crystals : 0;
    const max = player ? player.maxCrystals : 0;
    container.setAttribute(
      "aria-label",
      `${available} von ${max} Lebensessenz-Kristallen verfügbar`
    );
  }

  function renderPlayerHand(container, player, playerIndex) {
    if (!container) {
      return;
    }
    container.innerHTML = "";
    const hand = player?.hand ?? [];
    if (hand.length === 0) {
      const placeholder = document.createElement("p");
      placeholder.className = "duel-hand-empty";
      if (duelState.status === "finished") {
        placeholder.textContent = "Match abgeschlossen.";
      } else if (duelState.status === "active" && duelState.activePlayer === playerIndex) {
        placeholder.textContent = "Keine Karten spielbar – ziehe nach oder beende den Zug.";
      } else {
        placeholder.textContent = "Noch keine Karten auf der Hand.";
      }
      container.append(placeholder);
      return;
    }

    hand.forEach((cardId, index) => {
      const item = itemsById.get(cardId);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "duel-card";
      button.dataset.playerIndex = String(playerIndex);
      button.dataset.cardIndex = String(index);
      button.setAttribute("role", "listitem");

      const playable =
        duelState.status === "active" &&
        duelState.activePlayer === playerIndex &&
        item &&
        item.cost <= player.crystals;
      if (!playable) {
        button.disabled = true;
      } else {
        button.classList.add("is-playable");
      }

      const cost = document.createElement("span");
      cost.className = "duel-card-cost";
      cost.textContent = item ? String(item.cost) : "?";

      const body = document.createElement("div");
      body.className = "duel-card-body";
      const title = document.createElement("strong");
      title.textContent = item ? item.name : "Unbekannt";
      const meta = document.createElement("span");
      meta.className = "duel-card-meta";
      if (item) {
        meta.textContent = `${item.damage} Schaden · ${item.health} Schild`;
        button.title = `${item.name} – Kosten ${item.cost}, ${item.damage} Schaden, ${item.health} Schild`;
      } else {
        meta.textContent = "Unbekannte Karte";
      }

      body.append(title, meta);
      button.append(cost, body);
      container.append(button);
    });
  }

  function logDuel(message) {
    duelState.log.push(message);
    if (duelState.log.length > duelConfig.logLimit) {
      duelState.log.splice(0, duelState.log.length - duelConfig.logLimit);
    }
    renderDuelLog();
  }

  function renderDuelLog() {
    if (!dom.duelLog) {
      return;
    }
    dom.duelLog.innerHTML = "";
    if (duelState.log.length === 0) {
      const entry = document.createElement("li");
      entry.className = "duel-log-empty";
      entry.textContent = "Noch keine Aktionen – starte ein Match!";
      dom.duelLog.append(entry);
      return;
    }
    duelState.log.forEach((message) => {
      const entry = document.createElement("li");
      entry.textContent = message;
      dom.duelLog.append(entry);
    });
    dom.duelLog.scrollTop = dom.duelLog.scrollHeight;
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  function loadCollection() {
    if (!supportsStorage) {
      return { items: {} };
    }
    try {
      const raw = window.localStorage.getItem(storageKeys.collection);
      if (!raw) {
        return { items: {} };
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return { items: {} };
      }
      if (!parsed.items || typeof parsed.items !== "object") {
        parsed.items = {};
      }
      return parsed;
    } catch (error) {
      return { items: {} };
    }
  }

  function saveCollection() {
    if (!supportsStorage) {
      return;
    }
    window.localStorage.setItem(storageKeys.collection, JSON.stringify(collectionState));
  }

  function loadLoginState() {
    if (!supportsStorage) {
      return { streak: 0, lastClaim: undefined };
    }
    try {
      const raw = window.localStorage.getItem(storageKeys.login);
      if (!raw) {
        return { streak: 0, lastClaim: undefined };
      }
      const parsed = JSON.parse(raw);
      return {
        streak: parsed?.streak ?? 0,
        lastClaim: parsed?.lastClaim,
      };
    } catch (error) {
      return { streak: 0, lastClaim: undefined };
    }
  }

  function saveLoginState() {
    if (!supportsStorage) {
      return;
    }
    window.localStorage.setItem(storageKeys.login, JSON.stringify(loginState));
  }

  function loadEventState() {
    const defaultDuration = 1000 * 60 * 60 * 36; // 36 Stunden
    if (!supportsStorage) {
      return { endsAt: Date.now() + defaultDuration };
    }
    try {
      const raw = window.localStorage.getItem(storageKeys.event);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.endsAt) {
          return { endsAt: parsed.endsAt };
        }
      }
    } catch (error) {
      // ignore and create new state
    }
    const endsAt = Date.now() + defaultDuration;
    window.localStorage.setItem(storageKeys.event, JSON.stringify({ endsAt }));
    return { endsAt };
  }

  function isSameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function isNextDay(a, b) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const startOfA = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
    const startOfB = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
    const diff = Math.floor((startOfB - startOfA) / msPerDay);
    return diff === 1;
  }
})();
