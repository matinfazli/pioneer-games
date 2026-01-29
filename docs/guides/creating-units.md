---
title: Creating Units
description: Step-by-step guide to create and configure unit types in Pioneer
sidebar_position: 1
---

# Creating Units

This guide walks you through creating your own unit types in Pioneer. Units are defined using **Entity Config Assets**, which combine **traits** to give units their capabilities.

## Overview

Creating a unit involves:
1. Creating an Entity Config Asset
2. Adding traits that define the unit's capabilities
3. Configuring trait properties (mesh, movement speed, etc.)
4. Testing and spawning the unit

Each trait adds specific functionality - you compose traits together to create different unit types.

## Step 1: Create an Entity Config Asset

1. In the Content Browser, right-click in your desired folder
2. Navigate to **Miscellaneous → Data Asset**
3. Select **Entity Config Asset**
4. Name it (e.g., `DA_Soldier`, `DA_Worker`)

The Entity Config Asset is where you'll define all the traits and properties for your unit type.

## Step 2: Add Essential Traits

Open your Entity Config Asset and add traits to the **Traits** array. Here are the essential traits for a basic unit:

### Instanced Actor Trait

This trait makes your unit renderable and is required for any visible unit.

**To add:**
1. Click the **+** button in the Traits array
2. Select **Instanced Actor Trait**

**Configure:**
- **Mesh** - Assign a Static Mesh asset for the unit's appearance
- **Radius** - Collision/avoidance radius (default: 40)
- **Rotation Correction** - Adjust mesh rotation if needed
- **Current Animation** - Name of the default animation to play
- **Animations** - Array of animation data (for vertex animations)
- **Entity Metadata** - Display name and thumbnail for UI

:::tip

For static meshes, you can use any Static Mesh asset. For animated units, you'll need to set up vertex animations.

:::

### Movement Trait

This trait enables pathfinding and movement.

**To add:**
1. Add **Movement Trait** to the Traits array

**Configure Movement Parameters:**
- **Max Speed** - Maximum movement speed
- **Acceleration** - How quickly the unit reaches max speed
- **Deceleration** - How quickly the unit stops
- **Turn Rate** - How quickly the unit can rotate

**Configure Confinement:**
- **Confinement Settings** - Keeps units within navigable areas

**Configure Standing Steering:**
- **Standing Behavior** - How stationary units behave

**Configure Orientation:**
- **Smooth Orientation** - How the unit rotates toward movement direction

:::note

Default movement parameters are usually fine to start with. Adjust them based on your game's feel and requirements.

:::

### Selectable Trait

This trait makes the unit selectable via the UI.

**To add:**
1. Add **Selectable Trait** to the Traits array

**Configure:**
- **Mesh** - Selection indicator mesh (optional, can use the same as Instanced Actor)

### Avoidance Trait

This trait enables collision avoidance with other units.

**To add:**
1. Add **Avoidance Trait** to the Traits array

**Configure:**
- **Moving Parameters** - Avoidance behavior while moving
- **Standing Parameters** - Avoidance behavior while stationary
- **Hard Separation** - Force-based separation from other units
- **Hard Separation Clamp** - Limits on separation forces

:::tip

Avoidance is essential for units to navigate around each other. Default parameters work well for most cases.

:::

### LOD Trait

This trait enables dynamic Level of Detail optimization.

**To add:**
1. Add **LOD Trait** to the Traits array

**Configure:**
- **LOD Settings** - Map of LOD levels to configuration
  - **Max** - Full quality (closest)
  - **Mid** - Medium quality
  - **Min** - Low quality
  - **Off** - Culled or minimal processing

:::note

LOD is optional but recommended for performance with many units. The system will automatically adjust based on camera distance.

:::

## Step 3: Configure Your Unit

### Basic Configuration

For a simple unit, you typically need:

1. **Instanced Actor Trait** - With a mesh assigned
2. **Movement Trait** - With movement speed configured
3. **Selectable Trait** - To make it selectable
4. **Avoidance Trait** - For collision avoidance

### Advanced Configuration

For more complex units, you might also add:

- **LOD Trait** - For performance optimization
- Custom traits - For game-specific functionality

### Example: Basic Soldier Unit

Here's a typical configuration for a basic soldier:

```
Entity Config Asset: DA_Soldier
├── Instanced Actor Trait
│   ├── Mesh: SM_Soldier
│   ├── Radius: 40
│   └── Current Animation: Idle
├── Movement Trait
│   ├── Max Speed: 500
│   ├── Acceleration: 2000
│   └── Turn Rate: 360
├── Selectable Trait
│   └── Mesh: SM_SelectionIndicator
└── Avoidance Trait
    └── (Default parameters)
```

