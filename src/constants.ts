import { NoiseType } from './types';

export const NOISE_TYPES: { id: NoiseType; label: string; file: string }[] = [
  { id: 'white', label: 'White', file: 'white_noise.mp3' },
  { id: 'brown', label: 'Brown', file: 'brown_noise.mp3' },
  { id: 'pink', label: 'Pink', file: 'pink_noise.mp3' },
];

export const DEFAULT_NOISE: NoiseType = 'white';
export const DEFAULT_VOLUME = 50;
export const AUDIO_BASE_PATH = '/local/white-noise';
export const CARD_VERSION = '1.0.0';

export const STORAGE_KEY_PREFIX = 'white-noise-card';
