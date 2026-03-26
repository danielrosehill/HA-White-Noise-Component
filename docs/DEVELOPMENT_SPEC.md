# Development Specification: HA White Noise Card

## 1. Component Type

**Custom Lovelace Card** for Home Assistant, distributed as a HACS-compatible integration.

- Card type: `custom:white-noise-card`
- Renders in any HA dashboard (Lovelace)
- Primary target dashboard: nursery page

---

## 2. Card Configuration

```yaml
type: custom:white-noise-card
entity: media_player.nursery_speaker    # Required: speaker or group entity
name: "Nursery White Noise"             # Optional: display name
```

### Configuration Options

| Key | Type | Required | Default | Description |
|-----|------|----------|---------|-------------|
| `entity` | string | Yes | -- | `media_player` entity ID (single speaker or group) |
| `name` | string | No | Entity friendly name | Card title |
| `default_noise` | string | No | `white` | Initial noise type on first use |
| `default_volume` | number | No | `50` | Initial volume percentage (0-100) |
| `show_nature` | boolean | No | `false` | Show nature sound presets (stretch feature) |
| `show_mixer` | boolean | No | `false` | Show multi-noise mixer (stretch feature) |
| `show_timer` | boolean | No | `false` | Show sleep timer control (stretch feature) |

---

## 3. Audio Strategy

### Looping Approach
- Each noise type is a **~3 minute seamless audio loop**
- The loop repeats indefinitely until stopped by the user
- Loops must be crafted/edited so the start and end blend seamlessly (crossfade or phase-aligned)
- Playback is handled via the HA `media_player` service calls

### Audio Files

Bundled with the component (not streamed from external sources):

**MVP:**
| File | Description |
|------|-------------|
| `white_noise.mp3` | ~3 min white noise loop |
| `brown_noise.mp3` | ~3 min brown noise loop |
| `pink_noise.mp3` | ~3 min pink noise loop |

**Stretch - Nature Presets:**
| File | Description |
|------|-------------|
| `rain.mp3` | ~3 min rain loop |
| `rainforest.mp3` | ~3 min rainforest/jungle ambience loop |
| `fan.mp3` | ~3 min fan/air conditioner loop |

### Playback Mechanism
- Use `media_player.play_media` service to send audio to the target entity
- Set `media_content_type: music`
- Enable repeat mode via `media_player.repeat_set` (repeat single track)
- Volume control via `media_player.volume_set`
- Stop via `media_player.media_stop`

### Audio File Serving
- Audio files stored in `www/white-noise/` within the integration directory
- Served via HA's `/local/` static path or the integration's own file serving

---

## 4. UI Layout

### MVP Card Layout

```
+---------------------------------------+
|  Nursery White Noise            [ON]  |
+---------------------------------------+
|                                       |
|   ( White )  ( Brown )  ( Pink )      |
|                                       |
|   Volume: =====[||||]=========  60%   |
|                                       |
|          [ Play / Pause ]             |
|                                       |
+---------------------------------------+
```

### UI Elements (MVP)

1. **Header bar**
   - Card name (left)
   - On/off toggle (right) -- stops all playback immediately

2. **Noise type selector**
   - Row of buttons or segmented control
   - Options: White, Brown, Pink
   - Active selection highlighted
   - Selecting a new type switches playback immediately if already playing

3. **Volume slider**
   - Horizontal slider, 0-100%
   - Shows current percentage
   - Changes take effect immediately via `media_player.volume_set`

4. **Play / Pause button**
   - Large, central, easy to tap
   - Toggles playback on/off
   - Play resumes last noise type + volume setting

### Stretch: Nature Presets Row

```
|   ( Rain )  ( Forest )  ( Fan )       |
```
- Additional row below or as a second tab/section
- Same behavior as core noise types

### Stretch: Mixer View

```
|   White:  =====[||]============  30%  |
|   Brown:  =======[||||]========  50%  |
|   Pink:   =[|]=================  10%  |
|   Rain:   ====[|||]============  40%  |
```
- Individual volume sliders per noise type
- Multiple can be active simultaneously
- Requires mixing strategy (see section 6)

### Stretch: Sleep Timer

```
|   Timer: [ - ] 4h [ + ]   [Set]      |
```
- Hour incrementer (0.5h steps or presets: 1h, 2h, 4h, 8h)
- Countdown display once active
- Auto-stops playback when timer reaches zero

---

## 5. State Management

### Persistent State
The card should remember the last-used settings so "play" resumes them:

| State Key | Type | Description |
|-----------|------|-------------|
| `noise_type` | string | Last selected noise type (`white`, `brown`, `pink`, etc.) |
| `volume` | number | Last set volume (0-100) |
| `is_playing` | boolean | Whether playback is active |
| `mixer_levels` | object | Per-noise volume levels (stretch) |
| `timer_duration` | number | Last set timer in minutes (stretch) |

