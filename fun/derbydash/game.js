/* ============================================
   DERBY DASH – Main Game Engine
   ============================================ */

// ---------- Constants ----------
const FINISH_DISTANCE = 1000;
const HORSE_NAMES = ['Thunder Bolt', 'Silver Arrow', 'Midnight Star', 'Golden Fury'];
const HORSE_COLORS = ['#f0c040', '#3498db', '#9b59b6', '#2ecc71'];

// Hole definitions: { label, value (speed boost), color, radius }
const HOLE_DEFS = [
  { label: '5x', value: 5, color: '#e74c3c', radius: 14, glow: 'rgba(231,76,60,0.5)' },   // Small, high value
  { label: '4x', value: 4, color: '#e67e22', radius: 17, glow: 'rgba(230,126,34,0.5)' },
  { label: '3x', value: 3, color: '#f0c040', radius: 20, glow: 'rgba(240,192,64,0.5)' },
  { label: '2x', value: 2, color: '#3498db', radius: 23, glow: 'rgba(52,152,219,0.5)' },
  { label: '1x', value: 1, color: '#2ecc71', radius: 26, glow: 'rgba(46,204,113,0.5)' },   // Large, low value
];

// ---------- Game State ----------
const state = {
  screen: 'start', // start, playing, result
  horses: [],
  ball: null,
  holes: [],
  pegs: [],
  launcher: { x: 0, y: 0, angle: 0, ready: true, cooldown: 0 },
  canvas: null,
  ctx: null,
  animFrame: null,
  shotsCount: 0,
  hitsCount: 0,
  raceFinished: false,
  finishOrder: [],
  aiTimers: [],
  lastGallopTime: 0,
  canvasWidth: 0,
  canvasHeight: 0,
  aimX: 0,
  gravity: 0.25,
  walls: [],
};

// ---------- DOM refs ----------
const $ = (id) => document.getElementById(id);

// ---------- Init ----------
window.addEventListener('DOMContentLoaded', () => {
  createStartParticles();
  $('start-btn').addEventListener('click', startGame);
  $('play-again-btn').addEventListener('click', () => {
    showScreen('start');
    audio.stopMusic();
  });
});

function createStartParticles() {
  const container = $('start-particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    p.style.width = (2 + Math.random() * 4) + 'px';
    p.style.height = p.style.width;
    if (Math.random() > 0.5) p.style.background = '#00d4ff';
    container.appendChild(p);
  }
}

function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = $(name + '-screen');
  if (screen) screen.classList.add('active');
  state.screen = name;
}

// ---------- Start Game ----------
async function startGame() {
  audio.init();
  audio.resume();
  showScreen('game');
  initRace();
  await runCountdown();
  startRace();
}

function initRace() {
  // Reset state
  state.horses = HORSE_NAMES.map((name, i) => ({
    name, index: i, progress: 0, speed: 0, isPlayer: i === 0, finished: false, finishTime: 0,
  }));
  state.shotsCount = 0;
  state.hitsCount = 0;
  state.raceFinished = false;
  state.finishOrder = [];
  state.ball = null;
  state.launcher.ready = true;
  state.launcher.cooldown = 0;

  // Reset UI
  $('shots-count').textContent = '0';
  $('position-display').textContent = '—';
  $('lap-indicator').textContent = 'GET READY!';

  state.horses.forEach((h, i) => {
    const el = $('horse-' + i);
    el.style.left = '150px';
    el.querySelector('.horse-sprite').classList.remove('running');
    $('progress-' + i).style.width = '0%';
  });

  // Setup canvas
  setupCanvas();
  generateHolesAndPegs();
}

