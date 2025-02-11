---
sidebar_position: 3
---

# C++ Documentation
Here you'll find some general knowledge on how various of the features work. This is mainly to give you a way to understand the logic faster and is not intended to be a full documentation.

## How the movement works
Open `MEC_Unit_Worker` in the Editor. Here you will find the traits used for the worker unit. The system uses these default traits from Epic Games: Avoidance, Navigation Obstacle, Steering, Smooth Orientation, LODCollector, Mass Movable Visualization Trait, Movement. And then there is a custom trait called Pioneer Unit Trait. In the file `UnitTrapp.cpp`, you can see the different fragments and tags that get added for the units.

When running the game, selecting units and then clicking somewhere on the map, the enhanced input action `IA_MousePosClick` inside the blueprint `AC_MovementSystem_Advanced` gets called. The blueprint then calls `UAC_CPP_MovementSystem_Abstract::MoveUnits`, which accepts one or multiple Move Target Locations. In the function, the system creates a Task object, which contains a mass tag and the location target list. This object is being sent to the `UAddTasksToQueueProcessor`, which adds the task to the `FTaskQueueFragment` of the selected units. Afterwards the `UTaskQueueProcessor`, which runs every tick, sees the task and adds the related tag to the entity. 

The actual movement logic mostly happens in the `UMoveTaskProcessor`, which is only executed on units that have the `FMoveTaskTag`. The core logic here is that it uses `NavigationSystem->FindPathToLocationSynchronously` to get a list of vectors from the nav mesh which define the rough path of the unit. Then the `MoveTargetFragment` is updated to move the unit towards the different locations on this path. 
