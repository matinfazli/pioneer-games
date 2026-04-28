---
title: Introduction
description: Overview of the Pioneer Mass Strategy System - a foundation for building top-down strategy and mass combat games in Unreal Engine
sidebar_position: 0
---

# Introduction

The **Pioneer Mass Strategy System** is a comprehensive foundation for building top-down strategy games, large-scale battles, and Actor-plus-Mass combat scenarios in Unreal Engine. Built on Unreal's Mass Entity framework, Pioneer gives you a high-performance, data-oriented architecture for massive unit counts, including 10,000+ units with stable performance when paired with appropriate hardware and scene complexity.

At the same time, Pioneer keeps familiar Unreal workflows for maps, Blueprints, data assets, UI, Actors, and gameplay modules, so the scalable Mass foundation still fits naturally into a regular Unreal project.

Pioneer includes the mass navigation foundation plus the systems most strategy projects need next: melee and ranged combat, command queues, formations, control groups, Mass-aware animation, and an Actor-Mass Bridge for games where regular Unreal Actors need to fight alongside Mass entities.

## What Is Pioneer?

Pioneer turns the hardest parts of a real-time strategy foundation into a manageable, modular system. Instead of building selection, spawning, navigation, rendering, combat, command handling, UI hooks, and unit animation from scratch, Pioneer provides these core systems out of the box so you can focus on your game's unique mechanics and content.

The system leverages Unreal Engine's **Mass Entity** framework, a data-oriented architecture optimized for processing large numbers of entities efficiently. This makes Pioneer well suited for strategy games, mass battles, wave-based encounters, and hybrid games where Mass units and regular Actors need to coexist.

The plugin is designed around composition. Units are authored as Entity Config Assets, then given capabilities through traits such as movement, selection, rendering, unit attributes, ranged attacks, bridge participation, and animation. Game-specific modules can layer new presentation and rules on top without replacing the core systems.

## Why Pioneer Exists

Creating a strategy game in Unreal Engine traditionally requires implementing complex systems for:

- **Mass unit navigation** with pathfinding and avoidance
- **Efficient rendering** of thousands of units
- **Entity spawning and management** at scale
- **Unit selection**, command handling, and command queues
- **Melee and ranged combat** with damage, projectiles, teams, and death handling
- **Groups and formations** for managing large selections
- **Mass unit animation** for locomotion, attacks, charge, and death states
- **Actor-to-Mass interaction** when regular Unreal Actors need to fight alongside Mass entities
- **Performance optimization** for large entity counts

Pioneer brings these challenges into one cohesive, well-integrated system. The goal is simple: make creating a strategy game feel more like building with a complete Unreal gameplay foundation, while still leaving room for your own units, factions, rules, maps, and visual style.

## Ready-To-Use Starting Points

The plugin includes two ready-to-use sample game modes that show the systems working in real gameplay contexts:

- **RTS Mass Battle** - a large-scale mass battle setup with RTS controls, deployment flow, command cards, groups, formations, match state, melee units, ranged units, and projectile combat.
- **Top Down Zombie Shooter** - a squad-action setup where regular Actor operatives fight Mass zombie entities through the Actor-Mass Bridge.

Open these maps from plugin content:

- `Pioneer/Core/Maps/L_DemoMap`
- `Pioneer/Core/Maps/L_HeightDemoMap`
- `RTSMassBattle/Maps/L_MassBattleDemo`
- `TopDownZombieShooter/Maps/L_TDZS_DemoMap`

See [Sample Game Modes](./getting-started/sample-game-modes.md) for a guided overview.

## Core Systems

Pioneer is organized into systems that can be used together or extended individually.

### Entity System

The entity system defines Mass units through Entity Config Assets and traits. Traits add capabilities such as movement, selection, rendering, unit attributes, ranged attacks, bridge participation, and Mass animation.

- **Trait-based composition** for flexible unit configuration
- **Entity Config Assets** for authoring unit types in the editor
- **Template registry** for managing reusable Mass archetypes
- **Config inheritance** for creating unit families and variations
- **Fragment-based runtime data** for scalable Mass processing

### Navigation System

The navigation system handles movement, steering, path following, navmesh confinement, avoidance, sleeping, wake-up behavior, smooth orientation, and hard separation. It is built for large unit counts and keeps idle units inexpensive.

- **Navmesh-based pathfinding** for efficient route calculation
- **Multi-level navigation** with Z-axis support for navigating across different floor levels
- **Dynamic avoidance** using hierarchical spatial grids
- **Steering behaviors** for natural unit movement
- **Confinement** to keep units within navigable areas
- **Sleep state optimization** to reduce processing for idle units

### Rendering System

The rendering system uses instanced static meshes, dynamic LOD, and vertex animation data so many units can render efficiently without one Actor per unit.

- **Instanced Static Mesh rendering** for efficient batch rendering
- **Automatic LOD system** based on camera distance and viewport position
- **Vertex animation support** for GPU-driven unit animation
- **Per-mesh component management** for clean batching
- **Large-count rendering** without individual unit Actors

### Selection System

The selection system handles click selection, drag selection, selected entity summaries, and selection data used by UI, grouping, commands, and control slots.

- **Single-unit selection** through cursor picking
- **Multi-unit selection** through drag selection
- **Selection summaries** for UI panels and command cards
- **Integration with groups** so selections can become persistent control groups
- **Selection state management** across frames