### State Storage
- Use `browser_mod` localStorage or HA `input_*` helpers
- Preferred: store in HA as `input_select` / `input_number` helpers so state persists across devices
- Alternative: use the card's internal state with `hass.callService` to track via HA entities

### State Sync
- Card should reflect actual speaker state (playing/paused/volume)
- Subscribe to entity state changes to keep UI in sync
- If speaker is controlled externally (e.g., HA automation), card updates accordingly

---

## 6. Technical Architecture

### File Structure

```
ha-white-noise-card/
├── hacs.json                    # HACS metadata
├── LICENSE
├── README.md
├── PROJECT_SPEC.md
├── DEVELOPMENT_SPEC.md
├── dist/
│   └── white-noise-card.js      # Bundled card JS
├── src/
│   ├── white-noise-card.ts      # Main card class
│   ├── styles.ts                # Card CSS styles
│   ├── types.ts                 # TypeScript interfaces
│   ├── constants.ts             # Noise type definitions, defaults
│   ├── audio-manager.ts         # Playback logic (service calls)
│   └── editor.ts                # Visual card editor (optional)
├── audio/
│   ├── white_noise.mp3
│   ├── brown_noise.mp3
│   └── pink_noise.mp3
└── www/                         # Served via /local/
    └── white-noise/
        ├── white_noise.mp3
        ├── brown_noise.mp3
        └── pink_noise.mp3
```

### Technology
- **LitElement** (standard for HA custom cards)
- **TypeScript** (compiled to JS bundle)
- **Rollup** or **esbuild** for bundling
- Follows [HA custom card development guide](https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/)

### Key Service Calls

```typescript
// Start playback
hass.callService('media_player', 'play_media', {
  entity_id: config.entity,
  media_content_id: `/local/white-noise/${noiseType}.mp3`,
  media_content_type: 'music'
});

// Set repeat
hass.callService('media_player', 'repeat_set', {
  entity_id: config.entity,
  repeat: 'one'  // repeat single track
});

// Set volume
hass.callService('media_player', 'volume_set', {
  entity_id: config.entity,
  volume_level: volume / 100  // 0.0 - 1.0
});

// Stop
hass.callService('media_player', 'media_stop', {
  entity_id: config.entity
});
```

### Mixer Strategy (Stretch)
Since HA media_player entities typically play one track at a time, mixing requires one of:
1. **Server-side mixing**: Generate combined audio on-the-fly (complex, likely out of scope)
2. **Pre-mixed tracks**: Bundle common combinations (e.g., white+rain at various ratios)
3. **Multiple speaker groups**: One noise type per virtual speaker in a group (Snapcast can do this)
4. **Web Audio API**: Play audio in the browser directly instead of through the speaker (changes the UX -- sound comes from device, not room speaker)

**Recommended for MVP**: Skip mixer. For stretch, explore option 3 (Snapcast sub-streams) or option 2 (pre-mixed).

---

## 7. Installation

### HACS (preferred)
1. Add custom repository URL to HACS
2. Install "White Noise Card"
3. Audio files auto-copied to `www/white-noise/`
4. Add card to dashboard

### Manual
1. Copy `white-noise-card.js` to `config/www/`
2. Copy audio files to `config/www/white-noise/`
3. Add resource in Lovelace: `/local/white-noise-card.js`
4. Add card YAML to dashboard

---

## 8. Compatibility

- **Home Assistant**: 2024.1+
- **Speaker integrations**: Music Assistant, Snapcast, any `media_player` entity
- **HACS**: Compatible
- **Browsers**: Modern browsers (Chrome, Firefox, Safari -- for dashboard access)

---

## 9. Development Phases

### Phase 1: MVP
- [ ] Set up project scaffolding (LitElement + TypeScript + bundler)
- [ ] Generate/source 3 seamless audio loops (white, brown, pink)
- [ ] Implement card UI: noise selector, volume slider, play/pause, on/off
- [ ] Implement playback via `media_player` service calls with repeat
- [ ] Persist last-used noise type and volume
- [ ] Card configuration (entity binding, name)
- [ ] Test with Music Assistant / Snapcast speakers
- [ ] HACS packaging

### Phase 2: Nature Presets
- [ ] Source/generate nature sound loops (rain, rainforest, fan)
- [ ] Add nature preset row to UI
- [ ] Configuration toggle (`show_nature`)

### Phase 3: Sleep Timer
- [ ] Timer UI (incrementer or presets)
- [ ] Countdown logic (client-side or HA automation)
- [ ] Auto-stop on timer expiry
- [ ] Configuration toggle (`show_timer`)

### Phase 4: Mixer (Stretch)
- [ ] Evaluate mixing approach (pre-mixed vs Snapcast sub-streams)
- [ ] Mixer UI with per-noise volume sliders
- [ ] Configuration toggle (`show_mixer`)
