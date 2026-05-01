---
title: Creating Units
description: Step-by-step guide to create and configure unit types in Pioneer
sidebar_position: 1
---

# Creating Units

Units in Pioneer are built from **Entity Config Assets**. An Entity Config Asset combines traits that describe what a Mass entity can do: render, move, avoid, be selected, fight, animate, join bridge combat, or participate in custom game logic.

The easiest way to create a new animated unit is the **Pioneer Unit Factory** editor tool. It creates the vertex animation assets, runs the Animation To Texture bake, and generates the Pioneer unit assets with the common runtime traits already wired.

Use manual Entity Config editing only when you need to make a small variation of an existing unit, add advanced traits such as ranged combat, or build a custom setup the factory does not cover yet.

## What The Unit Factory Creates

For a unit named `Soldier`, the factory creates assets under:

```text
/Game/Pioneer/Units/Soldier
```

It creates:

- `Textures/T_Soldier_BonePosition`
- `Textures/T_Soldier_BoneRotation`
- `Textures/T_Soldier_BoneWeight`
- `Materials/MI_<SlotName>_Soldier` for each material slot on the static mesh
- `VAD_Soldier` as the Vertex Anim Data Asset
- `UAS_Soldier` as the Unit Animation Set Asset
- `EC_Soldier` as the Entity Config Asset

The generated Entity Config Asset includes:

- Instanced Actor Trait, using the chosen static mesh
- LOD Trait, with default Max, Mid, and Min distance settings
- Unit Animation Trait, pointing at the generated Unit Animation Set
- Movement Trait
- Avoidance Trait
- Navigation Obstacle Trait
- Selectable Trait, using the plugin selection plane mesh
- Unit Attributes Trait, with display name and thumbnail set from the factory inputs

The generated config is a solid controllable melee-style baseline. After creation, open `EC_<UnitName>` to tune movement, avoidance, selection, health, attack values, LODs, and any game-specific traits.

## Step 1: Open The Unit Factory

In the Unreal Editor, open:

```text
Window > Pioneer Unit Factory
```

The tool starts with the plugin's mannequin, master material, thumbnail, and locomotion animations prefilled where available. You can replace these with your own assets.

## Step 2: Fill In Inputs

Set the following fields:

- **Unit Name**: asset-safe name, such as `Swordsman`, `Archer`, or `Worker`
- **Parent Folder**: valid long package path, such as `/Game/Pioneer/Units`
- **Skeletal Mesh**: source skeletal mesh used by the animation sequences
- **Static Mesh**: static mesh that will be rendered by the instanced renderer
- **Master Material**: bone-animation material used as the parent for generated material instances
- **Thumbnail**: texture used by Unit Attributes metadata and UI

The static mesh must have at least one material slot. The factory assigns generated material instances back onto the static mesh, so use a mesh asset that can be modified.

:::warning
The factory refuses to recreate a unit folder that already exists. If `/Game/Pioneer/Units/Soldier` already exists, choose a different Unit Name or delete the old generated folder before running Step 1 again.
:::

## Step 3: Bind Animation States

Bind one animation sequence for each required semantic state:

- Idle
- Walk
- Run
- Charge
- Attack
- Death

All six bindings are required. Each animation must be compatible with the selected skeletal mesh skeleton, and all bound animations must use the same sample rate.

The factory currently uses default playback settings for each state:

- Play Rate: `1.0`
- Transition Duration: `0.15` seconds

You can adjust generated animation behavior later in the `UAS_<UnitName>` asset.

## Step 4: Create Vertex Anim Assets

Click:

```text
1) Create Vertex Anim Assets
```

This validates the inputs, creates the unit folder, creates placeholder VAT textures, creates material instances for every static-mesh material slot, assigns the material instances to the static mesh, and creates `VAD_<UnitName>` seeded with the selected animation list.

After this step, confirm:

- the status panel reports the created VAD
- the generated folder exists
- the static mesh now uses the generated material instances
- every required state animation is present in the VAD

## Step 5: Run Animation To Texture

Click:

```text
2) Run Anim To Texture
```

This runs the Animation To Texture bake for the generated VAD. It then updates each generated material instance from the baked data and saves the VAD, static mesh, and material instances.

Watch the Output Log for bake warnings, skeleton mismatches, or invalid source data. When the step succeeds, the factory enables the final asset creation step.

## Step 6: Create Pioneer Unit Assets

Click:

```text
3) Create Pioneer Unit Assets
```

This creates `UAS_<UnitName>` and `EC_<UnitName>`. It wires the animation set to the baked VAD, copies the state bindings into the animation set, and adds the core gameplay traits to the Entity Config Asset.

Open `EC_<UnitName>` and check:

- Instanced Actor Trait uses the generated static mesh setup
- Unit Animation Trait references `UAS_<UnitName>`
- Unit Attributes Trait has the expected display name and thumbnail
- Movement, Avoidance, Navigation Obstacle, Selectable, and LOD traits are present

## Step 7: Tune The Generated Unit

The factory gives you a working baseline, not a finished balance pass. Tune the generated Entity Config Asset for your game.

Common values to review:

- Instanced Actor Trait: radius and rotation correction
- Movement Trait: max speed, node advance radius, standing distance, and facing smoothing
- Avoidance Trait: moving, standing, and hard separation settings
- LOD Trait: camera distance thresholds
- Unit Attributes Trait: max health, armor, base attack damage, attack range, cooldown, and windup
- Unit Animation Set: state bindings, play rates, transition durations, and locomotion thresholds

