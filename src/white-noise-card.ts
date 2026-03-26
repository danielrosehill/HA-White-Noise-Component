import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardStyles } from './styles';
import { WhiteNoiseCardConfig, HomeAssistant, NoiseType } from './types';
import { NOISE_TYPES, DEFAULT_NOISE, DEFAULT_VOLUME, CARD_VERSION, STORAGE_KEY_PREFIX } from './constants';
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

  private _audioManager = new AudioManager();
  private _volumeTimeout: ReturnType<typeof setTimeout> | null = null;

  public setConfig(config: WhiteNoiseCardConfig): void {
    if (!config.entity) {
      throw new Error('You must specify an entity (media_player)');
    }
    this._config = config;
    this._audioManager.entity = config.entity;

    // Apply defaults from config
    this._noiseType = config.default_noise ?? DEFAULT_NOISE;
    this._volume = config.default_volume ?? DEFAULT_VOLUME;

    // Restore persisted state
    this._loadState();
  }

  public getCardSize(): number {
    return 3;
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

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass) {
      this._audioManager.hass = this.hass;
      this._syncFromEntity();
    }
  }

  private _syncFromEntity(): void {
    const entityState = this._audioManager.getEntityState();

    if (entityState === 'playing') {
      this._isPlaying = true;
    } else if (entityState === 'idle' || entityState === 'off' || entityState === 'paused') {
      this._isPlaying = false;
    }

    const entityVolume = this._audioManager.getEntityVolume();
    if (entityVolume !== null && !this._volumeTimeout) {
      this._volume = entityVolume;
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
      await this._audioManager.play(noiseType);
    }
  }

  private async _handlePlayPause(): Promise<void> {
    if (this._isPlaying) {
      await this._audioManager.stop();
      this._isPlaying = false;
    } else {
      await this._audioManager.setVolume(this._volume);
      await this._audioManager.play(this._noiseType);
      this._isPlaying = true;
    }
    this._saveState();
  }

  private async _handleStop(): Promise<void> {
    await this._audioManager.stop();
    this._isPlaying = false;
  }

  private _handleVolumeChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this._volume = parseInt(target.value, 10);
    this._saveState();

    // Debounce volume changes to avoid flooding HA
    if (this._volumeTimeout) clearTimeout(this._volumeTimeout);
    this._volumeTimeout = setTimeout(async () => {
      await this._audioManager.setVolume(this._volume);
      this._volumeTimeout = null;
    }, 150);
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
          <span class="status">${entityState}</span>
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