function setupCanvas() {
  const container = $('game-canvas-container');
  const canvas = $('game-canvas');
  const rect = container.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  state.canvas = canvas;
  state.ctx = canvas.getContext('2d');
  state.ctx.scale(dpr, dpr);
  state.canvasWidth = rect.width;
  state.canvasHeight = rect.height;

  // Launcher position (top center)
  state.launcher.x = rect.width / 2;
  state.launcher.y = 30;
  state.aimX = rect.width / 2;

  // Walls
  state.walls = [
    { x: 0, y: 0, w: 10, h: rect.height },          // left
    { x: rect.width - 10, y: 0, w: 10, h: rect.height }, // right
    { x: 0, y: rect.height - 10, w: rect.width, h: 10 }, // bottom
  ];

  // Event listeners
  canvas.onmousemove = (e) => {
    const r = canvas.getBoundingClientRect();
    state.aimX = e.clientX - r.left;
  };
  canvas.ontouchmove = (e) => {
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    state.aimX = e.touches[0].clientX - r.left;
  };
  canvas.onclick = fireBall;
  canvas.ontouchstart = (e) => {
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    state.aimX = e.touches[0].clientX - r.left;
    fireBall();
  };
}

function generateHolesAndPegs() {
  const w = state.canvasWidth;
  const h = state.canvasHeight;
  state.holes = [];
  state.pegs = [];

  // Fixed 5 holes, one of each value, shuffled positions
  const valueSlots = [1, 2, 3, 4, 5];
  // Shuffle
  for (let i = valueSlots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [valueSlots[i], valueSlots[j]] = [valueSlots[j], valueSlots[i]];
  }

  // Place holes in a single row near the bottom, evenly spaced
  const holeY = h * 0.84;
  const numHoles = valueSlots.length;
  const margin = 80;
  const holeZoneWidth = w - margin * 2;
  const spacing = holeZoneWidth / (numHoles - 1);

  for (let i = 0; i < numHoles; i++) {
    const val = valueSlots[i];
    const def = HOLE_DEFS.find(d => d.value === val);
    state.holes.push({
      x: margin + spacing * i,
      y: holeY,
      radius: def.radius,
      value: def.value,
      label: def.label,
      color: def.color,
      glow: def.glow,
      pulse: Math.random() * Math.PI * 2,
    });
  }

  // Place pegs in a pachinko-like grid
  const pegStartY = h * 0.15;
  const pegEndY = h * 0.72;
  const rows = 8;
  const rowSpacing = (pegEndY - pegStartY) / rows;

  for (let row = 0; row < rows; row++) {
    const y = pegStartY + row * rowSpacing;
    const cols = row % 2 === 0 ? 7 : 6;
    const pegSpacing = (w - 80) / (cols + 1);
    const offset = row % 2 === 0 ? 40 : 40 + pegSpacing / 2;

    for (let col = 0; col < cols; col++) {
      state.pegs.push({
        x: offset + pegSpacing * (col + 1),
        y: y,
        radius: 6,
        hit: false,
        hitTime: 0,
      });
    }
  }
}

// ---------- Countdown ----------
function runCountdown() {
  return new Promise(resolve => {
    const overlay = document.createElement('div');
    overlay.className = 'countdown-overlay';
    document.body.appendChild(overlay);

    const counts = ['3', '2', '1', 'GO!'];
    let i = 0;

    function showNext() {
      if (i >= counts.length) {
        overlay.remove();
        resolve();
        return;
      }
      overlay.innerHTML = '';
      const el = document.createElement('div');
      el.className = counts[i] === 'GO!' ? 'countdown-number countdown-go' : 'countdown-number';
      el.textContent = counts[i];
      overlay.appendChild(el);
      audio.playCountdown(counts[i] === 'GO!');
      i++;
      setTimeout(showNext, i === counts.length ? 600 : 900);
    }
    showNext();
  });
}

// ---------- Start Race ----------
function startRace() {
  $('lap-indicator').textContent = 'FIRE TO ADVANCE!';

  // Start horse gallop animations
  state.horses.forEach((h, i) => {
    $('horse-' + i).querySelector('.horse-sprite').classList.add('running');
  });

  // Start racing music
  audio.startRacingMusic();

  // Start AI logic
  startAI();

  // Start game loop
  if (state.animFrame) cancelAnimationFrame(state.animFrame);
  gameLoop();
}

