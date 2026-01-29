---
title: Quick Start
description: Get up and running with Pioneer in minutes
sidebar_position: 3
---

# Quick Start

This guide will get you up and running with Pioneer in just a few minutes. After completing the [installation](./installation.md), follow these steps to see the system in action.

## Step 1: Test the Demo Map

The fastest way to see Pioneer in action is to use the provided demo map:

1. Navigate to `Pioneer → Core → Maps` in the Content Browser
2. Open the level `L_DemoMap`
3. Click **Play in Editor** (PIE)
4. You should see units already spawned in the level

:::tip

If you haven't completed the installation steps yet, make sure to configure `DefaultGame.ini` and `DefaultEngine.ini` as described in the [Installation Guide](./installation.md).

:::

## Step 2: Basic Controls

Once in the demo map, try these basic controls:

### Selecting Units

- **Left-click** on a unit to select it
- **Drag left-click** to create a selection box and select multiple units
- Selected units will be highlighted

### Moving Units

- **Right-click** on the ground to move selected units to that location
- Units will automatically pathfind around obstacles
- Units will avoid each other while moving

### Camera Controls

- **WASD** or **Arrow Keys** - Move the camera
- **Mouse Wheel** - Zoom in/out
- **Middle Mouse Button + Drag** - Rotate camera (if enabled)

## Step 3: Understanding the Setup

The demo map uses the following setup:

### Game Mode and Player Controller

The main game blueprints are located in `Pioneer → Core → Game`:
- **Game Mode** - Sets up the game rules
- **Player Controller** - Handles input and contains system components
- **Player Pawn** - The camera/player representation

### System Components

Most functionality is attached to the Player Controller as actor components:
- `AC_SelectionSystem_Basic` - Handles unit selection
- `AC_CPP_MovementSystem_Abstract` - Handles spawning and movement commands
- Other system components for rendering, navigation, etc.

## Step 4: Spawning Your Own Units

To spawn units programmatically, you can use the Movement System component:

1. Get the `AC_CPP_MovementSystem_Abstract` component from your Player Controller
2. Call `SpawnUnits()` with:
   - **Entity Type** - An entity config asset defining the unit
   - **Number of Units** - How many to spawn
   - **Spawn Transforms** - Array of locations/orientations

The system will automatically:
- Create entities with the correct traits and fragments
- Register them with rendering, navigation, and other systems
- Handle time-sliced spawning to maintain performance

:::note

For detailed information on creating entity configs and defining unit types, see the [Creating Units Guide](../guides/creating-units.md).

:::

## Step 5: Next Steps

Now that you've seen Pioneer in action, here's what to explore next:

### Learn the Systems

- **[Navigation System](../systems/navigation-system.md)** - Understand pathfinding and avoidance
- **[Rendering System](../systems/rendering-system.md)** - Learn about ISM rendering and LOD
- **[Entity System](../systems/entity-system.md)** - Master traits, fragments, and entity templates
- **[Selection System](../systems/selection-system.md)** - Understand how selection works
- **[Spawning System](../systems/spawning-system.md)** - Learn about entity spawning

### Create Your Own Units

- **[Creating Units Guide](../guides/creating-units.md)** - Step-by-step guide to creating unit types
- Learn about entity config assets and traits
- Configure meshes, animations, and behaviors

### Customize Your Game

- Set up your own game mode and player controller
- Configure camera settings
- Adjust movement and avoidance parameters
- Create custom entity types with different capabilities

## Common First-Time Issues

### Units not appearing

- Check that a navigation mesh exists and is built in your level
- Verify entity config assets are properly configured
- Ensure the Instancing Subsystem is initialized

### Selection not working

- Verify `AC_SelectionSystem_Basic` is attached to your Player Controller
- Check input bindings are configured correctly
- Ensure units have the Selectable trait

### Movement not working

- Make sure units have the Movement trait
- Verify navigation mesh is built
- Check that movement system component is properly set up

### Performance issues

- The system handles thousands of units, but performance depends on hardware
- Use the built-in FPS counter to monitor performance
- Adjust LOD settings if needed for your target hardware

## Getting Help

If you run into issues:

1. Check the [Installation Guide](./installation.md) for common issues
2. Review the system documentation for your specific problem
3. Ask for help on our [Discord server](https://discord.com/invite/uMKThEBvDJ)

## Tutorial Video

Here's a tutorial video covering the first steps and how to add your own custom meshes:

[![Tutorial - First Steps and Adding Your Own Meshes](https://img.youtube.com/vi/0gdzq-maipk/maxresdefault.jpg)](https://www.youtube.com/watch?v=0gdzq-maipk)

---

**Ready to dive deeper?** Check out the [Systems Documentation](../systems/navigation-system.md) to understand how everything works under the hood!
