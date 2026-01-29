---
title: Spawning System
description: How entity spawning works in Pioneer
sidebar_position: 5
---

# Spawning System

The spawning system manages entity creation with time-sliced processing to maintain frame time under heavy load. It handles queuing spawn requests and processing them efficiently to prevent frame rate spikes.

## Overview

The `ActorSpawnerSubsystem` is the core subsystem responsible for managing actor spawning. It provides a robust system for spawning large numbers of entities without causing performance issues.

## Spawn Request Workflow

Each spawn request is handled through a `FActorSpawnRequestHandle` and goes through several states tracked by `EPioneerSpawnRequestStatus`:

### Spawn States

- **Pending** → Initial state when a spawn request is queued
- **Processing** → Actively being spawned
- **Succeeded** → Successfully spawned
- **Failed** → Failed to spawn
- **RetryPending** → Failed but will try again

## Key Features

- **Queuing spawn requests** - Spawn requests are queued and processed over time
- **Processing spawn requests within time constraints** - Prevents frame rate spikes by spreading spawn operations across multiple frames
- **Time-sliced spawning** - Large spawn operations are broken into smaller chunks
- **Async preloading** - Entity configurations can be preloaded asynchronously
- **Batch processing** - Multiple entities can be spawned efficiently in batches

## Performance Considerations

The spawning system is designed to handle mass spawning scenarios:

- Spawn operations are time-sliced to maintain consistent frame rates
- Large spawn requests are automatically broken into smaller batches
- The system prevents frame time spikes even when spawning hundreds or thousands of units

:::tip Performance Tip

When spawning large numbers of units, the system automatically spreads the work across multiple frames. This means spawning 1000 units won't cause a single-frame freeze, but will instead happen smoothly over several frames.

:::

## Usage

The spawning system is typically accessed through the `ActorSpawnerSubsystem`. Spawn requests are queued and processed automatically by the subsystem.

## Troubleshooting

### Units not spawning

- Check that spawn requests are being queued correctly
- Verify that the `ActorSpawnerSubsystem` is properly initialized
- Check spawn request status to see if requests are failing

### Performance issues when spawning

- The system should handle large spawn operations automatically
- If you experience frame rate drops, check that time-slicing is enabled
- Consider reducing the number of units spawned per frame if needed
