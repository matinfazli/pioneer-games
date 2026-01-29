---
title: Navigation System
description: Understanding pathfinding, movement, and avoidance in Pioneer
sidebar_position: 2
---

# Navigation System

The navigation system handles pathfinding and movement for thousands of units simultaneously. It uses Unreal's navmesh for pathfinding and implements sophisticated avoidance algorithms to prevent units from colliding with each other and the environment.

## Overview

The navigation system enables units to move intelligently around the game world by combining pathfinding on a navigation mesh with real-time avoidance of obstacles and other units. When you select units and move them to a location, the system calculates optimal paths and handles all the complexity of movement automatically.

## Pathfinding

The system uses the `FindPathToLocationSynchronously` function of Unreal's navigation system. This requires a navigation mesh to be present in the level.

### How Pathfinding Works

When a unit needs to move to a destination, it follows this process:

1. **Path Request**: The unit requests a path to the target location
2. **Route Calculation**: The system looks for the best route taking into account obstacles and terrain
3. **Waypoint Generation**: The path is broken down into a series of waypoints (3D vectors)
4. **Sequential Movement**: The unit follows these waypoints one at a time
5. **Waypoint Completion**: As the unit gets close to each waypoint (within 100 units), it moves on to the next one
6. **Arrival**: When reaching the final waypoint, the unit slows down and eventually stops

The unit adjusts its speed and direction to smoothly move between waypoints throughout the journey.

:::warning Navigation Mesh Required

The pathfinding system requires a navigation mesh to be built in your level. Make sure to build the navmesh before testing unit movement.

:::

## Unit Movement

Unit movement combines pathfinding with dynamic avoidance to create natural, responsive movement behavior.

### Movement Flow

When selecting units and moving them to a location, these are the things that happen:

- For each unit, the navigation mesh calculates a path to the target location
- The path consists of multiple path points (3D vectors)
- The unit will move to each of these points in order
- While moving, units constantly look for nearby obstacles (e.g., other units) and adjust their movement based on it

## Unit Avoidance

The system implements two types of avoidance systems to prevent collisions:

1. **Moving avoidance** - for units that are in motion
2. **Standing avoidance** - for stationary units

### How Avoidance Works

The avoidance system uses a spatial grid approach:

- The system divides the game world into a grid of cells
- When units need to avoid each other, the system looks at:
  - The nearby cells
  - The position of other units in these cells
  - How fast and in which direction units are moving (for moving avoidance)

### Moving Avoidance

For moving units, the system:
- Calculates where other nearby units are headed
- Figures out if and when units might get too close to each other
- Adjusts their paths to prevent collisions

### Standing Avoidance

For standing units, the system:
- Creates a sort of "personal space bubble" around stationary units
- Helps moving units navigate around these stationary obstacles

:::tip Performance

The avoidance system uses hierarchical spatial grids for efficient collision detection, allowing thousands of units to avoid each other without significant performance impact.

:::

## Performance Considerations

- The navigation system is optimized to handle thousands of units simultaneously
- Pathfinding is performed asynchronously to avoid frame rate spikes
- Avoidance calculations use spatial partitioning for efficiency
- Units that are idle or sleeping use minimal processing resources

## Troubleshooting

### Units not moving

- Check that a navigation mesh exists in your level
- Verify the navmesh is built and covers the areas where units need to move
- Ensure units have the proper movement traits/components attached

### Units colliding with each other

- The avoidance system should prevent most collisions
- If collisions occur, check that the avoidance system is properly configured
- Verify that unit collision profiles are set correctly

### Performance issues with many units

- The system is optimized for large unit counts, but performance depends on hardware
- Consider adjusting avoidance grid cell sizes if needed
- Monitor frame rate using the built-in FPS counter
