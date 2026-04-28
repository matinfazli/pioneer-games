---
title: Sample Game Modes
description: Overview of the RTS Mass Battle and Top Down Zombie Shooter starting points included with Pioneer
sidebar_position: 4
---

# Sample Game Modes

Pioneer includes two ready-to-use sample game modes that show different ways to build on the same Mass foundation. They are meant to be more than demos: use them as starting points, reference implementations, or testbeds while shaping your own game.

Both samples are included as plugin content, so enable plugin content in the Content Browser if you do not see the folders.

## RTS Mass Battle

The RTS Mass Battle sample is the quickest way to see Pioneer as a full strategy-game foundation. It demonstrates how selection, commands, groups, formations, combat, animation, UI, deployment, and match state fit together in a traditional RTS-style project.

Open the sample map at:

```text
RTSMassBattle/Maps/L_MassBattleDemo
```

Use this sample when you want to build:

- mass unit battles with many melee and ranged units
- RTS command cards and command targeting
- deployment phases before combat starts
- control groups and group slot UI
- formations that keep selected units organized
- match-state UI with team counts, deaths, elapsed time, and win conditions

### Main Assets

- `RTSMassBattle/Blueprints/Game/BP_GM_RTSBattle` - sample game mode setup
- `RTSMassBattle/Blueprints/Player/BP_PC_RTSBattle` - sample player controller setup
- `RTSMassBattle/Blueprints/BP_DeploymentZone` - deployment zone actor
- `RTSMassBattle/Maps/L_MassBattleDemo` - playable demo level

:::tip
If your project is closest to a classic RTS, start here. The sample shows the broadest set of Pioneer systems working together.
:::

## Top Down Zombie Shooter

The Top Down Zombie Shooter sample shows a different shape of game: a smaller squad of regular Unreal Actor characters fighting large numbers of Mass enemies through the Actor-Mass Bridge.

Open the sample map at:

```text
TopDownZombieShooter/Maps/L_TDZS_DemoMap
```

Use this sample when you want to build:

- squad-based top-down action games
- Actor characters fighting Mass enemies
- Mass enemy waves that chase Actor operatives
- actor-side health, reload, firing, and upgrade logic
- roguelike-style run upgrades
- bridge-based damage between Actors and Mass entities

### Main Assets

- `TopDownZombieShooter/Blueprints/Game/BP_GameMode_TDZS` - sample game mode setup
- `TopDownZombieShooter/Blueprints/Player/BP_PlayerController_TDZS` - sample player controller setup
- `TopDownZombieShooter/Blueprints/Camera/BP_CameraPawn_TDZS` - top-down camera pawn
- `TopDownZombieShooter/Blueprints/Operatives` - Actor operative examples
- `TopDownZombieShooter/Zombies` - Mass enemy entity configs and visuals
- `TopDownZombieShooter/Maps/L_TDZS_DemoMap` - playable demo level

:::note
This sample intentionally keeps the player squad as Actors. That makes it easier to use familiar Character, AI Controller, component, animation, and Blueprint workflows while Mass handles enemy scale.
:::

## Core Demo Maps

The original Pioneer demo maps are still useful for learning the foundation without the full combat sample layer:

- `Pioneer/Core/Maps/L_DemoMap` - basic mass unit selection, movement, rendering, and spawning
- `Pioneer/Core/Maps/L_HeightDemoMap` - navigation and movement across terrain height

## Choosing A Starting Point

Start with **RTS Mass Battle** if your project needs many player-controlled units, formations, and command queues.

Start with **Top Down Zombie Shooter** if your project needs a smaller number of Actor-controlled heroes, operatives, or player units fighting many Mass enemies.

Start with the **Core Demo Map** if you want to learn the underlying Mass unit pipeline before adding higher-level game rules.

## Related Docs

- [Combat System](../systems/combat-system.md)
- [Command System](../systems/command-system.md)
- [Groups and Formations](../systems/group-formation-system.md)
- [Actor-Mass Bridge](../systems/actor-mass-bridge.md)
- [Mass Animation System](../systems/mass-animation-system.md)
