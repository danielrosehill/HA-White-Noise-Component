import { HomeAssistant, NoiseType } from './types';
import { NOISE_TYPES, AUDIO_BASE_PATH } from './constants';

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
    return `${AUDIO_BASE_PATH}/${noise?.file ?? 'white_noise.mp3'}`;
  }

  async play(noiseType: NoiseType): Promise<void> {
    if (!this._hass || !this._entity) return;

    const url = this.getAudioUrl(noiseType);

    await this._hass.callService('media_player', 'play_media', {
      entity_id: this._entity,
      media_content_id: url,
      media_content_type: 'music',
    });

    // Set repeat mode so the loop continues
    try {
      await this._hass.callService('media_player', 'repeat_set', {
        entity_id: this._entity,
        repeat: 'one',
      });
    } catch {
      // Some players don't support repeat_set — playback still works
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
