import { css } from 'lit';

export const cardStyles = css`
  :host {
    --wn-primary: var(--primary-color, #03a9f4);
    --wn-primary-light: var(--light-primary-color, #e1f5fe);
    --wn-bg: var(--card-background-color, #fff);
    --wn-text: var(--primary-text-color, #212121);
    --wn-text-secondary: var(--secondary-text-color, #727272);
    --wn-border-radius: var(--ha-card-border-radius, 12px);
  }

  ha-card {
    padding: 16px;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .header .name {
    font-size: 1.1em;
    font-weight: 500;
    color: var(--wn-text);
  }

  .header .status {
    font-size: 0.8em;
    color: var(--wn-text-secondary);
    text-transform: capitalize;
  }

  .noise-selector {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .noise-btn {
    flex: 1;
    padding: 10px 12px;
    border: 2px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    background: transparent;
    color: var(--wn-text);
    font-size: 0.9em;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .noise-btn:hover {
    border-color: var(--wn-primary);
    background: var(--wn-primary-light);
  }

  .noise-btn.active {
    border-color: var(--wn-primary);
    background: var(--wn-primary);
    color: #fff;
  }

  .volume-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding: 0 4px;
  }

  .volume-container .label {
    font-size: 0.85em;
    color: var(--wn-text-secondary);
    min-width: 50px;
  }

  .volume-container input[type='range'] {
    flex: 1;
    height: 6px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--divider-color, #e0e0e0);
    border-radius: 3px;
    outline: none;
  }

  .volume-container input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--wn-primary);
    cursor: pointer;
  }

  .volume-container input[type='range']::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--wn-primary);
    cursor: pointer;
    border: none;
  }

  .volume-value {
    font-size: 0.85em;
    color: var(--wn-text-secondary);
    min-width: 35px;
    text-align: right;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: var(--wn-primary);
    color: #fff;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .play-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .play-btn:active {
    transform: scale(0.95);
  }

  .play-btn svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  .stop-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid var(--divider-color, #e0e0e0);
    background: transparent;
    color: var(--wn-text-secondary);
    cursor: pointer;
    transition: all 0.15s ease;
    align-self: center;
  }

  .stop-btn:hover {
    border-color: var(--error-color, #db4437);
    color: var(--error-color, #db4437);
  }

  .stop-btn svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  .timer-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    padding: 0 4px;
    flex-wrap: wrap;
  }

  .timer-presets {
    display: flex;
    gap: 6px;
    flex: 1;
  }

  .timer-btn {
    padding: 6px 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 6px;
    background: transparent;
    color: var(--wn-text);
    font-size: 0.8em;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .timer-btn:hover:not([disabled]) {
    border-color: var(--wn-primary);
  }

  .timer-btn.active {
    border-color: var(--wn-primary);
    background: var(--wn-primary);
    color: #fff;
  }

  .timer-btn[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .timer-countdown {
    font-size: 0.9em;
    font-weight: 500;
    color: var(--wn-primary);
    font-variant-numeric: tabular-nums;
  }

  .unavailable {
    text-align: center;
    padding: 16px;
    color: var(--wn-text-secondary);
  }
`;