### Spawning System

The spawning system creates Mass units from Entity Config Assets using time-sliced requests, template caching, and configurable spawn transforms.

- **Template-based entity creation** for consistent unit configuration
- **Time-sliced spawning** to reduce frame spikes
- **Batch processing** for spawning many entities efficiently
- **Config-driven spawner actors** for map-authored unit placement
- **Wave-friendly spawning** for continuous enemy pressure

### Combat System

The combat system adds health, armor, team identity, target acquisition, melee engagement, ranged engagement, projectile simulation, damage routing, death handling, and combat events for VFX, audio, and animation.

- **Melee combat** with attack range, windup, cooldown, and damage
- **Ranged combat** with projectiles, line of sight, arcs, and impact radius
- **Team-based hostility** for large battles and wave encounters
- **Combat lifecycle events** for animation, VFX, audio, and UI feedback
- **Death handling** that works with Mass animation and cleanup

### Command System

The command system supports move, attack move, attack, hold position, stop, patrol, follow, retreat, and charge commands. Commands can replace current orders, interrupt them, or queue behind them.

- **RTS-style command set** for movement, combat, patrol, follow, retreat, and charge
- **Command queue** for planning multi-step orders
- **Context commands** for ground and entity targets
- **Command feedback events** for UI and player response
- **Group-aware command issuance** for large selections

### Groups And Formations

Groups let players keep selections together, merge selected groups, ungroup, assign control slots, recall groups, and command groups as a unit. Formations define how grouped units arrange themselves when moving.

- **Persistent unit groups** created from player selections
- **Control slot bindings** for quick recall during gameplay
- **Merge and ungroup workflows** for flexible army management
- **Built-in formations** including line, column, wedge, box, circle, and loose
- **Custom formation support** for project-specific layouts

### Actor-Mass Bridge

The Actor-Mass Bridge lets normal Unreal Actors and Mass entities participate in the same combat simulation. This is useful for hero units, squad members, bosses, objectives, vehicles, or any gameplay object that should remain an Actor while still interacting with Mass enemies.

- **Actor and Mass participants** registered in one bridge system
- **Combat profiles** for affiliation, targeting, and eligibility
- **Damage routing** between Actor and Mass domains
- **Location and transform resolution** for mixed targeting
- **Hybrid game support** for squads, heroes, bosses, and Mass enemies

### Mass Animation System

The animation layer maps semantic states such as Idle, Walk, Run, Charge, Attack, and Death to baked vertex animation clips. Gameplay systems request state changes while rendering stays optimized through instanced meshes.

- **Locomotion states** for Idle, Walk, and Run
- **Event-driven states** for Charge, Attack, and Death
- **Unit Animation Set Assets** for binding gameplay states to baked clips
- **Transition settings** for readable state changes
- **Corpse linger support** for death presentation before cleanup

## Main Features

These are the primary capabilities Pioneer provides:

- **Select and command large armies** with responsive click selection, drag selection, groups, and control slots.
- **Move thousands of units** across navmesh-driven terrain with avoidance, steering, confinement, and sleep optimization.
- **Run melee and ranged battles** with health, armor, teams, target acquisition, projectiles, damage, and death handling.
- **Queue multi-step strategies** so players can plan movement, attacks, patrols, retreats, and charges without losing control.
- **Mix Mass entities with regular Actors** through the Actor-Mass Bridge for heroes, squads, bosses, objectives, and Mass enemies.
- **Animate Mass units efficiently** with locomotion states and event-driven attack, charge, and death clips.
- **Render large unit counts** through instanced meshes, LOD, and vertex animation.
- **Start from playable examples** with the RTS Mass Battle and Top Down Zombie Shooter sample modes.

## Requirements

:::warning C++ Knowledge Required
Pioneer is built on Unreal's Mass Entity framework. Most core runtime behavior is implemented in C++, and advanced customization requires C++ experience.

You can still configure assets, maps, unit data, UI, and many Blueprint-facing components without writing C++, but adding new processor behavior, fragments, traits, or deep gameplay rules requires C++.
:::

### Engine Requirements

- Unreal Engine 5.7.0 or later
- Mass Entity module
- CommonUI plugin
- Niagara plugin for included effects
- Editor Scripting Utilities for editor-side tooling

### Platform Support

Currently supported platforms:

- Windows 64-bit

## Limitations

- Performance depends on hardware, map complexity, navmesh complexity, unit count, animation cost, and how many systems are active.
- The sample game modes are starting points, not complete shipped games.
- Some editor tooling and animation baking workflows are intended for technical users.

## Getting Started

1. Follow the [Installation Guide](./getting-started/installation.md).
2. Open the [Quick Start](./getting-started/quick-start.md) and test the included maps.
3. Explore [Sample Game Modes](./getting-started/sample-game-modes.md) to choose the best starting point for your project.
4. Read [Creating Units](./guides/creating-units.md) when you are ready to author your own units.

## Vision

Pioneer is designed as a growing foundation for strategy and mass-unit games. The combat update expands the plugin from navigation, spawning, selection, and rendering into a broader gameplay toolkit that can support RTS prototypes, action-strategy hybrids, and Actor-plus-Mass combat experiments.
