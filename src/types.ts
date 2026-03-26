export interface WhiteNoiseCardConfig {
  type: string;
  entity: string;
  name?: string;
  default_noise?: NoiseType;
  default_volume?: number;
  show_nature?: boolean;
  show_mixer?: boolean;
  show_timer?: boolean;
}

export type NoiseType = 'white' | 'brown' | 'pink' | 'rain' | 'rain_combo';

export interface CardState {
  noise_type: NoiseType;
  volume: number;
  is_playing: boolean;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>
  ): Promise<void>;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}
