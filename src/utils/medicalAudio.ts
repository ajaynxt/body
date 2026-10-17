// Web Audio API Synthesizer for Medical Auscultation & Interactive Sound Effects
// Zero external mp3 dependencies - 100% offline, crystal clear, low latency

class MedicalAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private heartbeatInterval: number | null = null;
  private isHeartbeatPlaying: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isHeartbeatPlaying) {
      this.stopHeartbeat();
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Futuristic Medical Scanner Beep
  public playScanBeep() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio fallback safe
    }
  }

  // Success Ping (Major chord)
  public playCorrectPing() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {}
  }

  // Incorrect Buzzer
  public playIncorrectBuzzer() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.22);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    } catch {}
  }

  // Surgical Scalpel Slicing sound
  public playScalpelCut() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Noise buffer for subtle scalpel friction
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, ctx.currentTime);
      filter.Q.setValueAtTime(3, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.15);
    } catch {}
  }

  // Single Lub-Dub pulse
  public playLubDub(soundType: 'normal' | 'murmur' | 'wheeze' = 'normal') {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // S1: "LUB" - Lower pitch, slightly longer, softer onset
      const s1Osc = ctx.createOscillator();
      const s1Gain = ctx.createGain();
      s1Osc.type = 'sine';
      s1Osc.frequency.setValueAtTime(65, now);
      s1Osc.frequency.exponentialRampToValueAtTime(35, now + 0.11);

      s1Gain.gain.setValueAtTime(0.001, now);
      s1Gain.gain.linearRampToValueAtTime(0.28, now + 0.02);
      s1Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

      s1Osc.connect(s1Gain);
      s1Gain.connect(ctx.destination);
      s1Osc.start(now);
      s1Osc.stop(now + 0.12);

      // Systolic Murmur (if active): rushing whoosh between S1 and S2
      if (soundType === 'murmur') {
        const murmurBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.12), ctx.sampleRate);
        const mData = murmurBuffer.getChannelData(0);
        for (let i = 0; i < mData.length; i++) {
          mData[i] = Math.random() * 2 - 1;
        }
        const mSource = ctx.createBufferSource();
        mSource.buffer = murmurBuffer;

        const mFilter = ctx.createBiquadFilter();
        mFilter.type = 'bandpass';
        mFilter.frequency.setValueAtTime(500, now + 0.04);

        const mGain = ctx.createGain();
        mGain.gain.setValueAtTime(0.08, now + 0.04);
        mGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        mSource.connect(mFilter);
        mFilter.connect(mGain);
        mGain.connect(ctx.destination);

        mSource.start(now + 0.04);
        mSource.stop(now + 0.16);
      }

      // S2: "DUB" - Higher pitch, sharper, crisper
      const s2Time = now + 0.15;
      const s2Osc = ctx.createOscillator();
      const s2Gain = ctx.createGain();
      s2Osc.type = 'sine';
      s2Osc.frequency.setValueAtTime(95, s2Time);
      s2Osc.frequency.exponentialRampToValueAtTime(45, s2Time + 0.08);

      s2Gain.gain.setValueAtTime(0.001, s2Time);
      s2Gain.gain.linearRampToValueAtTime(0.24, s2Time + 0.015);
      s2Gain.gain.exponentialRampToValueAtTime(0.001, s2Time + 0.08);

      s2Osc.connect(s2Gain);
      s2Gain.connect(ctx.destination);
      s2Osc.start(s2Time);
      s2Osc.stop(s2Time + 0.09);

      // Wheeze effect (if lungs selected)
      if (soundType === 'wheeze') {
        const wOsc = ctx.createOscillator();
        const wGain = ctx.createGain();
        wOsc.type = 'sine';
        wOsc.frequency.setValueAtTime(420, now + 0.05);
        wOsc.frequency.linearRampToValueAtTime(460, now + 0.28);

        wGain.gain.setValueAtTime(0.001, now + 0.05);
        wGain.gain.linearRampToValueAtTime(0.07, now + 0.12);
        wGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        wOsc.connect(wGain);
        wGain.connect(ctx.destination);
        wOsc.start(now + 0.05);
        wOsc.stop(now + 0.31);
      }
    } catch {}
  }

  // Continuous Heartbeat Loop
  public startHeartbeat(bpm: number = 72, soundType: 'normal' | 'murmur' | 'wheeze' = 'normal') {
    this.stopHeartbeat();
    this.isHeartbeatPlaying = true;
    const intervalMs = Math.round((60 / Math.max(30, Math.min(200, bpm))) * 1000);

    this.playLubDub(soundType);
    this.heartbeatInterval = window.setInterval(() => {
      this.playLubDub(soundType);
    }, intervalMs);
  }

  public updateHeartbeatBpm(bpm: number, soundType: 'normal' | 'murmur' | 'wheeze' = 'normal') {
    if (this.isHeartbeatPlaying) {
      this.startHeartbeat(bpm, soundType);
    }
  }

  public stopHeartbeat() {
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    this.isHeartbeatPlaying = false;
  }

  public getIsHeartbeatPlaying(): boolean {
    return this.isHeartbeatPlaying;
  }

  // Level Up / Victory fanfare
  public playTrophyFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C major arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + i * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch {}
  }
}

export const medicalAudio = new MedicalAudioEngine();
