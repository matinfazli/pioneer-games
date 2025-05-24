---
sidebar_position: 3
---

# Documentation

## Unit Movement
The unit movement works with pathfinding on a navigation mesh and an avoidance system. 
When selecting units and moving them to a location, these are the things that happen:
- For each unit, the navigation mesh calculates a path to the target location
- The path consists for multiple path points (3D Vectors)
- The unit will move to each of these points in order
- While moving the units constantly look for nearby obstacles (e.g. other units) and adjust their movement based on it

## Pathfinding
The system uses the FindPathToLocationSynchronously function of the navigation system. This requires a navigation mesh to be present in the level.

When a unit needs to move to a destination, it first asks for a path. 
The system looks for the best route taking into account obstacles and terrain. 
This path is broken down into a series of waypoints.
The unit follows these waypoints one at a time. 
As it gets close to each waypoint (within 100 units), it moves on to the next one. 
The unit adjusts its speed and direction to smoothly move between waypoints. 
When reaching the final waypoint, the unit slows down and eventually stops.

## Unit Avoidance
The system implements two types of avoidance systems:
1. Moving avoidance - for units that are in motion
2. Standing avoidance - for stationary units

Here's how it works:
- The system divides the game world into a grid of cells.
- When units need to avoid each other, the system looks at:
  - The nearby cells
  - The position of other units in these cells
  - How fast and in which direction units are moving (for moving avoidance)

For moving units, it:
- Calculates where other nearby units are headed
- Figures out if and when units might get too close to each other
- Adjusts their paths to prevent collisions

For standing units, it:
- Creates a sort of "personal space bubble" around stationary units
- Helps moving units navigate around these stationary obstacles

## Unit formations
The formation logic is inside the AC_MovementSystem_Advanced blueprint file. It works with the Environment Query System. You can find the EQS files in the EQS folder.

The system sends a query to the click location and the query returns a list of locations. 
These locations get passed to the “Move units” function, which creates “Move Tasks” and 
adds these tasks to the task queue of the units (more information on the task queue below).

## Unit selection
The start of the unit selection logic flow is inside the blueprint AC_SelectionSystem_Basic. 
On click we get the mouse position on the viewport and save the mouse start position and 
the mouse end position.

If it’s a single click, we do a line trace, get the name of the hit actor and pass this 
name to the “Select Entity” function, which handles the C++/Mass logic of the selection.

If it’s a drag and drop selection, we create a quad corner vector list. 
These are 4 vectors which build a rectangle on the map. 
With these 4 vectors, we can check which units are inside this selection box by comparing it 
with their actor location.

The second part of the logic flow is handled in C++ code, starting in the AC_CPP_SelectionSystem_Abstract.cpp file.

## Unit Spawning
The ActorSpawnerSubsystem is the core subsystem responsible for managing actor spawning. It handles:
- Queuing spawn requests
- Processing spawn requests within time constraints

Spawn Request Workflow:
- Each spawn request is handled through a FActorSpawnRequestHandle
- Requests go through several states tracked by EPioneerSpawnRequestStatus:
  - Pending -> initial state
  - Processing -> actively being spawned
  - Succeeded -> successfully spawned
  - Failed -> failed to spawn
  - RetryPending -> failed but will try again

## Task Queue
The task queue system works like a to-do list for units in your game. Here's how it works:

Think of it as a line of tasks where each unit has its own list. 
Tasks are handled one at a time, in order (first in, first out). 
Each task has a status that tells us what's happening with it.

Task States:
- "Ready" (waiting to start)
- "Running" (currently being done)
- "Finished" (completed)

How Tasks Work:
- When a task is "Ready", the unit gets a special label (tag) that tells it what kind of task to do
- While "Running", the unit keeps doing that task until it's done
- When "Finished", the label is removed, and the task is crossed off the list

Types of Tasks:
- Moving around
- Gathering resources

The system checks all units regularly to see if they need to start new tasks or if they've finished their current ones.

## Simple Camera System
Work in progress.
## How to add custom Skeletal Meshes
Work in progress.
## Building (experimental)
Work in progress.
## Vertex Animation (experimental)
Work in progress.
## Basic Resource System (experimental)
Work in progress.
