# HA White Noise Card

A custom Home Assistant Lovelace card that turns any `media_player` speaker into a white noise machine. Designed for nurseries, bedrooms, or anywhere you want ambient noise control from your HA dashboard.

## Features

- **Noise types**: White, Brown, and Pink noise on seamless loops
- **Simple controls**: Play/pause, volume slider, noise type selector
- **Speaker binding**: Each card instance targets a specific `media_player` entity or group
- **Remembers settings**: Resumes last noise type and volume on play
- **Works with**: Music Assistant, Snapcast, and any HA media player

## Planned / Stretch Features

- Nature sound presets (rain, rainforest, fan)
- Multi-noise mixer with per-type volume sliders
- Sleep timer with duration presets

## Status

**Pre-development** -- see [PROJECT_SPEC.md](PROJECT_SPEC.md) and [DEVELOPMENT_SPEC.md](DEVELOPMENT_SPEC.md) for full details.

## Usage (planned)

```yaml
type: custom:white-noise-card
entity: media_player.nursery_speaker
name: "Nursery White Noise"
```

## Documentation

- [PROJECT_SPEC.md](PROJECT_SPEC.md) -- High-level overview and feature summary
- [DEVELOPMENT_SPEC.md](DEVELOPMENT_SPEC.md) -- Detailed technical specification
- [notes/](notes/) -- Voice notes and planning recordings