// ---------- Fire Ball ----------
function fireBall() {
  if (!state.launcher.ready || state.raceFinished) return;

  const dx = state.aimX - state.launcher.x;
  const angle = Math.atan2(state.canvasHeight, dx);
  const speed = 7;

  state.ball = {
    x: state.launcher.x,
    y: state.launcher.y,
    vx: Math.cos(angle) * speed + (dx / state.canvasWidth) * 4,
    vy: Math.abs(Math.sin(angle)) * speed,
    radius: 8,
    trail: [],
    alive: true,
    bounces: 0,
  };

  state.launcher.ready = false;
  state.launcher.cooldown = 0;
  state.shotsCount++;
  $('shots-count').textContent = state.shotsCount;

  audio.playLaunch();

  // Update power bar
  const powerBar = $('power-bar');
  powerBar.style.width = '0%';
  document.querySelector('.power-label').textContent = 'RELOADING';
  document.querySelector('.power-label').classList.add('charging');
}

// ---------- AI Logic ----------
function startAI() {
  state.aiTimers.forEach(t => clearInterval(t));
  state.aiTimers = [];

  // Each AI horse fires at random intervals
  for (let i = 1; i <= 3; i++) {
    const aiIndex = i;
    const baseInterval = 2500 + Math.random() * 2000; // 2.5-4.5s between "shots"

    const timer = setInterval(() => {
      if (state.raceFinished || state.horses[aiIndex].finished) {
        clearInterval(timer);
        return;
      }

      // AI picks a random hole value (weighted toward lower values for fairer game)
      const roll = Math.random();
      let value;
      if (roll < 0.05) value = 5;       // 5% chance of 5x
      else if (roll < 0.15) value = 4;  // 10% chance of 4x
      else if (roll < 0.35) value = 3;  // 20% chance of 3x
      else if (roll < 0.60) value = 2;  // 25% chance of 2x
      else if (roll < 0.80) value = 1;  // 20% chance of 1x
      else value = 0;                    // 20% chance of miss

      if (value > 0) {
        advanceHorse(aiIndex, value);
      }
    }, baseInterval);

    state.aiTimers.push(timer);
  }
}

// ---------- Advance Horse ----------
function advanceHorse(index, value) {
  const horse = state.horses[index];
  if (horse.finished || state.raceFinished) return;

  const boost = value * 18 + Math.random() * 8;
  horse.progress = Math.min(horse.progress + boost, FINISH_DISTANCE);

  // Gallop sound (throttled)
  const now = Date.now();
  if (now - state.lastGallopTime > 200) {
    audio.playGallop();
    state.lastGallopTime = now;
  }

  // Update visual position
  updateHorsePosition(index);

  // Check finish
  if (horse.progress >= FINISH_DISTANCE && !horse.finished) {
    horse.finished = true;
    horse.finishTime = Date.now();
    state.finishOrder.push(index);

    if (state.finishOrder.length === 1) {
      // First to finish – end race
      endRace();
    }
  }
}

function updateHorsePosition(index) {
  const horse = state.horses[index];
  const progress = horse.progress / FINISH_DISTANCE;
  const lane = document.querySelector(`.lane[data-lane="${index}"]`);
  const laneWidth = lane.offsetWidth - 200; // account for label and finish line
  const horseEl = $('horse-' + index);
  const newLeft = 150 + progress * laneWidth;
  horseEl.style.left = newLeft + 'px';
  $('progress-' + index).style.width = (progress * 100) + '%';
}

function updatePositionDisplay() {
  // Calculate player position
  const sortedHorses = [...state.horses].sort((a, b) => b.progress - a.progress);
  const playerPos = sortedHorses.findIndex(h => h.index === 0) + 1;
  const suffixes = ['st', 'nd', 'rd', 'th'];
  $('position-display').textContent = playerPos + suffixes[playerPos - 1];
}

