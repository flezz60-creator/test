const configOptions = {
    cpu: [
        {
            id: "intel-i5",
            name: "Intel Core i5-13400F",
            price: 259,
            description: "12 Kerne, Turbo bis 4,6 GHz – effizient für Büro & Allround",
        },
        {
            id: "amd-r5",
            name: "AMD Ryzen 5 7600",
            price: 289,
            description: "6 Kerne, PCIe 5.0 – starke Single-Core-Leistung für Kreative",
        },
        {
            id: "intel-i7",
            name: "Intel Core i7-13700K",
            price: 449,
            description: "16 Kerne, Turbo bis 5,4 GHz – für anspruchsvolle Workloads",
        },
        {
            id: "amd-r9",
            name: "AMD Ryzen 9 7900X",
            price: 549,
            description: "12 Kerne, AM5 – maximale Multicore-Power für Rendering",
        },
    ],
    gpu: [
        {
            id: "intel-uhd",
            name: "Onboard Grafik (Intel UHD 770)",
            price: 0,
            description: "Für Office-Anwendungen und Signage ausreichend",
        },
        {
            id: "rtx-4060",
            name: "NVIDIA GeForce RTX 4060 8GB",
            price: 369,
            description: "Raytracing & DLSS 3 – ideal für Full-HD/1440p Gaming",
        },
        {
            id: "rtx-4070",
            name: "NVIDIA GeForce RTX 4070 Ti 12GB",
            price: 879,
            description: "High-End Grafik für VR, 4K Gaming & Design",
        },
        {
            id: "rtx-a4000",
            name: "NVIDIA RTX A4000 16GB",
            price: 1199,
            description: "Professionelle Workstation-GPU für CAD & 3D",
        },
    ],
    ram: [
        {
            id: "ram-16",
            name: "16 GB DDR5-5600 (2×8 GB)",
            price: 89,
            description: "Dual-Channel, ideal für Office & leichte Kreativarbeit",
        },
        {
            id: "ram-32",
            name: "32 GB DDR5-6000 (2×16 GB)",
            price: 159,
            description: "Ausreichend für Gaming, Multitasking und Content Creation",
        },
        {
            id: "ram-64",
            name: "64 GB DDR5-6000 (2×32 GB)",
            price: 329,
            description: "Für große Projekte, VMs und Rendering-Workflows",
        },
    ],
    storage: [
        {
            id: "storage-1tb",
            name: "1 TB NVMe SSD (PCIe 4.0)",
            price: 129,
            description: "7.000 MB/s Lesen – perfekt für Betriebssystem & Projekte",
        },
        {
            id: "storage-2tb",
            name: "2 TB NVMe SSD (PCIe 4.0)",
            price: 199,
            description: "Großer, schneller Speicher für Medien & Backups",
        },
        {
            id: "storage-hybrid",
            name: "1 TB NVMe SSD + 4 TB HDD",
            price: 249,
            description: "Kombination aus Geschwindigkeit und viel Platz",
        },
    ],
    service: [
        {
            id: "service-none",
            name: "Ohne Servicepaket",
            price: 0,
            monthly: 0,
            description: "Selbstverwaltung, Hardware wird aufgebaut und getestet",
        },
        {
            id: "service-basic",
            name: "Fernwartung Basic",
            price: 119,
            monthly: 29,
            description: "Remote-Wartung, Sicherheitsupdates, Helpdesk (8/5)",
        },
        {
            id: "service-premium",
            name: "Managed Service Premium",
            price: 199,
            monthly: 49,
            description: "Priorisierter Support, Vor-Ort-Einsätze, Monitoring",
        },
        {
            id: "service-ultimate",
            name: "Full Care 24/7",
            price: 349,
            monthly: 89,
            description: "24/7 Bereitschaft, Austauschgeräte & SLA &lt; 2 Std.",
        },
    ],
};

const scenarioPresets = {
    office: {
        cpu: "intel-i5",
        gpu: "intel-uhd",
        ram: "ram-16",
        storage: "storage-1tb",
        service: "service-basic",
    },
    gaming: {
        cpu: "intel-i7",
        gpu: "rtx-4070",
        ram: "ram-32",
        storage: "storage-2tb",
        service: "service-premium",
    },
    creator: {
        cpu: "amd-r9",
        gpu: "rtx-a4000",
        ram: "ram-64",
        storage: "storage-hybrid",
        service: "service-ultimate",
    },
};

const summaryTotalElement = document.getElementById("summary-total");
const summaryServiceElement = document.getElementById("summary-service");
const summaryListElement = document.getElementById("summary-list");

