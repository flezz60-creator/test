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

    if (item.cardType === "spell") {
      const effect = item.effect ?? {};
      const amount = effect.amount ?? item.damage ?? 0;
      let potency = 0;
      switch (effect.type) {
        case "directDamage":
          potency = amount * 0.85;
          break;
        case "enemyUnitDamage":
          potency = amount * 0.75 + 0.4;
          break;
        case "damageAllEnemies":
          potency = amount * 1.25 + 1.2;
          break;
        case "healHero":
          potency = amount * 0.55;
          break;
        case "allyHeal":
          potency = amount * 0.65;
          break;
        default:
          potency = item.damage * 0.8 + item.health * 0.4;
          break;
      }
      return potency + rarityWeight + 0.7;
    }

    const offense = item.damage * 1.25;
    const defense = item.health * 0.9;
    const abilityBonus = Array.isArray(item.abilities) && item.abilities.includes("bulwark") ? 1.4 : 0;
    return (offense + defense) / 2.15 + rarityWeight + 0.6 + abilityBonus;
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

  const duelProfiles = {
    "lumen-oracle": {
      cardType: "spell",
      damage: 0,
      health: 0,
      text: "Zauber: Heilt deinen Helden um 4 Lebenspunkte.",
      effect: { type: "healHero", amount: 4 },
    },
    "astral-herald": {
      cardType: "spell",
      damage: 3,
      health: 0,
      text: "Zauber: Fügt dem gegnerischen Helden 3 Schaden zu.",
      effect: { type: "directDamage", amount: 3 },
    },
    "sunscale-sentinel": {
      abilities: ["bulwark"],
      text: "Bollwerk: Gegnerische Karten müssen zuerst diese Einheit angreifen.",
    },
    "zenith-guardian": {
      abilities: ["bulwark"],
      text: "Bollwerk: Schützt den Helden vor direkten Angriffen.",
    },
    "gearworn-scribe": {
      cardType: "spell",
      damage: 2,
      health: 0,
      text: "Zauber: Verursacht 2 Schaden an einer gegnerischen Karte.",
      effect: { type: "enemyUnitDamage", amount: 2 },
    },
    "void-chimes": {
      cardType: "spell",
      damage: 1,
      health: 0,
      text: "Zauber: Verursacht allen gegnerischen Karten 1 Schaden.",
      effect: { type: "damageAllEnemies", amount: 1 },
    },
    "apex-colossus": {
      abilities: ["bulwark"],
      text: "Bollwerk: Erzwingt Angriffe auf diese gewaltige Konstruktion.",
    },
    "mossborn-keeper": {
      abilities: ["bulwark"],
      text: "Bollwerk: Schirmt den Helden vor direkten Angriffen ab.",
    },
    "embercap-shaman": {
      cardType: "spell",
      damage: 0,
      health: 0,
      text: "Zauber: Heilt eine verbündete Karte oder deinen Helden um 3.",
      effect: { type: "allyHeal", amount: 3 },
    },
    "ancient-treant": {
      abilities: ["bulwark"],
      text: "Bollwerk: Ein uralter Wächter, der seinen Hüter abschirmt.",
    },
  };

  allItems.forEach((item) => {
    const profile = duelProfiles[item.id];
    if (profile) {
      Object.assign(item, profile);
    }
    item.cardType = item.cardType ?? "unit";
    if (profile?.abilities) {
      item.abilities = profile.abilities.slice();
    } else if (Array.isArray(item.abilities)) {
      item.abilities = item.abilities.slice();
    } else {
      item.abilities = [];
    }
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

  const globalScope = typeof window !== "undefined" ? window : (typeof globalThis !== "undefined" ? globalThis : {});

  function getEmbeddedArtMap() {
    const artMap = globalScope.embeddedCardArt;
    return artMap instanceof Map ? artMap : null;
  }

  function getEmbeddedFullArt(id) {
    const artMap = getEmbeddedArtMap();
    if (!artMap) {
      return "";
    }
    const art = artMap.get(id);
    return typeof art === "string" ? art : "";
  }

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
    ["petal-warden", { embeddedKey: "petal-warden", layout: "full" }],
    ["glimmer-fox", { icon: "🦊" }],
    ["embercap-shaman", { embeddedKey: "embercap-shaman", layout: "full" }],
    ["thornborn-stalker", { icon: "🌿" }],
    ["luminous-hart", { icon: "🦌" }],
    ["spirit-of-canopy", { icon: "🌲" }],
    ["ancient-treant", { embeddedKey: "ancient-treant", layout: "full" }],
  ]);

  function resolveAssetUri(fileName) {
    if (typeof fileName !== "string" || fileName.length === 0) {
      return "";
    }
    const relativePath = fileName.startsWith("./") || fileName.startsWith("/") ? fileName : `assets/${fileName}`;
    if (typeof document !== "undefined") {
      try {
        const base = document.baseURI ?? window.location?.href ?? "";
        return new URL(relativePath, base).href;
      } catch (error) {
        return relativePath;
      }
    }
    return relativePath;
  }

  function usesFullCardArtwork(item) {
    if (!item) {
      return false;
    }
    const artConfig = cardIllustrations.get(item.id);
    if (!artConfig) {
      return false;
    }
    const expectsFullLayout = artConfig.layout === "full" || artConfig.fullCard === true;
    if (!expectsFullLayout) {
      return false;
    }
    if (typeof artConfig.image === "string" && artConfig.image.length > 0) {
      return true;
    }
    const key = typeof artConfig.embeddedKey === "string" ? artConfig.embeddedKey : item.id;
    return getEmbeddedFullArt(key).length > 0;
  }

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
    deckSize: 30,
    boardLimit: 6,
    logLimit: 60,
  };

  const duelDefaultNames = ["Sammler Nova", "Archivjäger Vega"];

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
  const setOrder = new Map(sets.map((set, index) => [set.id, index]));
  const itemsById = new Map(allItems.map((item) => [item.id, item]));
  const limitedEventItem = itemsById.get("ember-solstice-phoenix");

  let collectionState = loadCollection();
  const structureChanged = ensureCollectionStructure();
  const deckBuilderState = {
    name: collectionState.deck?.name ?? "Arena-Starter",
    workingCards: cloneDeckCards(collectionState.deck?.cards ?? {}),
    dirty: false,
    status: undefined,
  };
  const collectionFilters = {
    search: "",
    setId: "all",
    rarity: "all",
    sort: "rarity-desc",
    ownedOnly: true,
    duplicatesOnly: false,
  };

  const duelState = {
    status: "idle",
    players: duelDefaultNames.map((name) => createIdlePlayerState(name)),
    activePlayer: 0,
    turnCounter: 0,
    log: [],
    winner: undefined,
    nextUnitId: 1,
  };

  const duelInteraction = {
    mode: "idle",
    sourcePlayer: undefined,
    sourceUnitId: undefined,
    pendingSpell: undefined,
    targets: [],
    targetKeys: new Set(),
  };
  updateDeckBuilderDirtyState();
  if (structureChanged) {
    saveCollection();
  }
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
    dom.collectionCards = document.getElementById("collection-card-grid");
    dom.collectionEmpty = document.getElementById("collection-empty");
    dom.collectionFilterSummary = document.getElementById("collection-filter-summary");
    dom.collectionSearch = document.getElementById("collection-search");
    dom.collectionSetFilter = document.getElementById("collection-filter-set");
    dom.collectionRarityFilter = document.getElementById("collection-filter-rarity");
    dom.collectionSort = document.getElementById("collection-sort");
    dom.collectionOwnedToggle = document.getElementById("collection-owned-toggle");
    dom.collectionDuplicatesToggle = document.getElementById("collection-duplicates-toggle");
    dom.deckBuilderSection = document.getElementById("deckbuilder");
    dom.deckBuilderStatus = document.getElementById("deckbuilder-status");
    dom.deckBuilderName = document.getElementById("deckbuilder-name");
    dom.deckBuilderSave = document.getElementById("deckbuilder-save");
    dom.deckBuilderReset = document.getElementById("deckbuilder-reset");
    dom.deckBuilderCount = document.getElementById("deckbuilder-count");
    dom.deckBuilderPool = document.getElementById("deckbuilder-card-pool");
    dom.deckBuilderSelection = document.getElementById("deckbuilder-selection");
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
    dom.duelTargetPanel = document.getElementById("duel-target-panel");
    dom.duelTargetMessage = document.getElementById("duel-target-message");
    dom.duelTargetList = document.getElementById("duel-target-list");
    dom.duelTargetCancel = document.getElementById("duel-target-cancel");
    dom.duelDecklistRoot = document.querySelector("[data-duel-decklist-root]");
    dom.duelDecklist = document.querySelector("[data-duel-decklist]");

    populatePackSelect();
    renderSetCards();
    setupCollectionViewer();
    setupDeckBuilder();
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
    dom.ctaExplore.addEventListener("click", () => scrollToSection("deckbuilder"));

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

  function buildCardMeta(item) {
    const set = setsById.get(item.setId);
    const typeParts = [];
    if (item.cardType === "spell") {
      typeParts.push("Zauber");
    } else {
      typeParts.push("Einheit");
      if (Array.isArray(item.abilities) && item.abilities.includes("bulwark")) {
        typeParts.push("Bollwerk");
      }
    }
    const damageLabel = item.cardType === "spell" ? "Zauberschaden" : "Angriff";
    const healthLabel = item.cardType === "spell" ? "Zauberschutz" : "Lebenspunkte";
    const rawDamage = Number.isFinite(item.damage) ? item.damage : 0;
    const rawHealth = Number.isFinite(item.health) ? item.health : 0;
    const damageValue =
      item.cardType === "spell" ? (rawDamage > 0 ? String(rawDamage) : "–") : String(rawDamage);
    const healthValue = item.cardType === "spell" ? "–" : String(rawHealth);
    return {
      setName: set?.name ?? "",
      typeLabel: typeParts.join(" · "),
      damageLabel,
      healthLabel,
      damageValue,
      healthValue,
    };
  }

  function getCardAccessibilitySummary(item, quantity, meta) {
    if (!item) {
      return "";
    }
    const summaryParts = [];
    if (item.name) {
      summaryParts.push(item.name);
    }
    if (meta?.setName) {
      summaryParts.push(`Set ${meta.setName}`);
    }
    if (meta?.typeLabel) {
      summaryParts.push(meta.typeLabel);
    }
    if (Number.isFinite(item.cost)) {
      summaryParts.push(`Kosten ${item.cost}`);
    }
    if (meta?.damageValue && meta.damageValue !== "–") {
      summaryParts.push(`${meta.damageLabel} ${meta.damageValue}`);
    }
    if (meta?.healthValue && meta.healthValue !== "–") {
      summaryParts.push(`${meta.healthLabel} ${meta.healthValue}`);
    }
    if (item.text) {
      summaryParts.push(item.text);
    }
    if (item.isLimited) {
      summaryParts.push("Event Limited");
    }
    if (quantity > 1) {
      summaryParts.push(`Anzahl ${quantity}`);
    }
    return summaryParts.join(". ");
  }

  function createSrOnlyText(text) {
    if (!text) {
      return null;
    }
    const span = document.createElement("span");
    span.className = "sr-only";
    span.textContent = text;
    return span;
  }

  function createCardElement(item, options) {
    const card = document.createElement("article");
    card.className = `card rarity-${item.rarity}`;
    const rarityLabel = rarityLabels[item.rarity] ?? item.rarity;
    const quantity = options?.quantity ?? 0;
    const meta = buildCardMeta(item);
    const artUri = getCardArtUri(item);
    const artAltText = `Illustration von ${item.name}`;
    const artAlt = escapeXml(artAltText);
    const cardName = escapeXml(item.name);
    const cardSet = escapeXml(meta.setName);
    const typeLabel = escapeXml(meta.typeLabel);
    const damageStat = meta.damageValue;
    const healthStat = meta.healthValue;
    const cardText = item.text ? `<p class="card-text">${escapeXml(item.text)}</p>` : "";
    const limitedTag = item.isLimited ? '<span class="tag limited">Event Limited</span>' : "";
    const quantityTag = quantity > 1 ? `<span class="card-qty">×${quantity}</span>` : "";
    const usesFullArt = usesFullCardArtwork(item);
    const srSummary = getCardAccessibilitySummary(item, quantity, meta);
    if (usesFullArt) {
      card.classList.add("card--full-art");
      const figure = document.createElement("figure");
      figure.className = "card-full-art";
      const img = document.createElement("img");
      img.src = artUri;
      img.alt = artAltText;
      img.loading = "lazy";
      figure.append(img);
      if (item.isLimited) {
        const flag = document.createElement("span");
        flag.className = "tag limited card-flag--overlay";
        flag.textContent = "Event Limited";
        figure.append(flag);
      }
      if (quantity > 1) {
        const qtyBadge = document.createElement("span");
        qtyBadge.className = "card-qty card-qty--overlay";
        qtyBadge.textContent = `×${quantity}`;
        figure.append(qtyBadge);
      }
      card.append(figure);
      const srText = createSrOnlyText(srSummary);
      if (srText) {
        card.append(srText);
      }
      return card;
    }
    card.innerHTML = `
      <figure class="card-illustration">
        <img src="${artUri}" alt="${artAlt}" loading="lazy" />
      </figure>
      <div class="card-content">
        <div class="card-header">
          <span class="card-rarity">${rarityLabel}</span>
          ${quantityTag}
        </div>
        <strong>${cardName}</strong>
        <span class="card-type">${typeLabel}</span>
        <p class="card-set">${cardSet}</p>
        <div class="card-stats" role="group" aria-label="Kartenwerte">
          <span class="card-stat card-stat--cost">${statIcons.cost}<span>${item.cost}</span></span>
          <span class="card-stat card-stat--damage">${statIcons.damage}<span>${damageStat}</span></span>
          <span class="card-stat card-stat--health">${statIcons.health}<span>${healthStat}</span></span>
        </div>
        ${cardText}
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
    const embeddedKey = typeof artConfig.embeddedKey === "string" ? artConfig.embeddedKey : null;
    if (embeddedKey) {
      const embeddedArt = getEmbeddedFullArt(embeddedKey);
      if (embeddedArt.length > 0) {
        cardArtCache.set(item.id, embeddedArt);
        return embeddedArt;
      }
    }
    if (typeof artConfig.asset === "string" && artConfig.asset.length > 0) {
      const assetUri = resolveAssetUri(artConfig.asset);
      cardArtCache.set(item.id, assetUri);
      return assetUri;
    }
    if (typeof artConfig.image === "string" && artConfig.image.length > 0) {
      cardArtCache.set(item.id, artConfig.image);
      return artConfig.image;
    }
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
    if (!embeddedKey) {
      cardArtCache.set(item.id, uri);
    }
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

  function setupCollectionViewer() {
    if (!dom.collectionCards) {
      return;
    }

    if (dom.collectionSetFilter) {
      dom.collectionSetFilter.innerHTML = "";
      const allOption = document.createElement("option");
      allOption.value = "all";
      allOption.textContent = "Alle Sets";
      dom.collectionSetFilter.append(allOption);
      sets.forEach((set) => {
        const option = document.createElement("option");
        option.value = set.id;
        option.textContent = set.name;
        dom.collectionSetFilter.append(option);
      });
      dom.collectionSetFilter.value = collectionFilters.setId;
      dom.collectionSetFilter.addEventListener("change", (event) => {
        const value = typeof event.target.value === "string" ? event.target.value : "all";
        collectionFilters.setId = value && value !== "" ? value : "all";
        renderCollectionGallery();
      });
    }

    if (dom.collectionRarityFilter) {
      dom.collectionRarityFilter.innerHTML = "";
      const allOption = document.createElement("option");
      allOption.value = "all";
      allOption.textContent = "Alle Seltenheiten";
      dom.collectionRarityFilter.append(allOption);
      Object.entries(rarityLabels).forEach(([rarity, label]) => {
        const option = document.createElement("option");
        option.value = rarity;
        option.textContent = label;
        dom.collectionRarityFilter.append(option);
      });
      dom.collectionRarityFilter.value = collectionFilters.rarity;
      dom.collectionRarityFilter.addEventListener("change", (event) => {
        const value = typeof event.target.value === "string" ? event.target.value : "all";
        collectionFilters.rarity = value && value !== "" ? value : "all";
        renderCollectionGallery();
      });
    }

    if (dom.collectionSort) {
      const sortOptions = [
        { value: "rarity-desc", label: "Rarität (hoch → niedrig)" },
        { value: "cost-asc", label: "Kosten (aufsteigend)" },
        { value: "cost-desc", label: "Kosten (absteigend)" },
        { value: "name-asc", label: "Name (A–Z)" },
        { value: "set-asc", label: "Set (A–Z)" },
      ];
      dom.collectionSort.innerHTML = "";
      sortOptions.forEach((optionDef) => {
        const option = document.createElement("option");
        option.value = optionDef.value;
        option.textContent = optionDef.label;
        dom.collectionSort.append(option);
      });
      dom.collectionSort.value = collectionFilters.sort;
      dom.collectionSort.addEventListener("change", (event) => {
        const value = typeof event.target.value === "string" ? event.target.value : "rarity-desc";
        collectionFilters.sort = value && value !== "" ? value : "rarity-desc";
        renderCollectionGallery();
      });
    }

    if (dom.collectionSearch) {
      dom.collectionSearch.value = collectionFilters.search;
      let searchDebounce;
      dom.collectionSearch.addEventListener("input", (event) => {
        const value = typeof event.target.value === "string" ? event.target.value : "";
        collectionFilters.search = value;
        if (searchDebounce) {
          window.clearTimeout(searchDebounce);
        }
        searchDebounce = window.setTimeout(() => {
          renderCollectionGallery();
        }, 120);
      });
    }

    if (dom.collectionOwnedToggle) {
      dom.collectionOwnedToggle.checked = collectionFilters.ownedOnly;
      dom.collectionOwnedToggle.addEventListener("change", (event) => {
        collectionFilters.ownedOnly = Boolean(event.target.checked);
        if (!collectionFilters.ownedOnly && collectionFilters.duplicatesOnly) {
          collectionFilters.duplicatesOnly = false;
          if (dom.collectionDuplicatesToggle) {
            dom.collectionDuplicatesToggle.checked = false;
          }
        }
        renderCollectionGallery();
      });
    }

    if (dom.collectionDuplicatesToggle) {
      dom.collectionDuplicatesToggle.checked = collectionFilters.duplicatesOnly;
      dom.collectionDuplicatesToggle.addEventListener("change", (event) => {
        collectionFilters.duplicatesOnly = Boolean(event.target.checked);
        if (collectionFilters.duplicatesOnly && !collectionFilters.ownedOnly) {
          collectionFilters.ownedOnly = true;
          if (dom.collectionOwnedToggle) {
            dom.collectionOwnedToggle.checked = true;
          }
        }
        renderCollectionGallery();
      });
    }

    renderCollectionGallery();
  }

  function renderCollectionGallery() {
    if (!dom.collectionCards) {
      return;
    }

    const itemCounts = collectionState.items ?? {};
    const searchTerm = collectionFilters.search.trim().toLowerCase();
    const hasOwnedCards = Object.values(itemCounts).some((count) => count > 0);
    const entries = [];

    allItems.forEach((item) => {
      const owned = Math.max(0, Math.floor(Number(itemCounts[item.id]) || 0));
      if (collectionFilters.setId !== "all" && item.setId !== collectionFilters.setId) {
        return;
      }
      if (collectionFilters.rarity !== "all" && item.rarity !== collectionFilters.rarity) {
        return;
      }
      if (collectionFilters.ownedOnly && owned <= 0) {
        return;
      }
      if (collectionFilters.duplicatesOnly && owned <= 1) {
        return;
      }
      if (searchTerm.length > 0) {
        const set = setsById.get(item.setId);
        const haystack = [item.name, item.text, set?.name, rarityLabels[item.rarity]]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(searchTerm)) {
          return;
        }
      }
      entries.push({ item, owned });
    });

    sortCollectionEntries(entries);

    dom.collectionCards.innerHTML = "";
    const visibleEntries = [];

    entries.forEach((entry) => {
      const card = createCardElement(entry.item, { quantity: entry.owned });
      if (entry.owned <= 0) {
        card.classList.add("is-unowned");
        appendCardBadge(card, "missing", "Fehlt");
      } else if (entry.owned > 1) {
        appendCardBadge(card, "duplicate", `Duplikate ×${entry.owned - 1}`);
      }
      dom.collectionCards.append(card);
      visibleEntries.push(entry);
    });

    updateCollectionFilterSummary(visibleEntries);

    if (dom.collectionEmpty) {
      if (visibleEntries.length === 0) {
        let message;
        if (collectionFilters.duplicatesOnly) {
          message = "Keine Duplikate entsprechen deiner Auswahl.";
        } else if (collectionFilters.ownedOnly) {
          message = hasOwnedCards
            ? "Keine Karten in deiner Sammlung passen zu diesen Filtern."
            : "Du besitzt noch keine Karten – öffne Booster oder sichere dir den Daily Bonus.";
        } else {
          message = "Keine Karten entsprechen deiner Auswahl.";
        }
        dom.collectionEmpty.textContent = message;
        dom.collectionEmpty.hidden = false;
      } else {
        dom.collectionEmpty.hidden = true;
      }
    }
  }

  function sortCollectionEntries(entries) {
    const mode = collectionFilters.sort;
    entries.sort((a, b) => {
      switch (mode) {
        case "cost-asc": {
          const costDiff = (a.item.cost ?? 0) - (b.item.cost ?? 0);
          if (costDiff !== 0) {
            return costDiff;
          }
          return a.item.name.localeCompare(b.item.name, "de");
        }
        case "cost-desc": {
          const costDiff = (b.item.cost ?? 0) - (a.item.cost ?? 0);
          if (costDiff !== 0) {
            return costDiff;
          }
          return a.item.name.localeCompare(b.item.name, "de");
        }
        case "name-asc":
          return a.item.name.localeCompare(b.item.name, "de");
        case "set-asc": {
          const setDiff = getSetOrderValue(a.item.setId) - getSetOrderValue(b.item.setId);
          if (setDiff !== 0) {
            return setDiff;
          }
          const rarityDiff = (rarityScore[b.item.rarity] ?? 0) - (rarityScore[a.item.rarity] ?? 0);
          if (rarityDiff !== 0) {
            return rarityDiff;
          }
          return a.item.name.localeCompare(b.item.name, "de");
        }
        case "rarity-desc":
        default: {
          const rarityDiff = (rarityScore[b.item.rarity] ?? 0) - (rarityScore[a.item.rarity] ?? 0);
          if (rarityDiff !== 0) {
            return rarityDiff;
          }
          const costDiff = (a.item.cost ?? 0) - (b.item.cost ?? 0);
          if (costDiff !== 0) {
            return costDiff;
          }
          return a.item.name.localeCompare(b.item.name, "de");
        }
      }
    });
  }

  function updateCollectionFilterSummary(entries) {
    if (!dom.collectionFilterSummary) {
      return;
    }

    if (!entries || entries.length === 0) {
      if (collectionFilters.duplicatesOnly) {
        dom.collectionFilterSummary.textContent = "Keine Duplikate entsprechen deiner Auswahl.";
      } else if (collectionFilters.ownedOnly) {
        dom.collectionFilterSummary.textContent = "Keine Karten in deiner Sammlung passen zu diesen Filtern.";
      } else {
        dom.collectionFilterSummary.textContent = "Keine Karten entsprechen deiner Auswahl.";
      }
      return;
    }

    const infoParts = [`${entries.length} Karten`];
    const ownedEntries = entries.filter((entry) => entry.owned > 0);
    const ownedCopies = ownedEntries.reduce((sum, entry) => sum + entry.owned, 0);
    const totalCopies = entries.reduce((sum, entry) => sum + Math.max(0, entry.owned), 0);

    if (collectionFilters.ownedOnly) {
      if (totalCopies > entries.length) {
        infoParts.push(`${totalCopies} Kopien`);
      }
    } else {
      infoParts.push(`${ownedEntries.length} Karten im Besitz`);
      if (ownedCopies > 0) {
        infoParts.push(`${ownedCopies} Kopien`);
      }
    }

    if (collectionFilters.duplicatesOnly) {
      infoParts.push("nur Duplikate");
    }
    if (!collectionFilters.ownedOnly) {
      infoParts.push("inkl. fehlende Karten");
    }

    const filterParts = [];
    if (collectionFilters.setId !== "all") {
      const set = setsById.get(collectionFilters.setId);
      filterParts.push(`Set: ${set?.name ?? collectionFilters.setId}`);
    }
    if (collectionFilters.rarity !== "all") {
      filterParts.push(`Seltenheit: ${rarityLabels[collectionFilters.rarity] ?? collectionFilters.rarity}`);
    }
    const rawSearch = collectionFilters.search.trim();
    if (rawSearch.length > 0) {
      filterParts.push(`Suche "${rawSearch}"`);
    }

    let summary = `Angezeigt: ${infoParts.join(" · ")}`;
    if (filterParts.length > 0) {
      summary += ` (${filterParts.join(" · ")})`;
    }
    dom.collectionFilterSummary.textContent = summary;
  }

  function appendCardBadge(card, className, label) {
    if (!card) {
      return;
    }
    const content = card.querySelector(".card-content");
    if (!content) {
      return;
    }
    let flags = content.querySelector(".card-flags");
    if (!flags) {
      flags = document.createElement("div");
      flags.className = "card-flags";
      content.append(flags);
    }
    const tag = document.createElement("span");
    tag.className = `tag ${className}`;
    tag.textContent = label;
    flags.append(tag);
  }

  function setupDeckBuilder() {
    if (!dom.deckBuilderSection) {
      return;
    }
    if (dom.deckBuilderName) {
      dom.deckBuilderName.value = deckBuilderState.name ?? "";
      dom.deckBuilderName.addEventListener("input", (event) => {
        const value = typeof event.target.value === "string" ? event.target.value : "";
        deckBuilderState.name = value;
        markDeckBuilderChanged();
        renderDeckBuilder();
      });
    }
    if (dom.deckBuilderSave) {
      dom.deckBuilderSave.addEventListener("click", handleDeckSave);
    }
    if (dom.deckBuilderReset) {
      dom.deckBuilderReset.addEventListener("click", handleDeckReset);
    }
    renderDeckBuilder();
  }

  function handleDeckSave() {
    const sanitizedName = sanitizeDeckName(deckBuilderState.name);
    const sanitizedCards = sanitizeWorkingDeck(deckBuilderState.workingCards);
    collectionState.deck.name = sanitizedName;
    collectionState.deck.cards = sanitizedCards;
    deckBuilderState.name = sanitizedName;
    deckBuilderState.workingCards = cloneDeckCards(sanitizedCards);
    deckBuilderState.status = { text: "Deck gespeichert.", tone: "success" };
    updateDeckBuilderDirtyState();
    saveCollection();
    if (duelState.status === "idle") {
      duelState.players = duelDefaultNames.map((playerName) => createIdlePlayerState(playerName));
    }
    renderDeckBuilder();
    renderDeckList();
  }

  function handleDeckReset() {
    deckBuilderState.name = collectionState.deck?.name ?? "Arena-Starter";
    deckBuilderState.workingCards = cloneDeckCards(collectionState.deck?.cards ?? {});
    deckBuilderState.status = { text: "Änderungen verworfen.", tone: "info" };
    updateDeckBuilderDirtyState();
    renderDeckBuilder();
  }

  function renderDeckBuilder() {
    if (!dom.deckBuilderSection) {
      return;
    }
    const total = getWorkingDeckTotal();
    const missing = Math.max(0, duelConfig.deckSize - total);
    if (dom.deckBuilderCount) {
      dom.deckBuilderCount.textContent =
        missing > 0
          ? `${total}/${duelConfig.deckSize} Karten – es fehlen ${missing}`
          : `${total}/${duelConfig.deckSize} Karten`;
      dom.deckBuilderCount.classList.toggle("is-complete", total > 0 && missing === 0);
    }
    if (dom.deckBuilderName && document.activeElement !== dom.deckBuilderName) {
      dom.deckBuilderName.value = deckBuilderState.name ?? "";
    }
    if (dom.deckBuilderSave) {
      dom.deckBuilderSave.disabled = !deckBuilderState.dirty;
    }
    if (dom.deckBuilderReset) {
      dom.deckBuilderReset.disabled = !deckBuilderState.dirty;
    }
    if (dom.deckBuilderStatus) {
      if (deckBuilderState.status && deckBuilderState.status.text) {
        dom.deckBuilderStatus.textContent = deckBuilderState.status.text;
        dom.deckBuilderStatus.dataset.tone = deckBuilderState.status.tone ?? "info";
      } else if (deckBuilderState.dirty) {
        dom.deckBuilderStatus.textContent =
          "Änderungen nicht gespeichert – speichere, um sie in der Arena zu verwenden.";
        dom.deckBuilderStatus.dataset.tone = "warn";
      } else {
        const activeName = sanitizeDeckName(collectionState.deck?.name ?? deckBuilderState.name ?? "Arena-Starter");
        dom.deckBuilderStatus.textContent = `Aktives Arena-Deck: „${activeName}“`;
        dom.deckBuilderStatus.dataset.tone = "info";
      }
    }
    renderDeckBuilderPool(total);
    renderDeckBuilderSelection(total);
  }

  function renderDeckBuilderPool(total) {
    if (!dom.deckBuilderPool) {
      return;
    }
    const itemCounts = collectionState.items ?? {};
    const entries = allItems
      .map((item) => {
        const owned = Math.max(0, Math.floor(Number(itemCounts[item.id]) || 0));
        if (owned <= 0) {
          return undefined;
        }
        const inDeck = Math.max(0, Math.floor(Number(deckBuilderState.workingCards[item.id]) || 0));
        return { item, owned, inDeck };
      })
      .filter(Boolean);
    entries.sort((a, b) => {
      const setDiff = getSetOrderValue(a.item.setId) - getSetOrderValue(b.item.setId);
      if (setDiff !== 0) {
        return setDiff;
      }
      const rarityDiff = (rarityScore[b.item.rarity] ?? 0) - (rarityScore[a.item.rarity] ?? 0);
      if (rarityDiff !== 0) {
        return rarityDiff;
      }
      return a.item.name.localeCompare(b.item.name, "de");
    });
    dom.deckBuilderPool.innerHTML = "";
    if (entries.length === 0) {
      const message = document.createElement("p");
      message.className = "deckbuilder-empty";
      message.textContent = "Öffne Booster oder sichere dir den Daily Bonus, um neue Karten zu erhalten.";
      dom.deckBuilderPool.append(message);
      return;
    }
    entries.forEach((entry) => {
      const card = createDeckBuilderPoolCard(entry, total);
      dom.deckBuilderPool.append(card);
    });
  }

  function renderDeckBuilderSelection(total) {
    if (!dom.deckBuilderSelection) {
      return;
    }
    const itemCounts = collectionState.items ?? {};
    const entries = Object.entries(deckBuilderState.workingCards ?? {})
      .map(([cardId, value]) => {
        const count = Math.max(0, Math.floor(Number(value) || 0));
        if (count <= 0) {
          return undefined;
        }
        const item = itemsById.get(cardId);
        if (!item) {
          return undefined;
        }
        const owned = Math.max(0, Math.floor(Number(itemCounts[cardId]) || 0));
        return { item, count, owned };
      })
      .filter(Boolean);
    entries.sort((a, b) => {
      const costDiff = (a.item.cost ?? 0) - (b.item.cost ?? 0);
      if (costDiff !== 0) {
        return costDiff;
      }
      const setDiff = getSetOrderValue(a.item.setId) - getSetOrderValue(b.item.setId);
      if (setDiff !== 0) {
        return setDiff;
      }
      return a.item.name.localeCompare(b.item.name, "de");
    });
    dom.deckBuilderSelection.innerHTML = "";
    if (entries.length === 0) {
      const placeholder = document.createElement("p");
      placeholder.className = "deckbuilder-empty";
      placeholder.textContent = "Wähle Karten aus deiner Sammlung, um dein Arena-Deck zusammenzustellen.";
      dom.deckBuilderSelection.append(placeholder);
      return;
    }
    const missing = Math.max(0, duelConfig.deckSize - total);
    const note = document.createElement("p");
    note.className = "deckbuilder-note";
    if (missing > 0) {
      note.classList.add("is-warning");
      note.textContent =
        missing === 1
          ? "Es fehlt noch 1 Karte, um die 30 zu erreichen."
          : `Es fehlen noch ${missing} Karten, um die 30 zu erreichen.`;
    } else {
      note.classList.add("is-success");
      note.textContent = "Deckgröße erreicht – bereit für die Arena!";
    }
    dom.deckBuilderSelection.append(note);
    entries.forEach((entry) => {
      const card = createDeckBuilderSelectionCard(entry, total);
      dom.deckBuilderSelection.append(card);
    });
  }

  function createDeckBuilderBaseCard(item) {
    const element = document.createElement("li");
    element.className = "deckbuilder-card";
    element.classList.add(`rarity-${item.rarity}`);
    const artUri = getCardArtUri(item);
    if (usesFullCardArtwork(item)) {
      element.classList.add("deckbuilder-card--full-art");
      const figure = document.createElement("figure");
      figure.className = "deckbuilder-card-full-art";
      const img = document.createElement("img");
      img.src = artUri;
      img.alt = `Illustration von ${item.name}`;
      img.loading = "lazy";
      figure.append(img);
      const caption = document.createElement("figcaption");
      caption.className = "sr-only";
      caption.textContent = item.name;
      figure.append(caption);
      element.append(figure);
      const srText = createSrOnlyText(getCardAccessibilitySummary(item, 0, buildCardMeta(item)));
      if (srText) {
        element.append(srText);
      }
      const footer = document.createElement("footer");
      footer.className = "deckbuilder-card-footer";
      element.append(footer);
      const countLabel = document.createElement("span");
      countLabel.className = "deckbuilder-card-count";
      footer.append(countLabel);
      const controls = document.createElement("div");
      controls.className = "deckbuilder-card-controls";
      footer.append(controls);
      return { root: element, countLabel, controls };
    }
    const art = document.createElement("figure");
    art.className = "deckbuilder-card-art";
    const img = document.createElement("img");
    img.src = artUri;
    img.alt = `Illustration von ${item.name}`;
    img.loading = "lazy";
    art.append(img);
    element.append(art);
    const info = document.createElement("div");
    info.className = "deckbuilder-card-info";
    element.append(info);
    const header = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = item.name;
    const rarity = document.createElement("span");
    rarity.className = "deckbuilder-card-rarity";
    rarity.textContent = rarityLabels[item.rarity] ?? item.rarity;
    header.append(title, rarity);
    info.append(header);
    const type = document.createElement("p");
    type.className = "deckbuilder-card-type";
    type.textContent = getDeckbuilderMetaLabel(item);
    info.append(type);
    const stats = document.createElement("div");
    stats.className = "deckbuilder-card-stats";
    stats.setAttribute("role", "group");
    stats.setAttribute("aria-label", "Kartenwerte");
    const damageValue =
      item.cardType === "spell" ? (item.damage > 0 ? String(item.damage) : "–") : String(item.damage);
    const healthValue = item.cardType === "spell" ? "–" : String(item.health);
    stats.append(
      createDeckbuilderStat(statIcons.cost, String(item.cost), "Kosten"),
      createDeckbuilderStat(statIcons.damage, damageValue, item.cardType === "spell" ? "Zauberschaden" : "Angriff"),
      createDeckbuilderStat(statIcons.health, healthValue, item.cardType === "spell" ? "Zauberschutz" : "Lebenspunkte")
    );
    info.append(stats);
    const footer = document.createElement("footer");
    footer.className = "deckbuilder-card-footer";
    info.append(footer);
    const countLabel = document.createElement("span");
    countLabel.className = "deckbuilder-card-count";
    footer.append(countLabel);
    const controls = document.createElement("div");
    controls.className = "deckbuilder-card-controls";
    footer.append(controls);
    return { root: element, countLabel, controls };
  }

  function createDeckBuilderPoolCard(entry, total) {
    const { root, countLabel, controls } = createDeckBuilderBaseCard(entry.item);
    const available = Math.max(0, entry.owned - entry.inDeck);
    countLabel.textContent = `Besitz: ${entry.owned} · Frei: ${available}`;
    if (available <= 0) {
      root.classList.add("is-depleted");
    }
    if (total >= duelConfig.deckSize) {
      root.classList.add("is-capped");
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "deckbuilder-button";
    button.dataset.action = "add";
    button.textContent = "Hinzufügen";
    button.setAttribute("aria-label", `${entry.item.name} zum Deck hinzufügen`);
    if (total >= duelConfig.deckSize) {
      button.title = "Deckgröße erreicht";
    }
    if (available <= 0) {
      button.title = "Keine weiteren Kopien verfügbar";
    }
    button.disabled = available <= 0 || total >= duelConfig.deckSize;
    button.addEventListener("click", () => addCardToDeck(entry.item.id));
    controls.append(button);
    if (!controls.childElementCount) {
      controls.remove();
    }
    return root;
  }

  function createDeckBuilderSelectionCard(entry, total) {
    const { root, countLabel, controls } = createDeckBuilderBaseCard(entry.item);
    countLabel.textContent = `Im Deck: ${entry.count} · Besitz: ${entry.owned}`;
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "deckbuilder-button";
    removeButton.dataset.action = "remove";
    removeButton.textContent = "−1";
    removeButton.setAttribute("aria-label", `${entry.item.name} aus dem Deck entfernen`);
    removeButton.disabled = entry.count <= 0;
    removeButton.addEventListener("click", () => removeCardFromDeck(entry.item.id));
    controls.append(removeButton);
    const available = Math.max(0, entry.owned - entry.count);
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "deckbuilder-button";
    addButton.dataset.action = "add";
    addButton.textContent = "+1";
    addButton.setAttribute("aria-label", `Eine weitere Kopie von ${entry.item.name} hinzufügen`);
    if (total >= duelConfig.deckSize) {
      addButton.title = "Deckgröße erreicht";
    } else if (available <= 0) {
      addButton.title = "Keine weiteren Kopien in der Sammlung";
    }
    addButton.disabled = available <= 0 || total >= duelConfig.deckSize;
    addButton.addEventListener("click", () => addCardToDeck(entry.item.id));
    controls.append(addButton);
    if (!controls.childElementCount) {
      controls.remove();
    }
    return root;
  }

  function createDeckbuilderStat(iconMarkup, value, label) {
    const chip = document.createElement("span");
    chip.className = "deckbuilder-stat";
    chip.setAttribute("aria-label", label);
    chip.insertAdjacentHTML("beforeend", iconMarkup);
    const strong = document.createElement("strong");
    strong.textContent = value;
    chip.append(strong);
    return chip;
  }

  function getDeckbuilderMetaLabel(item) {
    const set = setsById.get(item.setId);
    const parts = [];
    if (set?.name) {
      parts.push(set.name);
    }
    if (item.cardType === "spell") {
      parts.push("Zauber");
    } else {
      parts.push("Einheit");
      if (Array.isArray(item.abilities) && item.abilities.includes("bulwark")) {
        parts.push("Bollwerk");
      }
    }
    return parts.join(" · ");
  }

  function addCardToDeck(cardId) {
    if (!cardId) {
      return;
    }
    const ownedCount = Math.max(0, Math.floor(Number((collectionState.items ?? {})[cardId]) || 0));
    if (ownedCount <= 0) {
      return;
    }
    const current = Math.max(0, Math.floor(Number(deckBuilderState.workingCards?.[cardId]) || 0));
    if (current >= ownedCount) {
      return;
    }
    if (getWorkingDeckTotal() >= duelConfig.deckSize) {
      return;
    }
    deckBuilderState.workingCards[cardId] = current + 1;
    markDeckBuilderChanged();
    renderDeckBuilder();
  }

  function removeCardFromDeck(cardId) {
    if (!cardId) {
      return;
    }
    const current = Math.max(0, Math.floor(Number(deckBuilderState.workingCards?.[cardId]) || 0));
    if (current <= 0) {
      return;
    }
    if (current <= 1) {
      delete deckBuilderState.workingCards[cardId];
    } else {
      deckBuilderState.workingCards[cardId] = current - 1;
    }
    markDeckBuilderChanged();
    renderDeckBuilder();
  }

  function getWorkingDeckTotal() {
    const cards = deckBuilderState.workingCards ?? {};
    return Object.values(cards).reduce((sum, value) => sum + Math.max(0, Math.floor(Number(value) || 0)), 0);
  }

  function markDeckBuilderChanged() {
    const wasDirty = deckBuilderState.dirty;
    updateDeckBuilderDirtyState();
    if (!wasDirty && deckBuilderState.dirty) {
      deckBuilderState.status = undefined;
    }
  }

  function updateDeckBuilderDirtyState() {
    const savedDeck = collectionState.deck ?? { name: "", cards: {} };
    const savedName = sanitizeDeckName(savedDeck.name ?? "");
    const currentName = sanitizeDeckName(deckBuilderState.name ?? "");
    if (savedName !== currentName) {
      deckBuilderState.dirty = true;
      return;
    }
    const savedEntries = Object.entries(savedDeck.cards ?? {})
      .map(([cardId, count]) => [cardId, Math.max(0, Math.floor(Number(count) || 0))])
      .filter(([, count]) => count > 0)
      .sort(([a], [b]) => a.localeCompare(b));
    const workingEntries = Object.entries(deckBuilderState.workingCards ?? {})
      .map(([cardId, count]) => [cardId, Math.max(0, Math.floor(Number(count) || 0))])
      .filter(([, count]) => count > 0)
      .sort(([a], [b]) => a.localeCompare(b));
    if (savedEntries.length !== workingEntries.length) {
      deckBuilderState.dirty = true;
      return;
    }
    const changed = savedEntries.some(([cardId, count], index) => {
      const [otherId, otherCount] = workingEntries[index];
      return cardId !== otherId || count !== otherCount;
    });
    deckBuilderState.dirty = changed;
  }

  function sanitizeDeckName(value) {
    if (typeof value !== "string") {
      return "Arena-Starter";
    }
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      return "Arena-Starter";
    }
    if (trimmed.length > 40) {
      return trimmed.slice(0, 40);
    }
    return trimmed;
  }

  function cloneDeckCards(cards) {
    const copy = {};
    if (!cards || typeof cards !== "object") {
      return copy;
    }
    Object.entries(cards).forEach(([cardId, value]) => {
      const count = Math.max(0, Math.floor(Number(value) || 0));
      if (count > 0) {
        copy[cardId] = count;
      }
    });
    return copy;
  }

  function clampDeckToOwned(deck) {
    if (!deck || typeof deck !== "object") {
      return false;
    }
    if (!deck.cards || typeof deck.cards !== "object") {
      deck.cards = {};
      return true;
    }
    const owned = collectionState.items ?? {};
    const normalized = [];
    Object.entries(deck.cards).forEach(([cardId, value]) => {
      const item = itemsById.get(cardId);
      if (!item) {
        return;
      }
      const desired = Math.max(0, Math.floor(Number(value) || 0));
      if (desired <= 0) {
        return;
      }
      const ownedCount = Math.max(0, Math.floor(Number(owned[cardId]) || 0));
      if (ownedCount <= 0) {
        return;
      }
      const allowed = Math.min(desired, ownedCount);
      normalized.push({ cardId, count: allowed, item });
    });
    normalized.sort((a, b) => {
      const rarityDiff = (rarityScore[b.item.rarity] ?? 0) - (rarityScore[a.item.rarity] ?? 0);
      if (rarityDiff !== 0) {
        return rarityDiff;
      }
      const setDiff = getSetOrderValue(a.item.setId) - getSetOrderValue(b.item.setId);
      if (setDiff !== 0) {
        return setDiff;
      }
      return a.item.name.localeCompare(b.item.name, "de");
    });
    const trimmed = {};
    let remaining = duelConfig.deckSize;
    normalized.forEach((entry) => {
      if (remaining <= 0) {
        return;
      }
      const allowed = Math.min(entry.count, remaining);
      if (allowed > 0) {
        trimmed[entry.cardId] = allowed;
        remaining -= allowed;
      }
    });
    const originalKeys = Object.keys(deck.cards);
    const trimmedKeys = Object.keys(trimmed);
    let changed = originalKeys.length !== trimmedKeys.length;
    if (!changed) {
      for (let i = 0; i < trimmedKeys.length; i += 1) {
        const key = trimmedKeys[i];
        if (deck.cards[key] !== trimmed[key]) {
          changed = true;
          break;
        }
      }
    }
    deck.cards = trimmed;
    return changed;
  }

  function generateDefaultDeckFromCollection() {
    const owned = collectionState.items ?? {};
    const pool = [];
    Object.entries(owned).forEach(([cardId, value]) => {
      const item = itemsById.get(cardId);
      if (!item) {
        return;
      }
      const count = Math.max(0, Math.floor(Number(value) || 0));
      for (let i = 0; i < count; i += 1) {
        pool.push(cardId);
      }
    });
    if (pool.length === 0) {
      return { name: "Arena-Starter", cards: {} };
    }
    const selection = shuffle(pool).slice(0, duelConfig.deckSize);
    const cards = {};
    selection.forEach((cardId) => {
      cards[cardId] = (cards[cardId] ?? 0) + 1;
    });
    return { name: "Arena-Starter", cards };
  }

  function sanitizeWorkingDeck(source) {
    const deck = { cards: cloneDeckCards(source) };
    clampDeckToOwned(deck);
    return deck.cards;
  }

  function getActiveDeckCardList() {
    const deck = collectionState.deck;
    if (!deck || !deck.cards || typeof deck.cards !== "object") {
      return [];
    }
    const entries = Object.entries(deck.cards)
      .map(([cardId, value]) => {
        const count = Math.max(0, Math.floor(Number(value) || 0));
        const item = itemsById.get(cardId);
        if (!item || count <= 0) {
          return undefined;
        }
        return { cardId, count, item };
      })
      .filter(Boolean);
    entries.sort((a, b) => {
      const costDiff = (a.item.cost ?? 0) - (b.item.cost ?? 0);
      if (costDiff !== 0) {
        return costDiff;
      }
      const rarityDiff = (rarityScore[b.item.rarity] ?? 0) - (rarityScore[a.item.rarity] ?? 0);
      if (rarityDiff !== 0) {
        return rarityDiff;
      }
      return a.item.name.localeCompare(b.item.name, "de");
    });
    const cards = [];
    entries.forEach((entry) => {
      for (let i = 0; i < entry.count; i += 1) {
        cards.push(entry.cardId);
      }
    });
    return cards;
  }

  function getSetOrderValue(setId) {
    if (setOrder.has(setId)) {
      return setOrder.get(setId);
    }
    return Number.MAX_SAFE_INTEGER;
  }

  function ensureCollectionStructure() {
    let mutated = false;
    if (!collectionState || typeof collectionState !== "object") {
      collectionState = { items: {} };
      mutated = true;
    }
    if (!collectionState.items || typeof collectionState.items !== "object") {
      collectionState.items = {};
      mutated = true;
    }
    if (!collectionState.deck || typeof collectionState.deck !== "object") {
      collectionState.deck = generateDefaultDeckFromCollection();
      mutated = true;
    }
    if (!collectionState.deck.cards || typeof collectionState.deck.cards !== "object") {
      collectionState.deck.cards = {};
      mutated = true;
    }
    const sanitizedName = sanitizeDeckName(collectionState.deck.name);
    if (collectionState.deck.name !== sanitizedName) {
      collectionState.deck.name = sanitizedName;
      mutated = true;
    }
    const adjusted = clampDeckToOwned(collectionState.deck);
    if (adjusted) {
      mutated = true;
    }
    return mutated;
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
    renderDeckBuilder();
    renderCollectionGallery();
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
      deck: node.querySelector(".duel-deck-count"),
      handCount: node.querySelector(".duel-hand-count"),
      boardCount: node.querySelector(".duel-board-count"),
      crystals: node.querySelector(".duel-crystals"),
      hero: node.querySelector("[data-duel-hero]"),
      board: node.querySelector("[data-duel-board]"),
      hand: node.querySelector("[data-duel-hand]"),
    }));

    if (dom.duelStart) {
      dom.duelStart.addEventListener("click", startDuel);
    }
    if (dom.duelEndTurn) {
      dom.duelEndTurn.addEventListener("click", endTurn);
    }
    if (dom.duelTargetCancel) {
      dom.duelTargetCancel.addEventListener("click", cancelTargetSelection);
    }
    if (dom.duelPlayers && dom.duelPlayers.length > 0) {
      dom.duelPlayers.forEach((entry, index) => {
        if (entry.hand) {
          entry.hand.addEventListener("click", (event) => handleHandClick(event, index));
        }
        if (entry.board) {
          entry.board.addEventListener("click", (event) => handleBoardClick(event, index));
        }
        if (entry.hero) {
          entry.hero.addEventListener("click", (event) => handleHeroClick(event, index));
        }
      });
    }

    renderDuel();
  }

  function createIdlePlayerState(name) {
    return {
      name,
      health: duelConfig.startingHealth,
      deck: [],
      hand: [],
      board: [],
      crystals: 0,
      maxCrystals: 0,
      startingDeck: [],
      deckName: sanitizeDeckName(collectionState.deck?.name ?? "Arena-Starter"),
    };
  }

  function createPlayerState(name) {
    const deckCards = buildDeck();
    return {
      name,
      health: duelConfig.startingHealth,
      deck: deckCards.slice(),
      hand: [],
      board: [],
      crystals: 0,
      maxCrystals: 0,
      startingDeck: deckCards.slice(),
      deckName: sanitizeDeckName(collectionState.deck?.name ?? "Arena-Starter"),
    };
  }

  function buildDeck() {
    const pool = [];
    const owned = collectionState.items ?? {};
    const deck = collectionState.deck ?? { cards: {} };
    Object.entries(deck.cards ?? {}).forEach(([cardId, value]) => {
      const item = itemsById.get(cardId);
      if (!item) {
        return;
      }
      const desired = Math.max(0, Math.floor(Number(value) || 0));
      if (desired <= 0) {
        return;
      }
      const ownedCount = Math.max(0, Math.floor(Number(owned[cardId]) || 0));
      if (ownedCount <= 0) {
        return;
      }
      const allowed = Math.min(desired, ownedCount);
      for (let i = 0; i < allowed; i += 1) {
        pool.push(cardId);
      }
    });
    if (pool.length === 0) {
      return [];
    }
    const shuffled = shuffle(pool);
    if (shuffled.length > duelConfig.deckSize) {
      return shuffled.slice(0, duelConfig.deckSize);
    }
    return shuffled;
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
    resetInteractionState();
    duelState.status = "active";
    duelState.players = duelDefaultNames.map((name) => createPlayerState(name));
    duelState.activePlayer = 0;
    duelState.turnCounter = 0;
    duelState.winner = undefined;
    duelState.nextUnitId = 1;
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
    duelState.players.forEach((player) => {
      const startingCount = player.startingDeck?.length ?? 0;
      const uniqueCount = new Set(player.startingDeck ?? []).size;
      const deckName = player.deckName && player.deckName.length > 0 ? `„${player.deckName}“` : undefined;
      if (startingCount === 0) {
        logDuel(
          `${player.name} hat kein gespeichertes Deck – baue eines in der Deck-Werkstatt, um anzutreten.`
        );
      } else if (startingCount < duelConfig.deckSize) {
        logDuel(
          `${player.name} spielt ${deckName ? `das Deck ${deckName}` : "sein aktives Deck"} mit ${startingCount}/${duelConfig.deckSize} Karten (${uniqueCount} einzigartig).`
        );
      } else {
        logDuel(
          `${player.name} bringt ${deckName ? `das Deck ${deckName}` : "sein aktives Deck"} mit ${startingCount} Karten (${uniqueCount} einzigartig) an den Start.`
        );
      }
    });
    beginTurn();
  }

  function resetInteractionState() {
    duelInteraction.mode = "idle";
    duelInteraction.sourcePlayer = undefined;
    duelInteraction.sourceUnitId = undefined;
    duelInteraction.pendingSpell = undefined;
    duelInteraction.targets = [];
    duelInteraction.targetKeys = new Set();
  }

  function setInteractionTargets(targets) {
    duelInteraction.targets = targets;
    duelInteraction.targetKeys = new Set(targets.map((target) => createTargetKey(target)));
  }

  function createTargetKey(target) {
    if (!target) {
      return "";
    }
    if (target.type === "unit") {
      return `unit:${target.playerIndex}:${target.unitId ?? target.unit?.instanceId ?? ""}`;
    }
    if (target.type === "hero") {
      return `hero:${target.playerIndex}`;
    }
    return "";
  }

  function isTargetKeyActive(target) {
    const key = createTargetKey(target);
    if (!key) {
      return false;
    }
    return duelInteraction.targetKeys.has(key);
  }

  function findInteractionTarget(type, playerIndex, unitId) {
    const key = createTargetKey({ type, playerIndex, unitId });
    return duelInteraction.targets.find((entry) => createTargetKey(entry) === key);
  }

  function beginTurn() {
    if (duelState.status !== "active") {
      renderDuel();
      return;
    }

    resetInteractionState();
    duelState.turnCounter += 1;
    const player = duelState.players[duelState.activePlayer];
    if (!player) {
      renderDuel();
      return;
    }

    player.maxCrystals = Math.min(duelConfig.maxCrystals, player.maxCrystals + 1);
    player.crystals = player.maxCrystals;
    readyBoardUnits(player);

    const drawn = drawCard(player);
    if (drawn) {
      logDuel(
        `${player.name} beginnt den Zug, zieht ${drawn.name} und verfügt über ${player.crystals}/${player.maxCrystals} Kristalle.`
      );
    } else {
      logDuel(`${player.name} beginnt den Zug, aber das Deck ist leer.`);
      checkDeckDefeat(duelState.activePlayer);
    }

    renderDuel();
  }

  function readyBoardUnits(player) {
    if (!player || !Array.isArray(player.board)) {
      return;
    }
    player.board.forEach((unit) => {
      if (unit && unit.health > 0) {
        unit.exhausted = false;
        unit.hasAttacked = false;
      }
    });
  }

  function endTurn() {
    if (duelState.status !== "active") {
      return;
    }
    const currentIndex = duelState.activePlayer;
    resetInteractionState();
    const player = duelState.players[currentIndex];
    if (player) {
      logDuel(`${player.name} beendet den Zug.`);
    }
    duelState.activePlayer = (currentIndex + 1) % duelState.players.length;
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
    if (duelInteraction.mode === "spell") {
      const pending = duelInteraction.pendingSpell;
      if (pending && pending.playerIndex === playerIndex && pending.cardIndex === cardIndex) {
        cancelSpellTargeting();
      }
      return;
    }
    if (duelInteraction.mode === "attack") {
      if (duelInteraction.sourcePlayer === playerIndex) {
        resetInteractionState();
      } else {
        return;
      }
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

    if (card.cardType === "spell") {
      const opponentIndex = (playerIndex + 1) % duelState.players.length;
      const targeting = getSpellTargetOptions(card, playerIndex, opponentIndex);
      if (targeting.requiresTarget && targeting.targets.length > 0) {
        beginSpellTargeting(playerIndex, cardIndex, card, targeting);
        return;
      }
    }

    if (card.cardType !== "spell" && player.board.length >= duelConfig.boardLimit) {
      logDuel(`${player.name} kann ${card.name} nicht spielen – das Feld ist voll.`);
      return;
    }

    player.crystals -= card.cost;
    player.hand.splice(cardIndex, 1);

    let summary = `${player.name} spielt ${card.name} für ${card.cost} Kristalle.`;
    if (card.cardType === "spell") {
      const opponentIndex = (playerIndex + 1) % duelState.players.length;
      const effectSummary = resolveSpell(card, playerIndex, opponentIndex);
      if (effectSummary) {
        summary += ` ${effectSummary}`;
      }
    } else {
      const summonSummary = summonUnit(card, playerIndex);
      if (summonSummary) {
        summary += ` ${summonSummary}`;
      }
    }

    logDuel(summary);
    checkDeckDefeat(playerIndex);
    checkDeckDefeat((playerIndex + 1) % duelState.players.length);
    renderDuel();
  }

  function beginSpellTargeting(playerIndex, cardIndex, card, targeting) {
    resetInteractionState();
    duelInteraction.mode = "spell";
    duelInteraction.pendingSpell = {
      playerIndex,
      cardIndex,
      cardId: card.id,
      card,
    };
    setInteractionTargets(targeting.targets);
    const player = duelState.players[playerIndex];
    if (player) {
      logDuel(`${player.name} kanalisiert ${card.name} – wähle ein Ziel.`);
    }
    renderDuel();
  }

  function cancelSpellTargeting() {
    if (duelInteraction.mode !== "spell") {
      return;
    }
    const pending = duelInteraction.pendingSpell;
    const player = pending ? duelState.players[pending.playerIndex] : undefined;
    if (player && pending?.card) {
      logDuel(`${player.name} bricht ${pending.card.name} ab.`);
    }
    resetInteractionState();
    renderDuel();
  }

  function cancelTargetSelection() {
    if (duelInteraction.mode === "spell") {
      cancelSpellTargeting();
      return;
    }
    if (duelInteraction.mode === "attack") {
      const attackerIndex = duelInteraction.sourcePlayer;
      const attackerUnitId = duelInteraction.sourceUnitId;
      const { player, unit } = findUnit(attackerIndex, attackerUnitId);
      if (player && unit) {
        logDuel(`${player.name} hält ${unit.name} vom Angriff zurück.`);
      }
      resetInteractionState();
      renderDuel();
    }
  }

  function resolvePendingSpell(target) {
    const pending = duelInteraction.pendingSpell;
    if (!pending) {
      return;
    }
    const { playerIndex, cardIndex, cardId, card } = pending;
    const player = duelState.players[playerIndex];
    if (!player || !card) {
      resetInteractionState();
      renderDuel();
      return;
    }
    let handIndex = cardIndex;
    if (player.hand[handIndex] !== cardId) {
      handIndex = player.hand.indexOf(cardId);
    }
    if (handIndex < 0) {
      resetInteractionState();
      renderDuel();
      return;
    }
    if (card.cost > player.crystals) {
      logDuel(`${player.name} kann ${card.name} nicht wirken – zu wenig Kristalle.`);
      resetInteractionState();
      renderDuel();
      return;
    }
    player.crystals -= card.cost;
    player.hand.splice(handIndex, 1);
    resetInteractionState();
    const opponentIndex = (playerIndex + 1) % duelState.players.length;
    let summary = `${player.name} spielt ${card.name} für ${card.cost} Kristalle.`;
    const effectSummary = resolveSpell(card, playerIndex, opponentIndex, target);
    if (effectSummary) {
      summary += ` ${effectSummary}`;
    }
    logDuel(summary);
    checkDeckDefeat(playerIndex);
    checkDeckDefeat(opponentIndex);
    renderDuel();
  }

  function getSpellTargetOptions(card, playerIndex, opponentIndex) {
    const effect = card.effect ?? {};
    const targets = [];
    let requiresTarget = false;
    switch (effect.type) {
      case "directDamage": {
        const opponent = duelState.players[opponentIndex];
        if (opponent) {
          requiresTarget = true;
          targets.push({ type: "hero", playerIndex: opponentIndex });
        }
        break;
      }
      case "enemyUnitDamage": {
        const opponent = duelState.players[opponentIndex];
        if (opponent) {
          const units = (opponent.board ?? []).filter((unit) => unit && unit.health > 0);
          units.forEach((unit) => {
            targets.push({ type: "unit", playerIndex: opponentIndex, unitId: unit.instanceId });
          });
          if (targets.length === 0) {
            targets.push({ type: "hero", playerIndex: opponentIndex });
          }
          requiresTarget = targets.length > 0;
        }
        break;
      }
      case "allyHeal": {
        const player = duelState.players[playerIndex];
        if (player) {
          const allies = (player.board ?? []).filter(
            (unit) => unit && unit.health > 0 && unit.health < unit.maxHealth
          );
          allies.forEach((unit) => {
            targets.push({ type: "unit", playerIndex, unitId: unit.instanceId });
          });
          if (player.health < duelConfig.startingHealth) {
            targets.push({ type: "hero", playerIndex });
          }
          requiresTarget = targets.length > 0;
        }
        break;
      }
      default:
        requiresTarget = false;
        break;
    }
    return { requiresTarget, targets };
  }

  function handleBoardClick(event, playerIndex) {
    const card = event.target.closest("[data-unit-id]");
    if (!card) {
      return;
    }
    const unitId = card.dataset.unitId;
    if (!unitId) {
      return;
    }
    if (duelInteraction.mode === "spell") {
      if (isTargetKeyActive({ type: "unit", playerIndex, unitId })) {
        const target = findInteractionTarget("unit", playerIndex, unitId);
        resolvePendingSpell(target);
      }
      return;
    }
    if (duelInteraction.mode === "attack") {
      if (duelInteraction.sourcePlayer === playerIndex) {
        if (duelInteraction.sourceUnitId === unitId) {
          resetInteractionState();
          renderDuel();
        } else {
          selectAttackingUnit(playerIndex, unitId);
        }
      } else if (isTargetKeyActive({ type: "unit", playerIndex, unitId })) {
        const target = findInteractionTarget("unit", playerIndex, unitId);
        resolveAttackTarget(target);
      }
      return;
    }
    if (duelState.status !== "active" || duelState.activePlayer !== playerIndex) {
      return;
    }
    selectAttackingUnit(playerIndex, unitId);
  }

  function handleHeroClick(event, playerIndex) {
    if (duelInteraction.mode === "spell") {
      if (isTargetKeyActive({ type: "hero", playerIndex })) {
        const target = findInteractionTarget("hero", playerIndex);
        resolvePendingSpell(target);
      }
      return;
    }
    if (duelInteraction.mode === "attack") {
      if (duelInteraction.sourcePlayer === playerIndex) {
        resetInteractionState();
        renderDuel();
      } else if (isTargetKeyActive({ type: "hero", playerIndex })) {
        const target = findInteractionTarget("hero", playerIndex);
        resolveAttackTarget(target);
      }
    }
  }

  function selectAttackingUnit(playerIndex, unitId) {
    if (duelState.status !== "active" || duelState.activePlayer !== playerIndex) {
      return;
    }
    const { player, unit } = findUnit(playerIndex, unitId);
    if (!player || !unit || unit.health <= 0) {
      return;
    }
    if (unit.exhausted || unit.attack <= 0) {
      return;
    }
    const targets = getAttackTargets(playerIndex, unit);
    if (targets.length === 0) {
      logDuel(`${player.name}s ${unit.name} hat derzeit keine gültigen Ziele.`);
      return;
    }
    resetInteractionState();
    duelInteraction.mode = "attack";
    duelInteraction.sourcePlayer = playerIndex;
    duelInteraction.sourceUnitId = unitId;
    duelInteraction.pendingSpell = undefined;
    setInteractionTargets(targets);
    renderDuel();
  }

  function getAttackTargets(playerIndex, unit) {
    const opponentIndex = (playerIndex + 1) % duelState.players.length;
    const opponent = duelState.players[opponentIndex];
    if (!opponent) {
      return [];
    }
    const targets = [];
    const enemyUnits = (opponent.board ?? []).filter((entry) => entry && entry.health > 0);
    const bulwarks = enemyUnits.filter((entry) => entry.bulwark);
    const candidates = bulwarks.length > 0 ? bulwarks : enemyUnits;
    candidates.forEach((enemy) => {
      targets.push({ type: "unit", playerIndex: opponentIndex, unitId: enemy.instanceId });
    });
    if (bulwarks.length === 0) {
      targets.push({ type: "hero", playerIndex: opponentIndex });
    }
    return targets;
  }

  function resolveAttackTarget(target) {
    if (!target) {
      return;
    }
    if (duelState.status !== "active") {
      resetInteractionState();
      renderDuel();
      return;
    }
    const attackerIndex = duelInteraction.sourcePlayer;
    const unitId = duelInteraction.sourceUnitId;
    const { player: attacker, unit } = findUnit(attackerIndex, unitId);
    if (!attacker || !unit || unit.health <= 0) {
      resetInteractionState();
      renderDuel();
      return;
    }
    resetInteractionState();
    const defenderIndex = target.playerIndex;
    const defender = duelState.players[defenderIndex];
    if (!defender) {
      renderDuel();
      return;
    }
    if (target.type === "hero") {
      const defenderHasBulwark = (defender.board ?? []).some(
        (entry) => entry && entry.health > 0 && entry.bulwark
      );
      if (defenderHasBulwark) {
        logDuel(
          `${defender.name} wird von einem Bollwerk beschützt – ${attacker.name}s ${unit.name} findet kein Ziel.`
        );
        renderDuel();
        return;
      }
      const damage = Math.max(0, unit.attack);
      logDuel(`${attacker.name}s ${unit.name} greift ${defender.name} an und verursacht ${damage} Schaden.`);
      const result = applyHeroDamage(defenderIndex, damage);
      unit.exhausted = true;
      unit.hasAttacked = true;
      if (result.actual > 0) {
        logDuel(`${defender.name} verbleiben ${defender.health} Lebenspunkte.`);
      }
      if (result.defeated) {
        finishDuel(attackerIndex, `${attacker.name} gewinnt die Arena!`);
        return;
      }
      renderDuel();
      return;
    }
    if (target.type === "unit") {
      const { unit: enemyUnit } = findUnit(defenderIndex, target.unitId);
      if (!enemyUnit || enemyUnit.health <= 0) {
        renderDuel();
        return;
      }
      logDuel(`${attacker.name}s ${unit.name} attackiert ${defender.name}s ${enemyUnit.name}.`);
      const strike = applyDamageToUnit(defenderIndex, enemyUnit, unit.attack);
      if (strike.actual > 0) {
        if (strike.destroyed) {
          logDuel(`${defender.name}s ${enemyUnit.name} wird zerstört.`);
          removeUnit(defenderIndex, enemyUnit);
        } else {
          logDuel(`${defender.name}s ${enemyUnit.name} verbleiben ${enemyUnit.health}/${enemyUnit.maxHealth} Leben.`);
        }
      } else {
        logDuel(`${enemyUnit.name} wird nicht verletzt.`);
      }
      if (enemyUnit.health > 0) {
        const retaliation = applyDamageToUnit(attackerIndex, unit, enemyUnit.attack);
        if (retaliation.actual > 0) {
          if (retaliation.destroyed) {
            logDuel(`${attacker.name}s ${unit.name} wird im Gegenschlag zerstört.`);
            removeUnit(attackerIndex, unit);
          } else {
            logDuel(`${attacker.name}s ${unit.name} verbleiben ${unit.health}/${unit.maxHealth} Leben.`);
          }
        }
      }
      if (unit.health > 0) {
        unit.exhausted = true;
        unit.hasAttacked = true;
      }
      checkDeckDefeat(defenderIndex);
      checkDeckDefeat(attackerIndex);
      renderDuel();
    }
  }

  function findUnit(playerIndex, unitId) {
    const player = duelState.players[playerIndex];
    if (!player || !Array.isArray(player.board)) {
      return { player: undefined, unit: undefined };
    }
    const unit = player.board.find((entry) => entry && entry.instanceId === unitId);
    return { player, unit };
  }

  function summonUnit(card, playerIndex) {
    const player = duelState.players[playerIndex];
    if (!player) {
      return undefined;
    }
    const attack = Math.max(0, card.damage ?? 0);
    const health = Math.max(1, card.health ?? 1);
    const unit = {
      instanceId: `u${duelState.nextUnitId}`,
      cardId: card.id,
      name: card.name,
      attack,
      health,
      maxHealth: health,
      bulwark: card.abilities?.includes("bulwark") ?? false,
      exhausted: true,
      hasAttacked: false,
    };
    duelState.nextUnitId += 1;
    player.board.push(unit);
    if (unit.bulwark) {
      return `Beschwört ein Bollwerk (${unit.attack}/${unit.maxHealth}).`;
    }
    return `Beschwört eine Einheit (${unit.attack}/${unit.maxHealth}).`;
  }

  function resolveSpell(card, playerIndex, opponentIndex, target) {
    const player = duelState.players[playerIndex];
    const opponent = duelState.players[opponentIndex];
    const effect = card.effect ?? {};
    const amount = effect.amount ?? card.damage ?? 0;

    switch (effect.type) {
      case "directDamage": {
        const heroIndex = target?.type === "hero" ? target.playerIndex : opponentIndex;
        const defender = duelState.players[heroIndex];
        if (!defender) {
          return undefined;
        }
        const result = applyHeroDamage(heroIndex, amount);
        if (result.actual > 0) {
          logDuel(`${defender.name} erleidet ${result.actual} Schaden (${defender.health} Lebenspunkte verbleiben).`);
        }
        if (result.defeated) {
          finishDuel(playerIndex, `${player?.name ?? "Der Angreifer"} gewinnt die Arena!`);
        }
        if (result.actual > 0) {
          return `${defender.name} erleidet ${result.actual} Schaden.`;
        }
        return `${defender.name} bleibt unverletzt.`;
      }
      case "enemyUnitDamage": {
        if (target?.type === "unit") {
          const defenderInfo = findUnit(target.playerIndex, target.unitId);
          const defenderUnit = defenderInfo.unit;
          const defenderPlayer = defenderInfo.player;
          if (!defenderUnit || !defenderPlayer) {
            logDuel(`${card.name} findet sein Ziel nicht mehr.`);
            return `Das Ziel ist nicht mehr im Spiel.`;
          }
          const strike = applyDamageToUnit(target.playerIndex, defenderUnit, amount);
          let description;
          if (strike.actual > 0) {
            if (strike.destroyed) {
              logDuel(`${card.name} zerstört ${defenderPlayer.name}s ${defenderUnit.name}.`);
              removeUnit(target.playerIndex, defenderUnit);
            } else {
              logDuel(`${card.name} fügt ${defenderPlayer.name}s ${defenderUnit.name} ${strike.actual} Schaden zu (${defenderUnit.health}/${defenderUnit.maxHealth}).`);
            }
            description = `${defenderPlayer.name}s ${defenderUnit.name} erleidet ${strike.actual} Schaden.`;
          } else {
            logDuel(`${card.name} zeigt keine Wirkung gegen ${defenderUnit.name}.`);
            description = `${defenderUnit.name} widersteht dem Zauber.`;
          }
          checkDeckDefeat(target.playerIndex);
          return description;
        }
        if (target?.type === "hero") {
          const defenderPlayer = duelState.players[target.playerIndex];
          if (!defenderPlayer) {
            return undefined;
          }
          const fallback = applyHeroDamage(target.playerIndex, amount);
          let description;
          if (fallback.actual > 0) {
            logDuel(`${card.name} trifft ${defenderPlayer.name} für ${fallback.actual} Schaden (${defenderPlayer.health} Lebenspunkte).`);
            description = `${defenderPlayer.name} erleidet ${fallback.actual} Schaden.`;
          } else {
            description = `${defenderPlayer.name} bleibt unverletzt.`;
          }
          if (fallback.defeated) {
            finishDuel(playerIndex, `${player?.name ?? "Der Angreifer"} gewinnt die Arena!`);
          }
          return description;
        }
        if (!opponent) {
          return undefined;
        }
        if (!opponent.board || opponent.board.length === 0) {
          const fallback = applyHeroDamage(opponentIndex, amount);
          if (fallback.actual > 0) {
            logDuel(`${card.name} trifft ${opponent.name} für ${fallback.actual} Schaden (${opponent.health} Lebenspunkte).`);
          }
          if (fallback.defeated) {
            finishDuel(playerIndex, `${player?.name ?? "Der Angreifer"} gewinnt die Arena!`);
          }
          return `Keine Karte im Feld – ${opponent.name} erleidet ${fallback.actual} Schaden.`;
        }
        const autoTarget = chooseEnemyUnitForSpell(opponent);
        if (!autoTarget) {
          return undefined;
        }
        const result = applyDamageToUnit(opponentIndex, autoTarget.unit, amount);
        if (result.actual > 0) {
          if (result.destroyed) {
            logDuel(`${card.name} zerstört ${opponent.name}s ${autoTarget.unit.name}.`);
            removeUnit(opponentIndex, autoTarget.unit);
          } else {
            logDuel(`${card.name} fügt ${opponent.name}s ${autoTarget.unit.name} ${result.actual} Schaden zu (${autoTarget.unit.health}/${autoTarget.unit.maxHealth}).`);
          }
        } else {
          logDuel(`${card.name} zeigt keine Wirkung gegen ${opponent.name}s ${autoTarget.unit.name}.`);
        }
        checkDeckDefeat(opponentIndex);
        return `Trifft eine gegnerische Karte für ${amount} Schaden.`;
      }
      case "damageAllEnemies": {
        if (!opponent) {
          return undefined;
        }
        if (!opponent.board || opponent.board.length === 0) {
          const fallback = applyHeroDamage(opponentIndex, amount);
          if (fallback.actual > 0) {
            logDuel(`${card.name} trifft ${opponent.name} für ${fallback.actual} Schaden (${opponent.health} Lebenspunkte verbleiben).`);
          }
          if (fallback.defeated) {
            finishDuel(playerIndex, `${player?.name ?? "Der Angreifer"} gewinnt die Arena!`);
          }
          return `Es gibt keine gegnerischen Karten – ${opponent.name} erleidet ${fallback.actual} Schaden.`;
        }
        opponent.board.slice().forEach((unit) => {
          const result = applyDamageToUnit(opponentIndex, unit, amount);
          if (result.actual > 0) {
            if (result.destroyed) {
              logDuel(`${card.name} lässt ${opponent.name}s ${unit.name} vergehen.`);
              removeUnit(opponentIndex, unit);
            } else {
              logDuel(`${card.name} trifft ${opponent.name}s ${unit.name} für ${result.actual} Schaden (${unit.health}/${unit.maxHealth}).`);
            }
          }
        });
        checkDeckDefeat(opponentIndex);
        return `Trifft alle gegnerischen Karten für ${amount} Schaden.`;
      }
      case "healHero": {
        const heroIndex = target?.type === "hero" ? target.playerIndex : playerIndex;
        const heroPlayer = duelState.players[heroIndex];
        if (!heroPlayer) {
          return undefined;
        }
        const healed = healHero(heroIndex, amount);
        if (healed > 0) {
          logDuel(`${card.name} heilt ${heroPlayer.name} um ${healed} Lebenspunkte (${heroPlayer.health} LP).`);
          return `Heilt ${heroPlayer.name} um ${healed} Lebenspunkte.`;
        }
        logDuel(`${card.name} verpufft – ${heroPlayer.name} ist bereits bei voller Gesundheit.`);
        return `${heroPlayer.name} ist bereits bei voller Gesundheit.`;
      }
      case "allyHeal": {
        if (target?.type === "unit") {
          const allyInfo = findUnit(target.playerIndex, target.unitId);
          const allyUnit = allyInfo.unit;
          const owner = allyInfo.player;
          if (!allyUnit || !owner) {
            logDuel(`${card.name} findet kein gültiges Verbündeten-Ziel.`);
            return `Keine Wirkung – das Ziel ist nicht mehr im Spiel.`;
          }
          const healedUnit = healUnit(allyUnit, amount);
          if (healedUnit > 0) {
            logDuel(`${card.name} heilt ${owner.name}s ${allyUnit.name} um ${healedUnit} Leben (${allyUnit.health}/${allyUnit.maxHealth}).`);
            return `Heilt ${allyUnit.name} um ${healedUnit} Leben.`;
          }
          logDuel(`${card.name} zeigt keine Wirkung auf ${allyUnit.name}.`);
          return `${allyUnit.name} ist bereits bei voller Gesundheit.`;
        }
        if (target?.type === "hero") {
          const heroPlayer = duelState.players[target.playerIndex];
          if (!heroPlayer) {
            return undefined;
          }
          const healedHero = healHero(target.playerIndex, amount);
          if (healedHero > 0) {
            logDuel(`${card.name} heilt ${heroPlayer.name} um ${healedHero} Lebenspunkte (${heroPlayer.health} LP).`);
            return `Heilt ${heroPlayer.name} um ${healedHero} Lebenspunkte.`;
          }
          logDuel(`${card.name} verpufft – ${heroPlayer.name} ist bereits bei voller Gesundheit.`);
          return `${heroPlayer.name} ist bereits bei voller Gesundheit.`;
        }
        const outcome = healAlly(playerIndex, amount, card.name);
        return outcome?.description ?? undefined;
      }
      default:
        return undefined;
    }
  }

  function chooseEnemyUnitForSpell(player) {
    if (!player || !Array.isArray(player.board) || player.board.length === 0) {
      return undefined;
    }
    let bulwarkUnit;
    let weakestUnit;
    player.board.forEach((unit) => {
      if (!unit || unit.health <= 0) {
        return;
      }
      if (unit.bulwark && !bulwarkUnit) {
        bulwarkUnit = unit;
      }
      if (!weakestUnit || unit.health < weakestUnit.health) {
        weakestUnit = unit;
      }
    });
    const target = bulwarkUnit ?? weakestUnit;
    if (!target) {
      return undefined;
    }
    return { unit: target };
  }

  function toPositiveInteger(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return 0;
    }
    return Math.max(0, Math.floor(numeric));
  }

  function applyDamageToUnit(playerIndex, unit, amount) {
    if (!unit) {
      return { actual: 0, destroyed: false };
    }
    const player = duelState.players[playerIndex];
    if (!player) {
      return { actual: 0, destroyed: false };
    }
    const damage = toPositiveInteger(amount);
    if (damage <= 0) {
      return { actual: 0, destroyed: false };
    }
    const currentHealth = Number(unit.health);
    if (!Number.isFinite(currentHealth) || currentHealth <= 0) {
      return { actual: 0, destroyed: false };
    }
    const actual = Math.min(currentHealth, damage);
    if (actual <= 0) {
      return { actual: 0, destroyed: false };
    }
    const remaining = Math.max(0, currentHealth - actual);
    unit.health = remaining;
    return { actual, destroyed: remaining <= 0 };
  }

  function removeUnit(playerIndex, targetUnit) {
    const player = duelState.players[playerIndex];
    if (!player || !Array.isArray(player.board)) {
      return;
    }
    const index = player.board.indexOf(targetUnit);
    if (index >= 0) {
      player.board.splice(index, 1);
    }
  }

  function applyHeroDamage(playerIndex, amount) {
    const player = duelState.players[playerIndex];
    if (!player) {
      return { actual: 0, defeated: false };
    }
    const damage = toPositiveInteger(amount);
    if (damage <= 0) {
      return { actual: 0, defeated: false };
    }
    const currentHealth = Number(player.health);
    if (!Number.isFinite(currentHealth) || currentHealth <= 0) {
      return { actual: 0, defeated: false };
    }
    const actual = Math.min(currentHealth, damage);
    if (actual <= 0) {
      return { actual: 0, defeated: false };
    }
    const remaining = Math.max(0, currentHealth - actual);
    player.health = remaining;
    return { actual, defeated: remaining <= 0 };
  }

  function healHero(playerIndex, amount) {
    const player = duelState.players[playerIndex];
    if (!player) {
      return 0;
    }
    const healing = toPositiveInteger(amount);
    if (healing <= 0) {
      return 0;
    }
    const currentHealth = Number(player.health);
    const safeHealth = Number.isFinite(currentHealth) ? currentHealth : 0;
    const missing = Math.max(0, duelConfig.startingHealth - safeHealth);
    const actual = Math.min(missing, healing);
    if (actual <= 0) {
      return 0;
    }
    player.health = Math.min(duelConfig.startingHealth, safeHealth + actual);
    return actual;
  }

  function healUnit(unit, amount) {
    if (!unit) {
      return 0;
    }
    const healing = toPositiveInteger(amount);
    if (healing <= 0) {
      return 0;
    }
    const currentHealth = Number(unit.health);
    const maxHealth = Number(unit.maxHealth);
    if (!Number.isFinite(maxHealth)) {
      return 0;
    }
    const safeHealth = Number.isFinite(currentHealth) ? currentHealth : maxHealth;
    const missing = Math.max(0, maxHealth - safeHealth);
    const actual = Math.min(missing, healing);
    if (actual <= 0) {
      return 0;
    }
    unit.health = Math.min(maxHealth, safeHealth + actual);
    return actual;
  }

  function healAlly(playerIndex, amount, sourceName) {
    const player = duelState.players[playerIndex];
    if (!player) {
      return {};
    }
    let targetUnit;
    let missingMost = 0;
    player.board.forEach((unit) => {
      if (!unit) {
        return;
      }
      const missing = unit.maxHealth - unit.health;
      if (missing > missingMost) {
        missingMost = missing;
        targetUnit = unit;
      }
    });
    if (targetUnit && missingMost > 0) {
      const healed = healUnit(targetUnit, amount);
      if (healed > 0) {
        logDuel(`${sourceName} heilt ${player.name}s ${targetUnit.name} um ${healed} Leben (${targetUnit.health}/${targetUnit.maxHealth}).`);
        return { description: `Stärkt ${targetUnit.name} um ${healed} Leben.` };
      }
    }
    const healedHero = healHero(playerIndex, amount);
    if (healedHero > 0) {
      logDuel(`${sourceName} heilt ${player.name} um ${healedHero} Lebenspunkte (${player.health} LP).`);
      return { description: `Heilt ${player.name} um ${healedHero} Lebenspunkte.` };
    }
    logDuel(`${sourceName} hat keine Wirkung – alle Verbündeten sind bei voller Gesundheit.`);
    return { description: `Keine Wirkung – alles ist bereits geheilt.` };
  }

  function checkDeckDefeat(playerIndex) {
    if (duelState.status !== "active") {
      return false;
    }
    const player = duelState.players[playerIndex];
    if (!player) {
      return false;
    }
    const deckCount = player.deck?.length ?? 0;
    const handCount = player.hand?.length ?? 0;
    const boardCount = player.board?.length ?? 0;
    if (deckCount + handCount + boardCount > 0) {
      return false;
    }
    const opponentIndex = (playerIndex + 1) % duelState.players.length;
    const opponentName = duelState.players[opponentIndex]?.name ?? "Der Gegner";
    finishDuel(opponentIndex, `${player.name} hat keine Karten mehr – ${opponentName} gewinnt die Arena!`);
    return true;
  }

  function finishDuel(winnerIndex, message) {
    if (duelState.status === "finished") {
      return;
    }
    resetInteractionState();
    duelState.status = "finished";
    duelState.winner = winnerIndex;
    if (message) {
      logDuel(message);
    } else {
      renderDuelLog();
    }
    renderDuel();
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
        if (entry.deck) {
          entry.deck.textContent = String(player.deck ? player.deck.length : 0);
        }
        if (entry.handCount) {
          entry.handCount.textContent = String(player.hand ? player.hand.length : 0);
        }
        if (entry.boardCount) {
          entry.boardCount.textContent = String(player.board ? player.board.length : 0);
        }
        if (entry.root) {
          const isActive = duelState.status === "active" && duelState.activePlayer === index;
          const isWinner = duelState.status === "finished" && duelState.winner === index;
          const isDefeated = duelState.status === "finished" && duelState.winner != null && duelState.winner !== index;
          entry.root.classList.toggle("is-active", isActive);
          entry.root.classList.toggle("is-winner", isWinner);
          entry.root.classList.toggle("is-defeated", isDefeated);
        }
        renderPlayerHero(entry.hero, player, index);
        renderCrystals(entry.crystals, player);
        renderPlayerBoard(entry.board, player, index);
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

    renderDeckList();
    renderTargetPanel();
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

  function renderPlayerHero(element, player, playerIndex) {
    if (!element) {
      return;
    }
    const name = player?.name ?? `Sammler ${playerIndex + 1}`;
    element.dataset.playerIndex = String(playerIndex);
    const healthValue = element.querySelector(".duel-health-value");
    if (healthValue) {
      healthValue.textContent = String(player?.health ?? 0);
    }
    const targetable = isTargetKeyActive({ type: "hero", playerIndex });
    element.classList.toggle("is-targetable", targetable);
    element.disabled = !targetable;
    element.setAttribute("aria-label", `${name} mit ${player?.health ?? 0} Lebenspunkten`);
  }

  function renderPlayerBoard(container, player, playerIndex) {
    if (!container) {
      return;
    }
    container.innerHTML = "";
    const board = player?.board ?? [];
    if (board.length === 0) {
      const placeholder = document.createElement("p");
      placeholder.className = "duel-board-empty";
      if (duelState.status === "finished") {
        placeholder.textContent = "Keine Karten mehr im Spiel.";
      } else if (duelState.status === "active" && duelState.activePlayer === playerIndex) {
        placeholder.textContent = "Keine Karten im Spiel – beschwöre neue Verbündete.";
      } else {
        placeholder.textContent = "Noch keine Karten im Spiel.";
      }
      container.append(placeholder);
      return;
    }

    board.forEach((unit) => {
      const card = document.createElement("article");
      card.className = "duel-board-card";
      if (unit?.instanceId) {
        card.dataset.unitId = unit.instanceId;
      }
      if (unit?.bulwark) {
        card.classList.add("is-bulwark");
      }
      if (unit?.exhausted) {
        card.classList.add("is-exhausted");
      }

      const isTargetable = isTargetKeyActive({ type: "unit", playerIndex, unitId: unit?.instanceId });
      const isSelectedAttacker =
        duelInteraction.mode === "attack" &&
        duelInteraction.sourcePlayer === playerIndex &&
        duelInteraction.sourceUnitId === unit?.instanceId;
      const canAttack =
        duelState.status === "active" &&
        duelState.activePlayer === playerIndex &&
        duelInteraction.mode !== "spell" &&
        unit &&
        unit.health > 0 &&
        !unit.exhausted &&
        (unit.attack ?? 0) > 0;

      if (canAttack) {
        card.classList.add("is-selectable");
      }
      if (isSelectedAttacker) {
        card.classList.add("is-selected");
      }
      if (isTargetable) {
        card.classList.add("is-targetable");
      }

      const header = document.createElement("header");
      header.className = "duel-board-card-header";
      const name = document.createElement("strong");
      name.textContent = unit?.name ?? "Unbekannt";
      header.append(name);
      if (unit?.bulwark) {
        const tag = document.createElement("span");
        tag.className = "duel-tag";
        tag.textContent = "Bollwerk";
        header.append(tag);
      }

      const stats = document.createElement("div");
      stats.className = "duel-board-card-stats";
      const attackValue = Math.max(0, unit?.attack ?? 0);
      const healthValue = Math.max(0, unit?.health ?? 0);
      const maxValue = Math.max(0, unit?.maxHealth ?? healthValue);
      stats.innerHTML = `
        <span><em>Angriff</em><strong>${attackValue}</strong></span>
        <span><em>Leben</em><strong>${healthValue}/${maxValue}</strong></span>
      `;

      card.append(header, stats);
      container.append(card);
    });
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

      if (item?.cardType === "spell") {
        button.classList.add("is-spell");
      }

      const boardCount = player?.board?.length ?? 0;
      const boardFull = item?.cardType !== "spell" && boardCount >= duelConfig.boardLimit;
      const playable =
        duelState.status === "active" &&
        duelState.activePlayer === playerIndex &&
        item &&
        item.cost <= player.crystals &&
        !boardFull;
      if (!playable) {
        button.disabled = true;
      } else {
        button.classList.add("is-playable");
      }

      const pendingSpell = duelInteraction.mode === "spell" ? duelInteraction.pendingSpell : undefined;
      if (pendingSpell) {
        const isPending = pendingSpell.playerIndex === playerIndex && pendingSpell.cardIndex === index;
        if (isPending) {
          button.classList.add("is-selected");
          button.disabled = false;
        } else {
          button.disabled = true;
          button.classList.remove("is-playable");
        }
      }

      const cost = document.createElement("span");
      cost.className = "duel-card-cost";
      cost.textContent = item ? String(item.cost) : "?";

      const body = document.createElement("div");
      body.className = "duel-card-body";
      const title = document.createElement("strong");
      title.textContent = item ? item.name : "Unbekannt";
      body.append(title);

      const meta = document.createElement("span");
      meta.className = "duel-card-meta";
      if (item) {
        const typeParts = [];
        if (item.cardType === "spell") {
          typeParts.push("Zauber");
        } else {
          typeParts.push("Einheit");
          typeParts.push(`${item.damage} Angriff`);
          typeParts.push(`${item.health} Leben`);
          if (Array.isArray(item.abilities) && item.abilities.includes("bulwark")) {
            typeParts.push("Bollwerk");
          }
        }
        meta.textContent = typeParts.join(" · ");
        const tooltipParts = [`Kosten ${item.cost}`];
        if (item.cardType === "spell" && item.text) {
          tooltipParts.push(item.text);
        } else if (item.cardType === "unit") {
          tooltipParts.push(`${item.damage} Angriff`);
          tooltipParts.push(`${item.health} Leben`);
          if (Array.isArray(item.abilities) && item.abilities.includes("bulwark")) {
            tooltipParts.push("Bollwerk");
          }
        }
        if (boardFull && item.cardType !== "spell") {
          tooltipParts.push("Kein Platz auf dem Feld");
        }
        button.title = `${item.name} – ${tooltipParts.join(", ")}`;
      } else {
        meta.textContent = "Unbekannte Karte";
        button.title = "Unbekannte Karte";
      }

      body.append(meta);

      if (item?.text) {
        const text = document.createElement("span");
        text.className = "duel-card-text";
        text.textContent = item.text;
        body.append(text);
      }

      button.append(cost, body);
      container.append(button);
    });
  }

  function describeTarget(target) {
    if (!target) {
      return "Ziel";
    }
    if (target.type === "hero") {
      const player = duelState.players[target.playerIndex];
      if (!player) {
        return "Held";
      }
      const health = Math.max(0, player.health ?? 0);
      return `${player.name} – Held (${health} LP)`;
    }
    if (target.type === "unit") {
      const { player, unit } = findUnit(target.playerIndex, target.unitId);
      if (!player || !unit) {
        return "Feldkarte";
      }
      const attack = Math.max(0, unit.attack ?? 0);
      const currentHealth = Math.max(0, unit.health ?? 0);
      const maxHealth = Math.max(currentHealth, unit.maxHealth ?? currentHealth);
      return `${player.name}: ${unit.name} (${attack} ANG · ${currentHealth}/${maxHealth} LP)`;
    }
    return "Ziel";
  }

  function summarizeDeckCards(cards) {
    const counts = new Map();
    cards.forEach((id) => {
      if (!id) {
        return;
      }
      counts.set(id, (counts.get(id) ?? 0) + 1);
    });
    const entries = [];
    counts.forEach((count, id) => {
      const item = itemsById.get(id);
      if (item) {
        entries.push({ item, count });
      }
    });
    entries.sort((a, b) => {
      const costDiff = (a.item.cost ?? 0) - (b.item.cost ?? 0);
      if (costDiff !== 0) {
        return costDiff;
      }
      const rarityDiff = (rarityScore[a.item.rarity] ?? 0) - (rarityScore[b.item.rarity] ?? 0);
      if (rarityDiff !== 0) {
        return rarityDiff;
      }
      return a.item.name.localeCompare(b.item.name, "de");
    });
    return entries;
  }

  function renderDeckList() {
    if (!dom.duelDecklist) {
      return;
    }
    const container = dom.duelDecklist;
    container.innerHTML = "";
    const players = duelState.players ?? [];
    let hasContent = false;
    players.forEach((player, index) => {
      const section = document.createElement("section");
      section.className = "duel-decklist-section";

      const heading = document.createElement("h4");
      heading.textContent = player?.name ?? `Sammler ${index + 1}`;
      section.append(heading);

      const activeDeckCards =
        player?.startingDeck && player.startingDeck.length > 0
          ? player.startingDeck
          : getActiveDeckCardList();
      const total = activeDeckCards.length;
      const uniqueCount = new Set(activeDeckCards).size;
      const resolvedDeckName = sanitizeDeckName(
        (player?.deckName && player.deckName.length > 0 ? player.deckName : collectionState.deck?.name) ?? ""
      );
      if (resolvedDeckName) {
        const deckTitle = document.createElement("p");
        deckTitle.className = "duel-decklist-label";
        deckTitle.textContent = `Deck: ${resolvedDeckName}`;
        section.append(deckTitle);
      }
      const summary = document.createElement("p");
      summary.className = "duel-decklist-summary";
      if (total === 0) {
        summary.textContent = "Kein aktives Deck – baue eines in der Deck-Werkstatt.";
      } else {
        summary.textContent = `${total}/${duelConfig.deckSize} Karten · ${uniqueCount} einzigartig`;
        hasContent = true;
      }
      section.append(summary);

      const list = document.createElement("ul");
      list.className = "duel-decklist-items";
      const entries = summarizeDeckCards(activeDeckCards);
      if (entries.length === 0) {
        const empty = document.createElement("li");
        empty.className = "duel-decklist-empty";
        empty.textContent = "Sammle Karten und speichere dein Deck, um die Arena zu betreten.";
        list.append(empty);
      } else {
        entries.forEach(({ item, count }) => {
          const row = document.createElement("li");
          row.className = "duel-decklist-entry";

          const countBadge = document.createElement("span");
          countBadge.className = "duel-decklist-count";
          countBadge.textContent = `×${count}`;

          const name = document.createElement("span");
          name.className = "duel-decklist-name";
          name.textContent = item.name;

          const meta = document.createElement("span");
          meta.className = "duel-decklist-meta";
          const metaParts = [`${item.cost} Kosten`];
          if (item.cardType === "spell") {
            metaParts.push("Zauber");
            if (item.effect?.amount && typeof item.effect.amount === "number") {
              switch (item.effect.type) {
                case "directDamage":
                  metaParts.push(`${item.effect.amount} Schaden am Helden`);
                  break;
                case "enemyUnitDamage":
                  metaParts.push(`${item.effect.amount} Schaden an Einheiten`);
                  break;
                case "damageAllEnemies":
                  metaParts.push(`${item.effect.amount} Flächenschaden`);
                  break;
                case "healHero":
                  metaParts.push(`Heilung ${item.effect.amount}`);
                  break;
                case "allyHeal":
                  metaParts.push(`Heilung ${item.effect.amount}`);
                  break;
                default:
                  break;
              }
            }
          } else {
            metaParts.push(`${item.damage} Angriff`);
            metaParts.push(`${item.health} Leben`);
            if (Array.isArray(item.abilities) && item.abilities.includes("bulwark")) {
              metaParts.push("Bollwerk");
            }
          }
          meta.textContent = metaParts.join(" · ");

          row.append(countBadge, name, meta);
          list.append(row);
        });
      }

      section.append(list);
      container.append(section);
    });

    if (!container.hasChildNodes()) {
      const placeholder = document.createElement("p");
      placeholder.className = "duel-decklist-empty";
      placeholder.textContent = "Starte ein Match, um deine Deckliste zu sehen.";
      container.append(placeholder);
    }

    if (dom.duelDecklistRoot) {
      dom.duelDecklistRoot.classList.toggle("is-empty", !hasContent);
      if (!hasContent) {
        dom.duelDecklistRoot.open = false;
      }
    }
  }

  function renderTargetPanel() {
    if (!dom.duelTargetPanel) {
      return;
    }
    const isInteractiveMode = duelInteraction.mode === "attack" || duelInteraction.mode === "spell";
    const targets = duelInteraction.targets ?? [];
    if (!isInteractiveMode || targets.length === 0) {
      dom.duelTargetPanel.classList.remove("is-visible");
      if (dom.duelTargetList) {
        dom.duelTargetList.innerHTML = "";
      }
      if (dom.duelTargetMessage) {
        dom.duelTargetMessage.textContent =
          "Wähle eine Karte deiner Seite, um einen Angriff oder Zauber zu beginnen.";
      }
      if (dom.duelTargetCancel) {
        dom.duelTargetCancel.hidden = true;
        dom.duelTargetCancel.disabled = true;
      }
      return;
    }

    dom.duelTargetPanel.classList.add("is-visible");

    const heroAvailable = targets.some((target) => target.type === "hero");
    const unitAvailable = targets.some((target) => target.type === "unit");
    let message;
    if (duelInteraction.mode === "attack") {
      if (heroAvailable && unitAvailable) {
        message = "Wähle das Ziel für deinen Angriff – Held oder Feldkarte.";
      } else if (heroAvailable) {
        message = "Wähle den gegnerischen Helden als Ziel deines Angriffs.";
      } else {
        message = "Wähle die gegnerische Feldkarte, die angegriffen werden soll.";
      }
    } else if (heroAvailable && unitAvailable) {
      message = "Wähle das Ziel für deinen Zauber.";
    } else if (heroAvailable) {
      message = "Wähle den Helden, der vom Zauber betroffen sein soll.";
    } else {
      message = "Wähle die Karte, auf die der Zauber gewirkt wird.";
    }
    if (dom.duelTargetMessage) {
      dom.duelTargetMessage.textContent = message;
    }

    if (dom.duelTargetList) {
      dom.duelTargetList.innerHTML = "";
      targets.forEach((target) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "duel-target-option";
        button.setAttribute("role", "listitem");
        button.textContent = describeTarget(target);
        button.addEventListener("click", () => {
          if (duelInteraction.mode === "attack") {
            resolveAttackTarget(target);
          } else if (duelInteraction.mode === "spell") {
            resolvePendingSpell(target);
          }
        });
        dom.duelTargetList.append(button);
      });
    }

    if (dom.duelTargetCancel) {
      dom.duelTargetCancel.hidden = false;
      dom.duelTargetCancel.disabled = false;
      dom.duelTargetCancel.textContent =
        duelInteraction.mode === "spell" ? "Zauber abbrechen" : "Angriff abbrechen";
    }
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
