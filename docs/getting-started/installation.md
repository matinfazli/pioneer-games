---
title: Installation
description: Step-by-step guide to install and configure Pioneer Mass Strategy System
sidebar_position: 2
---

# Installation

After installing the plugin, confirm the required Unreal plugins are available in your project. Once the setup is in place, you can open the included maps and see the core systems running before wiring Pioneer into your own game.

CommonUI is normally enabled automatically by the plugin descriptor, but you can enable it manually if your project does not load it.

## Required Plugins

Pioneer uses:

- CommonUI
- Niagara
- Editor Scripting Utilities
- Unreal Mass Entity module

The included sample modules also use Enhanced Input, UMG, AI, and Navigation features from Unreal Engine.

## Configuration

Add the following configuration to your project if it is not already present.

### DefaultGame.ini

```ini
[/Script/CommonInput.CommonInputSettings]
bEnableDefaultInputConfig=False
InputData=/Pioneer/Pioneer/Core/Input/CUI_InputData.CUI_InputData_C
```

### DefaultEngine.ini

```ini
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

## First Launch

1. Restart the editor after installing or enabling the plugin.
2. Enable plugin content in the Content Browser.
3. Open `Pioneer/Core/Maps/L_DemoMap` to verify the core setup.
4. Open `RTSMassBattle/Maps/L_MassBattleDemo` to verify the combat update sample.
5. Open `TopDownZombieShooter/Maps/L_TDZS_DemoMap` to verify the Actor-Mass Bridge sample.

:::note
The sample maps require a valid navigation mesh. If units do not move or engage correctly, rebuild paths and confirm the navmesh covers the playable area.
:::

## Main Content Locations

- `Pioneer/Core` - core maps, input, Mass configs, materials, UI, and editor utilities
- `Pioneer/Units` - combat-ready Mass unit examples
- `RTSMassBattle` - RTS battle sample module content
- `TopDownZombieShooter` - top-down shooter sample module content

## Common Issues

### Plugin content does not appear

Enable plugin content in the Content Browser view options.

### CommonUI input does not work

Confirm the `DefaultGame.ini` CommonInput settings and `DefaultEngine.ini` viewport client setting are present.

### Units do not move

Confirm the navmesh is built, the target location is on navmesh, and the unit config includes Movement Trait.

### Selection or Mass traces do not work

Confirm the collision profiles and `MassObject` / `MassTrace` channels from `DefaultEngine.ini` were added.

### Combat does not start

Confirm units have Unit Attributes Trait, valid team IDs, and hostile targets. For ranged units, confirm Ranged Attack Trait and line-of-sight settings.

## Getting Help

If you have questions, ask in the Discord server: https://discord.com/invite/uMKThEBvDJ
