---
title: Movement Commands
description: How to issue and customize movement commands for units in Pioneer
sidebar_position: 2
---

# Movement Commands

Movement commands allow you to direct selected units to move to specific locations. The system handles pathfinding, formation preservation, and obstacle avoidance automatically.

## Overview

When you issue a movement command:
1. **Selected units** receive the command
2. **Pivot point** is calculated from all selected units' positions
3. **Relative positioning** maintains unit formation
4. **Pathfinding** calculates routes for each unit
5. **Movement** happens automatically with avoidance

The system is designed to feel natural and responsive while handling thousands of units efficiently.

## Basic Usage

### Selecting and Moving Units

The simplest way to move units:

1. **Select units** - Left-click or drag-select units
2. **Right-click** on the ground where you want them to move
3. **Units move** - They automatically pathfind and avoid obstacles

:::tip

Units maintain their relative formation when moving. If you select a group and right-click, they'll move to the new location while preserving their spacing.

:::

### How Formation Works

When you issue a move command to multiple units:

- The system calculates a **pivot point** (average position of all selected units)
- Each unit's target is calculated **relative to this pivot**
- This preserves the formation - units don't all converge to the same point
- Units pathfind individually but maintain their relative positions

**Example:**
- You select 10 units in a line formation
- Right-click 500 units away
- Units move to the new location, maintaining their line formation

## Programmatic Usage

### Using the Movement System Component

The easiest way to issue movement commands programmatically is through the Movement System component:

```cpp
// Get the Movement System component from Player Controller
UAC_CPP_MovementSystem_Abstract* MovementSystem = 
    PlayerController->GetComponentByClass<UAC_CPP_MovementSystem_Abstract>();

// Issue move command to selected units
FVector TargetLocation = FVector(1000, 2000, 0);
MovementSystem->MoveUnits(TargetLocation);
```

### Using the Spawner Subsystem Directly

You can also use the Spawner Subsystem directly:

```cpp
// Get the Spawner Subsystem
USpawnerSubsystem* SpawnerSubsystem = 
    World->GetSubsystem<USpawnerSubsystem>();

// Issue move command
FVector TargetLocation = FVector(1000, 2000, 0);
SpawnerSubsystem->IssueMoveUnits(TargetLocation);
```

:::note

Movement commands only affect **selected units**. Make sure units are selected before issuing commands, or the command will have no effect.

:::

## How Movement Commands Work

### Command Processing Flow

1. **Command Issued** - `MoveUnits()` or `IssueMoveUnits()` is called with target location
2. **Selection Query** - System finds all entities with `FUnitSelectedTag`
3. **Pivot Calculation** - Average position of all selected units is computed
4. **Command Assignment** - Each selected unit receives a `FMoveCommandFragment` with:
   - Target location (relative to pivot)
   - Distance from pivot
   - Forward vector direction
   - Command status
5. **Pathfinding** - Each unit calculates its path to its target
6. **Movement** - Units move along their paths with avoidance

### Move Command Fragment

Each unit stores its movement command in a `FMoveCommandFragment`:

- **Status** - `Added` (new command) or `Running` (in progress)
- **Target Location** - Final destination for the unit
- **Mouse Position** - Original click position (for reference)
- **Distance** - Distance from pivot point
- **Forward Vector** - Direction from pivot to target
- **bHasActiveCommand** - Whether command is active

The fragment is automatically managed by the system - you typically don't need to interact with it directly.

## Customization

### Movement Parameters

Movement behavior is controlled by the **Movement Trait** on your entity config:

- **Max Speed** - How fast units move
- **Acceleration** - How quickly units reach max speed
- **Deceleration** - How quickly units stop
- **Turn Rate** - How quickly units can rotate

Adjust these in your Entity Config Asset to change how units respond to movement commands.

### Formation Behavior

The system automatically preserves formations, but you can influence this:

- **Unit spacing** - Controlled by avoidance radius in Avoidance Trait
- **Formation shape** - Determined by initial selection positions
- **Relative positioning** - Maintained automatically during movement

:::tip

For tighter formations, reduce the avoidance radius. For looser formations, increase it.

:::

## Advanced Usage

### Custom Movement Logic

If you need custom movement behavior, you can:

1. **Create custom processors** - Process `FMoveCommandFragment` with your own logic
2. **Modify command data** - Access and modify move command fragments directly
3. **Add custom tags** - Use tags to mark units for special movement behavior

### Movement Tasks

The system uses a task-based approach internally:
- `MoveTaskProcessor` - Handles pathfinding and initial movement setup
- `SteerToMoveCommandGoalProcessor` - Handles steering toward the goal
- Other processors handle avoidance, orientation, etc.

You can extend this system by creating custom processors that work with movement commands.

## Best Practices

### Issuing Commands

- **Batch commands** - Issue commands once rather than repeatedly
- **Wait for completion** - Don't issue new commands while units are still moving (unless intentional)
- **Consider selection** - Only selected units respond to commands

### Performance

- **Large groups** - The system handles hundreds of units efficiently
- **Formation preservation** - Automatic, no performance cost
- **Pathfinding** - Cached and optimized per unit

### User Experience

- **Visual feedback** - Consider showing move indicators where players click
- **Command queuing** - The system supports one active command per unit
- **Cancellation** - New commands automatically replace old ones

## Common Issues

### Units not moving

**Possible causes:**
- Units not selected - Verify units have `FUnitSelectedTag`
- No navigation mesh - Ensure navmesh exists and is built
- Invalid target location - Check that target is on navigable surface
- Missing Movement Trait - Ensure units have Movement Trait in their config

**Solutions:**
- Verify selection system is working
- Build navigation mesh in your level
- Check target location is valid
- Verify entity config has Movement Trait

### Units moving to wrong location

**Possible causes:**
- Formation calculation issue
- Pivot point calculation error
- Pathfinding failure

**Solutions:**
- Check that multiple units are selected correctly
- Verify navigation mesh covers the target area
- Check unit positions are valid

### Units not maintaining formation

**Possible causes:**
- Avoidance forcing units apart
- Pathfinding obstacles
- Units too close together

**Solutions:**
- Adjust avoidance parameters
- Ensure clear paths to destination
- Increase unit spacing if needed

### Performance issues with many units

**Possible causes:**
- Too many pathfinding requests at once
- Complex navigation mesh
- Large number of selected units

**Solutions:**
- The system handles this automatically with time-slicing
- Optimize navigation mesh complexity
- Consider splitting large groups into smaller commands

## Integration with Selection

Movement commands work seamlessly with the selection system:

1. **Selection** - Units are marked with `FUnitSelectedTag` when selected
2. **Command** - Movement command queries for selected units
3. **Execution** - Only selected units receive and execute the command
4. **Deselection** - Units can be deselected, but active commands continue

:::note

Deselecting units doesn't cancel their movement commands. They'll continue to their destination even if deselected.

:::

## Next Steps

Now that you understand movement commands:

- Learn about the [Navigation System](../systems/navigation-system.md) to understand pathfinding
- Explore [Creating Units](./creating-units.md) to configure movement parameters
- Review the [Entity System](../systems/entity-system.md) to understand fragments and tags

## Summary

Movement commands in Pioneer are simple to use but powerful:

- **Select and right-click** - Basic usage is straightforward
- **Formation preservation** - Automatic and efficient
- **Pathfinding** - Handled automatically
- **Avoidance** - Built-in collision avoidance
- **Scalable** - Works with thousands of units

The system abstracts away the complexity, letting you focus on your game's unique mechanics while providing reliable, performant unit movement.
