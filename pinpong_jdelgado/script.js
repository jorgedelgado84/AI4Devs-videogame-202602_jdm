'use strict';

// ── CONFIG ──────────────────────────────────────────────────────────────
const W  = 200, H  = 100;   // canvas logical dimensions
const PW = 3,   PH = 25;    // paddle width / height
const BR = 2;               // ball radius
const BALL_SPEED  = 55;     // px/s
const PAD_SPEED   = 70;     // px/s
const PU_SPEED    = 10;     // power-up fall speed px/s
const PU_INTERVAL = 20;     // seconds between spawns
const PU_DURATION = 5;      // effect duration seconds
const WIN = 10;             // points to win

// Power-up catalogue
const PU_TYPES = ['duplicate', 'triplicate', 'speed2', 'speed3'];
const PU_LABEL = { duplicate: '2X', triplicate: '3X', speed2: '2V', speed3: '3V' };
const PU_COLOR = { duplicate: '#ffdd00', triplicate: '#ff2200', speed2: '#aaff00', speed3: '#00aaff' };
const PU_NAMES = { duplicate: 'Pelota ×2', triplicate: 'Pelota ×3', speed2: 'Velocidad ×2', speed3: 'Velocidad ×3' };

// Paddle horizontal travel limits
const L_X_MIN = 2,      L_X_MAX = 40 - PW;
const R_X_MIN = W - 40, R_X_MAX = W - 2 - PW;

// ── DOM refs ─────────────────────────────────────────────────────────────
const canvas     = document.getElementById('gameCanvas');
const ctx        = canvas.getContext('2d');
const elScoreL   = document.getElementById('score-left');
const elScoreR   = document.getElementById('score-right');
const elBarL     = document.getElementById('bar-left');
const elBarR     = document.getElementById('bar-right');
const elOverlay  = document.getElementById('overlay');
const elTitle    = document.getElementById('overlay-title');
const elPUStatus = document.getElementById('pu-status');

// ── STATE ────────────────────────────────────────────────────────────────
const keys = {};
let phase;   // 'playing' | 'gameover'
let score, pads, balls, powerups, effect, puTimer, lastTs;

// ── INIT ─────────────────────────────────────────────────────────────────
function init() {
  score    = { left: 0, right: 0 };
  pads     = {
    left:  { x: 4,          y: H / 2 - PH / 2 },
    right: { x: W - 4 - PW, y: H / 2 - PH / 2 }
  };
  balls    = [];
  powerups = [];
  effect   = null;
  puTimer  = 0;
  phase    = 'playing';
  refreshHUD();
  elOverlay.classList.remove('show');
  elPUStatus.textContent = '';
  serve('left');
}

function serve(side) {
  balls    = [];
  powerups = [];
  effect   = null;
  elPUStatus.textContent = '';

  const spread = (Math.random() - 0.5) * (Math.PI / 3);
  const base   = side === 'left' ? 0 : Math.PI;
  balls.push(makeBall(W / 2, H / 2, base + spread, BALL_SPEED));
}

function makeBall(x, y, angle, speed, extra = false) {
  return { x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, extra };
}

// ── INPUT ────────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault();
  if (e.code === 'Space' && phase === 'gameover') init();
});
document.addEventListener('keyup', e => { keys[e.code] = false; });

// ── UPDATE ───────────────────────────────────────────────────────────────
function update(dt) {
  if (phase !== 'playing') return;
  movePaddles(dt);
  moveBalls(dt);
  tickPowerups(dt);
}

