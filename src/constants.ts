import { NoiseType } from './types';

export const NOISE_TYPES: { id: NoiseType; label: string; file: string }[] = [
  { id: 'white', label: 'White', file: 'white_noise.mp3' },
  { id: 'brown', label: 'Brown', file: 'brown_noise.mp3' },
  { id: 'pink', label: 'Pink', file: 'pink_noise.mp3' },
  { id: 'rain', label: 'Rain', file: 'rain.mp3' },
  { id: 'rain_combo', label: 'Rain+White', file: 'rain_combo.mp3' },
];

export const TIMER_PRESETS = [
  { label: 'Off', minutes: 0 },
  { label: '1h', minutes: 60 },
  { label: '2h', minutes: 120 },
  { label: '4h', minutes: 240 },
  { label: '8h', minutes: 480 },
];

export const DEFAULT_NOISE: NoiseType = 'white';
export const DEFAULT_VOLUME = 50;
export const AUDIO_BASE_PATH = 'media-source://media_source/local/white-noise';
export const CARD_VERSION = '1.0.0';

export const STORAGE_KEY_PREFIX = 'white-noise-card';
