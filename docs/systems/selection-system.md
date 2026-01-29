---
title: Selection System
description: How unit selection works in Pioneer
sidebar_position: 4
---

# Selection System

The selection system provides tools for selecting and managing units through UI interactions. It supports both single-click selection and drag-selection for multiple units.

## Overview

The selection system enables players to select units by clicking on them or dragging a selection box. The system is split between Blueprint logic (for UI interaction) and C++ logic (for efficient entity querying and selection management).

## How Selection Works

### Blueprint Layer

The start of the unit selection logic flow is inside the blueprint `AC_SelectionSystem_Basic`. 

**On Click Selection:**
- The system gets the mouse position on the viewport
- It saves both the mouse start position and the mouse end position
- For single clicks, it selects the unit at that location

**Drag Selection:**
- If it's a drag and drop selection, the system creates a quad corner vector list
- These are 4 vectors which build a rectangle on the map
- With these 4 vectors, the system can check which units are inside this selection box by comparing it with their actor location

### C++ Layer

The second part of the logic flow is handled in C++ code, starting in the `AC_CPP_SelectionSystem_Abstract.cpp` file. This layer:

- Performs efficient entity queries to find units within the selection area
- Manages selection state across frames
- Handles selection modification (adding/removing units from selection)
- Updates UI to reflect current selection

## Selection Features

- **Multi-unit selection** via drag selection box
- **Entity querying** for efficient selection operations
- **Selection state management** across frames
- **Modifier key support** for adding/removing units from selection

## Usage

The selection system is automatically set up when using the provided Player Controller and game mode. The `AC_SelectionSystem_Basic` component handles all the UI interaction, while the C++ layer manages the underlying entity selection logic.

## Configuration

Most selection behavior is configured through the `AC_SelectionSystem_Basic` Blueprint component. You can adjust:

- Selection box visual appearance
- Selection area detection thresholds
- Modifier key bindings

## Troubleshooting

### Selection not working

- Verify that `AC_SelectionSystem_Basic` is attached to your Player Controller
- Check that the selection system component is properly initialized
- Ensure units have the correct tags or components for selection detection

### Drag selection not selecting units

- Verify that units are within the selection box bounds
- Check that units have proper collision or selection components
- Ensure the selection system can query entities correctly
