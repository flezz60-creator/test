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
    { id: "aurora-scribe", name: "Aurora Scribe", rarity: "common", setId: "celestial" },
    { id: "lumen-oracle", name: "Lumen Oracle", rarity: "common", setId: "celestial" },
    { id: "starlit-vanguard", name: "Starlit Vanguard", rarity: "common", setId: "celestial" },
    { id: "echo-wanderer", name: "Echo Wanderer", rarity: "common", setId: "celestial" },
    { id: "astral-herald", name: "Astral Herald", rarity: "common", setId: "celestial" },
    { id: "nebula-mender", name: "Nebula Mender", rarity: "uncommon", setId: "celestial" },
    { id: "rift-cartographer", name: "Rift Cartographer", rarity: "uncommon", setId: "celestial" },
    { id: "sunscale-sentinel", name: "Sunscale Sentinel", rarity: "uncommon", setId: "celestial" },
    { id: "nova-chronicler", name: "Nova Chronicler", rarity: "rare", setId: "celestial" },
    { id: "zenith-guardian", name: "Zenith Guardian", rarity: "rare", setId: "celestial" },
    { id: "moonweaver-seraph", name: "Moonweaver Seraph", rarity: "epic", setId: "celestial" },
    { id: "aether-crown", name: "Aether Crown", rarity: "legendary", setId: "celestial" },
    {
      id: "ember-solstice-phoenix",
      name: "Ember Solstice Phoenix",
      rarity: "legendary",
      setId: "celestial",
      isLimited: true,
    },
    // Clockwork Depths
    { id: "cogwhisper-sprite", name: "Cogwhisper Sprite", rarity: "common", setId: "clockwork" },
    { id: "emberplated-scout", name: "Emberplated Scout", rarity: "common", setId: "clockwork" },
    { id: "copper-harvester", name: "Copper Harvester", rarity: "common", setId: "clockwork" },
    { id: "gearworn-scribe", name: "Gearworn Scribe", rarity: "common", setId: "clockwork" },
    { id: "chronomancer-apprentice", name: "Chronomancer Apprentice", rarity: "uncommon", setId: "clockwork" },
    { id: "steamwright-mediator", name: "Steamwright Mediator", rarity: "uncommon", setId: "clockwork" },
    { id: "gilded-engine", name: "Gilded Engine", rarity: "rare", setId: "clockwork" },
    { id: "void-chimes", name: "Void Chimes", rarity: "rare", setId: "clockwork" },
    { id: "apex-colossus", name: "Apex Colossus", rarity: "epic", setId: "clockwork" },
    { id: "heart-of-mechanis", name: "Heart of Mechanis", rarity: "legendary", setId: "clockwork" },
    // Wildwood Spirits
    { id: "mossborn-keeper", name: "Mossborn Keeper", rarity: "common", setId: "wildwood" },
    { id: "petal-warden", name: "Petal Warden", rarity: "common", setId: "wildwood" },
    { id: "glimmer-fox", name: "Glimmer Fox", rarity: "common", setId: "wildwood" },
    { id: "embercap-shaman", name: "Embercap Shaman", rarity: "uncommon", setId: "wildwood" },
    { id: "thornborn-stalker", name: "Thornborn Stalker", rarity: "uncommon", setId: "wildwood" },
    { id: "luminous-hart", name: "Luminous Hart", rarity: "rare", setId: "wildwood" },
    { id: "spirit-of-canopy", name: "Spirit of the Canopy", rarity: "epic", setId: "wildwood" },
    { id: "ancient-treant", name: "Ancient Treant", rarity: "legendary", setId: "wildwood" },
  ];

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

    populatePackSelect();
    renderSetCards();
    updateCollectionUI();
    updateDailyLoginUI();
    setupEventCountdown();
    updateHeroStats();
    handlePackSelection();

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
    card.innerHTML = `
      <span>${rarityLabel}</span>
      <strong>${item.name}</strong>
      <p class="card-set">${set ? set.name : ""}</p>
    `;
    if (options?.quantity && options.quantity > 1) {
      const qty = document.createElement("span");
      qty.className = "card-qty";
      qty.textContent = `×${options.quantity}`;
      card.append(qty);
    }
    if (item.isLimited) {
      const tag = document.createElement("span");
      tag.className = "tag limited";
      tag.textContent = "Event Limited";
      card.append(tag);
    }
    return card;
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