## Step 4: Vertex Animation (Optional)

If you want animated units, you'll need to set up vertex animations:

### Setting Up Animations

1. In the **Instanced Actor Trait**, expand the **Animations** array
2. Click **+** to add an animation entry
3. Configure each animation:
   - **Name** - Animation identifier (e.g., "Idle", "Walk", "Run")
   - **Start Frame** - First frame of animation in the vertex animation texture
   - **End Frame** - Last frame of animation
   - **Play Rate** - Animation speed multiplier
   - **Time Offset** - Starting offset for synchronization

4. Set **Current Animation** to the default animation name

:::warning Experimental Feature

Vertex animation is currently experimental. You'll need to create vertex animation textures from skeletal animations using the Vertex Animation tools in the editor.

:::

## Step 5: Test Your Unit

### Using the Demo Map

1. Open `L_DemoMap` from `Pioneer → Core → Maps`
2. In your Player Controller or Movement System component, add your Entity Config Asset to the spawnable entity types
3. Use the spawn system to create units with your config
4. Test selection and movement

### Spawning Units

You can spawn units programmatically using the Movement System component:

```cpp
// Get the Movement System component
UAC_CPP_MovementSystem_Abstract* MovementSystem = 
    GetComponentByClass<UAC_CPP_MovementSystem_Abstract>();

// Spawn units
FSpawnedEntityType EntityType;
EntityType.EntityConfig = YourEntityConfigAsset;
TArray<FTransform> SpawnTransforms;
// ... populate spawn transforms ...

MovementSystem->SpawnUnits(EntityType, 10, SpawnTransforms);
```

## Step 6: Create Unit Variations

You can create variations of units using inheritance:

### Using Parent Configs

1. Create a base Entity Config Asset (e.g., `DA_BaseSoldier`)
2. Create a new Entity Config Asset for the variation (e.g., `DA_FastSoldier`)
3. In the new asset, set the **Parent** field to the base asset
4. Add or override traits as needed

**Example:**
- `DA_BaseSoldier` - Has Movement Trait with speed 500
- `DA_FastSoldier` - Inherits from `DA_BaseSoldier`, overrides Movement Trait with speed 750

:::tip

Inheritance is powerful for creating unit families. Common traits go in the parent, variations go in children.

:::

## Best Practices

### Trait Composition

- **Start simple** - Add only essential traits first, then add more as needed
- **Reuse base configs** - Create common base configs and inherit from them
- **Keep traits focused** - Each trait should add one cohesive set of functionality

### Performance

- **Use LOD** - Always add LOD Trait for units that will appear in large numbers
- **Optimize meshes** - Use efficient meshes with appropriate polygon counts
- **Limit animations** - Only add animations you actually need

### Organization

- **Naming convention** - Use clear names like `DA_Soldier`, `DA_Worker`
- **Folder structure** - Organize configs by unit type or faction
- **Documentation** - Add comments or metadata to explain special configurations

## Common Issues

### Unit not appearing

- **Check mesh assignment** - Ensure Instanced Actor Trait has a mesh assigned
- **Verify spawning** - Check that spawn system is properly configured
- **Check navigation mesh** - Units need a navmesh to appear correctly

### Unit not moving

- **Verify Movement Trait** - Ensure Movement Trait is added
- **Check movement parameters** - Verify speed and acceleration are set
- **Navigation mesh** - Ensure navmesh exists and is built

### Unit not selectable

- **Add Selectable Trait** - Ensure Selectable Trait is in the config
- **Check selection system** - Verify selection system component is set up

### Performance issues

- **Add LOD Trait** - LOD helps with many units
- **Optimize mesh** - Use lower-poly meshes for distant units
- **Reduce animation complexity** - Simpler animations perform better

## Next Steps

Now that you can create units:

- Learn about the [Entity System](../systems/entity-system.md) to understand traits and fragments
- Explore [Movement Commands](./movement-commands.md) to control units
- Review the [Rendering System](../systems/rendering-system.md) for visual customization

## Summary

Creating units in Pioneer is a composition-based process:

1. **Create** an Entity Config Asset
2. **Add traits** for capabilities (rendering, movement, selection, etc.)
3. **Configure** trait properties (mesh, speed, etc.)
4. **Test** by spawning and using the unit
5. **Iterate** and create variations using inheritance

The trait system makes it easy to mix and match capabilities to create diverse unit types without writing custom code for each one.
