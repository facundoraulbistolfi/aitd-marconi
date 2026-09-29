(() => {
  "use strict";

  const SAVE_KEY = "aitd-marconi-web-save-v2";
  const SAVE_SLOTS_KEY = "aitd-marconi-web-save-slots-v1";
  const SAVE_SLOT_COUNT = 3;
  const SAVE_NAME_LIMIT = 32;
  const MUSIC_PREF_KEY = "aitd-marconi-web-music";
  const DESIGN_WIDTH = 1016;
  const DESIGN_HEIGHT = 591;
  const SCENE_TOP = 41;

  const ACTIONS = {
    interact: "Interactuar",
    look: "Mirar",
    take: "Agarrar",
    use: "Usar",
  };

  const MUSIC_TRACKS = {
    main: { file: "Main.wav", label: "Hauptthema" },
    mus1: { file: "Mus1.wav", label: "JP N.E.S" },
    mus2: { file: "Mus2.wav", label: "Sorna Eiland" },
    mus3: { file: "Mus3.wav", label: "Ader Läufer" },
    mus4: { file: "Mus4.wav", label: "KF Volkstanz" },
    mus5: { file: "Mus5.wav", label: "Lavender Volk" },
    mus6: { file: "Mus6.wav", label: "Anschluss Stadt" },
    mus7: { file: "Mus7.wav", label: "Hallo Fitzgerald" },
    mus8: { file: "Mus8.wav", label: "Was ist Liebe?" },
    new: { file: "New.wav", label: "Nueva partida" },
    credits: { file: "Credits.wav", label: "Créditos" },
    jdow: { file: "JDOW.wav", label: "Dancers" },
    bradinsky: { file: "Bradinsky.wav", label: "Bradinsky" },
    loginska: { file: "Loginska.wav", label: "Loginska" },
    karinka: { file: "Karinka.wav", label: "Karinka" },
    troika: { file: "Troika.wav", label: "Troika" },
  };

  const FIXED_OPTIONS = {
    difficulty: "suicidio",
    language: "espanol",
    resolution: "auto",
    detail: "mega",
  };

  const ITEMS = {
    diningKey: { name: "Llave del comedor", image: "INV-LlaveComedor.bmp", cursor: ["llavecom.png", 28, 0] },
    handle: { name: "Manija", image: "INV-Manija.bmp", cursor: ["manija.png", 21, 13] },
    lowerBathroomKey: { name: "Llave del baño inferior", image: "INV-LlaveBI.bmp", cursor: ["llavebi.png", 26, 4] },
    remote: { name: "Control remoto", image: null },
    battery: { name: "Pila", image: "INV-Pila.bmp", cursor: ["pila.png", 23, 8] },
    vanKey: { name: "Llave de la camioneta", image: "INV-LlaveCamioneta.bmp", cursor: ["llavecam.png", 26, 5] },
    thread: { name: "Hilo", image: "INV-Hilo.bmp", cursor: ["hilo.png", 20, 19] },
    magnetThread: { name: "Imán con hilo", image: "INV-ImanConHilo.bmp", cursor: ["imanconhilo.png", 22, 22] },
    gateKey: { name: "Llave de la reja", image: "INV-LlaveReja.bmp", cursor: ["llavereja.png", 29, 16] },
    hook: { name: "Gancho de carnicero", image: null },
    screwdriver: { name: "Destornillador", image: null, cursor: ["destornillador.png", 27, 4] },
    hammer: { name: "Martillo", image: "INV-Martillo.bmp", cursor: ["martillo.png", 27, 15] },
    knife: { name: "Cuchillo", image: "INV-Cuchillo.bmp", cursor: ["cuchillo.png", 25, 0] },
    cageKey: { name: "Llave de la jaula", image: null },
    goldenKey: { name: "Llave dorada", image: null },
  };

  const MONITOR_START = () => Array.from({ length: 25 }, (_, index) =>
    [7, 11, 12, 13, 17].includes(index));

  const NOTEBOOK_RIDDLES = [
    {
      text: "Sólo existen 10 personas en el mundo: las que saben Aiken y las que no.",
      answers: ["1995"],
    },
    {
      text: "Es tiempo de que comiences a ver los códigos ocultos.",
      answers: ["315"],
    },
    {
      text: "El nombre de este símbolo.",
      answers: ["PETEI", "PETEÎ", "PETEÍ", "PETEÏ"],
      symbol: true,
    },
    {
      text: "Ordena los símbolos de menor a mayor para resolver el último acertijo.",
      answers: ["12114"],
    },
  ];

  const TV_CHANNELS = {
    19: { message: "Añamemby.", image: "tvparaguay" },
    111: { message: "Ah, esos tanques sí se pueden apreciar.", image: "tvww2" },
    116: { message: "Uy, qué divertido.", image: "tvarpa" },
    117: { message: "¿Qué carajos es esto?", image: "tvcodigo" },
    118: { message: "Muchos gatitos.", image: "tvlore" },
    127: { message: "No se entiende nada; hablan en francés, creo.", image: "tvalemania" },
    135: { message: "¡La Choly!", image: "tvcholi" },
    139: { message: "Canal ultra ario/albino.", image: "tvblanco" },
    141: { message: "Es el canal de la vieja hablando.", image: "tvcris" },
    148: { message: "Qué feo canal, sólo tienen tres programas.", image: "tvfelete" },
    149: { message: "A ese tipo ya lo vi en El club de la papada.", image: "tvgaston" },
    177: { message: "Alto canal.", image: "tvpalmera" },
    180: { message: "Un capo Messi.", image: "tvmessi" },
    197: { message: "Hay uno con la voz de Don Cangrejo.", image: "tvrick" },
    199: { message: "No le veo el sentido a este canal." },
    225: { message: "El canal de la UNLaM.", image: "tvunlam" },
    288: { message: "Mi celular tiene mejor definición que la cámara que filmó eso.", image: "tvovni" },
    311: { message: "Un partido de tenis narrado de una manera bastante particular.", image: "tvtenis" },
    479: { message: "El canal de la yuta.", image: "tvpolicias" },
    527: { message: "Oremos." },
    554: { message: "El mejor canal de la zona oeste.", image: "tvcachaca" },
    557: { message: "¡El Papa!" },
    643: { message: "Mi celular tiene mejor definición que la cámara que filmó eso.", image: "tvovni" },
    666: { message: "¿What?", image: "tvsample" },
    727: { message: "Ese capítulo ya lo vi.", image: "tvcasados" },
    737: { message: "Ese capítulo ya lo vi.", image: "tvcasados" },
    855: { message: "Qué guerra más aburrida; por eso no tiene juegos.", image: "tvww1" },
    889: { message: "Ese capítulo ya lo vi.", image: "tvcasados" },
    919: { message: "Ese capítulo ya lo vi.", image: "tvcasados" },
    927: { message: "Es una repetición." },
    983: { message: "En la guía dice que es de rock nacional, pero pasan reggae.", image: "tvmega" },
  };

  const initialState = () => ({
    version: 4,
    scene: "BS",
    action: "interact",
    selectedItem: null,
    inventory: [],
    taken: [],
    flags: {
      faucetHasHandle: false,
      keyReleased: false,
      lowerBathroomKeyTaken: false,
      briefcaseOpen: false,
      parentsTvOn: false,
      remotePowered: false,
      guilleTvOn: false,
      computerOn: false,
      monitorSolved: false,
      diningDoorOpen: false,
      lowerBathroomDoorOpen: false,
      gateOpen: false,
      paintingMoved: false,
      safeOpen: false,
      smallBoxOpen: false,
      woodRemoved: false,
      threadUsedOnMagnet: false,
      screwdriverRecovered: false,
      vanUnlocked: false,
      vanLiningCut: false,
      vanCompartmentOpen: false,
      cageOpen: false,
      gameWon: false,
    },
    minigames: {
      monitorBoard: MONITOR_START(),
      notebookStep: 0,
      tvChannel: 999,
      tvDigits: "",
    },
  });

  let state = initialState();
  let pendingCode = null;
  let saveMode = "save";
  let selectedSaveSlot = 0;
  let saveSlots = Array(SAVE_SLOT_COUNT).fill(null);
  let activeSaveSlot = null;
  let selectedMusic = localStorage.getItem(MUSIC_PREF_KEY) || "mus1";
  if (selectedMusic !== "off" && !MUSIC_TRACKS[selectedMusic]) selectedMusic = "mus1";
  let currentMusic = null;
  let musicAssetsAvailable = null;

  const elements = {
    viewport: document.querySelector("#viewport"),
    background: document.querySelector("#background"),
    hotspots: document.querySelector("#hotspots"),
    location: document.querySelector("#location-name"),
    message: document.querySelector("#message"),
    menuButton: document.querySelector("#menu-button"),
    menu: document.querySelector("#menu-dialog"),
    continueGame: document.querySelector("#continue-game"),
    newGame: document.querySelector("#new-game"),
    saveGame: document.querySelector("#save-game"),
    loadGame: document.querySelector("#load-game"),
    savesDialog: document.querySelector("#saves-dialog"),
    savesTitle: document.querySelector("#saves-title"),
    savesDescription: document.querySelector("#saves-description"),
    saveNameLabel: document.querySelector("#save-name-label"),
    saveName: document.querySelector("#save-name"),
    saveSlots: document.querySelector("#save-slots"),
    savesFeedback: document.querySelector("#saves-feedback"),
    savesConfirm: document.querySelector("#saves-confirm"),
    savesCancel: document.querySelector("#saves-cancel"),
    optionsGame: document.querySelector("#options-game"),
    aboutGame: document.querySelector("#about-game"),
    optionsDialog: document.querySelector("#options-dialog"),
    optionsAccept: document.querySelector("#options-accept"),
    optionsStatus: document.querySelector("#options-status"),
    optionsTabs: [...document.querySelectorAll("[data-options-tab]")],
    optionsPanels: [...document.querySelectorAll("[data-options-panel]")],
    optionInputs: [...document.querySelectorAll("#options-dialog input[type='radio']")],
    musicInputs: [...document.querySelectorAll("input[name='music']")],
    specialMusicSelect: document.querySelector("#special-music-select"),
    menuMusicPlay: document.querySelector("#menu-music-play"),
    musicStatus: document.querySelector("#music-status"),
    musicPlayer: document.querySelector("#music-player"),
    musicOptions: document.querySelector(".music-options"),
    specialMusicField: document.querySelector(".special-music"),
    aboutDialog: document.querySelector("#about-dialog"),
    aboutAccept: document.querySelector("#about-accept"),
    saveNote: document.querySelector("#save-note"),
    inventoryPrev: document.querySelector("#inventory-prev"),
    inventoryNext: document.querySelector("#inventory-next"),
    inventoryItem: document.querySelector("#inventory-item"),
    inventoryImage: document.querySelector("#inventory-image"),
    inventoryName: document.querySelector("#inventory-name"),
    actions: [...document.querySelectorAll("[data-action]")],
    codeDialog: document.querySelector("#code-dialog"),
    codeForm: document.querySelector("#code-form"),
    codeTitle: document.querySelector("#code-title"),
    codeInput: document.querySelector("#code-input"),
    codeFeedback: document.querySelector("#code-feedback"),
    codeCancel: document.querySelector("#code-cancel"),
    monitorDialog: document.querySelector("#monitor-dialog"),
    monitorGrid: document.querySelector("#monitor-grid"),
    monitorFeedback: document.querySelector("#monitor-feedback"),
    monitorClose: document.querySelector("#monitor-close"),
    monitorReset: document.querySelector("#monitor-reset"),
    monitorCode: document.querySelector("#monitor-code"),
    notebookDialog: document.querySelector("#notebook-dialog"),
    notebookForm: document.querySelector("#notebook-form"),
    notebookRows: document.querySelector("#notebook-rows"),
    notebookResult: document.querySelector("#notebook-result"),
    notebookFeedback: document.querySelector("#notebook-feedback"),
    notebookClose: document.querySelector("#notebook-close"),
    remoteDialog: document.querySelector("#remote-dialog"),
    remotePreview: document.querySelector("#remote-preview"),
    remoteChannel: document.querySelector("#remote-channel"),
    remoteFeedback: document.querySelector("#remote-feedback"),
    remoteDigits: [...document.querySelectorAll("[data-channel-digit]")],
    remoteClear: document.querySelector("#remote-clear"),
    remoteEnter: document.querySelector("#remote-enter"),
    remoteDown: document.querySelector("#remote-down"),
    remoteUp: document.querySelector("#remote-up"),
    remoteClose: document.querySelector("#remote-close"),
    finalDialog: document.querySelector("#final-dialog"),
    finalMenu: document.querySelector("#final-menu"),
    finalNewGame: document.querySelector("#final-new-game"),
  };

  const asset = (folder, filename) => `assets/${folder}/${filename}`;
  const percent = (value, total) => `${(value / total) * 100}%`;

  function hotspot(id, label, x, y, width, height, onClick, options = {}) {
    const clipped = Math.max(0, SCENE_TOP - y);
    return {
      id,
      label,
      x,
      y: Math.max(0, y - SCENE_TOP),
      width,
      height: Math.max(1, height - clipped),
      onClick,
      ...options,
    };
  }

  function say(message) {
    elements.message.textContent = message;
  }

  function syncOptionControls() {
    for (const input of elements.optionInputs) {
      if (input.name === "music") continue;
      input.checked = FIXED_OPTIONS[input.name] === input.value;
    }
    syncMusicControls();
  }

  function selectOptionsTab(tab) {
    for (const button of elements.optionsTabs) {
      const active = button.dataset.optionsTab === tab;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    }
    for (const panel of elements.optionsPanels) panel.hidden = panel.dataset.optionsPanel !== tab;
  }

  function openOptions() {
    syncOptionControls();
    selectOptionsTab("sound");
    elements.optionsStatus.textContent = musicAssetsAvailable === false
      ? "La música no está incluida en esta publicación."
      : "Como en el original, sólo la música se puede cambiar de verdad.";
    elements.optionsDialog.showModal();
  }

  function updateMusicStatus(message) {
    elements.musicStatus.textContent = message || (currentMusic
      ? `Sonando: ${MUSIC_TRACKS[currentMusic].label}.`
      : "Música apagada.");
  }

  function stopMusic(message = "Música apagada.") {
    elements.musicPlayer.pause();
    currentMusic = null;
    updateMusicStatus(message);
  }

  async function detectMusicAssets() {
    try {
      const response = await fetch(asset("Sonidos", "Mus1.wav"), { method: "HEAD", cache: "no-store" });
      musicAssetsAvailable = response.ok;
    } catch {
      musicAssetsAvailable = false;
    }

    if (musicAssetsAvailable) return;

    selectedMusic = "off";
    syncMusicControls();
    elements.musicOptions.hidden = true;
    elements.specialMusicField.hidden = true;
    elements.menuMusicPlay.hidden = true;
    updateMusicStatus("La música original no está incluida en esta publicación.");
  }

  function playMusic(id, { restart = false } = {}) {
    if (musicAssetsAvailable === false && id !== "off") {
      currentMusic = null;
      updateMusicStatus("La música original no está incluida en esta publicación.");
      return;
    }
    if (id === "off" || !MUSIC_TRACKS[id]) {
      stopMusic();
      return;
    }

    const track = MUSIC_TRACKS[id];
    const source = asset("Sonidos", track.file);
    if (elements.musicPlayer.getAttribute("src") !== source) {
      elements.musicPlayer.src = source;
    } else if (restart && elements.musicPlayer.readyState > 0) {
      elements.musicPlayer.currentTime = 0;
    }
    elements.musicPlayer.loop = true;
    elements.musicPlayer.volume = 0.5;
    currentMusic = id;
    updateMusicStatus(`Cargando: ${track.label}…`);
    elements.musicPlayer.play().then(() => updateMusicStatus()).catch(() => {
      currentMusic = null;
      updateMusicStatus("El navegador bloqueó la reproducción. Elegí nuevamente una pista.");
    });
  }

  function playSelectedMusic() {
    playMusic(selectedMusic);
  }

  function selectMusic(id) {
    selectedMusic = id;
    localStorage.setItem(MUSIC_PREF_KEY, id);
    syncMusicControls();
    playMusic(id, { restart: true });
  }

  function syncMusicControls() {
    for (const input of elements.musicInputs) input.checked = input.value === selectedMusic;
    const isSpecial = !["off", "main", "mus1", "mus2", "mus3", "mus4", "mus5", "mus6", "mus7", "mus8"].includes(selectedMusic);
    elements.specialMusicSelect.value = isSpecial ? selectedMusic : "";
  }

  function unavailable(sceneName) {
    say(`${sceneName} está identificada y será incorporada en la siguiente etapa de la migración.`);
  }

  const scenes = window.createMarconiScenes({
    getState: () => state,
    hotspot,
    respond,
    say,
    unavailable,
    changeScene,
    render,
    pickup,
    consumeItem,
    requestCode,
    openMonitor,
    openNotebook,
    openRemote,
    finishGame,
    parentTvImage,
    parentTvMessage,
    useFaucet,
    takeLowerBathroomKey: takeKey,
  });

  function respond(messages) {
    say(messages[state.action] || "No puedo hacer eso.");
  }

  function useFaucet() {
    if (state.flags.faucetHasHandle) {
      if (state.action === "interact" && !state.flags.keyReleased) {
        state.flags.keyReleased = true;
        say("Una llave salió de la canilla.");
        renderScene();
        return;
      }
      respond({
        interact: "Ya no tiene nada adentro.",
        look: "Ahora la canilla tiene manija.",
        take: "No puedo llevármela.",
        use: "No puedo hacer eso.",
      });
      return;
    }

    if (state.action === "use" && state.selectedItem === "handle") {
      removeItem("handle");
      state.flags.faucetHasHandle = true;
      say("La manija encaja. Ahora puedo abrir la canilla.");
      render();
      return;
    }

    respond({
      interact: "No puedo abrirla porque le falta la manija.",
      look: "Es la canilla de la ducha.",
      take: "No puedo llevármela.",
      use: "No puedo hacer eso.",
    });
  }

  function takeKey() {
    if (state.action !== "take") {
      respond({
        interact: "¿Qué querés que haga con esta llave?",
        look: "Es la llave del baño de abajo.",
        use: "No puedo hacer eso.",
      });
      return;
    }

    state.flags.lowerBathroomKeyTaken = true;
    addItem("lowerBathroomKey");
    state.action = "use";
    say("Guardé la llave del baño inferior.");
    render();
  }

  function addItem(id) {
    if (!state.inventory.includes(id)) state.inventory.push(id);
    state.selectedItem = id;
  }

  function removeItem(id) {
    state.inventory = state.inventory.filter((item) => item !== id);
    state.selectedItem = state.inventory[0] || null;
    if (!state.selectedItem && state.action === "use") state.action = "interact";
  }

  function consumeItem(id) {
    removeItem(id);
  }

  function pickup(id, messages = {}) {
    if (!ITEMS[id]) return;
    if (messages.force || state.action === "take") {
      addItem(id);
      if (!state.taken.includes(id)) state.taken.push(id);
      state.action = "use";
      say(messages.success || `Guardé ${ITEMS[id].name.toLowerCase()}.`);
      render();
      return;
    }

    respond({
      interact: messages.interact || `Podría servirme ${ITEMS[id].name.toLowerCase()}.`,
      look: messages.look || `Es ${ITEMS[id].name.toLowerCase()}.`,
      use: messages.use || "No puedo hacer eso.",
    });
  }

  function requestCode(label, expected, flag) {
    pendingCode = { label, expected, flag };
    elements.codeTitle.textContent = label;
    elements.codeInput.value = "";
    elements.codeFeedback.textContent = "";
    elements.codeDialog.showModal();
    elements.codeInput.focus();
  }

  function openMonitor() {
    if (state.flags.monitorSolved) {
      say("Dice: ‘Cod CF = 1167F (HEX)’.");
      return;
    }
    renderMonitor();
    elements.monitorDialog.showModal();
  }

  function renderMonitor() {
    const board = state.minigames.monitorBoard;
    elements.monitorGrid.replaceChildren();

    board.forEach((value, index) => {
      const row = Math.floor(index / 5);
      const column = index % 5;
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = `monitor-cell${value ? " on" : ""}`;
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-label", `Fila ${row + 1}, columna ${column + 1}: ${value ? "rojo" : "azul"}`);
      cell.setAttribute("aria-pressed", String(value));
      cell.addEventListener("click", () => toggleMonitorCell(row, column));
      elements.monitorGrid.append(cell);
    });

    const solved = board.every(Boolean);
    elements.monitorCode.disabled = !solved;
    elements.monitorFeedback.textContent = solved
      ? "Todos los cuadrados están rojos. El código está disponible."
      : "Convertí toda la cuadrícula a rojo.";
  }

  function toggleMonitorCell(row, column) {
    const offsets = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [rowOffset, columnOffset] of offsets) {
      const nextRow = row + rowOffset;
      const nextColumn = column + columnOffset;
      if (nextRow < 0 || nextRow > 4 || nextColumn < 0 || nextColumn > 4) continue;
      const index = nextRow * 5 + nextColumn;
      state.minigames.monitorBoard[index] = !state.minigames.monitorBoard[index];
    }
    renderMonitor();
  }

  function resetMonitor() {
    state.minigames.monitorBoard = MONITOR_START();
    renderMonitor();
  }

  function completeMonitor() {
    if (!state.minigames.monitorBoard.every(Boolean)) return;
    state.flags.monitorSolved = true;
    say("El monitor revela: ‘Cod CF = 1167F (HEX)’.");
    elements.monitorDialog.close();
    playSelectedMusic();
    render();
  }

  function openNotebook() {
    renderNotebook();
    elements.notebookDialog.showModal();
    elements.notebookRows.querySelector("input:not(:disabled)")?.focus();
  }

  function renderNotebook() {
    const step = Math.min(state.minigames.notebookStep, NOTEBOOK_RIDDLES.length);
    elements.notebookFeedback.textContent = "";
    elements.notebookRows.replaceChildren();

    NOTEBOOK_RIDDLES.forEach((riddle, index) => {
      const row = document.createElement("section");
      row.className = "notebook-row";

      const copy = document.createElement("div");
      copy.className = "notebook-copy";
      const title = document.createElement("h3");
      title.textContent = `Acertijo ${index + 1}`;
      const text = document.createElement("p");
      text.textContent = `“${riddle.text}”`;
      copy.append(title, text);

      if (riddle.symbol) {
        const symbol = document.createElement("img");
        symbol.className = "notebook-row-symbol";
        symbol.src = "assets/minigames/notebook-symbol.png";
        symbol.alt = "Símbolo dibujado";
        copy.append(symbol);
      }

      const controls = document.createElement("div");
      controls.className = "notebook-controls";
      const input = document.createElement("input");
      input.id = `notebook-answer-${index}`;
      input.name = `answer-${index}`;
      input.autocomplete = "off";
      input.maxLength = Math.max(...riddle.answers.map((answer) => answer.length));
      input.disabled = index !== step;
      input.setAttribute("aria-label", `Respuesta del acertijo ${index + 1}`);
      const submit = document.createElement("button");
      submit.type = "submit";
      submit.textContent = "Ingresar";
      submit.disabled = index !== step;
      controls.append(input, submit);
      row.append(copy, controls);

      if (index !== step) {
        const cover = document.createElement("div");
        cover.className = `notebook-cover ${index < step ? "won" : "locked"}`;
        cover.textContent = index < step ? "Ganado" : "Bloqueado";
        row.append(cover);
      }
      elements.notebookRows.append(row);
    });

    elements.notebookResult.replaceChildren();
    const resultTitle = document.createElement("h3");
    resultTitle.textContent = "Felicidades";
    const resultText = document.createElement("p");
    resultText.textContent = "Aquí tienes el código, servido como en bandeja de plata";
    const resultCode = document.createElement("strong");
    resultCode.textContent = "16180";
    elements.notebookResult.append(resultTitle, resultText, resultCode);
    if (step < NOTEBOOK_RIDDLES.length) {
      const cover = document.createElement("div");
      cover.className = "notebook-cover locked";
      cover.textContent = "Bloqueado";
      elements.notebookResult.append(cover);
    }
  }

  function submitNotebookAnswer(event) {
    event.preventDefault();
    const step = state.minigames.notebookStep;
    if (step >= NOTEBOOK_RIDDLES.length) return;
    const input = elements.notebookRows.querySelector(`#notebook-answer-${step}`);
    const answer = input.value.trim().toLocaleUpperCase("es");
    if (!NOTEBOOK_RIDDLES[step].answers.includes(answer)) {
      elements.notebookFeedback.textContent = "La respuesta no es correcta.";
      input.select();
      return;
    }

    state.minigames.notebookStep += 1;
    if (state.minigames.notebookStep === NOTEBOOK_RIDDLES.length) {
      say("Resolví los cuatro acertijos. La netbook muestra el código 16180.");
      render();
    }
    renderNotebook();
    elements.notebookRows.querySelector("input:not(:disabled)")?.focus();
  }

  function parentTvImage() {
    const channel = TV_CHANNELS[state.minigames.tvChannel];
    return channel?.image
      ? `assets/minigames/${channel.image}.png`
      : "assets/sprites/TVon.png";
  }

  function parentTvMessage() {
    return TV_CHANNELS[state.minigames.tvChannel]?.message || "Mil canales y sólo veo estática.";
  }

  function openRemote() {
    state.minigames.tvDigits = "";
    renderRemote();
    elements.remoteDialog.showModal();
  }

  function setTvChannel(channel) {
    state.minigames.tvChannel = (Number(channel) + 1000) % 1000;
    renderRemote();
    renderScene();
  }

  function renderRemote() {
    const channel = state.minigames.tvChannel;
    elements.remoteChannel.textContent = String(channel).padStart(3, "0");
    elements.remotePreview.src = parentTvImage();
    elements.remoteFeedback.textContent = parentTvMessage();
  }

  function pressRemoteDigit(digit) {
    if (state.minigames.tvDigits.length >= 3) state.minigames.tvDigits = "";
    state.minigames.tvDigits += digit;
    setTvChannel(Number(state.minigames.tvDigits));
  }

  function changeScene(id) {
    if (!scenes[id]) return;
    state.scene = id;
    say(scenes[id].entryMessage || (id === "PS" ? "El pasillo está en silencio." : "Observá el lugar con cuidado."));
    renderScene();
  }

  function renderScene() {
    const scene = scenes[state.scene];
    elements.location.textContent = scene.name;
    const background = typeof scene.background === "function" ? scene.background() : scene.background;
    elements.background.src = asset("Fondos", background);
    elements.background.alt = scene.name;
    elements.hotspots.replaceChildren();

    for (const area of scene.getHotspots()) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "hotspot";
      button.dataset.hotspot = area.id;
      button.setAttribute("aria-label", area.label);
      button.style.left = percent(area.x, DESIGN_WIDTH);
      button.style.top = percent(area.y, DESIGN_HEIGHT);
      button.style.width = percent(area.width, DESIGN_WIDTH);
      button.style.height = percent(area.height, DESIGN_HEIGHT);
      button.addEventListener("click", area.onClick);

      if (area.image || area.imagePath) {
        button.classList.add("sprite-hotspot");
        const image = document.createElement("img");
        image.src = area.imagePath || `assets/sprites/${area.image.replace(/\.bmp$/i, ".png")}`;
        image.alt = "";
        button.append(image);
      }

      elements.hotspots.append(button);
    }
  }

  function renderInventory() {
    const hasItems = state.inventory.length > 0;
    if (hasItems && !state.inventory.includes(state.selectedItem)) {
      state.selectedItem = state.inventory[0];
    }

    const item = state.selectedItem ? ITEMS[state.selectedItem] : null;
    elements.inventoryName.textContent = item?.name || "Vacío";
    elements.inventoryName.classList.toggle("sr-only", Boolean(item?.image));
    elements.inventoryName.classList.toggle("inventory-name-fallback", !item?.image);
    elements.inventoryItem.disabled = !item;
    elements.inventoryPrev.disabled = state.inventory.length < 2;
    elements.inventoryNext.disabled = state.inventory.length < 2;

    if (item?.image) {
      elements.inventoryImage.src = asset("Objetos", item.image);
      elements.inventoryImage.alt = item.name;
    } else {
      elements.inventoryImage.src = asset("Objetos", "INV.bmp");
      elements.inventoryImage.alt = "";
    }
  }

  function renderActions() {
    for (const button of elements.actions) {
      const active = button.dataset.action === state.action;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    }
  }

  function updateCursor() {
    let cursor = "crosshair";

    if (state.action === "interact") {
      cursor = 'url("assets/cursors/mira.png") 13 16, crosshair';
    } else if (state.action === "look") {
      cursor = 'url("assets/cursors/lupa.png") 22 10, help';
    } else if (state.action === "take") {
      cursor = "pointer";
    } else if (state.action === "use") {
      const itemCursor = ITEMS[state.selectedItem]?.cursor;
      if (itemCursor) {
        const [file, x, y] = itemCursor;
        cursor = `url("assets/cursors/${file}") ${x} ${y}, crosshair`;
      }
    }

    elements.viewport.style.setProperty("--game-cursor", cursor);
  }

  function render() {
    renderScene();
    renderInventory();
    renderActions();
    updateCursor();
  }

  function selectAction(action) {
    if (!(action in ACTIONS)) return;
    if (action === "use" && state.inventory.length === 0) {
      say("No llevo ningún objeto.");
      return;
    }
    state.action = action;
    renderActions();
    updateCursor();
  }

  function rotateInventory(direction) {
    if (state.inventory.length < 2) return;
    const index = state.inventory.indexOf(state.selectedItem);
    const next = (index + direction + state.inventory.length) % state.inventory.length;
    state.selectedItem = state.inventory[next];
    renderInventory();
    updateCursor();
  }

  function isCompatibleSave(saved) {
    return saved && [2, 3, 4].includes(saved.version) && scenes[saved.scene];
  }

  function readSaveSlots() {
    try {
      const raw = localStorage.getItem(SAVE_SLOTS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return null;
        return Array.from({ length: SAVE_SLOT_COUNT }, (_, index) => {
          const slot = parsed[index];
          return slot && isCompatibleSave(slot.state) ? slot : null;
        });
      }

      const slots = Array(SAVE_SLOT_COUNT).fill(null);
      const legacy = localStorage.getItem(SAVE_KEY);
      if (legacy) {
        const oldSave = JSON.parse(legacy);
        if (isCompatibleSave(oldSave)) {
          slots[0] = {
            name: "Partida anterior",
            savedAt: new Date().toISOString(),
            state: oldSave,
          };
        }
      }
      return slots;
    } catch {
      return null;
    }
  }

  function storeSaveSlots(slots) {
    try {
      localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
      return true;
    } catch {
      return false;
    }
  }

  function saveSlot(index, name, slots = readSaveSlots()) {
    if (!slots) return false;
    slots[index] = {
      name: name.slice(0, SAVE_NAME_LIMIT),
      savedAt: new Date().toISOString(),
      state: JSON.parse(JSON.stringify(state)),
    };
    return storeSaveSlots(slots);
  }

  function describeSaveSlot(slot) {
    if (!slot) return "Vacía";
    const sceneName = scenes[slot.state.scene]?.name || slot.state.scene;
    const date = new Date(slot.savedAt);
    const savedDate = Number.isNaN(date.getTime())
      ? ""
      : ` · ${date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "2-digit" })}`;
    return `${sceneName}${savedDate}`;
  }

  function renderSaveSlots() {
    const buttons = Array.from({ length: SAVE_SLOT_COUNT }, (_, index) => {
      const slot = saveSlots[index];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "save-slot";
      button.setAttribute("aria-pressed", String(index === selectedSaveSlot));

      const number = document.createElement("span");
      number.className = "save-slot-number";
      number.textContent = `Ranura ${index + 1}`;
      const name = document.createElement("strong");
      name.textContent = slot?.name || "Vacía";
      const detail = document.createElement("small");
      detail.textContent = describeSaveSlot(slot);
      button.append(number, name, detail);
      button.addEventListener("click", () => {
        const nameDraft = elements.saveName.value;
        selectedSaveSlot = index;
        if (saveMode === "save" && !nameDraft.trim()) elements.saveName.value = slot?.name || "";
        renderSaveSlots();
      });
      return button;
    });
    elements.saveSlots.replaceChildren(...buttons);
    elements.savesConfirm.disabled = saveMode === "load" && !saveSlots[selectedSaveSlot];
  }

  function openSaves(mode) {
    saveMode = mode;
    saveSlots = readSaveSlots();
    if (!saveSlots) {
      elements.saveNote.textContent = "No se pudieron leer las partidas guardadas.";
      return;
    }
    if (localStorage.getItem(SAVE_SLOTS_KEY) === null && !storeSaveSlots(saveSlots)) {
      elements.saveNote.textContent = "No se pudo acceder al guardado de este navegador.";
      return;
    }

    const preferred = mode === "load"
      ? (activeSaveSlot ?? saveSlots.findIndex(Boolean))
      : (activeSaveSlot ?? saveSlots.findIndex((slot) => !slot));
    selectedSaveSlot = preferred < 0 ? 0 : preferred;
    elements.savesTitle.textContent = mode === "save" ? "Guardar partida" : "Cargar partida";
    elements.savesDescription.textContent = mode === "save"
      ? "Elegí una ranura y asignale un nombre. Podés guardar hasta 3 partidas."
      : "Elegí una de las partidas guardadas.";
    elements.saveNameLabel.hidden = mode !== "save";
    elements.saveName.hidden = mode !== "save";
    elements.saveName.value = saveSlots[selectedSaveSlot]?.name || "";
    elements.savesFeedback.textContent = "";
    elements.savesConfirm.textContent = mode === "save" ? "Guardar" : "Cargar";
    renderSaveSlots();
    if (!elements.savesDialog.open) elements.savesDialog.showModal();
    if (mode === "save") elements.saveName.focus();
  }

  function saveSelectedSlot() {
    const name = elements.saveName.value.trim().slice(0, SAVE_NAME_LIMIT);
    if (!name) {
      elements.savesFeedback.textContent = "Escribí un nombre para la partida.";
      elements.saveName.focus();
      return;
    }
    if (saveSlots[selectedSaveSlot] && !window.confirm(`¿Reemplazar “${saveSlots[selectedSaveSlot].name}” en la ranura ${selectedSaveSlot + 1}?`)) {
      return;
    }
    if (!saveSlot(selectedSaveSlot, name, saveSlots)) {
      elements.savesFeedback.textContent = "No se pudo guardar. Revisá el espacio disponible en el navegador.";
      return;
    }
    activeSaveSlot = selectedSaveSlot;
    elements.saveNote.textContent = `Partida “${name}” guardada.`;
    elements.savesDialog.close();
  }

  function loadSelectedSlot() {
    const slot = saveSlots[selectedSaveSlot];
    if (!slot || !isCompatibleSave(slot.state)) {
      elements.savesFeedback.textContent = "Esta ranura no contiene una partida compatible.";
      return;
    }
    const saved = slot.state;
    const fresh = initialState();
    state = {
      ...fresh,
      ...saved,
      version: 4,
      flags: { ...fresh.flags, ...saved.flags },
      minigames: { ...fresh.minigames, ...saved.minigames },
    };
    activeSaveSlot = selectedSaveSlot;
    elements.saveNote.textContent = `Partida “${slot.name}” cargada.`;
    say(`Continuamos desde “${slot.name}”.`);
    render();
    playSelectedMusic();
    elements.savesDialog.close();
    elements.menu.close();
  }

  function startNewGame() {
    playSelectedMusic();
    state = initialState();
    activeSaveSlot = null;
    say("No sé cómo llegué hasta acá. Tengo que encontrar una salida.");
    render();
    if (elements.finalDialog.open) elements.finalDialog.close();
    elements.menu.close();
  }

  function finishGame() {
    if (!state.flags.gameWon) {
      state.flags.gameWon = true;
      say("La llave dorada abre el portón. Por fin puedo escapar.");
      render();
      if (activeSaveSlot !== null) {
        const slots = readSaveSlots();
        if (slots) saveSlot(activeSaveSlot, slots[activeSaveSlot]?.name || "Partida", slots);
      }
    }
    if (selectedMusic !== "off") playMusic("mus2");
    if (!elements.finalDialog.open) elements.finalDialog.showModal();
  }

  elements.actions.forEach((button) => {
    button.addEventListener("click", () => selectAction(button.dataset.action));
  });
  elements.inventoryPrev.addEventListener("click", () => rotateInventory(-1));
  elements.inventoryNext.addEventListener("click", () => rotateInventory(1));
  elements.inventoryItem.addEventListener("click", () => selectAction("use"));
  elements.menuButton.addEventListener("click", () => elements.menu.showModal());
  elements.continueGame.addEventListener("click", () => {
    playSelectedMusic();
    elements.menu.close();
  });
  elements.newGame.addEventListener("click", startNewGame);
  elements.saveGame.addEventListener("click", () => openSaves("save"));
  elements.loadGame.addEventListener("click", () => openSaves("load"));
  elements.savesConfirm.addEventListener("click", () => {
    if (saveMode === "save") saveSelectedSlot();
    else loadSelectedSlot();
  });
  elements.savesCancel.addEventListener("click", () => elements.savesDialog.close());
  elements.optionsGame.addEventListener("click", openOptions);
  elements.aboutGame.addEventListener("click", () => elements.aboutDialog.showModal());
  elements.optionsTabs.forEach((button) => {
    button.addEventListener("click", () => selectOptionsTab(button.dataset.optionsTab));
  });
  elements.optionInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      if (input.name === "music") {
        selectMusic(input.value);
        elements.optionsStatus.textContent = input.value === "off" ? "Música apagada." : "Pista musical actualizada.";
        return;
      }
      const fixedValue = FIXED_OPTIONS[input.name];
      for (const option of elements.optionInputs) {
        if (option.name === input.name) option.checked = option.value === fixedValue;
      }
      const messages = {
        difficulty: "La dificultad del original está fijada en Suicidio.",
        language: "Español y castellano son lo mismo acá.",
        resolution: "No te hagas el que sabe romanos, da igual.",
        detail: "De todas formas no va a correr más rápido.",
      };
      elements.optionsStatus.textContent = messages[input.name];
    });
  });
  elements.specialMusicSelect.addEventListener("change", () => {
    if (!elements.specialMusicSelect.value) return;
    selectMusic(elements.specialMusicSelect.value);
    elements.optionsStatus.textContent = "Pista adicional seleccionada.";
  });
  elements.menuMusicPlay.addEventListener("click", () => playMusic("main", { restart: true }));
  elements.optionsAccept.addEventListener("click", () => elements.optionsDialog.close());
  elements.aboutAccept.addEventListener("click", () => elements.aboutDialog.close());
  elements.codeCancel.addEventListener("click", () => {
    pendingCode = null;
    elements.codeDialog.close();
  });
  elements.codeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pendingCode) return;
    if (elements.codeInput.value.trim() !== pendingCode.expected) {
      elements.codeFeedback.textContent = "El código no es correcto.";
      elements.codeInput.select();
      return;
    }

    state.flags[pendingCode.flag] = true;
    say("Código correcto. Cerradura abierta.");
    pendingCode = null;
    elements.codeDialog.close();
    render();
  });
  elements.monitorClose.addEventListener("click", () => {
    elements.monitorDialog.close();
    playSelectedMusic();
  });
  elements.monitorReset.addEventListener("click", resetMonitor);
  elements.monitorCode.addEventListener("click", completeMonitor);
  elements.notebookClose.addEventListener("click", () => elements.notebookDialog.close());
  elements.notebookForm.addEventListener("submit", submitNotebookAnswer);
  elements.remoteDigits.forEach((button) => {
    button.addEventListener("click", () => pressRemoteDigit(button.dataset.channelDigit));
  });
  elements.remoteClear.addEventListener("click", () => {
    state.minigames.tvDigits = "";
    setTvChannel(0);
  });
  elements.remoteEnter.addEventListener("click", () => {
    state.minigames.tvDigits = "";
    renderRemote();
  });
  elements.remoteDown.addEventListener("click", () => {
    state.minigames.tvDigits = "";
    setTvChannel(state.minigames.tvChannel - 1);
  });
  elements.remoteUp.addEventListener("click", () => {
    state.minigames.tvDigits = "";
    setTvChannel(state.minigames.tvChannel + 1);
  });
  elements.remoteClose.addEventListener("click", () => {
    say(parentTvMessage());
    elements.remoteDialog.close();
    render();
  });
  elements.finalMenu.addEventListener("click", () => {
    elements.finalDialog.close();
    if (selectedMusic !== "off") playMusic("main");
    elements.menu.showModal();
  });
  elements.finalNewGame.addEventListener("click", startNewGame);

  document.addEventListener("keydown", (event) => {
    if (elements.menu.open || elements.optionsDialog.open || elements.aboutDialog.open || elements.codeDialog.open || elements.monitorDialog.open ||
        elements.notebookDialog.open || elements.remoteDialog.open || elements.finalDialog.open ||
        event.ctrlKey || event.metaKey || event.altKey) return;
    const action = { a: "interact", s: "look", d: "take", w: "use" }[event.key.toLowerCase()];
    if (action) {
      event.preventDefault();
      selectAction(action);
    }
    if (event.key === "Escape") elements.menu.showModal();
  });

  syncOptionControls();
  updateMusicStatus("La música comienza después del primer clic.");
  render();
  detectMusicAssets();
  elements.menu.showModal();
})();