// ---------- End Race ----------
function endRace() {
  state.raceFinished = true;

  // Stop AI
  state.aiTimers.forEach(t => clearInterval(t));
  state.aiTimers = [];

  // Finish remaining horses
  state.horses.forEach((h, i) => {
    if (!h.finished) {
      h.finished = true;
      h.finishTime = Date.now();
      state.finishOrder.push(i);
    }
  });

  // Stop animations
  state.horses.forEach((h, i) => {
    $('horse-' + i).querySelector('.horse-sprite').classList.remove('running');
  });

  // Stop music after short delay
  setTimeout(() => {
    audio.stopMusic();

    const winner = state.finishOrder[0];
    const playerWon = winner === 0;

    if (playerWon) {
      audio.playWinFanfare();
      audio.playCrowdCheer();
    } else {
      audio.playLoseSound();
    }

    // Populate result screen
    $('result-icon').textContent = playerWon ? '🏆' : '😤';
    $('result-title').textContent = playerWon ? 'YOU WIN!' : 'YOU LOST!';
    $('result-title').className = 'result-title ' + (playerWon ? 'win' : 'lose');
    $('result-subtitle').textContent = playerWon
      ? 'Thunder Bolt crosses the finish line first!'
      : `${HORSE_NAMES[winner]} takes the trophy!`;

    // Standings
    const standingsEl = $('final-standings');
    standingsEl.innerHTML = '';
    const posClasses = ['gold', 'silver', 'bronze', 'fourth'];
    const medals = ['🥇', '🥈', '🥉', '4th'];
    state.finishOrder.forEach((idx, pos) => {
      const row = document.createElement('div');
      row.className = 'standing-row' + (idx === 0 ? ' player-row' : '');
      row.innerHTML = `
        <span class="standing-position ${posClasses[pos]}">${medals[pos]}</span>
        <span class="standing-name">${HORSE_NAMES[idx]}</span>
        <span class="standing-tag" style="background:${idx === 0 ? '#f0c040' : '#2a3456'}; color:${idx === 0 ? '#1a1000' : '#8892b0'}">${idx === 0 ? 'YOU' : 'AI'}</span>
      `;
      standingsEl.appendChild(row);
    });

    // Stats
    $('final-shots').textContent = state.shotsCount;
    const accuracy = state.shotsCount > 0 ? Math.round((state.hitsCount / state.shotsCount) * 100) : 0;
    $('final-accuracy').textContent = accuracy + '%';

    showScreen('result');
  }, 1500);
}

// ---------- Game Loop ----------
function gameLoop() {
  if (state.screen !== 'playing' && state.screen !== 'game') {
    // Check if game screen is active
    if (!$('game-screen').classList.contains('active')) {
      if (state.animFrame) cancelAnimationFrame(state.animFrame);
      return;
    }
  }

  updateBall();
  updateCooldown();
  updatePositionDisplay();
  drawCanvas();

  state.animFrame = requestAnimationFrame(gameLoop);
}

function updateCooldown() {
  if (!state.launcher.ready && !state.ball) {
    state.launcher.cooldown += 1 / 60; // Approx 1 second cooldown
    const progress = Math.min(state.launcher.cooldown / 0.8, 1);
    $('power-bar').style.width = (progress * 100) + '%';

    if (progress >= 1) {
      state.launcher.ready = true;
      document.querySelector('.power-label').textContent = 'READY';
      document.querySelector('.power-label').classList.remove('charging');
    }
  }
}

