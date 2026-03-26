import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardStyles } from './styles';
import { WhiteNoiseCardConfig, HomeAssistant, NoiseType } from './types';
import { NOISE_TYPES, DEFAULT_NOISE, DEFAULT_VOLUME, CARD_VERSION, STORAGE_KEY_PREFIX, TIMER_PRESETS } from './constants';
import { AudioManager } from './audio-manager';

console.info(
  `%c WHITE-NOISE-CARD %c v${CARD_VERSION} `,
  'color: white; background: #03a9f4; font-weight: bold; padding: 2px 4px;',
  'color: #03a9f4; background: white; font-weight: bold; padding: 2px 4px;'
);

@customElement('white-noise-card')
export class WhiteNoiseCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WhiteNoiseCardConfig;
  @state() private _noiseType: NoiseType = DEFAULT_NOISE;
  @state() private _volume: number = DEFAULT_VOLUME;
  @state() private _isPlaying: boolean = false;
  @state() private _timerMinutes: number = 0;
  @state() private _timerRemaining: number = 0;

  private _audioManager = new AudioManager();
  private _volumeTimeout: ReturnType<typeof setTimeout> | null = null;
  private _userActionTime: number = 0;
  private _loopTimeout: ReturnType<typeof setTimeout> | null = null;
  private _timerInterval: ReturnType<typeof setInterval> | null = null;
  private _timerEndTime: number = 0;

  public setConfig(config: WhiteNoiseCardConfig): void {
    if (!config.entity) {
      throw new Error('You must specify an entity (media_player)');
    }
    this._config = config;
    this._audioManager.entity = config.entity;

    this._noiseType = config.default_noise ?? DEFAULT_NOISE;
    this._volume = config.default_volume ?? DEFAULT_VOLUME;

    this._loadState();
  }

  public getCardSize(): number {
    return 4;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('white-noise-card-editor');
  }

  static getStubConfig(): Record<string, unknown> {
    return {
      entity: '',
      name: 'White Noise',
    };
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearLoopTimeout();
    this._clearTimer();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass) {
      this._audioManager.hass = this.hass;
      this._syncFromEntity();
    }
  }

  private _syncFromEntity(): void {
    const entityState = this._audioManager.getEntityState();
    const recentAction = Date.now() - this._userActionTime < 10000;

    if (entityState === 'playing') {
      this._isPlaying = true;
    } else if (!recentAction && (entityState === 'idle' || entityState === 'off' || entityState === 'paused')) {
      this._isPlaying = false;
    }

    // Re-trigger loop: if we think we're playing but entity went idle, replay
    if (this._isPlaying && !recentAction && entityState === 'idle') {
      this._scheduleLoop();
    }

    // Don't sync volume from entity — the card's local slider is the source of truth.
    // MA's play_announcement can override speaker volume unpredictably.
  }

  private _scheduleLoop(): void {
    if (this._loopTimeout) return;
    console.log('[white-noise-card] Scheduling loop replay');
    this._loopTimeout = setTimeout(async () => {
      this._loopTimeout = null;
      if (this._isPlaying) {
        this._userActionTime = Date.now();
        try {
          await this._audioManager.play(this._noiseType);
          await this._audioManager.setVolume(this._volume);
          console.log('[white-noise-card] Loop replay triggered');
        } catch (err) {
          console.error('[white-noise-card] Loop replay failed:', err);
        }
      }
    }, 2000);
  }

  private _clearLoopTimeout(): void {
    if (this._loopTimeout) {
      clearTimeout(this._loopTimeout);
      this._loopTimeout = null;
    }
  }

  private _storageKey(): string {
    return `${STORAGE_KEY_PREFIX}-${this._config.entity}`;
  }

  private _loadState(): void {
    try {
      const raw = localStorage.getItem(this._storageKey());
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.noise_type) this._noiseType = saved.noise_type;
        if (typeof saved.volume === 'number') this._volume = saved.volume;
      }
    } catch {
      // Ignore corrupt storage
    }
  }

  private _saveState(): void {
    try {
      localStorage.setItem(
        this._storageKey(),
        JSON.stringify({
          noise_type: this._noiseType,
          volume: this._volume,
        })
      );
    } catch {
      // Storage full or unavailable
    }
  }

  private async _handleNoiseSelect(noiseType: NoiseType): Promise<void> {
    this._noiseType = noiseType;
    this._saveState();

    if (this._isPlaying) {
      this._userActionTime = Date.now();
      await this._audioManager.play(noiseType);
    }
  }

  private async _handlePlayPause(): Promise<void> {
    if (this._isPlaying) {
      await this._stopPlayback();
    } else {
      try {
        await this._audioManager.setVolume(this._volume);
        await this._audioManager.play(this._noiseType);
        this._isPlaying = true;
        this._userActionTime = Date.now();
      } catch (err) {
        console.error('[white-noise-card] Play failed:', err);
        this._isPlaying = false;
      }
    }
    this._saveState();
  }

  private async _stopPlayback(): Promise<void> {
    this._clearLoopTimeout();
    this._clearTimer();
    await this._audioManager.stop();
    this._isPlaying = false;
    this._timerMinutes = 0;
    this._timerRemaining = 0;
  }

  private async _handleStop(): Promise<void> {
    await this._stopPlayback();
  }

  private _handleVolumeChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._volume = parseInt(target.value, 10);
    this._saveState();

    if (this._volumeTimeout) clearTimeout(this._volumeTimeout);
    this._volumeTimeout = setTimeout(async () => {
      await this._audioManager.setVolume(this._volume);
      this._volumeTimeout = null;
    }, 150);
  }

  private _handleTimerSelect(minutes: number): void {
    this._clearTimer();
    this._timerMinutes = minutes;

    if (minutes === 0) {
      this._timerRemaining = 0;
      return;
    }

    this._timerEndTime = Date.now() + minutes * 60 * 1000;
    this._timerRemaining = minutes * 60;

    this._timerInterval = setInterval(() => {
      const remaining = Math.max(0, Math.round((this._timerEndTime - Date.now()) / 1000));
      this._timerRemaining = remaining;

      if (remaining <= 0) {
        this._stopPlayback();
      }
    }, 1000);
  }

  private _clearTimer(): void {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
    }
  }

  private _formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const entityState = this._audioManager.getEntityState();
    if (entityState === 'unavailable') {
      return html`
        <ha-card>
          <div class="unavailable">
            Speaker unavailable: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    const name =
      this._config.name ??
      this.hass.states[this._config.entity]?.attributes?.friendly_name ??
      'White Noise';

    return html`
      <ha-card>
        <div class="header">
          <span class="name">${name}</span>
          <span class="status">${this._isPlaying ? 'playing' : entityState}</span>
        </div>

        <div class="noise-selector">
          ${NOISE_TYPES.map(
            (noise) => html`
              <button
                class="noise-btn ${this._noiseType === noise.id ? 'active' : ''}"
                @click=${() => this._handleNoiseSelect(noise.id)}
              >
                ${noise.label}
              </button>
            `
          )}
        </div>

        <div class="volume-container">
          <span class="label">Volume</span>
          <input
            type="range"
            min="0"
            max="100"
            .value=${String(this._volume)}
            @input=${this._handleVolumeChange}
          />
          <span class="volume-value">${this._volume}%</span>
        </div>

        <div class="timer-container">
          <span class="label">Timer</span>
          <div class="timer-presets">
            ${TIMER_PRESETS.map(
              (preset) => html`
                <button
                  class="timer-btn ${this._timerMinutes === preset.minutes ? 'active' : ''}"
                  @click=${() => this._handleTimerSelect(preset.minutes)}
                  ?disabled=${!this._isPlaying && preset.minutes > 0}
                >
                  ${preset.label}
                </button>
              `
            )}
          </div>
          ${this._timerRemaining > 0
            ? html`<span class="timer-countdown">${this._formatTime(this._timerRemaining)}</span>`
            : nothing}
        </div>

        <div class="controls">
          <button class="play-btn" @click=${this._handlePlayPause}>
            ${this._isPlaying
              ? html`<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
              : html`<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`}
          </button>
          ${this._isPlaying
            ? html`
                <button class="stop-btn" @click=${this._handleStop}>
                  <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
                </button>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

// Register with HA's custom card registry
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'white-noise-card',
  name: 'White Noise Card',
  description: 'Turn connected speakers into a white noise machine',
  preview: true,
});
