---
title: Creating Units
description: Step-by-step guide to create and configure unit types in Pioneer
sidebar_position: 1
---

# Creating Units

Units in Pioneer are built from **Entity Config Assets**, so you can create new unit types by composing capabilities instead of writing a new gameplay stack every time. Each config combines traits that describe what a Mass entity can do: render, move, avoid, be selected, fight, animate, join bridge combat, or participate in custom game logic.

The fastest way to create a new unit is to duplicate one of the included configs in `Pioneer/Units`, then adjust the mesh, stats, animation set, and combat role. This keeps the proven setup intact while giving you room to build your own roster.

## Overview

Creating a unit usually involves:

1. Create or duplicate an Entity Config Asset.
2. Add traits for the unit's capabilities.
3. Configure movement, rendering, selection, combat, and animation values.
4. Place or spawn the unit in a sample map.
5. Test selection, movement, combat, death, and UI presentation.

## Step 1: Create An Entity Config Asset

1. In the Content Browser, right-click in your desired folder.
2. Choose **Miscellaneous > Data Asset**.
3. Select **Entity Config Asset**.
4. Name it with a clear unit name, such as `EC_Swordsman`, `EC_Archer`, or `EC_Worker`.

:::tip
For combat units, duplicate an included config from `Pioneer/Units` first. This is faster and reduces the chance of missing a required trait.
:::

## Step 2: Add Core Traits

Most player-controllable Mass units use these traits.

### Instanced Actor Trait

This makes the unit visible through instanced static mesh rendering.

Configure:

- mesh
- radius
- rotation correction
- default animation token if using manual animation data
- metadata such as display name and thumbnail

### Movement Trait

This enables navmesh movement, steering, path following, orientation, and movement speed configuration.

Configure:

- max speed
- acceleration and deceleration
- turn behavior
- confinement settings
- standing behavior
- orientation smoothing

### Avoidance Trait

This keeps units from collapsing into each other while moving or standing.

Configure:

- moving avoidance
- standing avoidance
- hard separation
- hard separation clamp

### Selectable Trait

This lets the selection system include the unit in click and drag selection.

### LOD Trait

This lets distant units use cheaper processing and rendering behavior. Add it to any unit type that may appear in large numbers.

## Step 3: Add Combat Traits

Combat units need **Unit Attributes Trait**.

Configure:

- display name
- thumbnail
- max health
- armor
- base attack damage
- base attack range
- attack cooldown
- attack windup

Melee units can stop here. Units without Ranged Attack Trait are handled as melee combatants by the combat processors.

### Ranged Attack Trait

Add **Ranged Attack Trait** for archers, catapults, ranged monsters, or any unit that should fire projectiles.

Configure:

- minimum attack range
- projectile speed
- impact radius
- line-of-sight behavior
- launch and target offsets
- reposition buffer
- trajectory type
- arc height
- group volley settings
- projectile mesh, rotation correction, and scale

:::note
Ranged units still need Unit Attributes Trait. The ranged trait adds projectile behavior; it does not replace health, armor, damage, or team setup.
:::

## Step 4: Add Animation

For the combat update animation flow, use **Unit Animation Trait** with a **Unit Animation Set Asset**.

The animation set maps semantic states to baked vertex animation clips:

- Idle
- Walk
- Run
- Charge
- Attack
- Death

Configure:

1. Create or duplicate a Vertex Animation Data Asset.
2. Create or duplicate a Unit Animation Set Asset.
3. Assign the baked vertex animation data.
4. Bind all required states.
5. Set locomotion thresholds.
6. Add Unit Animation Trait to the Entity Config Asset.

See [Mass Animation System](../systems/mass-animation-system.md).

## Step 5: Add Actor-Mass Bridge Support

Add **Actor-Mass Bridge Participant Trait** when a Mass unit needs to interact with regular Actor combatants through the bridge.

Use this for:

- Mass enemies that fight Actor heroes
- Mass units that can be targeted by Actor weapons
- hybrid games where only some combatants are Mass entities

See [Actor-Mass Bridge](../systems/actor-mass-bridge.md).

## Example Configurations

### Melee Soldier

```text
Entity Config Asset: EC_Swordsman
- Instanced Actor Trait
- Movement Trait
- Avoidance Trait
- Selectable Trait
- LOD Trait
- Unit Attributes Trait
- Unit Animation Trait
```

### Ranged Archer

```text
Entity Config Asset: EC_Archer
- Instanced Actor Trait
- Movement Trait
- Avoidance Trait
- Selectable Trait
- LOD Trait
- Unit Attributes Trait
- Ranged Attack Trait
- Unit Animation Trait
```

### Bridge Enemy

```text
Entity Config Asset: EC_Walker
- Instanced Actor Trait
- Movement Trait
- Avoidance Trait
- LOD Trait
- Unit Attributes Trait
- Unit Animation Trait
- Actor-Mass Bridge Participant Trait
- Game-specific enemy chase trait
```

## Step 6: Test Your Unit

Use the sample that best matches the unit:

- Use `Pioneer/Core/Maps/L_DemoMap` for movement, selection, spawning, and rendering tests.
- Use `RTSMassBattle/Maps/L_MassBattleDemo` for RTS combat units.
- Use `TopDownZombieShooter/Maps/L_TDZS_DemoMap` for bridge-based Actor-versus-Mass enemies.

Test these behaviors before tuning details:

- spawns at the expected location
- renders with the correct mesh
- can be selected if intended
- moves across navmesh
- avoids other units
- attacks valid hostile targets
- plays Idle, Walk, Run, Attack, Charge, and Death states as expected
- cleans up after death

## Creating Variations

Entity Config Assets can inherit from parent configs. Use parent configs for common setup and child configs for variants.

Examples:

- `EC_BaseInfantry` defines movement, selection, avoidance, LOD, and animation.
- `EC_Swordsman` inherits from it and sets melee stats.
- `EC_Archer` inherits from it and adds ranged attack settings.
- `EC_EliteArcher` inherits from `EC_Archer` and increases range or damage.

## Best Practices

- Start from a working included unit config.
- Keep core traits consistent across unit families.
- Use Unit Attributes Trait for every combat unit.
- Add Ranged Attack Trait only to true ranged units.
- Add Unit Animation Trait when the unit should use semantic combat animation states.
- Keep projectile impact radius modest until performance has been tested.
- Use LOD Trait for any high-count unit.
- Tune avoidance radius and formation spacing together.

## Troubleshooting

### Unit does not appear

- Confirm Instanced Actor Trait has a valid mesh.
- Confirm the Entity Config Asset is assigned to the spawner.
- Confirm the spawn location is valid.

### Unit does not move

- Confirm Movement Trait is present.
- Confirm the level has built navmesh.
- Confirm the target location is on navmesh.

### Unit does not attack

- Confirm Unit Attributes Trait is present.
- Confirm team IDs are non-zero and hostile.
- Confirm targets are within acquisition or chase range.

### Ranged unit does not fire

- Confirm Ranged Attack Trait is present.
- Check minimum range and line-of-sight settings.
- Confirm projectile speed and trajectory settings are valid.

### Animation state is wrong

- Confirm Unit Animation Trait references a valid Unit Animation Set Asset.
- Confirm all required states are bound.
- Check locomotion thresholds and attack/death durations.

## Related Docs

- [Entity System](../systems/entity-system.md)
- [Combat System](../systems/combat-system.md)
- [Mass Animation System](../systems/mass-animation-system.md)
- [Rendering System](../systems/rendering-system.md)
- [Spawning System](../systems/spawning-system.md)