function updateBall() {
  if (!state.ball || !state.ball.alive) return;

  const ball = state.ball;

  // Store trail
  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > 12) ball.trail.shift();

  // Apply gravity
  ball.vy += state.gravity;

  // Update position
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Wall collisions
  if (ball.x - ball.radius < 10) {
    ball.x = 10 + ball.radius;
    ball.vx *= -0.7;
    audio.playBounce();
  }
  if (ball.x + ball.radius > state.canvasWidth - 10) {
    ball.x = state.canvasWidth - 10 - ball.radius;
    ball.vx *= -0.7;
    audio.playBounce();
  }

  // Bottom wall – ball dies
  if (ball.y + ball.radius > state.canvasHeight - 10) {
    // Check if ball is near any hole
    let hitHole = null;
    for (const hole of state.holes) {
      const dx = ball.x - hole.x;
      const dy = ball.y - hole.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < hole.radius + ball.radius * 0.5) {
        hitHole = hole;
        break;
      }
    }

    if (hitHole) {
      // Hit a hole!
      state.hitsCount++;
      advanceHorse(0, hitHole.value);
      audio.playHoleHit(hitHole.value);
      showHitPopup(hitHole.x, hitHole.y - 30, '+' + hitHole.label);
    } else {
      // Missed all holes
      audio.playMiss();
      showHitPopup(ball.x, ball.y - 20, 'MISS', true);
    }

    ball.alive = false;
    state.ball = null;
    return;
  }

  // Peg collisions
  for (const peg of state.pegs) {
    const dx = ball.x - peg.x;
    const dy = ball.y - peg.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = ball.radius + peg.radius;

    if (dist < minDist) {
      // Bounce off peg
      const nx = dx / dist;
      const ny = dy / dist;
      const dot = ball.vx * nx + ball.vy * ny;
      ball.vx -= 1.5 * dot * nx;
      ball.vy -= 1.5 * dot * ny;

      // Add some randomness
      ball.vx += (Math.random() - 0.5) * 1.5;
      ball.vy += (Math.random() - 0.5) * 0.5;

      // Push out of peg
      ball.x = peg.x + nx * minDist;
      ball.y = peg.y + ny * minDist;

      // Mark peg as hit
      peg.hit = true;
      peg.hitTime = Date.now();

      ball.bounces++;
      if (ball.bounces < 20) audio.playBounce();
      break;
    }
  }

  // Check hole collisions mid-flight (attractive pull near holes)
  for (const hole of state.holes) {
    const dx = ball.x - hole.x;
    const dy = ball.y - hole.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Gentle pull when close
    if (dist < hole.radius * 2.5 && dist > hole.radius * 0.5) {
      const pullStrength = 0.15;
      ball.vx -= (dx / dist) * pullStrength;
      ball.vy -= (dy / dist) * pullStrength;
    }

    // Direct hole hit
    if (dist < hole.radius * 0.8) {
      state.hitsCount++;
      advanceHorse(0, hole.value);
      audio.playHoleHit(hole.value);
      showHitPopup(hole.x, hole.y - 30, '+' + hole.label);
      ball.alive = false;
      state.ball = null;
      return;
    }
  }
}

