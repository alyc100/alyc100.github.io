/* ============================================
   DERBY DASH – Audio Engine
   Procedural sound effects & music via Web Audio API
   ============================================ */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.musicPlaying = false;
    this.musicNodes = [];
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.7;
    this.masterGain.connect(this.ctx.destination);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.25;
    this.musicGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.6;
    this.sfxGain.connect(this.masterGain);

    this.initialized = true;
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /* ---------- Sound Effects ---------- */

  // Ball launch sound – a punchy pop with whoosh
  playLaunch() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Pop
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);
    gain.gain.setValueAtTime(0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.2);

    // Whoosh noise
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 2000;
    bandpass.Q.value = 0.5;
    noise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t);
    noise.stop(t + 0.15);
  }

  // Ball hitting a hole – satisfying thunk with pitch based on value
  playHoleHit(value) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const basePitch = 300 + value * 80;

    // Thunk
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(basePitch, t);
    osc1.frequency.exponentialRampToValueAtTime(basePitch * 0.5, t + 0.12);
    gain1.gain.setValueAtTime(0.5, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc1.connect(gain1);
    gain1.connect(this.sfxGain);
    osc1.start(t);
    osc1.stop(t + 0.15);

    // Chime
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(basePitch * 2, t + 0.05);
    gain2.gain.setValueAtTime(0.3, t + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    osc2.connect(gain2);
    gain2.connect(this.sfxGain);
    osc2.start(t + 0.05);
    osc2.stop(t + 0.4);

    // High value bonus sparkle
    if (value >= 4) {
      for (let i = 0; i < 3; i++) {
        const osc3 = this.ctx.createOscillator();
        const gain3 = this.ctx.createGain();
        osc3.type = 'sine';
        osc3.frequency.value = basePitch * (2 + i * 0.5);
        gain3.gain.setValueAtTime(0.15, t + 0.1 + i * 0.06);
        gain3.gain.exponentialRampToValueAtTime(0.001, t + 0.3 + i * 0.06);
        osc3.connect(gain3);
        gain3.connect(this.sfxGain);
        osc3.start(t + 0.1 + i * 0.06);
        osc3.stop(t + 0.35 + i * 0.06);
      }
    }
  }

  // Miss sound – dull thud
  playMiss() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.15);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.2);

    // Noise thud
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 400;
    noise.connect(lp);
    lp.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(t);
    noise.stop(t + 0.1);
  }

  // Bounce/wall hit
  playBounce() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400 + Math.random() * 200, t);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.06);
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Countdown beep
  playCountdown(isFinal) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.value = isFinal ? 880 : 440;
    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isFinal ? 0.5 : 0.25));
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + (isFinal ? 0.5 : 0.25));
  }

  // Win fanfare
  playWinFanfare() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.35, t + i * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.5);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + i * 0.15);
      osc.stop(t + i * 0.15 + 0.5);
    });

    // Shimmer
    for (let i = 0; i < 8; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 1000 + Math.random() * 3000;
      const start = t + 0.6 + Math.random() * 0.4;
      gain.gain.setValueAtTime(0.08, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(start);
      osc.stop(start + 0.3);
    }
  }

  // Lose sound
  playLoseSound() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const notes = [392, 349.23, 293.66, 261.63]; // G4, F4, D4, C4 descending
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.2, t + i * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.2 + 0.25);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + i * 0.2);
      osc.stop(t + i * 0.2 + 0.25);
    });
  }

  // Horse gallop click
  playGallop() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(180 + i * 30, t + i * 0.06);
      osc.frequency.exponentialRampToValueAtTime(80, t + i * 0.06 + 0.04);
      gain.gain.setValueAtTime(0.08, t + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.05);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t + i * 0.06);
      osc.stop(t + i * 0.06 + 0.05);
    }
  }

  /* ---------- Racing Music ---------- */
  startRacingMusic() {
    if (!this.ctx || this.musicPlaying) return;
    this.musicPlaying = true;

    // Tempo: 150 BPM
    const bpm = 150;
    const beatDuration = 60 / bpm;
    const barDuration = beatDuration * 4;

    // Bass line pattern (root notes for chord progression)
    const bassPattern = [
      // Bar 1: Am
      { note: 110, time: 0 },
      { note: 110, time: beatDuration },
      { note: 130.81, time: beatDuration * 2 },
      { note: 110, time: beatDuration * 3 },
      // Bar 2: F
      { note: 87.31, time: barDuration },
      { note: 87.31, time: barDuration + beatDuration },
      { note: 98, time: barDuration + beatDuration * 2 },
      { note: 87.31, time: barDuration + beatDuration * 3 },
      // Bar 3: G
      { note: 98, time: barDuration * 2 },
      { note: 98, time: barDuration * 2 + beatDuration },
      { note: 110, time: barDuration * 2 + beatDuration * 2 },
      { note: 98, time: barDuration * 2 + beatDuration * 3 },
      // Bar 4: E
      { note: 82.41, time: barDuration * 3 },
      { note: 82.41, time: barDuration * 3 + beatDuration },
      { note: 98, time: barDuration * 3 + beatDuration * 2 },
      { note: 82.41, time: barDuration * 3 + beatDuration * 3 },
    ];

    // Melody pattern – exciting, driving
    const melodyPattern = [
      // Bar 1
      { note: 440, time: 0, dur: beatDuration * 0.8 },
      { note: 523.25, time: beatDuration, dur: beatDuration * 0.5 },
      { note: 493.88, time: beatDuration * 1.5, dur: beatDuration * 0.5 },
      { note: 440, time: beatDuration * 2, dur: beatDuration * 0.8 },
      { note: 392, time: beatDuration * 3, dur: beatDuration * 0.5 },
      { note: 440, time: beatDuration * 3.5, dur: beatDuration * 0.5 },
      // Bar 2
      { note: 349.23, time: barDuration, dur: beatDuration * 1.5 },
      { note: 392, time: barDuration + beatDuration * 1.5, dur: beatDuration * 0.5 },
      { note: 440, time: barDuration + beatDuration * 2, dur: beatDuration * 0.8 },
      { note: 349.23, time: barDuration + beatDuration * 3, dur: beatDuration },
      // Bar 3
      { note: 392, time: barDuration * 2, dur: beatDuration * 0.8 },
      { note: 493.88, time: barDuration * 2 + beatDuration, dur: beatDuration * 0.5 },
      { note: 523.25, time: barDuration * 2 + beatDuration * 1.5, dur: beatDuration * 0.5 },
      { note: 587.33, time: barDuration * 2 + beatDuration * 2, dur: beatDuration },
      { note: 523.25, time: barDuration * 2 + beatDuration * 3, dur: beatDuration * 0.5 },
      { note: 493.88, time: barDuration * 2 + beatDuration * 3.5, dur: beatDuration * 0.5 },
      // Bar 4
      { note: 329.63, time: barDuration * 3, dur: beatDuration * 1.5 },
      { note: 392, time: barDuration * 3 + beatDuration * 1.5, dur: beatDuration * 0.5 },
      { note: 440, time: barDuration * 3 + beatDuration * 2, dur: beatDuration },
      { note: 493.88, time: barDuration * 3 + beatDuration * 3, dur: beatDuration },
    ];

    // Drums – kick and hi-hat pattern
    const drumPattern = [];
    for (let bar = 0; bar < 4; bar++) {
      for (let beat = 0; beat < 4; beat++) {
        const t = bar * barDuration + beat * beatDuration;
        drumPattern.push({ type: 'kick', time: t });
        drumPattern.push({ type: 'hat', time: t });
        drumPattern.push({ type: 'hat', time: t + beatDuration * 0.5 });
        if (beat === 1 || beat === 3) {
          drumPattern.push({ type: 'snare', time: t });
        }
      }
    }

    const loopDuration = barDuration * 4;
    this._playMusicLoop(bassPattern, melodyPattern, drumPattern, loopDuration);
  }

  _playMusicLoop(bassPattern, melodyPattern, drumPattern, loopDuration) {
    if (!this.musicPlaying || !this.ctx) return;

    const startTime = this.ctx.currentTime + 0.05;
    const nodes = [];

    // Bass
    bassPattern.forEach(({ note, time }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = note;
      const s = startTime + time;
      gain.gain.setValueAtTime(0.18, s);
      gain.gain.exponentialRampToValueAtTime(0.001, s + 0.3);

      // Low pass for warmth
      const lp = this.ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 300;
      osc.connect(lp);
      lp.connect(gain);
      gain.connect(this.musicGain);
      osc.start(s);
      osc.stop(s + 0.35);
      nodes.push(osc);
    });

    // Melody
    melodyPattern.forEach(({ note, time, dur }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = note;
      const s = startTime + time;
      gain.gain.setValueAtTime(0, s);
      gain.gain.linearRampToValueAtTime(0.12, s + 0.02);
      gain.gain.setValueAtTime(0.12, s + dur * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.001, s + dur);

      // Slight detuned layer for richness
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.value = note * 1.002;
      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0, s);
      gain2.gain.linearRampToValueAtTime(0.06, s + 0.02);
      gain2.gain.setValueAtTime(0.06, s + dur * 0.7);
      gain2.gain.exponentialRampToValueAtTime(0.001, s + dur);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(this.musicGain);
      gain2.connect(this.musicGain);
      osc.start(s);
      osc.stop(s + dur + 0.05);
      osc2.start(s);
      osc2.stop(s + dur + 0.05);
      nodes.push(osc, osc2);
    });

    // Drums
    drumPattern.forEach(({ type, time }) => {
      const s = startTime + time;
      if (type === 'kick') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, s);
        osc.frequency.exponentialRampToValueAtTime(40, s + 0.12);
        gain.gain.setValueAtTime(0.35, s);
        gain.gain.exponentialRampToValueAtTime(0.001, s + 0.15);
        osc.connect(gain);
        gain.connect(this.musicGain);
        osc.start(s);
        osc.stop(s + 0.15);
        nodes.push(osc);
      } else if (type === 'snare') {
        const bufSize = this.ctx.sampleRate * 0.08;
        const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 1.5);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buf;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, s);
        gain.gain.exponentialRampToValueAtTime(0.001, s + 0.08);
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 1000;
        noise.connect(hp);
        hp.connect(gain);
        gain.connect(this.musicGain);
        noise.start(s);
        noise.stop(s + 0.08);
        nodes.push(noise);
      } else if (type === 'hat') {
        const bufSize = this.ctx.sampleRate * 0.04;
        const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 3);
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buf;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.08, s);
        gain.gain.exponentialRampToValueAtTime(0.001, s + 0.04);
        const hp = this.ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 6000;
        noise.connect(hp);
        hp.connect(gain);
        gain.connect(this.musicGain);
        noise.start(s);
        noise.stop(s + 0.04);
        nodes.push(noise);
      }
    });

    this.musicNodes = nodes;

    // Schedule the next loop
    this._musicTimeout = setTimeout(() => {
      this._playMusicLoop(bassPattern, melodyPattern, drumPattern, loopDuration);
    }, loopDuration * 1000 - 50); // Slight overlap for seamless loop
  }

  stopMusic() {
    this.musicPlaying = false;
    if (this._musicTimeout) {
      clearTimeout(this._musicTimeout);
      this._musicTimeout = null;
    }
    this.musicNodes.forEach(n => {
      try { n.stop(); } catch (e) { /* already stopped */ }
    });
    this.musicNodes = [];
  }

  // Crowd cheer
  playCrowdCheer() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    // Layered noise to simulate crowd
    for (let i = 0; i < 3; i++) {
      const bufSize = this.ctx.sampleRate * 2;
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < bufSize; j++) {
        const envelope = Math.sin((j / bufSize) * Math.PI);
        d[j] = (Math.random() * 2 - 1) * envelope * 0.15;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buf;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, t + i * 0.2);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.3 + i * 0.2);
      gain.gain.linearRampToValueAtTime(0.08, t + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 800 + i * 600;
      bp.Q.value = 0.3;
      noise.connect(bp);
      bp.connect(gain);
      gain.connect(this.sfxGain);
      noise.start(t + i * 0.2);
      noise.stop(t + 2.5);
    }
  }
}

// Global audio instance
const audio = new AudioEngine();
