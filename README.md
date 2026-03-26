# HA White Noise Card

A custom Home Assistant Lovelace card that turns any `media_player` speaker into a white noise machine. Designed for nurseries, bedrooms, or anywhere you want ambient noise control from your HA dashboard.

## Features

- **Noise types**: White, Brown, and Pink noise on seamless 3-minute loops
- **Simple controls**: Play/pause, volume slider, noise type selector
- **Speaker binding**: Each card instance targets a specific `media_player` entity or group
- **Remembers settings**: Resumes last noise type and volume on play
- **Visual card editor**: Configure the card from the HA UI
- **Works with**: Music Assistant, Snapcast, and any HA media player

## Installation

### HACS (recommended)

1. Open HACS in your Home Assistant instance
2. Go to **Frontend** > **Custom repositories**
3. Add this repository URL with category **Lovelace**
4. Install **White Noise Card**
5. Copy the audio files from `audio/` to your HA `config/www/white-noise/` directory
6. Restart Home Assistant

### Manual

1. Copy `dist/white-noise-card.js` to `config/www/`
2. Copy the MP3 files from `audio/` to `config/www/white-noise/`
3. In HA, go to **Settings** > **Dashboards** > **Resources** and add `/local/white-noise-card.js` as a JavaScript Module
4. Add the card to your dashboard

## Configuration

```yaml
type: custom:white-noise-card
entity: media_player.nursery_speaker
name: "Nursery White Noise"
```

### Options

| Key | Type | Required | Default | Description |
|-----|------|----------|---------|-------------|
| `entity` | string | Yes | -- | `media_player` entity ID |
| `name` | string | No | Entity friendly name | Card title |
| `default_noise` | string | No | `white` | Initial noise type (`white`, `brown`, `pink`) |
| `default_volume` | number | No | `50` | Initial volume percentage (0-100) |

## Development

```bash
npm install
npm run build       # Build dist/white-noise-card.js
npm run watch       # Rebuild on changes
```

### Regenerate Audio Files

Requires `ffmpeg`:

```bash
cd audio/
ffmpeg -f lavfi -i "anoisesrc=d=180:c=white:r=44100:a=0.5" -af "afade=t=in:d=0.5,afade=t=out:st=179.5:d=0.5" -b:a 192k white_noise.mp3
ffmpeg -f lavfi -i "anoisesrc=d=180:c=brown:r=44100:a=0.5" -af "afade=t=in:d=0.5,afade=t=out:st=179.5:d=0.5" -b:a 192k brown_noise.mp3
ffmpeg -f lavfi -i "anoisesrc=d=180:c=pink:r=44100:a=0.5" -af "afade=t=in:d=0.5,afade=t=out:st=179.5:d=0.5" -b:a 192k pink_noise.mp3
```

## Planned / Stretch Features

- Nature sound presets (rain, rainforest, fan)
- Multi-noise mixer with per-type volume sliders
- Sleep timer with duration presets

## Documentation

- [PROJECT_SPEC.md](PROJECT_SPEC.md) -- High-level overview and feature summary
- [DEVELOPMENT_SPEC.md](DEVELOPMENT_SPEC.md) -- Detailed technical specification
- [notes/](notes/) -- Voice notes and planning recordings
