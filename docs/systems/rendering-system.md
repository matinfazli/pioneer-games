---
title: Rendering System
description: Understanding instanced rendering, LOD, and vertex animation in Pioneer
sidebar_position: 3
---

# Rendering System

The Rendering System is what lets Pioneer put large armies on screen without treating every unit like a full Actor. Units with the same mesh are batched through instanced static mesh components, then transforms, LOD state, highlighting, and animation data are updated in batches.

For strategy games, rendering is often the difference between a prototype that works with a few units and a game that still feels stable with thousands. Pioneer keeps the visual representation lightweight: Mass entities hold the simulation data, while the rendering system turns that data into efficient instanced mesh updates.

## Key Concepts

- **Instanced Static Mesh rendering** draws many copies of the same mesh efficiently.
- **Instance data** stores each unit's transform, mesh reference, animation token, instance index, and rendering state.
- **Instancing host** owns the runtime ISM components created for unit meshes.
- **LOD** reduces work for distant or less important units.
- **Selection highlighting** can be mirrored through a dedicated instance path instead of separate per-unit Actors.
- **Vertex Animation Textures** store baked animation data for GPU-driven animation.
- **Unit Animation Sets** map gameplay states such as Idle, Walk, Run, Attack, and Death to baked clips.

## Instanced Rendering

Instanced rendering groups units by mesh and renders them as instances. This avoids the cost of a full Actor and component hierarchy for every unit.

At runtime, the instancing subsystem creates or reuses one instanced component per unique mesh. Entities store their mesh, rotation correction, mesh scale, animation token, and instance index. The transform processor writes batched transform updates into the subsystem, which flushes them to the rendering components at the right point in the Mass processing frame.

Benefits:

- fewer draw calls per mesh type
- lower CPU overhead
- batched transform updates
- efficient hiding and cleanup for removed units
- practical rendering for large unit counts

Pioneer hides finalized units by scaling the instance down instead of turning every removal into costly component churn. The subsystem also keeps a hit-result lookup from ISM component and instance index back to the Mass entity, which is what lets selection and targeting resolve clicked units.

## Dynamic LOD

LOD helps distant units use less processing and rendering work. The system classifies units into **Max**, **Mid**, **Min**, and **Off** levels based on camera distance, screen-edge distance, and whether the unit is inside or near the camera frustum.

Use LOD Trait on high-count units, especially in RTS battles and wave-based games.

LOD levels can be used by other systems as a quality signal. For example, nearby units can receive full processing, while distant or offscreen units can reduce update cost. The LOD fragment also exposes a distance alpha that systems can use to scale work gradually.

## Vertex Animation

Pioneer supports baked vertex animation so Mass units can animate without skeletal components on every unit. Animation data is stored in textures and driven through instance data.

Each instance stores the current animation name, frame range, play rate, time offset, previous animation, and transition duration. Animation updates are only queued when the target animation changes, which keeps the common case cheap.

The combat update adds a higher-level Mass animation flow through Unit Animation Set Assets. These map semantic states to baked clips:

- Idle
- Walk
- Run
- Charge
- Attack
- Death

See [Mass Animation System](./mass-animation-system.md) for the state-driven workflow.

## Configuration

### Instanced Actor Trait

Use this trait on any high-count unit. Configure:

- **Mesh** for the unit's rendered static mesh.
- **Rotation Correction** when the mesh's authored forward direction does not match gameplay forward.
- **Mesh Scale** for visual scale without changing every spawn transform.
- **Radius** for systems that need an approximate unit footprint.

### LOD Trait

Use this trait on units that appear in meaningful numbers. Configure distance thresholds per LOD level so the unit stays detailed near the camera and cheaper farther away.

Start conservative: make sure gameplay behavior looks correct first, then tighten LOD distances after testing real battle sizes.

### Animation Assets

Configure animation through:

- Vertex Animation Data Assets for baked animation data.
- Unit Animation Set Assets for state-to-clip bindings.
- Unit Animation Trait for connecting the animation set to an entity config.

## Performance Considerations

- Reuse meshes and materials where possible so instances batch cleanly.
- Add LOD Trait to any unit type that appears in large numbers.
- Keep animation sets focused and avoid unnecessary high-cost visual effects on every unit.
- Hide or recycle instances instead of spawning Actor equivalents for large crowds.
- Test with representative unit counts, not only small samples.
- Use a small number of mesh/material combinations for mass armies when possible; each unique mesh needs its own instancing component.

## Troubleshooting

### Units do not render

- Confirm Instanced Actor Trait has a valid static mesh.
- Confirm the entity was spawned successfully.
- Confirm the instancing subsystem is active in the world.

### Selection or targeting cannot click a unit

- Confirm the unit is rendered through the instancing system.
- Confirm the instance was registered with the instancing subsystem.
- Confirm the unit also has the selection or targeting traits needed by your workflow.

### Units render but do not animate

- Confirm the unit has Unit Animation Trait.
- Confirm the Unit Animation Set Asset resolves all required states.
- Confirm the baked Vertex Animation Data Asset has valid frame ranges.

### Performance drops with many units

- Confirm LOD Trait is present.
- Reduce mesh or material complexity.
- Reuse meshes across many units.
- Reduce per-attack VFX or UI feedback in large battles.

## Related Docs

- [Entity System](./entity-system.md)
- [Mass Animation System](./mass-animation-system.md)
- [Creating Units](../guides/creating-units.md)
