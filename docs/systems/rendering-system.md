---
title: Rendering System
description: Understanding instanced rendering, LOD, and vertex animation in Pioneer
sidebar_position: 3
---

# Rendering System

The rendering system optimizes performance through instanced rendering and LOD (Level of Detail) management. It enables rendering thousands of units efficiently while maintaining visual quality through dynamic LOD adjustments and support for vertex animations.

## Overview

The rendering system uses **Instanced Static Mesh (ISM)** components to batch render thousands of units in a single draw call. Instead of creating individual actors for each unit, the system groups units by their mesh type and renders them as instances, dramatically reducing CPU and GPU overhead.

The system automatically manages:
- **Instance creation and lifecycle** - Units are added/removed from ISM components as needed
- **Transform updates** - Position, rotation, and scale updates are batched and applied efficiently
- **LOD management** - Units automatically use appropriate detail levels based on camera distance
- **Vertex animations** - Animated meshes are supported through vertex animation textures

## Instanced Static Mesh (ISM) Rendering

### How ISM Works

The rendering system uses Unreal Engine's `InstancedStaticMeshComponent` to render multiple copies of the same mesh efficiently. The `InstancingSubsystem` manages one ISM component per unique mesh type.

**Key Benefits:**
- **Single draw call** per mesh type, regardless of unit count
- **Reduced CPU overhead** - No per-unit actor overhead
- **Efficient GPU batching** - All instances rendered together
- **Scalable** - Can handle 10,000+ units with stable performance

### Instance Management

Each unit is assigned an instance index when spawned. The system tracks:
- **Instance transforms** - Position, rotation, and scale for each unit
- **Animation data** - Vertex animation parameters stored in custom data
- **Previous transforms** - Used for motion vectors and smooth transitions

When units are removed, their instances are hidden by scaling to zero rather than being deleted immediately, which is more efficient for frequent spawn/despawn operations.

:::tip Performance Tip

The system uses GPU-based LOD selection (`bUseGpuLodSelection = true`), which offloads LOD calculations to the GPU for better CPU performance.

:::

## Dynamic LOD System

The LOD (Level of Detail) system automatically adjusts the processing and rendering quality of units based on their distance from the camera. This ensures that distant units use fewer resources while maintaining visual quality for nearby units.

### LOD Levels

The system uses four processing LOD levels:

- **Max** - Full processing and rendering quality (closest units)
- **Mid** - Reduced processing, full rendering quality
- **Min** - Minimal processing, reduced rendering quality
- **Off** - No processing (units are culled or use minimal resources)

### How LOD is Determined

LOD levels are calculated based on:
- **Camera distance** - Units farther from the camera use lower LOD
- **Viewport position** - Units near screen edges may use lower LOD
- **Performance targets** - System may adjust LOD to maintain frame rate

The `FProcessingLODFragment` stores the current LOD level for each unit and provides helper functions to scale processing values based on distance.

### LOD Impact on Systems

Different systems respect LOD levels differently:

- **Navigation** - Lower LOD units may skip some avoidance calculations
- **Rendering** - Lower LOD units may use simpler shaders or fewer animation frames
- **Processing** - Lower LOD units are processed less frequently or with reduced accuracy

:::note

The LOD system is designed to be transparent to gameplay - units at lower LOD levels still function correctly, just with reduced visual fidelity and processing overhead.

:::

## Vertex Animation

Pioneer supports vertex animation for units, allowing you to use animated meshes without traditional skeletal animation. This is more efficient for large numbers of units since vertex animations are GPU-based.

### How Vertex Animation Works

Vertex animations are stored as **Vertex Animation Textures (VAT)** - textures that encode vertex positions for each frame of animation. The shader reads these textures to animate the mesh vertices directly on the GPU.

**Animation Data Structure:**
- **Start Frame / End Frame** - Defines the animation range
- **Play Rate** - Controls animation speed
- **Time Offset** - Allows synchronization between units

### Animation Blending

The system supports smooth animation transitions through crossfading:
- **Transition Duration** - Configurable blend time between animations
- **Automatic Play Rate Jitter** - Small random variations prevent units from animating in perfect sync

### Creating Vertex Animations

Vertex animations are created from skeletal animations using the Vertex Animation tools in the editor. The system converts animation sequences into texture data that can be used by the rendering system.

:::warning Experimental Feature

Vertex animation is currently an experimental feature and may change in future updates. The API and workflow may be adjusted based on feedback.

:::

## Performance Considerations

### Batch Updates

The rendering system batches all updates to minimize render thread overhead:
- **Transform updates** are queued and flushed once per frame
- **Animation updates** are batched together
- **Single render state update** per ISM component per frame

### Thread Safety

The system is designed for multi-threaded access:
- **Update queuing** is thread-safe - worker threads can queue updates
- **Flushing** happens on the game thread after all processing is complete
- **Critical sections** protect pending update arrays

### Memory Management

- ISM components are created on-demand per mesh type
- Hidden instances (scaled to zero) are reused rather than deleted
- Components are automatically cleaned up when no longer needed

## Configuration

### ISM Component Settings

The `CustomISMComponent` is configured with optimized defaults:
- **GPU LOD selection** enabled
- **Conservative bounds** for better culling
- **Motion vectors** enabled (previous transforms stored)
- **Collision disabled** (handled separately by navigation system)
- **Custom data floats** for animation parameters

### LOD Configuration

LOD thresholds and distances can be configured through the `LODSubsystem`. Adjust these values based on your game's camera setup and performance targets.

## Troubleshooting

### Units not rendering

- Verify that units have a valid `UStaticMesh` assigned in their instance data
- Check that the `InstancingSubsystem` is properly initialized
- Ensure units have valid instance indices

### Performance issues with many units

- Check LOD system is working correctly - distant units should use lower LOD
- Verify that units are being batched correctly (one ISM per mesh type)
- Monitor instance count per ISM component - very high counts may need splitting

### Animation not playing

- Verify vertex animation data asset is properly configured
- Check that animation frames are within valid range
- Ensure custom data is being written correctly to ISM instances

### Units appearing/disappearing

- This may be LOD culling - units at very low LOD may be culled
- Check camera distance and LOD thresholds
- Verify instance visibility flags are set correctly
