---
title: Mass Animation System
description: Understanding locomotion and event-driven animation states for Pioneer Mass entities
sidebar_position: 10
---

# Mass Animation System

The Mass Animation System gives large groups of units readable motion without the cost of full Actor-based skeletal animation per unit. It maps gameplay state to efficient vertex animation playback for instanced Mass entities.

Instead of driving skeletal animation per unit, Pioneer uses baked animation data and semantic animation states selected by movement, combat, charge, attack, and death events.

The system is designed for readability at scale. A unit does not need a full animation blueprint to communicate what it is doing; it needs a small set of well-mapped states that movement and combat can trigger reliably.

## Key Concepts

- **Vertex Animation Data Asset** stores baked animation textures and frame ranges.
- **Unit Animation Set Asset** maps gameplay states to animation sequences from the baked data.
- **Unit Animation Trait** attaches the animation set to an Entity Config Asset.
- **Locomotion states** switch between Idle, Walk, and Run based on planar speed.
- **Event states** play one-shot or priority states such as Charge, Attack, and Death.
- **Death corpse state** keeps a unit visible briefly after death before cleanup.
- **Transition duration** controls how quickly an instance blends from one baked clip to another.

## Supported States

Pioneer uses these semantic states:

- Idle
- Walk
- Run
- Charge
- Attack
- Death

The animation processor chooses locomotion states from movement speed, then higher-priority gameplay events can temporarily lock the state. Death has the highest priority.

Unit Animation Set Assets are expected to resolve the required semantic states so the runtime can use consistent state names across different unit types.

## Usage

To set up a Mass unit with the new animation flow:

1. Bake the unit's animation sequences into a Vertex Animation Data Asset.
2. Create a Unit Animation Set Asset for that unit family.
3. Assign the baked data asset.
4. Bind required states: Idle, Walk, Run, Charge, Attack, and Death.
5. Tune locomotion speed thresholds.
6. Add Unit Animation Trait to the Entity Config Asset.
7. Ensure the entity also has Instanced Actor Trait so the animation can render.

:::warning
All required animation states should be present. Missing state bindings can prevent the animation set from resolving correctly.
:::

## Locomotion

Idle, Walk, and Run are selected from planar speed. The animation set exposes thresholds for:

- Idle to Walk
- Walk to Idle
- Walk to Run

The separate Walk-to-Idle threshold provides hysteresis so units do not rapidly switch states when they hover around one speed.

This means slow repositioning, normal movement, and fast charge-style movement can read differently even though all three are still Mass entity movement under the hood.

## Event-Driven States

Charge, Attack, and Death are driven by gameplay events:

- **Charge** can be used by charge commands or aggressive movement behavior.
- **Attack** is triggered during attack windup so the animation lines up with combat timing.
- **Death** starts when the unit is marked for death and can linger on a corpse frame before cleanup.

Use transition durations in the animation set to control how quickly a unit blends into each state.

Event states have priority over locomotion. Death overrides everything, Attack can temporarily lock the unit into an attack clip, and Charge can make aggressive movement visibly different from a normal move order.

## Configuration

Configure animation in the Unit Animation Set Asset:

- baked Vertex Animation Data Asset
- state bindings
- play rate per state
- transition duration per state
- default state
- locomotion speed thresholds
- corpse linger seconds

The Unit Animation Trait requires the unit to also have Instanced Actor Trait, because the final playback is applied through the instance rendering data.

Use the Entity Config Asset to assign the Unit Animation Trait and connect that animation set to a unit type.

## Performance Considerations

The system keeps per-entity animation state lightweight. Expensive animation data is shared by unit type, while per-unit state is limited to the current semantic state, locks, timers, and animation token updates.

For large battles:

- Use only the states the unit needs, but keep the required state set bound.
- Reuse animation sets across unit families where possible.
- Keep transition durations short for combat-heavy units.
- Avoid excessive high-cost VFX on every attack event.

## Troubleshooting

### Unit stays idle

- Confirm Unit Animation Trait is present.
- Confirm Instanced Actor Trait is present.
- Confirm the animation set resolves successfully.
- Confirm the unit is actually moving or receiving combat events.

### Attack animation does not play

- Confirm the unit participates in combat.
- Confirm the Attack state is bound.
- Check attack windup and clip duration so the state is visible.

### Death animation is skipped

- Confirm the Death state is bound.
- Check corpse linger seconds.
- Confirm the death cleanup path is not removing the unit before animation can display.

## Related Docs

- [Rendering System](./rendering-system.md)
- [Combat System](./combat-system.md)
- [Creating Units](../guides/creating-units.md)
