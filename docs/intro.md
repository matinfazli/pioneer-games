---
sidebar_position: 1
---

# Overview

Let's discover the basics of the system.

## Installation

After installing the plugin, go to your DefaultGame.ini and paste these lines into it:

```
[/Script/CommonInput.CommonInputSettings]
bEnableDefaultInputConfig=False
InputData=/Pioneer/Pioneer/Core/Input/CUI_InputData.CUI_InputData_C
```

Then go to DefaultEngine.ini and paste these lines into it:

```
[/Script/Engine.Engine]
GameViewportClientClassName=/Script/CommonUI.CommonGameViewportClient

[/Script/Engine.CollisionProfile]
+Profiles=(Name="MassCapsule",CollisionEnabled=QueryOnly,bCanModify=True,ObjectTypeName="MassObject",CustomResponses=((Channel="WorldStatic",Response=ECR_Ignore),(Channel="WorldDynamic",Response=ECR_Ignore),(Channel="Pawn",Response=ECR_Ignore),(Channel="Visibility",Response=ECR_Ignore),(Channel="Camera",Response=ECR_Ignore),(Channel="PhysicsBody",Response=ECR_Ignore),(Channel="Vehicle",Response=ECR_Ignore),(Channel="Destructible",Response=ECR_Ignore),(Channel="MassTrace")),HelpMessage="Capsule of a mass actor")
+Profiles=(Name="StationaryMassCapsule",CollisionEnabled=QueryOnly,bCanModify=True,ObjectTypeName="MassObject",CustomResponses=((Channel="WorldStatic",Response=ECR_Ignore),(Channel="WorldDynamic",Response=ECR_Ignore),(Channel="Visibility",Response=ECR_Ignore),(Channel="Camera",Response=ECR_Ignore),(Channel="PhysicsBody",Response=ECR_Ignore),(Channel="Vehicle",Response=ECR_Ignore),(Channel="Destructible",Response=ECR_Ignore),(Channel="MassTrace")),HelpMessage="Capsule of a stationary mass actor")
+Profiles=(Name="MassMeshComponent",CollisionEnabled=NoCollision,bCanModify=True,ObjectTypeName="MassObject",CustomResponses=((Channel="WorldStatic",Response=ECR_Ignore),(Channel="WorldDynamic",Response=ECR_Ignore),(Channel="Pawn",Response=ECR_Ignore),(Channel="Visibility",Response=ECR_Ignore),(Channel="Camera",Response=ECR_Ignore),(Channel="PhysicsBody",Response=ECR_Ignore),(Channel="Vehicle",Response=ECR_Ignore),(Channel="Destructible",Response=ECR_Ignore)),HelpMessage="Mesh Component of Mass Actors")
+DefaultChannelResponses=(Channel=ECC_GameTraceChannel1,DefaultResponse=ECR_Ignore,bTraceType=False,bStaticObject=False,Name="MassObject")
+DefaultChannelResponses=(Channel=ECC_GameTraceChannel2,DefaultResponse=ECR_Ignore,bTraceType=True,bStaticObject=False,Name="MassTrace")

[/Script/NavigationSystem.NavigationSystemV1]
DataGatheringMode=Lazy

[/Script/NavigationSystem.RecastNavMesh]
RuntimeGeneration=Dynamic
```

## Main features of the system

These are the main features of the system:

- Select and move hundreds of units around a map
- Units avoid each other and the environment
- Different types of units with separate logic
- Create formations (e.g. grid or circle)
- Units have a task queue (e.g. “Move to location” and then “Gather resource”)

## Working with the system

The Mass Strategy System is mainly a C++ project utilizing the Mass framework. C++ knowledge and a basic understanding of the Mass framework is required to use the system in your own project.

Without C++ knowledge, you are only able to add and change the assets. For example, you can add your own units, buildings or resources. However, adding custom logic via Blueprints is tricky because the system uses the Mass framework and the majority of the logic there is written in C++.

## Limitations

Here are some of the main limitations of the system:

- Movement is only possible on a flat ground (no Z-axis movement)
- Up to 1000 units with stable fps

## Getting help

If you have any questions, feel free to ask in our discord server: https://discord.com/invite/uMKThEBvDJ
