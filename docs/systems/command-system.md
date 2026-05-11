---
title: Command System
description: Understanding unit orders, command queues, and command targeting in Pioneer
sidebar_position: 7
---

# Command System

The Command System is the gameplay layer that makes Pioneer feel like a strategy toolkit instead of only a movement simulation. It issues orders to selected units, groups, or specific entities, expanding the original movement workflow into a broader RTS command model with move, attack, attack move, hold position, stop, patrol, follow, retreat, and charge.

Commands can replace current orders, queue behind them, interrupt immediately, or cancel everything. This lets players plan multi-step strategies without losing responsive control.

Commands sit above movement and combat. They do not replace those systems; they describe intent in a consistent way so movement, combat, group formation, and UI can all respond to the same order model.

## Key Concepts

- **Command type** defines what the unit should do.
- **Apply policy** defines how the command interacts with existing orders.
- **Active command** is the current order being executed.
- **Queued commands** are future orders waiting behind the active command.
- **Command feedback** reports what was issued and how many entities received it.
- **Targeting state** helps UI flows where a player picks the command first, then selects a ground or entity target.
- **Command target kind** tells the UI whether the command needs a ground point or an entity target.

## Command Types

Pioneer includes these command types:

- **Move** - move to a ground location.
- **Attack Move** - move toward a location while staying aggressive.
- **Attack** - attack a specific Mass entity target.
- **Hold Position** - stop advancing and fight from the current position.
- **Stop** - clear current movement or combat intent.
- **Patrol** - move between two points.
- **Follow** - follow an Actor or Mass entity target.
- **Retreat** - move away from a threat location.
- **Charge** - move aggressively with a speed multiplier.

## Apply Policies

Use apply policies to define player intent:

- **Replace** - clear current active and queued commands, then issue the new command.
- **Queue** - append the command behind the current command.
- **Interrupt** - push the new command to the front immediately.
- **Cancel All** - clear active and queued commands.

:::tip
Use Replace for normal right-click commands and Queue when the player is holding your queue modifier key.
:::

## Usage

Most games issue commands through a Player Controller component. The included RTS player controller demonstrates this pattern with command hotkeys, command card buttons, cursor targeting, context click behavior, and control group hotkeys.

For Blueprint-facing workflows, use the command component functions for common actions such as:

- issue move to selection
- issue attack move to selection
- issue context command from cursor
- issue attack from cursor
- issue stop
- issue hold position
- issue patrol
- issue follow
- issue retreat
- issue charge
- cancel selection commands

For C++ workflows, use the command subsystem when issuing commands to selected entities, explicit entity arrays, or groups.

## How Commands Execute

When a command is issued:

1. The player input, command card, or gameplay code creates command data.
2. The command subsystem resolves the target selection, group, or explicit entity list.
3. The apply policy decides whether to replace, queue, interrupt, or cancel existing orders.
4. Each affected entity receives active command and queue state.
5. Command processors translate the active command into movement, combat, follow, patrol, retreat, or charge behavior.
6. The command completes, then the next queued command can become active.

This flow keeps the UI simple: it issues a command once, and the Mass-side command state carries that order forward until it completes or is replaced.

## Command Queue

Each entity can hold one active command and a small queue of future commands. When the active command completes, the next queued command becomes active.

The queue is useful for:

- moving through waypoints
- patrol setup
- attack move into a later retreat
- repositioning ranged units before issuing a hold command
- planning multi-stage engagements

By default the queue is intentionally small. The current command data supports a bounded queue so memory stays predictable even when thousands of units can receive orders.

:::note
The queue is intentionally bounded. This keeps per-entity memory predictable when thousands of units are active.
:::

## Command Priority And Combat Autonomy

Pioneer separates manual command intent from automatic combat reactions. Normal `Replace` and `Interrupt` commands clear stale combat targets, so a new move or attack order takes control immediately. `Queue` keeps the current command and combat state intact until the queued command becomes active.

Combat autonomy depends on the active command:

- **Move** and **Follow** use defensive movement. Units continue toward the command destination and may only fight immediate threats, such as enemies in range, enemies in close contact, or attackers that recently damaged them. They do not chase defensive targets.
- **Attack Move**, **Patrol**, and **Charge** use aggressive movement. Units may acquire targets, chase enemies, and temporarily steer through combat movement while the command is active.
- **Attack** uses the explicit target from the command. A new attack command immediately replaces the previous target.
- **Hold Position** attacks enemies in range but does not chase.
- **Retreat** suppresses combat targeting while the retreat order is active.

This keeps normal movement responsive without making units ignore nearby danger.
## Groups And Commands

Commands can be issued to groups as well as raw selections. When group formation state exists, move-like commands can be split into per-member destinations so the group arrives in a coherent shape instead of collapsing into one point.

See [Groups and Formations](./group-formation-system.md) for group setup and control slots.

## Configuration

Command behavior is configured in several places:

- Player Controller input mapping for hotkeys and context commands.
- Command card assets for RTS UI buttons, icons, tooltips, and target kinds.
- Unit traits for movement, combat, and ranged capabilities.
- Group and formation state for group movement layouts.
- Follow target registration when commands need to track an Actor or Mass entity over time.

## Performance Considerations

Commands are cheap compared with movement, navigation, and combat simulation, but command bursts can still affect many entities at once. Prefer issuing one batched command to a selection or group rather than repeatedly updating every unit from UI code.

## Troubleshooting

### Command does nothing

- Confirm there is a valid selection or group.
- Confirm the target kind matches the command.
- Confirm the entity has the traits needed to execute the command.
- For attack commands, confirm the target is hostile and alive.

### Queued commands are not playing

- Confirm the command was issued with the Queue policy.
- Check whether the active command can complete.
- Remember that Stop, Cancel All, and Replace policies clear queued work.

### Attack move behaves like move

- Confirm hostile units have valid teams.
- Confirm combat traits are present.
- Confirm enemies are within engagement range during the move.

## Related Docs

- [Movement Commands](../guides/movement-commands.md)
- [Combat System](./combat-system.md)
- [Groups and Formations](./group-formation-system.md)
- [RTS Mass Battle Sample](../getting-started/sample-game-modes.md)
