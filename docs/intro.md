---
sidebar_position: 1
---

# Introduction

The Pioneer Mass Strategy System is a base foundation to build a top-down strategy game in Unreal Engine. 
The system is built upon the Mass Entity framework. 
Mass is a data-oriented framework designed for high-performance calculations on large amounts of entities.

The main focus of the system is spawning, selecting and moving hundreds of units. 
The building, resource and vertex animation systems are experimental.

Our overall vision is to make creating a strategy game as easy as a 3rd person game in Unreal Engine. 
This base system is only the basic foundation and we will expand the system in a modular way, adding features 
like building, combat, and so on.

## Be aware before you buy
The Mass framework requires C++ code, and therefore most of the logic of the system is inside C++ files. To make your own game using this system you have to be familiar with using C++ code in Unreal Engine.

Without C++ knowledge, you are only able to do very basic things like adding and changing the assets. For example, you can add your own units, buildings or resources. However, adding custom logic via Blueprints is difficult because most of the data is inside Fragments and would need to be manually exposed to Blueprints.

## Main features of the system

These are the main features of the system:

- Select and move hundreds of units around a map
- Units avoid each other and the environment
- Different types of units with separate logic
- Create formations (e.g. grid or circle)
- Units have a task queue (e.g. “Move to location” and then “Gather resource”)

## Limitations

Here are some of the main limitations of the system:

- Movement is only possible on a flat ground (no Z-axis movement)
- Up to 1000 units with stable fps
