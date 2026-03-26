import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { WhiteNoiseCardConfig, HomeAssistant } from './types';
import { DEFAULT_NOISE, DEFAULT_VOLUME } from './constants';

@customElement('white-noise-card-editor')
export class WhiteNoiseCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: WhiteNoiseCardConfig;

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
    }
    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-weight: 500;
      font-size: 0.9em;
    }
    input, select {
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      font-size: 0.9em;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #212121);
    }
  `;

  public setConfig(config: WhiteNoiseCardConfig): void {
    this._config = config;
  }

  private _valueChanged(key: string, value: string | number): void {
    if (!this._config) return;

    const newConfig = { ...this._config, [key]: value };
    const event = new CustomEvent('config-changed', {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render() {
    if (!this._config) return html``;

    return html`
      <div class="form">
        <div class="row">
          <label>Entity (media_player)</label>
          <input
            type="text"
            .value=${this._config.entity || ''}
            @input=${(e: Event) =>
              this._valueChanged('entity', (e.target as HTMLInputElement).value)}
            placeholder="media_player.nursery_speaker"
          />
        </div>

        <div class="row">
          <label>Name (optional)</label>
          <input
            type="text"
            .value=${this._config.name || ''}
            @input=${(e: Event) =>
              this._valueChanged('name', (e.target as HTMLInputElement).value)}
            placeholder="Nursery White Noise"
          />
        </div>

        <div class="row">
          <label>Default Noise Type</label>
          <select
            .value=${this._config.default_noise || DEFAULT_NOISE}
            @change=${(e: Event) =>
              this._valueChanged('default_noise', (e.target as HTMLSelectElement).value)}
          >
            <option value="white">White</option>
            <option value="brown">Brown</option>
            <option value="pink">Pink</option>
          </select>
        </div>

        <div class="row">
          <label>Default Volume (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            .value=${String(this._config.default_volume ?? DEFAULT_VOLUME)}
            @input=${(e: Event) =>
              this._valueChanged(
                'default_volume',
                parseInt((e.target as HTMLInputElement).value, 10)
              )}
          />
        </div>
      </div>
    `;
  }
}
