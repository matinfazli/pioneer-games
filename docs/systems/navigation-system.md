---
title: Navigation System
description: Understanding pathfinding, movement, and avoidance in Pioneer
sidebar_position: 2
---

# Navigation System

The Navigation System is responsible for getting large numbers of Mass units from one place to another while keeping movement readable. It combines Unreal navmesh pathfinding with steering, dynamic avoidance, hard separation, ground snapping, smooth orientation, and sleep-state optimization.

When a player issues a move or command order, Pioneer turns that intent into per-unit movement data. From there, Mass processors handle path following, local steering, obstacle avoidance, and final arrival behavior in batches. This keeps movement scalable while still giving units enough local intelligence to flow around each other and the environment.

## Key Concepts

- **Navmesh pathfinding** finds a valid route through the level.
- **Move target** stores the unit's current movement intent, goal, desired speed, and arrival behavior.
- **Steering** handles local movement near path points and final destinations.
- **Moving avoidance** helps units in motion avoid each other.
- **Standing avoidance** helps moving units navigate around idle units and lets idle units adjust without constant jitter.
- **Hard separation** reduces overlap when units are already too close.
- **Confinement** keeps units on navigable ground.
- **Sleep states** reduce processing for idle units until they are commanded, pushed, or approached.

## Pathfinding

The system uses Unreal's navigation mesh to calculate routes through the level. A valid navmesh must cover the areas where units spawn, move, fight, and regroup.

When a unit needs to move to a destination, it follows this process:

1. **Path Request** - the unit receives a destination from movement, command, group, or combat logic.
2. **Route Calculation** - Unreal navigation finds a valid path across the navmesh.
3. **Waypoint Generation** - the route is broken into path points.
4. **Sequential Movement** - the unit follows the path points in order.
5. **Waypoint Completion** - as the unit gets close enough to a point, it advances to the next one.
6. **Arrival** - near the final destination, steering and slowing behavior settle the unit into place.

Movement Trait settings control how quickly a unit advances through path nodes, how close it must be to count as arriving, and when steering takes over near the final destination.

:::warning Navigation Mesh Required
The pathfinding system requires a navigation mesh to be built in your level. Make sure the navmesh covers the actual playable space, including ramps, bridges, raised floors, and spawn areas.
:::

## Unit Movement

Unit movement combines pathfinding with dynamic avoidance to create natural, responsive movement behavior. When selecting units and moving them to a location:

- the command or movement component writes a destination
- each unit receives movement intent
- path data guides the unit toward the destination
- steering adjusts local velocity and direction
- avoidance modifies movement around nearby units and obstacles
- orientation smoothing keeps the unit facing cleanly while it moves or stands

Movement Trait provides the main tuning values:

- **Max Speed** controls normal movement speed in centimeters per second.
- **Node Advance Radius** controls how close a unit must get before moving to the next path point.
- **Close To Path Point** and **Time To Move On** help units recover when they are stuck near the same path node.
- **Steering Handoff Distance** controls when final steering becomes more important than path following.
- **Velocity Damping** controls how quickly velocity settles when forces change.
- **Orientation weights** blend between facing the movement target and facing current velocity.

## Terrain And Multi-Level Movement

Pioneer tracks ground height separately from planar movement so units can move across uneven navmesh and different floor levels. The movement data stores target ground Z, ground normal, stable height, and navmesh lookup state, allowing units to snap smoothly to navigable surfaces instead of sliding through floors or hovering after elevation changes.

This is important for maps with ramps, bridges, raised platforms, or multi-level combat spaces. If a unit appears to move correctly in X/Y but looks wrong vertically, the first thing to check is whether the navmesh fully covers the intended height range.

## Unit Avoidance

Avoidance prevents large selections from collapsing into unreadable piles. Pioneer uses a hierarchical spatial grid so nearby obstacle checks stay practical at scale.

### Moving Avoidance

For moving units, the system:

- checks nearby units through the obstacle grid
- predicts where other moving units are headed
- estimates whether units may get too close
- adjusts movement to reduce collisions
- scales avoidance near path starts and path ends so units do not overreact around goals

Use moving avoidance for armies, squads, enemy waves, and any unit type that shares lanes with many other units.

### Standing Avoidance

For standing units, the system:

- treats idle units as local obstacles
- gives stationary units a controlled personal space response
- helps moving units flow around units that have already arrived
- uses ghost targets so idle units can make small adjustments without constant jitter

Standing avoidance is especially useful in strategy games where some units hold position while others move through or around them.

### Hard Separation

Hard separation is the cleanup pass for physical overlap. Avoidance tries to prevent crowding before it happens; hard separation helps resolve cases where units are already too close because of spawning, tight formations, combat pressure, or command bursts.

Use it as a stability layer, not as the main movement behavior. If units are constantly relying on hard separation, increase formation spacing, tune avoidance, or check formation destinations.

:::tip Performance
The avoidance system uses hierarchical spatial grids for efficient nearby-unit checks, allowing large groups to avoid each other without comparing every unit against every other unit.
:::

## Configuration

Navigation behavior is configured mostly through traits:

- **Movement Trait** controls speed, path-node advancement, steering handoff, velocity damping, standing cooldowns, and facing behavior.
- **Avoidance Trait** controls moving avoidance, standing avoidance, hard separation, and overlap clamp settings.
- **Navigation Obstacle Trait** is used when an entity should contribute obstacle behavior.

You will usually tune movement and avoidance together. Faster units need more room to steer; tighter formations need stronger separation but can become noisy if every unit is packed too closely.

## Performance Considerations

- Avoidance calculations use spatial partitioning for efficiency.
- Units that are idle or sleeping use minimal processing resources.
- Sleep and wake processors reduce work for idle units while still waking them when pushed, commanded, or approached.
- Confinement keeps units inside navigable areas, which prevents expensive recovery behavior from invalid locations.
- Wider formation spacing usually performs better than sending a large group to one exact point.

## Troubleshooting

### Units not moving

- Check that a navigation mesh exists in your level.
- Verify the navmesh is built and covers the areas where units need to move.
- Ensure units have Movement Trait attached.
- Check that a command or move target is actually being issued.

### Units move but drift off valid areas

- Confirm navmesh coverage around the full path, not only the destination.
- Enable confinement behavior for units that should remain on navigable ground.
- Check for map geometry or navmesh bounds that leave gaps near ramps, bridges, or platform edges.

### Units collide with each other

- Confirm Avoidance Trait is present.
- Increase formation spacing if the problem happens immediately after group movement.
- Check moving and standing avoidance settings.
- Treat hard separation as a fallback, not the only source of spacing.

### Performance issues with many units

- Look for units that are constantly awake, stuck, or compressed into a small space.
- Use formation layouts instead of sending every unit to one exact point.
- Keep avoidance radii practical for the unit scale.
- Monitor frame rate using the built-in FPS counter or Unreal profiling tools.

## Related Docs

- [Movement Commands](../guides/movement-commands.md)
- [Command System](./command-system.md)
- [Groups and Formations](./group-formation-system.md)
- [Entity System](./entity-system.md)