// ---------- Hit Popup ----------
function showHitPopup(x, y, text, isMiss = false) {
  const container = $('game-canvas-container');
  const popup = document.createElement('div');
  popup.className = 'hit-popup' + (isMiss ? ' miss' : '');
  popup.textContent = text;
  popup.style.left = x + 'px';
  popup.style.top = y + 'px';
  container.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

// ---------- Draw Canvas ----------
function drawCanvas() {
  const ctx = state.ctx;
  const w = state.canvasWidth;
  const h = state.canvasHeight;

  // Clear
  ctx.clearRect(0, 0, w, h);

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
  bgGrad.addColorStop(0, '#0f1525');
  bgGrad.addColorStop(1, '#0a1020');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // Draw walls
  ctx.fillStyle = '#1e2640';
  state.walls.forEach(wall => {
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
  });

  // Draw aim line
  if (state.launcher.ready && !state.raceFinished) {
    const dx = state.aimX - state.launcher.x;
    const angle = Math.atan2(h * 0.5, dx);
    ctx.strokeStyle = 'rgba(240, 192, 64, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(state.launcher.x, state.launcher.y);
    ctx.lineTo(
      state.launcher.x + Math.cos(angle) * 200,
      state.launcher.y + Math.sin(angle) * 200
    );
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Draw launcher
  drawLauncher(ctx);

  // Draw pegs
  const now = Date.now();
  state.pegs.forEach(peg => {
    const timeSinceHit = now - peg.hitTime;
    const isRecentlyHit = peg.hit && timeSinceHit < 300;

    ctx.beginPath();
    ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);

    if (isRecentlyHit) {
      const flash = 1 - timeSinceHit / 300;
      ctx.fillStyle = `rgba(0, 212, 255, ${0.5 + flash * 0.5})`;
      ctx.shadowBlur = 10 * flash;
      ctx.shadowColor = '#00d4ff';
    } else {
      ctx.fillStyle = '#3a4568';
      ctx.shadowBlur = 0;
    }
    ctx.fill();

    // Peg highlight
    ctx.beginPath();
    ctx.arc(peg.x - 1, peg.y - 1, peg.radius * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = isRecentlyHit ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)';
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  // Draw holes
  const time = Date.now() / 1000;
  state.holes.forEach(hole => {
    const pulse = Math.sin(time * 3 + hole.pulse) * 0.15 + 1;

    // Glow
    ctx.shadowBlur = 15 * pulse;
    ctx.shadowColor = hole.glow;

    // Outer ring
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius * pulse, 0, Math.PI * 2);
    ctx.strokeStyle = hole.color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner fill
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius * pulse * 0.85, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(hole.x, hole.y, 0, hole.x, hole.y, hole.radius * pulse);
    grad.addColorStop(0, 'rgba(0,0,0,0.8)');
    grad.addColorStop(0.7, 'rgba(0,0,0,0.5)');
    grad.addColorStop(1, hole.color + '40');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.shadowBlur = 0;

    // Label
    ctx.fillStyle = hole.color;
    ctx.font = `bold ${Math.max(12, hole.radius * 0.65)}px Oswald, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(hole.label, hole.x, hole.y);
  });

  // Draw ball
  if (state.ball && state.ball.alive) {
    const ball = state.ball;

    // Trail
    ball.trail.forEach((pos, i) => {
      const alpha = (i / ball.trail.length) * 0.5;
      const size = ball.radius * (i / ball.trail.length);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 192, 64, ${alpha})`;
      ctx.fill();
    });

    // Ball
    ctx.shadowBlur = 12;
    ctx.shadowColor = 'rgba(240, 192, 64, 0.6)';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    const ballGrad = ctx.createRadialGradient(
      ball.x - 2, ball.y - 2, 0,
      ball.x, ball.y, ball.radius
    );
    ballGrad.addColorStop(0, '#fff8e0');
    ballGrad.addColorStop(0.4, '#f0c040');
    ballGrad.addColorStop(1, '#b8942e');
    ctx.fillStyle = ballGrad;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Highlight
    ctx.beginPath();
    ctx.arc(ball.x - 2, ball.y - 2, ball.radius * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fill();
  }

  // Draw "Aim here" text when ready
  if (state.launcher.ready && !state.ball && !state.raceFinished) {
    ctx.fillStyle = 'rgba(240, 192, 64, 0.4)';
    ctx.font = '14px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Click to fire!', w / 2, h - 30);
  }
}

function drawLauncher(ctx) {
  const lx = state.launcher.x;
  const ly = state.launcher.y;
  const ready = state.launcher.ready;

  // Barrel direction
  const dx = state.aimX - lx;
  const angle = Math.atan2(state.canvasHeight * 0.3, dx);

  // Base
  ctx.fillStyle = '#2a3456';
  ctx.beginPath();
  ctx.arc(lx, ly, 18, 0, Math.PI * 2);
  ctx.fill();

  // Barrel
  ctx.save();
  ctx.translate(lx, ly);
  ctx.rotate(angle);

  ctx.fillStyle = ready ? '#f0c040' : '#5a6380';
  ctx.fillRect(0, -4, 24, 8);
  ctx.fillStyle = ready ? '#b8942e' : '#3a4568';
  ctx.fillRect(20, -5, 6, 10);

  ctx.restore();

  // Center dot
  ctx.beginPath();
  ctx.arc(lx, ly, 6, 0, Math.PI * 2);
  ctx.fillStyle = ready ? '#00d4ff' : '#3a4568';
  ctx.fill();

  if (ready && !state.raceFinished) {
    ctx.beginPath();
    ctx.arc(lx, ly, 10, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

// ---------- Window Resize ----------
window.addEventListener('resize', () => {
  if ($('game-screen').classList.contains('active')) {
    setupCanvas();
    generateHolesAndPegs();
  }
});
