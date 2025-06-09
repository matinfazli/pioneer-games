---
sidebar_position: 2
---

# Installation

After installing the plugin, check if the CommonUI plugin is installed. 
Usually it should be installed automatically. 
If not, add it to your project manually.

Then go to the Config folder on your project and open the DefaultGame.ini 
file and paste these lines into it:

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

## First steps with the plugin
After installation, go to the folder Pioneer → Core → Maps and open the level L_DemoMap. Click on Play in Editor and check if everything works as expected after following the installation steps from above. If you run into any issues, ask us for help on our Discord server.

The main game blueprints (Game Mode, Player Controller, Player Pawn) are located in the Movement System folder. Most of the blueprint logic is attached to the Player Controller as actor components (e.g. AC_SelectionSystem_Basic).

## Common issues
### When selecting a character and right-click to move the game crashes
Please check if you have enabled any Mass plugin from Epic Games. Try disabling the Mass plugins and check if the game works now. This system doesn't require any Mass plugins to be activated. If you need a specific Mass plugin for your game and this causes this crash, let us know on Discord. We'll help you fix it. 

## Getting help

If you have any questions, feel free to ask in our discord server: https://discord.com/invite/uMKThEBvDJ