const formatter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
});

function formatPrice(value) {
    return formatter.format(value);
}

function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "Bitte wählen";
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);

    options.forEach((option) => {
        const el = document.createElement("option");
        el.value = option.id;
        el.textContent = `${option.name} — ${formatPrice(option.price)}`;
        el.dataset.price = option.price;
        if (option.monthly) {
            el.dataset.monthly = option.monthly;
        }
        el.dataset.description = option.description;
        select.appendChild(el);
    });
}

function populateAllSelects() {
    populateSelect("cpu", configOptions.cpu);
    populateSelect("gpu", configOptions.gpu);
    populateSelect("ram", configOptions.ram);
    populateSelect("storage", configOptions.storage);
    populateSelect("service", configOptions.service);
}

function findOption(category, id) {
    return configOptions[category]?.find((item) => item.id === id) ?? null;
}

function updateSummary() {
    let total = 0;
    let monthly = 0;
    summaryListElement.innerHTML = "";

    const fields = ["cpu", "gpu", "ram", "storage", "service"];

    fields.forEach((field) => {
        const select = document.getElementById(field);
        if (!select || !select.value) {
            return;
        }
        const option = findOption(field, select.value);
        if (!option) {
            return;
        }
        total += option.price;
        monthly += option.monthly ?? 0;

        const item = document.createElement("li");
        const description = option.description ? `<small>${option.description}</small>` : "";
        item.innerHTML = `<span>${option.name}${description}</span><strong>${formatPrice(option.price)}</strong>`;
        summaryListElement.appendChild(item);
    });

    if (!summaryListElement.childElementCount) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "Bitte wählen Sie Komponenten, um eine Preisübersicht zu erhalten.";
        emptyMessage.className = "summary-empty";
        summaryListElement.appendChild(emptyMessage);
    }

    summaryTotalElement.textContent = formatPrice(total);
    summaryServiceElement.textContent = monthly ? `${formatPrice(monthly)} / Monat` : "0 €";
}

function applyPreset(presetId) {
    const preset = scenarioPresets[presetId];
    if (!preset) return;

    Object.entries(preset).forEach(([key, value]) => {
        const select = document.getElementById(key);
        if (select) {
            select.value = value;
        }
    });

    updateSummary();
}

function collectSelectionSummary() {
    const fields = ["cpu", "gpu", "ram", "storage", "service"];
    const lines = [];

    fields.forEach((field) => {
        const select = document.getElementById(field);
        if (!select || !select.value) {
            return;
        }
        const option = findOption(field, select.value);
        if (!option) {
            return;
        }
        lines.push(`- ${option.name}`);
    });

    const notes = document.getElementById("notes");
    if (notes && notes.value.trim()) {
        lines.push("", `Hinweise des Kunden: ${notes.value.trim()}`);
    }

    lines.push("", `Gesamtpreis: ${summaryTotalElement.textContent}`);
    lines.push(`Servicekosten: ${summaryServiceElement.textContent}`);

    return lines.join("\n");
}

function handleScenarioChange(event) {
    const value = event.target.value;
    if (value === "custom") {
        return;
    }
    applyPreset(value);
}

function handleRequestOffer() {
    const projectField = document.getElementById("project");
    if (!projectField) return;

    const summary = collectSelectionSummary();
    if (summary.trim()) {
        projectField.value = `Bitte erstellen Sie ein Angebot für folgende Konfiguration:\n${summary}`;
    }

    const contactSection = document.getElementById("contact");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
    }
}

function setupNavToggle() {
    const nav = document.querySelector(".nav");
    const toggle = document.querySelector(".nav__toggle");
    const links = document.querySelectorAll(".nav__links a");

    if (!nav || !toggle) return;

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("nav--open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("nav--open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setCurrentYear() {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initConfigurator() {
    populateAllSelects();
    updateSummary();

    const scenarioSelect = document.getElementById("scenario");
    const requestOfferButton = document.getElementById("request-offer");

    const formControls = document.querySelectorAll(
        "#config-form select, #config-form textarea"
    );

    formControls.forEach((control) => {
        control.addEventListener("change", updateSummary);
        control.addEventListener("input", updateSummary);
    });

    if (scenarioSelect) {
        scenarioSelect.addEventListener("change", handleScenarioChange);
    }

    if (requestOfferButton) {
        requestOfferButton.addEventListener("click", handleRequestOffer);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setupNavToggle();
    initConfigurator();
    setCurrentYear();
});
