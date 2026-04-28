---
title: Groups and Formations
description: Understanding unit groups, control slots, and formation movement in Pioneer
sidebar_position: 8
---

# Groups And Formations

Groups and formations make large selections feel manageable. Players can keep an army together, recall it quickly, and move it in a readable shape instead of repeatedly drag-selecting the same units.

A group stores membership, aggregate data, selection behavior, and optional control slot bindings. A formation stores how that group should arrange itself when receiving move-like commands.

Together, these systems make large selections feel intentional. Players can create a group, recall it later, assign a formation, and issue commands that preserve the group's shape.

This is especially useful once combat and command queues enter the game. A player can keep melee units together, bind ranged units to another slot, merge or split selections, and move groups without rebuilding the same selection every time.

## Key Concepts

- **Group** - a persistent collection of Mass entities.
- **Control slot** - a quick-access binding for group recall, usually slots 1 through 9.
- **Selection expansion** - selecting a member can optionally expand to the whole group.
- **Aggregate data** - member count, group center, and group state used by UI and command logic.
- **Formation** - a layout rule that generates local offsets for group members.
- **Facing mode** - determines whether a group faces movement direction or a chosen world yaw.
- **Custom formation** - a registered list of offsets used when the built-in shapes are not enough.

## Supported Formation Types

Pioneer includes these built-in formation types:

- Line
- Column
- Wedge
- Box
- Circle
- Loose
- Custom

Custom formations can be registered from code or Blueprint-facing component calls by providing local offsets.

## Usage

Use the group component on your Player Controller to expose common player actions:

- create a group from the current selection
- select a group
- assign current selection to a control slot
- recall a control slot
- merge selected groups
- ungroup the current selection
- enable or disable selection expansion

Use the formation component to set the primary selected group's formation, facing mode, facing yaw, or custom formation offsets.

## Group Operations

Groups support the common RTS operations players expect:

- create a group from the current selection
- dissolve groups for a selection
- merge selected groups
- split a group into a new group
- assign a group to a control slot
- recall a control slot
- select a group by ID

The group subsystem also tracks aggregate data such as member count, group center, and group state. UI can use this information to show group slots, selected group details, or quick recall feedback.

## Control Slots

Control slots give players fast access to important groups. A typical RTS pattern is:

1. Select units.
2. Create a group from the selection.
3. Assign the group to slot 1.
4. Later, press slot 1 to recall that group.

The included RTS Mass Battle sample uses group slot UI so players can see and recall group assignments during battle.

## Formation Movement

When a grouped selection receives a move-like command, the formation system can generate offsets for each member. The command system uses those offsets to produce per-unit destinations around the clicked location.

This prevents every unit in the group from converging on the same point and makes large commands easier to read.

Built-in formations cover common layouts:

- **Line** for broad fronts.
- **Column** for narrow paths.
- **Wedge** for aggressive forward movement.
- **Box** for compact grouped movement.
- **Circle** for surrounding or defensive layouts.
- **Loose** for less rigid swarms and action-heavy movement.
- **Custom** for project-specific layouts.

:::tip
Use tighter formations for disciplined armies and loose formations for swarm-like units or action-heavy encounters where units need more space.
:::

## Configuration

Formation layout settings include:

- spacing in X and Y
- loose formation radius
- deterministic seed for loose layouts
- facing mode
- world yaw when using fixed facing
- custom formation offsets when using a registered custom formation

Groups can enable selection expansion when you want group members to behave as one selection. Disable selection expansion when you want players to select and split individual units more often.

## Performance Considerations

Groups store lightweight membership and aggregate data. The expensive part is usually what follows from group commands: pathfinding, avoidance, combat, and animation. Keep group command issuance batched and let the command system distribute per-unit targets.

## Troubleshooting

### Group recall selects nothing

- Confirm the group still has living members.
- Confirm the control slot is bound.
- Check whether the group was dissolved or ungrouped.

### Selection expands unexpectedly

- Check whether selection expansion is enabled on the group system component.
- Disable selection expansion for games that need frequent individual unit selection.

### Formation looks wrong

- Check spacing values against unit radius.
- Try Box or Loose formation first, then tune custom offsets.
- Confirm enough navmesh exists around the target location for the full formation.

## Related Docs

- [Command System](./command-system.md)
- [Movement Commands](../guides/movement-commands.md)
- [Selection System](./selection-system.md)
- [RTS Mass Battle Sample](../getting-started/sample-game-modes.md)