function movePaddles(dt) {
  const s = PAD_SPEED * dt;

  // Left paddle: WASD (A=left, D=right in absolute coords)
  if (keys['KeyW']) pads.left.y -= s;
  if (keys['KeyS']) pads.left.y += s;
  if (keys['KeyA']) pads.left.x -= s;
  if (keys['KeyD']) pads.left.x += s;

  // Right paddle: Arrow keys
  if (keys['ArrowUp'])    pads.right.y -= s;
  if (keys['ArrowDown'])  pads.right.y += s;
  if (keys['ArrowLeft'])  pads.right.x -= s;
  if (keys['ArrowRight']) pads.right.x += s;

  pads.left.y  = clamp(pads.left.y,  0, H - PH);
  pads.right.y = clamp(pads.right.y, 0, H - PH);
  pads.left.x  = clamp(pads.left.x,  L_X_MIN, L_X_MAX);
  pads.right.x = clamp(pads.right.x, R_X_MIN, R_X_MAX);
}

function moveBalls(dt) {
  let scored = null;

  for (let i = balls.length - 1; i >= 0; i--) {
    const b = balls[i];
    b.x += b.vx * dt;
    b.y += b.vy * dt;

    // Top / bottom wall bounce
    if (b.y - BR < 0) { b.y = BR;     b.vy =  Math.abs(b.vy); }
    if (b.y + BR > H) { b.y = H - BR; b.vy = -Math.abs(b.vy); }

    // Paddle collisions — pass whether the paddle is advancing toward center (RF-31)
    paddleHit(b, pads.left,  +1, keys['KeyD']);
    paddleHit(b, pads.right, -1, keys['ArrowLeft']);

    // Power-up collisions
    for (let j = powerups.length - 1; j >= 0; j--) {
      if (ballHitsPU(b, powerups[j])) {
        applyEffect(powerups[j].type);
        powerups.splice(j, 1);
      }
    }

    // Out of bounds — only main balls trigger scoring
    if (b.x + BR < 0) {
      if (!b.extra && scored === null) scored = 'right';
      balls.splice(i, 1);
    } else if (b.x - BR > W) {
      if (!b.extra && scored === null) scored = 'left';
      balls.splice(i, 1);
    }
  }

  if (scored !== null) {
    score[scored]++;
    refreshHUD();
    if (score[scored] >= WIN) {
      phase = 'gameover';
      const who = scored === 'left' ? 'Jugador 2 (Azul)' : 'Jugador 1 (Rojo)';
      elTitle.textContent = `¡${who} gana!`;
      elOverlay.classList.add('show');
    } else {
      serve(scored);
    }
  }
}

function paddleHit(b, pad, dir, advancing) {
  // dir: +1 = left paddle (reflects rightward), -1 = right paddle (reflects leftward)
  if (b.x - BR > pad.x + PW || b.x + BR < pad.x) return;
  if (b.y - BR > pad.y + PH  || b.y + BR < pad.y) return;

  const hit   = (b.y - pad.y) / PH;                      // 0..1 position along paddle
  const angle = (hit - 0.5) * (Math.PI * 0.6);           // ±54° range
  const speed = Math.hypot(b.vx, b.vy) * (advancing ? 1.1 : 1); // RF-31: +10% on attack

  b.vx = dir * Math.abs(Math.cos(angle)) * speed;
  b.vy = Math.sin(angle) * speed;

  // Push ball clear of paddle to prevent sticking
  b.x = dir === 1 ? pad.x + PW + BR + 0.5 : pad.x - BR - 0.5;
}

function ballHitsPU(b, pu) {
  return b.x + BR > pu.x && b.x - BR < pu.x + 14 &&
         b.y + BR > pu.y && b.y - BR < pu.y + 10;
}

// ── POWER-UPS ────────────────────────────────────────────────────────────
function tickPowerups(dt) {
  puTimer += dt;
  if (puTimer >= PU_INTERVAL && powerups.length === 0) {
    spawnPU();
    puTimer = 0;
  }

  for (let i = powerups.length - 1; i >= 0; i--) {
    powerups[i].y += PU_SPEED * dt;
    if (powerups[i].y > H) powerups.splice(i, 1);
  }

  if (effect) {
    effect.remaining -= dt;
    updatePUStatus();
    if (effect.remaining <= 0) endEffect();
  }
}

