/**
 * NEBULA NAVIGATOR - Sci-Fi Snakes & Ladders
 * Core Game Engine
 */

class AudioEngine {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    playRoll() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playMove() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
    }

    playWarpEffect(isUp) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        const startFreq = isUp ? 200 : 800;
        const endFreq = isUp ? 1200 : 100;
        osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
    }
}

class Game {
    constructor() {
        this.boardSize = 10;
        this.players = [
            { id: 1, pos: 1, color: 'blue', element: null },
            { id: 2, pos: 1, color: 'red', element: null }
        ];
        this.currentPlayerIdx = 0;
        this.isMoving = false;
        this.links = {
            // Quantum Portals (Ladders)
            4: 25, 13: 46, 33: 49, 42: 63, 50: 69, 62: 81, 74: 92,
            // Wormholes (Snakes)
            27: 5, 40: 3, 43: 18, 54: 31, 66: 45, 76: 58, 89: 53, 99: 41
        };

        this.audio = new AudioEngine();
        this.initBoard();
        this.initTokens();
        this.setupEvents();
        this.updateUI();
    }

    initBoard() {
        const board = document.getElementById('game-board');
        for (let i = 100; i >= 1; i--) {
            // Calculate tile number based on boustrophedon (snake-style) grid
            let row = Math.floor((100 - i) / 10);
            let col = (100 - i) % 10;
            let actualNum;

            // This is complex because we want 1 at bottom-left and 100 at top-left/right
            // Simplified: Row 0 is 91-100, Row 9 is 1-10
            let r = Math.floor((i - 1) / 10);
            let c = (i - 1) % 10;
            if (r % 2 !== 0) {
                c = 9 - c;
            }
            // For DOM insertion, we just go from 100 down to 1 visually in the grid
        }

        // Simpler grid generation for CSS Grid
        for (let r = 9; r >= 0; r--) {
            for (let c = 0; c < 10; c++) {
                let actualC = (9 - r) % 2 === 1 ? 9 - c : c;
                let num = r * 10 + actualC + 1;

                const tile = document.createElement('div');
                tile.className = 'tile';
                tile.id = `tile-${num}`;
                tile.textContent = num;

                if (this.links[num]) {
                    if (this.links[num] > num) {
                        tile.classList.add('special-portal');
                        tile.innerHTML += '<div class="portal-effect"></div>';
                    } else {
                        tile.classList.add('special-wormhole');
                        tile.innerHTML += '<img src="assets/wormhole.png" class="wormhole-img">';
                    }
                }

                board.appendChild(tile);
            }
        }
    }

    initTokens() {
        const layer = document.getElementById('tokens-layer');
        this.players.forEach(p => {
            const token = document.createElement('div');
            token.className = `token player-${p.id}`;
            p.element = token;
            layer.appendChild(token);
        });
        // Wait for next frame to ensure layout is settled
        requestAnimationFrame(() => {
            this.players.forEach(p => this.updateTokenPosition(p));
        });
    }

    getTileCoords(num) {
        const tile = document.getElementById(`tile-${num}`);
        if (!tile) return { x: 0, y: 0 };
        const board = document.getElementById('game-board');
        const boardRect = board.getBoundingClientRect();
        const tileRect = tile.getBoundingClientRect();

        return {
            x: tileRect.left - boardRect.left + (tileRect.width / 2) - 20,
            y: tileRect.top - boardRect.top + (tileRect.height / 2) - 20
        };
    }

    updateTokenPosition(player) {
        if (!player.element) return;
        const coords = this.getTileCoords(player.pos);
        const offset = player.id === 1 ? -12 : 12; // Slightly more offset
        player.element.style.transform = `translate(${coords.x + offset}px, ${coords.y}px)`;
    }

    setupEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.isMoving) {
                this.handleTurn();
            }
        });

        window.addEventListener('resize', () => {
            this.players.forEach(p => this.updateTokenPosition(p));
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            location.reload();
        });
    }

    async handleTurn() {
        this.isMoving = true;
        const roll = Math.floor(Math.random() * 6) + 1;
        document.getElementById('dice-value').textContent = roll;
        this.audio.playRoll();

        const player = this.players[this.currentPlayerIdx];
        // Animate movement tile by tile
        const actualMoveSteps = (player.pos + roll > 100) ? 0 : roll; // Stay if over 100

        if (actualMoveSteps === 0 && player.pos + roll > 100) {
            // Optional: Provide visual/audio feedback for "too high"
        }

        for (let i = 0; i < actualMoveSteps; i++) {
            player.pos++;
            this.updateTokenPosition(player);
            this.audio.playMove();
            await new Promise(r => setTimeout(r, 300));
        }

        // Check for Portals or Wormholes
        if (this.links[player.pos]) {
            const destination = this.links[player.pos];
            const isUp = destination > player.pos;

            await new Promise(r => setTimeout(r, 500));
            this.audio.playWarpEffect(isUp);
            player.pos = destination;
            this.updateTokenPosition(player);
            await new Promise(r => setTimeout(r, 600));
        }

        if (player.pos === 100) {
            this.showWinner(player);
            return;
        }

        this.currentPlayerIdx = (this.currentPlayerIdx + 1) % 2;
        this.updateUI();
        this.isMoving = false;
    }

    updateUI() {
        const turnText = document.getElementById('player-turn');
        turnText.textContent = `PLAYER ${this.currentPlayerIdx + 1}`;
        turnText.style.color = this.currentPlayerIdx === 0 ? 'var(--neon-cyan)' : 'var(--neon-pink)';
    }

    showWinner(player) {
        const overlay = document.getElementById('overlay');
        const winnerText = document.getElementById('winner-text');
        overlay.classList.remove('hidden');
        winnerText.textContent = `PLAYER ${player.id} TRIUMPHS`;
        winnerText.style.color = player.id === 1 ? 'var(--neon-cyan)' : 'var(--neon-pink)';
    }
}

// Initializing the game
window.addEventListener('load', () => {
    new Game();
});
