const playersList = document.getElementById("players-list");
const playerCount = document.querySelector(".player-count");
const chatMessages = document.getElementById("chat-messages");
const leaveBtn = document.getElementById("leave-btn");
const startBtn = document.getElementById("start-btn");
const waiting = document.getElementById("waiting");
const tipText = document.getElementById("tip-text");
const quickBtns = document.querySelectorAll(".quick-btn");

let players = ["Você"];
addChatMessage("Você entrou na sala", true); // mensagem de sistema inicial
const maxPlayers = 5;
const names = ["Davi", "Abigail", "Mateus", "Maria", "Gabriel"];
const avatars = ["#ff9900", "#520a78"];

let tipIndex = 0;
const tips = [
  "Ore antes de jogar.",
  "Jogue limpo, Deus vê tudo.",
  "Caso vença, seja humilde com os outros jogadores.",
  "Nem toda vitória vem de habilidade, algumas vêm da fé.",
];
tipText.textContent = tips[tipIndex];

// Atualiza contador de jogadores
function updatePlayerCount() {
  playerCount.textContent = `${players.length} / ${maxPlayers}`;
}

// Cria os avatares
function createAvatar(name) {
  const color = avatars[Math.floor(Math.random() * avatars.length)];
  const avatar = document.createElement("div");
  avatar.classList.add("avatar");
  avatar.style.backgroundColor = color;
  avatar.textContent = name[0].toUpperCase();
  return avatar;
}

// Adiciona mensagem no chat
function addChatMessage(msg, isSystem = false) {
  const div = document.createElement("div");
  div.textContent = msg;
  if (isSystem) {
    div.style.textAlign = "center";
    div.style.fontStyle = "italic";
  }
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Adiciona jogador
function addPlayer(name) {
  if (players.length >= maxPlayers) return;
  players.push(name);

  const card = document.createElement("div");
  card.classList.add("player-card");
  card.appendChild(createAvatar(name));
  const span = document.createElement("span");
  span.textContent = name;
  card.appendChild(span);

  playersList.appendChild(card);
  updatePlayerCount();

  // Mensagem de sistema
  addChatMessage(`${name} entrou na sala`, true);

  // Cada jogador envia apenas 1 mensagem aleatória
  const randomQuick = quickBtns[Math.floor(Math.random() * quickBtns.length)];
  addChatMessage(`${name}: ${randomQuick.textContent}`);

  if (players.length === maxPlayers) {
    addChatMessage("Máximo de jogadores atingido!", true);
    waiting.style.display = "none";
    startBtn.disabled = false;
  }
}

// Adiciona jogadores a cada 10s
const playerInterval = setInterval(() => {
  if (players.length < maxPlayers) {
    let availableNames = names.filter((n) => !players.includes(n));
    if (availableNames.length === 0) return;
    const name =
      availableNames[Math.floor(Math.random() * availableNames.length)];
    addPlayer(name);
  } else {
    clearInterval(playerInterval);
  }
}, 5000);

function nextTip() {
  // animação de saída
  tipText.classList.add("tip-hide");

  setTimeout(() => {
    // próxima dica
    tipIndex = (tipIndex + 1) % tips.length;
    tipText.textContent = tips[tipIndex];

    // animação de entrada
    tipText.classList.remove("tip-hide");
  }, 500);
}

// troca a cada 7 segundos
setInterval(nextTip, 7000);

// Leave button
leaveBtn.addEventListener("click", () => {
  leaveBtn.textContent = "Você saiu da partida";
  leaveBtn.disabled = true;
  startBtn.disabled = true;

  // Desabilita botões rápidos do chat
  document
    .querySelectorAll(".quick-btn")
    .forEach((btn) => (btn.disabled = true));

  // Para a adição automática de jogadores simulados
  clearInterval(playerInterval);

  // Mensagem de sistema final
  addChatMessage("A partida foi encerrada.", true);
});

// Start button
startBtn.addEventListener("click", () => {
  startBtn.textContent = "Iniciando partida";
  let dots = 0;
  const dotsInterval = setInterval(() => {
    startBtn.textContent = "Iniciando partida" + ".".repeat(dots % 4);
    dots++;
  }, 500);
  addChatMessage("A partida começou!", true);

  leaveBtn.disabled = true;
  startBtn.disabled = true;
});

// Quick messages do usuário
quickBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addChatMessage(`Você: ${btn.textContent}`);
  });
});

updatePlayerCount();
