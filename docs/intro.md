---
title: Introduction
description: Overview of the Pioneer Mass Strategy System - a foundation for building top-down strategy games in Unreal Engine
sidebar_position: 0
---

# Introduction

The **Pioneer Mass Strategy System** is a comprehensive foundation for building top-down strategy games in Unreal Engine. Built upon the Mass Entity framework, Pioneer provides a high-performance, data-oriented architecture designed to handle thousands of units simultaneously while maintaining stable frame rates.

## What is Pioneer?

Pioneer is a plugin that transforms the complexity of creating a real-time strategy game into a manageable, modular system. Instead of building navigation, rendering, spawning, and selection systems from scratch, Pioneer provides these core systems out of the box, allowing you to focus on your game's unique mechanics and content.

The system leverages Unreal Engine's **Mass Entity** framework—a data-oriented design pattern optimized for processing large numbers of entities efficiently. This architectural choice enables Pioneer to handle massive unit counts (10,000+ units) with consistent performance, making it ideal for large-scale strategy games.

## Why Pioneer Exists

Creating a strategy game in Unreal Engine traditionally requires implementing complex systems for:

- **Mass unit navigation** with pathfinding and avoidance
- **Efficient rendering** of thousands of units
- **Entity spawning and management** at scale
- **Unit selection** and command systems
- **Performance optimization** for large entity counts

Pioneer abstracts these challenges into a cohesive, well-integrated system. Our vision is to make creating a strategy game as straightforward as building a third-person action game in Unreal Engine—providing the essential foundation while leaving room for your creative vision.

## Core Systems

Pioneer is organized into several key systems that work together:

### Navigation System

The navigation system handles pathfinding and movement for thousands of units simultaneously. It uses Unreal's navmesh for pathfinding and implements sophisticated avoidance algorithms to prevent units from colliding with each other and the environment.

- **Navmesh-based pathfinding** for efficient route calculation
- **Multi-level navigation** with Z-axis support for navigating across different floor levels
- **Dynamic avoidance** using hierarchical spatial grids
- **Steering behaviors** for natural unit movement
- **Confinement** to keep units within navigable areas
- **Sleep state optimization** to reduce processing for idle units

### Rendering System

The rendering system optimizes performance through instanced rendering and LOD (Level of Detail) management.

- **Instanced Static Mesh (ISM) rendering** for efficient batch rendering
- **Automatic LOD system** based on camera distance and viewport position
- **Vertex animation support** for efficient unit animations
- **Per-mesh component management** for optimal rendering performance

### Spawning System

The spawning system manages entity creation with time-sliced processing to maintain frame time under heavy load.

- **Template-based entity creation** for consistent unit configuration
- **Time-sliced spawning** to prevent frame rate spikes
- **Async preloading** of entity configurations
- **Batch processing** for efficient mass spawning

### Selection System

The selection system provides tools for selecting and managing units through UI interactions.

- **Multi-unit selection** via drag selection
- **Entity querying** for efficient selection operations
- **Selection state management** across frames

### Entity System

The entity system provides the foundation for defining unit types and behaviors through a trait-based architecture.

- **Trait-based composition** for flexible unit configuration
- **Template registry** for managing entity archetypes
- **Fragment system** for data storage and processing

## Main Features

These are the primary capabilities that Pioneer provides:

- **Select and move thousands of units** around a map with responsive controls
- **Automatic avoidance** - units avoid each other and environmental obstacles
- **Different unit types** with separate logic and behaviors
- **Top-down camera** with free camera mode and intelligent LOD logic
- **High performance** - stable frame rates with up to 10,000 units
- **Modular architecture** - systems can be extended and customized

## Requirements

:::warning C++ Knowledge Required

The Mass Entity framework requires C++ code, and therefore most of Pioneer's logic is implemented in C++ files. To fully utilize this system and create your own game, you need to be familiar with using C++ in Unreal Engine.

Without C++ knowledge, you are limited to basic customization:
- Adding and changing assets (units, buildings, resources)
- Configuring existing systems through Blueprints
- Adjusting parameters and settings

However, adding custom logic via Blueprints is difficult because most data is stored in Mass Fragments, which would need to be manually exposed to Blueprints. For advanced customization and new features, C++ development is necessary.

:::

### Engine Requirements

- **Unreal Engine 5.7.0** or later
- **Mass Entity plugin** (included with Unreal Engine)
- **CommonUI plugin** (required dependency)

### Platform Support

Currently supported platforms:
- **Windows 64-bit** (Win64)

## Limitations

Be aware of these current limitations when planning your project:

- **Scale limits** - While the system handles thousands of units well, performance depends on hardware and scene complexity
- **Experimental features** - Building, resource, and vertex animation systems are experimental and may change

## Getting Started

Ready to start building your strategy game? 

1. First, follow the [Installation Guide](./getting-started/installation.md) to set up Pioneer in your project
2. Then explore the [Systems Documentation](./systems/navigation-system.md) to understand how each system works

## Vision

Pioneer is designed as a **modular foundation** that will expand over time. This base system provides the essential building blocks for strategy games, and we plan to add features like:

- Advanced building systems
- Combat and damage systems
- Resource management
- Formation behaviors
- And more...

The system is built to grow with your needs while maintaining performance and flexibility.
