---
title: Entity System
description: Understanding the trait-based entity architecture in Pioneer
sidebar_position: 6
---

# Entity System

The entity system provides the foundation for defining unit types and behaviors through a trait-based architecture. Built on Unreal Engine's Mass Entity framework, it uses a data-oriented design that enables efficient processing of thousands of entities.

## Overview

Pioneer uses an **Entity Component System (ECS)** architecture where entities are defined by their **traits**, which in turn specify which **fragments** and **tags** the entity needs. This composition-based approach allows you to mix and match capabilities to create different unit types without writing custom code for each variation.

**Key Concepts:**
- **Entities** - The units themselves (soldiers, workers, etc.)
- **Traits** - Reusable building blocks that define entity capabilities
- **Fragments** - Data containers that store entity state
- **Tags** - Boolean flags that mark entities for specific processing
- **Templates** - Pre-built entity configurations combining multiple traits

## Traits

Traits are the primary way to define what an entity can do. Each trait is a reusable component that adds specific functionality to an entity by contributing fragments, tags, and shared data.

### How Traits Work

When you add a trait to an entity configuration, the trait's `BuildTemplate` method is called. This method:
1. Adds required fragments (data storage)
2. Adds tags (processing markers)
3. Adds shared fragments (configuration data shared across entities)

### Common Traits

Pioneer provides several built-in traits:

**Movement Trait** (`UMovementTrait`)
- Enables pathfinding and movement
- Adds velocity, steering, and navigation fragments
- Configures movement speed, avoidance, and orientation

**Instanced Actor Trait** (`UInstancedActorTrait`)
- Makes the entity renderable using ISM
- Adds instance data fragment with mesh and animation info
- Configures rendering parameters

**Selectable Trait** (`USelectableTrait`)
- Makes the entity selectable via UI
- Adds selection-related fragments

**Avoidance Trait** (`UAvoidanceTrait`)
- Enables collision avoidance with other units
- Adds avoidance-related fragments and parameters

**LOD Trait** (`ULODTrait`)
- Enables dynamic LOD processing
- Adds LOD fragments for distance-based optimization

### Creating Custom Traits

To create a custom trait:
1. Inherit from `UEntityTraitBase`
2. Override `BuildTemplate()` to add fragments and tags
3. Add configurable properties that can be set in the editor
4. Use `BuildContext.AddFragment<>()` to add data fragments
5. Use `BuildContext.AddTag<>()` to add processing tags

:::tip

Traits can require other fragments using `BuildContext.RequireFragment<>()`. This ensures dependencies are met even if another trait adds them.

:::

## Fragments

Fragments are data structures that store entity state. Each entity has a collection of fragments that define what data it stores. Processors read and write fragments to update entity behavior.

### Fragment Types

**Regular Fragments** (`FMassFragment`)
- One instance per entity
- Stores entity-specific data
- Examples: `FEntityTransformFragment`, `FVelocityFragment`, `FInstanceDataFragment`

**Shared Fragments** (`FMassSharedFragment`)
- Shared across multiple entities
- Used for configuration data
- Examples: Subsystem references, shared parameters

**Const Shared Fragments** (`FMassConstSharedFragment`)
- Immutable shared data
- Used for read-only configuration
- Examples: Movement parameters, avoidance settings

### Common Fragments

**Transform Fragments**
- `FEntityTransformFragment` - Current position, rotation, scale
- `FEntityPrevTransformFragment` - Previous frame transform (for motion vectors)

**Movement Fragments**
- `FVelocityFragment` - Current velocity
- `FForceFragment` - Applied forces
- `FMoveTargetFragment` - Target location for movement
- `FSteeringFragment` - Steering behavior data
- `FSleepStateFragment` - Whether entity is sleeping (idle optimization)

**Rendering Fragments**
- `FInstanceDataFragment` - Mesh, animations, instance index
- `FProcessingLODFragment` - Current LOD level and distance alpha

**Navigation Fragments**
- `FNavigationPathFragment` - Pathfinding path data
- `FMoveCommandFragment` - Movement command information

## Tags