## Adding Ranged Units

The Unit Factory does not currently add **Ranged Attack Trait**. To create an archer, catapult, or other projectile unit:

1. Create the unit with the factory.
2. Open the generated `EC_<UnitName>`.
3. Add **Ranged Attack Trait**.
4. Configure projectile speed, minimum range, trajectory, offsets, line-of-sight behavior, group volley settings, and projectile visuals.
5. Tune Unit Attributes Trait for range, damage, cooldown, and windup.

Ranged units still need Unit Attributes Trait. The ranged trait adds projectile behavior; it does not replace health, armor, damage, or metadata.

## Adding Bridge Or Custom Behavior

The generated Entity Config Asset covers the common Mass RTS unit path. Add more traits manually when your unit needs extra behavior.

Use **Actor-Mass Bridge Participant Trait** when a Mass unit needs to interact with regular Actor combatants through the bridge.

Use custom traits for game-specific logic such as enemy chase behavior, harvesting, construction, squads, or special abilities.

## Manual Creation

Manual setup is still useful for advanced cases, but it is slower and easier to misconfigure. If you choose to create an Entity Config Asset by hand, most player-controllable units need:

```text
Entity Config Asset
- Instanced Actor Trait
- Movement Trait
- Avoidance Trait
- Navigation Obstacle Trait
- Selectable Trait
- LOD Trait
- Unit Attributes Trait
- Unit Animation Trait
```

For animation, create or duplicate a Vertex Anim Data Asset and Unit Animation Set Asset, bind the required states, bake the data, then point Unit Animation Trait at the animation set. In most cases, the Unit Factory is the better starting point because it performs these wiring steps for you.

## Example Configurations

### Melee Soldier

Create with the Unit Factory, then tune:

```text
EC_Swordsman
- Unit Attributes Trait: melee health, damage, range, cooldown, windup
- Movement Trait: infantry speed and steering
- Avoidance Trait: infantry spacing
```

### Ranged Archer

Create with the Unit Factory, then add:

```text
EC_Archer
- Ranged Attack Trait
- Projectile visual settings
- Ranged attack range, cooldown, and minimum range tuning
```

### Bridge Enemy

Create with the Unit Factory, then add:

```text
EC_Walker
- Actor-Mass Bridge Participant Trait
- Game-specific enemy chase trait
- Any bridge combat tuning required by the sample
```

## Testing Your Unit

Use the sample that best matches the unit:

- Use `Pioneer/Core/Maps/L_DemoMap` for movement, selection, spawning, and rendering tests.
- Use `RTSMassBattle/Maps/L_MassBattleDemo` for RTS combat units.
- Use `TopDownZombieShooter/Maps/L_TDZS_DemoMap` for bridge-based Actor-versus-Mass enemies.

Test these behaviors before tuning details:

- spawns at the expected location
- renders with the correct mesh and generated materials
- can be selected if intended
- moves across navmesh
- avoids other units
- attacks valid hostile targets
- plays Idle, Walk, Run, Charge, Attack, and Death states as expected
- cleans up after death

## Creating Variations

Entity Config Assets can inherit from parent configs. Use parent configs for common setup and child configs for variants.

Examples:

- `EC_BaseInfantry` defines movement, selection, avoidance, LOD, and animation.
- `EC_Swordsman` inherits from it and sets melee stats.
- `EC_Archer` inherits from it and adds ranged attack settings.
- `EC_EliteArcher` inherits from `EC_Archer` and increases range or damage.

For units that share the same mesh and animation set, duplicate or inherit from a generated config. For units with a different mesh, skeleton, or animation bake, create a new baseline with the Unit Factory.

## Troubleshooting

### The factory says the folder already exists

- Choose a different Unit Name.
- Delete the existing generated unit folder before recreating the same unit.

### The factory says an animation has an incompatible skeleton

- Confirm every Anim Sequence uses a skeleton compatible with the selected Skeletal Mesh.
- Replace any animation copied from another character skeleton.

### The factory says all animations must share the same sample rate

- Re-export or resample the animations so Idle, Walk, Run, Charge, Attack, and Death use the same sampling frame rate.

### Animation To Texture fails

- Check the Output Log for the detailed bake error.
- Confirm the Skeletal Mesh, Static Mesh, and animation list are set on the generated VAD.
- Confirm the source static mesh has valid material slots.

### Unit does not appear

- Confirm Instanced Actor Trait has a valid mesh.
- Confirm the Entity Config Asset is assigned to the spawner.
- Confirm the generated materials are assigned to the static mesh.
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

- Confirm Ranged Attack Trait was added manually.
- Check minimum range and line-of-sight settings.
- Confirm projectile speed, trajectory, and visual settings are valid.

### Animation state is wrong

- Confirm Unit Animation Trait references the generated Unit Animation Set Asset.
- Confirm all required states are bound in `UAS_<UnitName>`.
- Check locomotion thresholds and attack/death durations.

## Related Docs

- [Entity System](../systems/entity-system.md)
- [Combat System](../systems/combat-system.md)
- [Mass Animation System](../systems/mass-animation-system.md)
- [Rendering System](../systems/rendering-system.md)
- [Spawning System](../systems/spawning-system.md)