function spawnPU() {
  const type = PU_TYPES[Math.floor(Math.random() * PU_TYPES.length)];
  powerups.push({ type, x: 20 + Math.random() * (W - 54), y: -28 }); // -28 = label(15) + gap(3) + box(10)
}

function applyEffect(type) {
  endEffect();
  effect = { type, remaining: PU_DURATION };

  if (type === 'duplicate') {
    balls.filter(b => !b.extra).forEach(b => {
      const a = Math.atan2(b.vy, b.vx);
      const s = Math.hypot(b.vx, b.vy);
      balls.push(makeBall(b.x, b.y, a + toRad(15), s, true));
    });

  } else if (type === 'triplicate') {
    balls.filter(b => !b.extra).forEach(b => {
      const a = Math.atan2(b.vy, b.vx);
      const s = Math.hypot(b.vx, b.vy);
      balls.push(makeBall(b.x, b.y, a + toRad(15), s, true));
      balls.push(makeBall(b.x, b.y, a + toRad(30), s, true));
    });

  } else if (type === 'speed2') {
    effect.mult = 2;
    balls.forEach(b => { b.vx *= 2; b.vy *= 2; });

  } else if (type === 'speed3') {
    effect.mult = 3;
    balls.forEach(b => { b.vx *= 3; b.vy *= 3; });
  }
}

function endEffect() {
  if (!effect) return;

  if (effect.type === 'duplicate' || effect.type === 'triplicate') {
    balls = balls.filter(b => !b.extra);
    if (balls.length === 0) serve('left');

  } else if (effect.mult) {
    balls.forEach(b => { b.vx /= effect.mult; b.vy /= effect.mult; });
  }

  effect = null;
  elPUStatus.textContent = '';
}

// ── RENDER ───────────────────────────────────────────────────────────────
function render() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // Centre dashed line
  ctx.save();
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = '#1e1e1e';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
  ctx.restore();

  // Paddles
  ctx.fillStyle = '#3366ff';
  ctx.fillRect(pads.left.x,  pads.left.y,  PW, PH);
  ctx.fillStyle = '#ff3333';
  ctx.fillRect(pads.right.x, pads.right.y, PW, PH);

  // Balls
  ctx.fillStyle = '#fff';
  balls.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, BR, 0, Math.PI * 2);
    ctx.fill();
  });

  // Power-ups: label (15px) above colored box (14×10)
  powerups.forEach(pu => {
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = PU_COLOR[pu.type];
    ctx.fillText(PU_LABEL[pu.type], pu.x + 7, pu.y);    // label above box
    ctx.fillRect(pu.x, pu.y, 14, 10);                    // colored box below label
  });

  // Active effect countdown bar at bottom of canvas
  if (effect) {
    const pct = effect.remaining / PU_DURATION;
    ctx.fillStyle = PU_COLOR[effect.type] + 'aa';
    ctx.fillRect(0, H - 2, W * pct, 2);
  }
}

// ── HUD ──────────────────────────────────────────────────────────────────
function refreshHUD() {
  elScoreL.textContent = score.left;
  elScoreR.textContent = score.right;
  elBarL.style.width   = (score.left  / WIN * 100) + '%';
  elBarR.style.width   = (score.right / WIN * 100) + '%';
}

function updatePUStatus() {
  if (!effect) return;
  elPUStatus.textContent = `⚡ ${PU_NAMES[effect.type]}  —  ${effect.remaining.toFixed(1)}s`;
  elPUStatus.style.color = PU_COLOR[effect.type];
}

// ── UTILS ────────────────────────────────────────────────────────────────
function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
function toRad(d)          { return d * Math.PI / 180; }

// ── GAME LOOP ────────────────────────────────────────────────────────────
function loop(ts) {
  const dt = Math.min((ts - lastTs) / 1000, 0.05);
  lastTs = ts;
  update(dt);
  render();
  requestAnimationFrame(loop);
}

lastTs = performance.now();
init();
requestAnimationFrame(loop);
