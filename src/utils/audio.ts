/**
 * Realistic Paper Rustle Web Audio API Synthesizer
 * Generates tactile, organic acoustic paper friction with zero external audio file latency.
 */

class PaperAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Plays realistic paper turning rustle using shaped dual-noise filtering
   */
  public playPageFlip() {
    if (this.isMuted) return;

    this.initContext();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Subtle randomization for natural organic variability (no two turns sound identical)
    const duration = 0.18 + Math.random() * 0.06; // 180ms - 240ms
    const baseFreq = 2800 + (Math.random() - 0.5) * 600; // 2500Hz - 3100Hz
    const volumeGain = 0.22 + Math.random() * 0.08;

    // 1. Noise buffer creation for tactile paper friction
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // White noise with pink noise weighting towards low/mid paper resonance
      output[i] = (Math.random() * 2 - 1) * 0.75 + (Math.random() * 2 - 1) * 0.25;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    // 2. High Bandpass Filter: Simulates surface friction of paper fibers sliding
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(baseFreq, now);
    bandpass.frequency.exponentialRampToValueAtTime(baseFreq * 0.65, now + duration);
    bandpass.Q.setValueAtTime(2.2, now);

    // 3. Lowpass Filter: Soft body resonance of the document sheet
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(4200, now);
    lowpass.frequency.exponentialRampToValueAtTime(1400, now + duration);

    // 4. Amplitude Envelope: Attack, swell, and soft decay
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(volumeGain, now + duration * 0.25);
    gainNode.gain.exponentialRampToValueAtTime(volumeGain * 0.4, now + duration * 0.6);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // 5. Secondary Whoosh: Low-frequency air displacement when page turns
    const whooshOsc = ctx.createOscillator();
    const whooshGain = ctx.createGain();
    whooshOsc.type = 'triangle';
    whooshOsc.frequency.setValueAtTime(160 + Math.random() * 40, now);
    whooshOsc.frequency.exponentialRampToValueAtTime(60, now + duration * 0.7);

    whooshGain.gain.setValueAtTime(0.001, now);
    whooshGain.gain.linearRampToValueAtTime(volumeGain * 0.2, now + duration * 0.2);
    whooshGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    // Connect graph
    noiseSource.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    whooshOsc.connect(whooshGain);
    whooshGain.connect(ctx.destination);

    // Trigger
    noiseSource.start(now);
    noiseSource.stop(now + duration);

    whooshOsc.start(now);
    whooshOsc.stop(now + duration * 0.7);
  }
}

export const paperAudio = new PaperAudioSynthesizer();
