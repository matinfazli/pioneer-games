---
title: Commands And Movement
description: How to issue movement and combat commands for units in Pioneer
sidebar_position: 2
---

# Commands And Movement

Pioneer's command layer turns basic right-click movement into a full RTS-style order system. Selected units and groups can move, attack move, attack, hold position, stop, patrol, follow, retreat, and charge.

Commands can replace current orders or queue behind them, giving players the control they expect from strategy games without requiring you to build that command framework from scratch.

## Overview

When a command is issued:

1. The current selection, group, or explicit entity list is resolved.
2. The command data is built with a type, target, and behavior settings.
3. The apply policy decides whether to replace, queue, interrupt, or cancel commands.
4. The command subsystem writes active or queued command state to the affected entities.
5. Movement, patrol, follow, combat, or charge processors execute the command.

## Basic Usage

### Move

Select units and issue a ground move command. The selected units pathfind across the navmesh, avoid each other, and stop near their assigned destinations.

### Attack Move

Attack move sends units toward a ground location while allowing them to acquire and fight hostile units along the way. This is useful for advancing armies without requiring precise target clicks.

### Attack

Attack commands target a specific hostile Mass entity. The combat system handles target approach, melee or ranged engagement, projectile behavior, damage, and death.

### Hold Position

Hold position keeps units from advancing while still allowing them to fight when enemies enter range.

### Patrol

Patrol moves units between two locations. Use this for guards, lane defense, and repeatable map control.

### Follow

Follow keeps selected units near an Actor or Mass entity target. This is useful for escorts, squads, or units guarding a moving objective.

### Retreat

Retreat moves units away from a threat location by a configured distance.

### Charge

Charge sends units aggressively toward a location and can apply a speed multiplier while the command is active.

## Command Queue

Queued commands allow players to plan ahead:

1. Issue the first command normally.
2. Hold your queue modifier.
3. Issue additional commands.
4. Units execute each command in order as previous commands complete.

Good uses for queued commands:

- waypoint movement
- move into attack move
- patrol setup
- reposition then hold
- retreat after an attack

:::note
The queue is bounded per entity so large battles stay predictable in memory and performance.
:::

## Formations And Groups

Movement works best with groups and formations when commanding many units. A grouped selection can receive formation offsets so members move into a readable shape around the command target instead of collapsing into one point.

Use [Groups and Formations](../systems/group-formation-system.md) for control groups, recall slots, merge, ungroup, and formation setup.

## Player Controller Workflow

Most projects issue commands from Player Controller components:

- Selection component decides which units are selected.
- Command component issues orders.
- Command targeting state handles commands that need a second click.
- Group and formation components adjust selected groups.
- UI components show command cards and command feedback.

The RTS Mass Battle sample demonstrates this complete workflow.

## Programmatic Usage

Use a component when issuing common commands from player input or UI.

```cpp
// Example: issue a queued move through a command component.
CommandSystem->IssueMoveToSelection(TargetLocation, true);
```

Use the command subsystem when issuing commands from C++ systems, AI directors, or game rules.

```cpp
// Example: issue command data to known entities.
FUnitCommandData Command;
Command.Type = EUnitCommandType::AttackMove;
Command.PrimaryLocation = TargetLocation;
Command.bAggressiveWhileMoving = true;

CommandSubsystem->IssueCommandToEntities(Entities, Command, ECommandApplyPolicy::Replace);
```

## Configuration

Tune command behavior through:

- input actions and mapping contexts
- command card data assets
- command target kind
- cursor preset tags
- movement trait values
- unit combat traits
- group and formation settings

## Performance Considerations

Issue commands in batches to selections or groups. Avoid per-frame command spam from UI code. Once a command is issued, let the Mass processors execute it instead of manually steering each entity from Blueprint.

## Troubleshooting

### Units ignore commands

- Confirm units are selected or included in the target group.
- Confirm required traits are present.
- Confirm target locations are on navmesh.
- Confirm the current game phase allows commands. For example, deployment phases may gate runtime behavior.

### Queued commands disappear

- Replace, Stop, and Cancel All policies clear queued work.
- Some commands may complete immediately if their target is invalid.
- The per-entity queue has a maximum size.

### Attack commands fail

- Confirm the target is hostile.
- Confirm both units have valid team data.
- Confirm the attacking unit has Unit Attributes Trait.
- Confirm the target is alive and resolvable.

### Formation movement looks crowded

- Increase formation spacing.
- Increase avoidance radius.
- Use Loose formation for mixed or high-count selections.
- Confirm there is enough navmesh around the target.

## Related Docs

- [Command System](../systems/command-system.md)
- [Combat System](../systems/combat-system.md)
- [Groups and Formations](../systems/group-formation-system.md)
- [Navigation System](../systems/navigation-system.md)
