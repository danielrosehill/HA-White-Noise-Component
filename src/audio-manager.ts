import { HomeAssistant, NoiseType } from './types';
import { NOISE_TYPES } from './constants';

export class AudioManager {
  private _hass: HomeAssistant | null = null;
  private _entity: string = '';

  set hass(hass: HomeAssistant) {
    this._hass = hass;
  }

  set entity(entity: string) {
    this._entity = entity;
  }

  private getAudioUrl(noiseType: NoiseType): string {
    const noise = NOISE_TYPES.find((n) => n.id === noiseType);
    const file = noise?.file ?? 'white_noise.mp3';
    // Build full URL so Music Assistant can fetch the file
    const origin = this._hass
      ? (window.location.origin)
      : window.location.origin;
    return `${origin}/local/white-noise/${file}`;
  }

  async play(noiseType: NoiseType): Promise<void> {
    if (!this._hass || !this._entity) {
      console.error('[white-noise-card] No hass or entity', !!this._hass, this._entity);
      return;
    }

    const url = this.getAudioUrl(noiseType);
    console.log('[white-noise-card] Playing:', { entity: this._entity, url, noiseType });

    try {
      await this._hass.callService('music_assistant', 'play_announcement', {
        entity_id: this._entity,
        url: url,
      });
      console.log('[white-noise-card] Service call succeeded');
    } catch (err) {
      console.error('[white-noise-card] Service call failed:', err);
      throw err;
    }
  }

  async stop(): Promise<void> {
    if (!this._hass || !this._entity) return;

    await this._hass.callService('media_player', 'media_stop', {
      entity_id: this._entity,
    });
  }

  async setVolume(volume: number): Promise<void> {
    if (!this._hass || !this._entity) return;

    await this._hass.callService('media_player', 'volume_set', {
      entity_id: this._entity,
      volume_level: volume / 100,
    });
  }

  getEntityState(): string {
    if (!this._hass || !this._entity) return 'unavailable';
    return this._hass.states[this._entity]?.state ?? 'unavailable';
  }

  getEntityVolume(): number | null {
    if (!this._hass || !this._entity) return null;
    const vol = this._hass.states[this._entity]?.attributes?.volume_level;
    return typeof vol === 'number' ? Math.round(vol * 100) : null;
  }
}
