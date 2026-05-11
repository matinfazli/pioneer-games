---
title: Updates
description: Release notes and changelog for Pioneer Mass Strategy System
sidebar_position: 10
---

# Updates

## Version 4.1

**Defensive move behavior**

Move orders now stay focused on their destination while still letting units defend themselves against immediate nearby threats. This keeps normal movement from turning into unwanted enemy chases.

---

## Version 4.0 - Combat Update

Version 4.0 expands Pioneer from a mass movement and rendering foundation into a broader gameplay toolkit for strategy and top-down combat projects. It is the update that connects the large-unit foundation to the moment-to-moment systems players expect: fighting, grouping, formations, queued orders, and readable animation.

### Two New Game Modes

Pioneer now includes two ready-to-use sample modes:

- **RTS Mass Battle** - a large-scale strategy battle with deployment, command cards, groups, formations, melee units, ranged units, projectiles, match state, and RTS HUD.
- **Top Down Zombie Shooter** - a squad-action sample where Actor operatives fight Mass zombie entities through the Actor-Mass Bridge.

See [Sample Game Modes](./getting-started/sample-game-modes.md).

### Melee And Ranged Combat

Mass units can now fight through the new Combat System. Units can define health, armor, attack damage, attack range, melee timing, ranged projectile behavior, line-of-sight checks, volley timing, projectile visuals, and death behavior.

See [Combat System](./systems/combat-system.md).

### Actor-Mass Bridge

Regular Unreal Actors and Mass entities can now participate in the same combat simulation. This supports gameplay patterns such as Actor heroes, squads, bosses, or objectives fighting Mass armies or enemy waves.

See [Actor-Mass Bridge](./systems/actor-mass-bridge.md).

### Groups And Formations

Players can create groups from selections, merge groups, ungroup, assign control slots, recall groups, and apply formations. Built-in formation types include line, column, wedge, box, circle, loose, and custom layouts.

See [Groups and Formations](./systems/group-formation-system.md).

### Command Queue

The new Command System supports move, attack move, attack, hold position, stop, patrol, follow, retreat, and charge orders. Commands can replace existing orders, queue behind them, interrupt immediately, or cancel all active and queued commands.

See [Command System](./systems/command-system.md).

### Mass Animation States

Mass entities can now use semantic animation states for Idle, Walk, Run, Charge, Attack, and Death. Animation sets bind these states to baked vertex animation clips, allowing gameplay events to drive readable animation while preserving instanced rendering performance.

See [Mass Animation System](./systems/mass-animation-system.md).

---

## Version 3.1

**Performance improvements**

Navigation and avoidance have been streamlined for better efficiency: we consolidated several navigation processors into a single pass, improved use of cached data, and simplified obstacle querying. You should see smoother behavior with large unit counts.

---

## Version 3.0

**Terrain navigation**

Units can now walk on the Z-axis based on navigation mesh data, so they follow terrain height and multi-level environments correctly.

**Animation blending**

Smoother transitions between unit animations for more natural movement and behavior.

---

## Version 2.0 – Major Update

We're excited to announce the release of Pioneer Mass Strategy System 2.0, a milestone update that brings huge performance improvements, new features, and more creative freedom for developers.

### What's New

**Instanced Static Mesh (ISM) support for units**

Units now use ISMs, making rendering far more efficient.

**Massive unit counts with stable performance**

You can now render up to 10,000 units on screen while maintaining smooth and stable FPS.

**Dynamic LOD system**

A new Level of Detail system adjusts models dynamically based on camera view, giving you the best balance between visuals and performance.

**Foliage support with navigation mesh**

Your units can now move around foliage with correct pathfinding through the navigation mesh.

**Vertex animation setup**

Create and use your own animated meshes directly within the plugin, opening up new customization options.

**Free camera mode**

Explore your units more flexibly with a freely movable camera.

**Built-in FPS counter**

Easily monitor performance during testing and development.