Tags are boolean markers that indicate an entity has a specific property or should be processed in a certain way. Unlike fragments, tags don't store data—they're just flags.

### How Tags Work

Tags are used by processors to filter which entities to process:
- A processor queries for entities with specific tags
- Only entities with those tags are included in processing
- Tags can be added/removed at runtime to change entity behavior

### Common Tags

- `FSteerToCommandGoalTag` - Entity should steer toward move command goal
- `FSleepingTag` - Entity is in sleep state (idle optimization)
- `FUnitSelectedTag` - Entity is currently selected
- `FMoveTaskTag` - Entity has a movement task
- `FCanGatherResourcesTag` - Entity can gather resources

## Entity Templates

Entity templates are pre-built configurations that combine multiple traits. They're created from `FEntityConfig` structures or `UEntityConfigAsset` data assets.

### Template Creation

When you define an entity configuration:
1. Traits are collected (including from parent configs)
2. Each trait's `BuildTemplate()` is called
3. Fragments and tags are merged into a template
4. The template is registered and can be used to spawn entities

### Template Inheritance

Entity configs support inheritance:
- Child configs can inherit from parent configs
- Child traits override parent traits of the same class
- This allows creating variations (e.g., "Fast Soldier" inherits from "Soldier")

### Using Templates

Templates are typically accessed through:
- `UEntityConfigAsset` - Data asset containing entity configuration
- `FEntityConfig` - Struct that can wrap an asset or define traits inline
- `GetOrCreateEntityTemplate()` - Gets or creates the template for a world

## Entity Lifecycle

### Spawning

1. **Template Selection** - Choose an entity template (from config asset)
2. **Template Building** - Template is built from traits (if not already cached)
3. **Entity Creation** - Mass Entity system creates entity with required fragments
4. **Initialization** - Fragments are initialized with default or configured values
5. **Registration** - Entity is registered with relevant subsystems (rendering, navigation, etc.)

### Runtime

- **Processing** - Processors update entities each frame based on their fragments and tags
- **State Changes** - Tags can be added/removed, fragments can be modified
- **Subsystem Updates** - Entities interact with subsystems (spawning, rendering, navigation)

### Destruction

- **Cleanup** - Fragments are cleaned up
- **Subsystem Removal** - Entity is removed from subsystem registries
- **Instance Hiding** - For rendered entities, instances are hidden (scaled to zero) rather than deleted immediately

## Configuration

### Entity Config Assets

The recommended way to define entity types is through `UEntityConfigAsset`:
1. Create a new `Entity Config Asset` in the content browser
2. Add traits to define capabilities
3. Configure trait properties (movement speed, mesh, animations, etc.)
4. Optionally set a parent asset for inheritance
5. Use the asset when spawning entities

### Inline Configuration

You can also create `FEntityConfig` structs inline in C++ code, adding traits programmatically. This is useful for:
- Runtime entity variations
- Debug configurations
- Procedural entity generation

## Best Practices

### Trait Composition

- **Keep traits focused** - Each trait should add one cohesive set of functionality
- **Use inheritance** - Create base configs and derive variations
- **Reuse traits** - Don't duplicate functionality, compose existing traits

### Fragment Design

- **Store only necessary data** - Keep fragments lean for performance
- **Use shared fragments** - For configuration that doesn't change per entity
- **Group related data** - Keep related properties in the same fragment

### Performance

- **Minimize fragment count** - More fragments mean more memory per entity
- **Use tags efficiently** - Tags are cheap, use them for filtering
- **Leverage sleep state** - Idle entities can use sleep optimization

## Troubleshooting

### Entity not spawning

- Verify entity config asset is valid
- Check that all required traits are present
- Ensure template builds successfully (check logs)

### Entity missing functionality

- Verify the appropriate trait is added to the config
- Check that trait properties are configured correctly
- Ensure required subsystems are initialized

### Performance issues

- Review fragment count per entity
- Check if unnecessary traits are added
- Verify LOD system is working for distant entities

### Template not found

- Ensure template is built before use
- Check that world context is correct
- Verify entity config asset is loaded
