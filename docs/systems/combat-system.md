---
title: Combat System
description: Understanding melee, ranged, projectile, damage, and death behavior in Pioneer
sidebar_position: 6
---

# Combat System

The Combat System adds scalable unit-to-unit combat on top of the existing Mass framework. It lets Mass entities acquire targets, chase enemies, perform melee attacks, fire ranged projectiles, receive damage, die, and trigger animation or presentation events without turning each unit into a full Actor.

The result is a battle layer that feels familiar to strategy players but remains practical for large counts. Combat data lives on Mass entities, while subsystems and processors handle broad simulation work such as target acquisition, spatial queries, engagement timing, projectile travel, damage application, and death cleanup.

Combat is intentionally built as data on top of the existing Mass unit stack. The same entity can move through the Navigation System, render through the Rendering System, receive player orders through the Command System, and fight through combat fragments added by its traits.

## Key Concepts

- **Unit attributes** define health, armor, attack damage, attack range, melee cooldown, and attack windup.
- **Teams** determine hostility. Units with different non-zero team IDs can fight each other.
- **Target acquisition** finds eligible enemies near a unit and keeps combat from requiring manual target assignment every frame.
- **Melee engagement** handles close-range approach, windup, hit timing, cooldown, and damage.
- **Ranged engagement** handles minimum range, line of sight, projectile settings, and optional volley timing.
- **Projectiles** simulate travel and can apply single-target or radius damage on impact.
- **Death state** marks units for removal and gives the animation system time to play death and corpse linger states.
- **Combat events** notify presentation systems when targets are acquired, attacks start, attacks land, projectiles launch, and projectiles impact.

## Usage

For a basic melee unit, add a **Unit Attributes Trait** to the Entity Config Asset. This gives the unit health, armor, base attack damage, base attack range, attack cooldown, and attack windup.

For a ranged unit, add **Ranged Attack Trait** in addition to Unit Attributes. This opts the entity into ranged behavior and projectile settings. Units without the ranged trait are treated as melee combatants.

To make units hostile, set their team values through the spawning or game-mode setup used by your project. The included RTS Mass Battle and Top Down Zombie Shooter samples both demonstrate team-based combat.

## Melee Combat

Melee combat uses the unit's base attack range, damage, cooldown, and windup. A typical melee flow is:

1. The unit finds or receives a hostile target.
2. Movement closes the distance until the target is inside attack range.
3. The attack starts and the windup timer begins.
4. Damage lands after the windup.
5. The unit waits for its cooldown before attacking again.

Attack windup is important because it gives animation, audio, and combat readability a place to line up. A unit can start an attack, play the attack state, and then apply damage at the intended moment instead of instantly removing health the frame it enters range.

## Ranged Combat

Ranged units can define:

- minimum attack range
- projectile speed
- impact radius
- line-of-sight requirements
- launch and target offsets
- reposition buffer
- direct, ballistic, or lobbed trajectory
- optional group volley timing
- projectile mesh and visual correction

Use ranged units for archers, siege weapons, artillery, spell casters, or any unit that should damage enemies without closing to melee range.

Ranged units can also reposition when they are too close or not in a valid firing setup. This is useful for units that need a minimum range, line of sight, or a bit of spacing before they can shoot cleanly.

## Damage And Death

Damage is routed through the combat system so health, armor, team rules, and death state stay consistent. Units marked for death can trigger animation and presentation before final cleanup removes or hides their render instance.

This separation matters for large battles: gameplay damage can resolve quickly, while animation and presentation get a short window to make the result readable.

## Combat Events

Combat exposes lifecycle events for target acquisition, attack start, attack landing, projectile launch, and projectile impact. These are intended for presentation hooks such as:

- attack animations
- muzzle flashes
- impact effects
- hit sounds
- floating damage feedback
- UI updates

:::tip
Keep gameplay damage in the combat system and use events for presentation. This keeps combat deterministic enough for Mass scale while still making the game readable.
:::

## Configuration

Tune combat primarily through Entity Config Assets:

- **Max Health** - how much damage a unit can take.
- **Armor** - flat mitigation used by the damage path.
- **Base Attack Damage** - default damage per attack.
- **Base Attack Range** - melee or general engagement range.
- **Attack Cooldown Seconds** - time between attacks.
- **Attack Windup Seconds** - delay before melee damage lands.
- **Ranged Attack settings** - projectile and line-of-sight behavior for ranged units.

Global engagement radii can be adjusted in C++ through the combat subsystem for projects that need different auto-acquire or chase distances.

Use the included sample units as starting points. Melee units usually need Unit Attributes plus movement and animation. Ranged units need Unit Attributes, Ranged Attack, movement, animation, and a valid projectile visual setup if you want visible projectiles.

## Performance Considerations

Combat is built around batched Mass processing and spatial queries. For best results:

- Use teams to limit eligible targets.
- Keep attack ranges practical for your camera scale.
- Avoid giving every unit large area-of-effect projectiles unless the game needs it.
- Use animation and VFX events selectively for large battles.
- Prefer Mass units for high-count armies and Actors for special units that need richer per-object behavior.

## Troubleshooting

### Units do not attack

- Confirm they have Unit Attributes.
- Confirm both sides have non-zero, different team IDs.
- Confirm enemies are inside acquisition or chase range.
- Confirm the units are not dead, unspawned, or missing movement support.

### Ranged units never fire

- Confirm the unit has Ranged Attack Trait.
- Check minimum range and reposition buffer.
- Disable line of sight temporarily to see whether traces are blocked.
- Verify projectile mesh settings only after confirming damage is being applied.

### Units die too quickly or too slowly

- Review Max Health, Armor, Base Attack Damage, cooldown, and projectile impact radius.
- Check whether multiple enemies are focusing the same target.
- Use the sample maps to compare against known working unit configs.

## Related Docs

- [Creating Units](../guides/creating-units.md)
- [Command System](./command-system.md)
- [Actor-Mass Bridge](./actor-mass-bridge.md)
- [Mass Animation System](./mass-animation-system.md)
