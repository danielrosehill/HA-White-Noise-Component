# Home Assistant White Noise Component

## Overview

A Home Assistant Lovelace dashboard card that turns connected speakers into a white noise machine. Designed for easy use (e.g., a nursery dashboard) so that anyone in the household can start/stop white noise playback with minimal effort.

## Background

- Speakers are connected via **Music Assistant** as **Snapcast clients**
- Current workflow involves manually saved MP3s and scrappy automations -- this component replaces that with a purpose-built UI element

## Core Features (MVP)

### Noise Types
- **White noise**
- **Brown noise**
- **Pink noise**

Each noise type plays on a seamless ~3 minute loop that continues until the user stops it or changes the setting. The loop should not be obviously repetitive.

### Playback Controls
- **Play / Pause** button
- **Volume slider**
- **Resume last setting**: hitting play without changing anything resumes the previous noise type and volume (e.g., white noise at 60%)

### Speaker Binding
- Each card instance is bound to a specific **speaker entity** or **speaker group** in Home Assistant
- Allows placing different cards on different dashboards (e.g., nursery, bedroom) each controlling their own speaker

## Stretch Features

### Nature Sound Presets
- Rainforest / jungle
- Rain
- Fan sounds
- Other ambient presets

### Noise Mixing
- Simultaneous playback of multiple noise types
- Individual volume sliders per noise type (similar to ambient noise websites like myNoise)
- Create a custom mix (e.g., 70% white noise + 30% rain)

### Sleep Timer
- Predefined duration presets (e.g., 1h, 2h, 4h, 8h)
- Incrementer control for custom duration
- Playback auto-stops after the set time elapses

## Technical Considerations

- Implement as a **custom Lovelace card** (HACS-compatible)
- Audio should be generated or bundled as seamless loops (not long static files)
- Card configuration should accept a `media_player` entity ID
- Should work with Music Assistant / Snapcast speaker groups
- Home Assistant is the preferred platform (vs. a standalone app)

## Target Users

- Primary: Daniel's wife, for the nursery
- General: anyone wanting a simple white noise control on their HA dashboard
