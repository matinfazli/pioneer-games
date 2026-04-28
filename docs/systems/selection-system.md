---
title: Selection System
description: How unit selection works in Pioneer
sidebar_position: 4
---

# Selection System

The Selection System is the bridge between player intent and Mass entities. It lets players click a single unit, drag-select an army, select all eligible units, modify an existing selection, and optionally expand a selection to whole groups.

Selection is split between a Player Controller component that handles input and UI gestures, and Mass-side logic that resolves those gestures into selected entity handles. This keeps the user-facing workflow familiar while avoiding per-unit Actor selection code.

## Key Concepts

- **Selectable Trait** marks an entity as eligible for selection and provides selection presentation data.
- **Selection Data** describes the selection method, target, drag quad, modifier state, group expansion, and select-all behavior.
- **Line trace selection** resolves a clicked instanced mesh back to the Mass entity.
- **Selection box** uses the drag rectangle projected into world space to find entities inside the area.
- **Group selection** can select a group directly or expand a member selection to the whole group.
- **Live selection aggregate** provides UI-friendly counts, health totals, and primary unit type information.

## How Selection Works

### Player-Facing Layer

The player-facing flow starts in the selection component used by the Player Controller. Blueprint and component logic handle the gesture:

**On Click Selection:**

- The system gets the mouse position on the viewport.
- It traces or resolves the clicked rendered instance.
- It selects the unit at that location.

**Drag Selection:**

- The system records the mouse start and current positions.
- It builds a world-space selection quad from the viewport drag.
- The Mass selection processor checks which selectable units fall inside the selection volume.

The component also stores selection box widget state, mouse start/end positions, selected unit count, and center location of the current selection so UI can stay responsive.

### Mass Layer

The C++ layer receives `FSelectionData` and applies it through the selection subsystem and selection processor. This layer:

- performs efficient entity queries to find units within the selection area
- manages selection state across frames
- handles selection modification
- stores the current selected Mass entity handles
- computes live aggregate and single-entity details for selected-unit panels

## Selection Methods

Pioneer supports three selection methods:

- **Line Trace** for click selection against a rendered instance.
- **Selection Box** for drag selection using the projected selection quad or frustum.
- **Group Id** for selecting a saved group directly.

Selection data also includes modifier behavior. If `IsModifyingSelection` is true, the new result can be merged with or removed from the current selection depending on the input flow. If `ShouldSelectAll` is true, the processor can select every eligible entity. If group expansion is enabled, selecting one member can select the whole group.

## Selection Features

- **Multi-unit selection** via drag selection box
- **Entity querying** for efficient selection operations
- **Selection state management** across frames
- **Modifier key support** for adding/removing units from selection
- **Group-aware selection** for RTS control groups and persistent army groups
- **Selection UI aggregation** for counts, health totals, names, and thumbnails
- **Instanced mesh hit resolution** so Mass units can be clicked without Actor components

## Usage

The selection system is automatically set up when using the provided Player Controller and game modes. The Player Controller component handles input and the selection box UI, while the C++ layer manages entity selection.

For a unit to be selectable:

1. Add **Selectable Trait** to its Entity Config Asset.
2. Make sure the unit also renders through Instanced Actor Trait so click hits can resolve to the entity.
3. Use a Player Controller or component setup that calls the selection functions.
4. If you use groups, decide whether selecting one member should expand to the whole group.

## Configuration

Most selection behavior is configured through the selection component and unit config. You can adjust:

- selection box visual appearance
- selection area detection thresholds
- modifier key bindings
- selection expansion to whole groups
- selection visual mesh from Selectable Trait
- select-all input behavior

## Performance Considerations

Selection is designed for player-driven bursts rather than continuous per-frame scanning. Use the built-in selection calls for click, drag, and group selection instead of polling every unit manually from Blueprint.

For very large armies, prefer group recall and control slots after the initial selection. That gives players fast control without repeatedly drag-selecting thousands of entities.

## Troubleshooting

### Selection not working

- Verify that the selection component is attached to your Player Controller.
- Check that the selection system component is initialized.
- Ensure units have Selectable Trait and are rendered through instancing.

### Drag selection not selecting units

- Verify that units are within the selection box bounds.
- Check that the selection quad is being calculated.
- Ensure the selection system can query entities correctly.

### Commands do not affect selected units

- Confirm the selection subsystem has current selected handles.
- Confirm the command component is issuing commands to the selection.
- Confirm the selected units have the traits required for the command.

### One selected unit selects the whole group

- Check whether selection expansion is enabled.
- Disable group expansion for workflows that require frequent individual unit selection.

## Related Docs

- [Command System](./command-system.md)
- [Groups and Formations](./group-formation-system.md)
- [Rendering System](./rendering-system.md)
- [Creating Units](../guides/creating-units.md)
