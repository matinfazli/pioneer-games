---
sidebar_position: 2
---

# Using your own assets

Here you will find a video documentation on how to add your own assets: https://www.youtube.com/watch?v=uUeyAGTbrsM. 

You will find the Buildings, Resources and Units - which are used in the demo map - in the folder `Core > Mass`. Each entity here has a blueprint (e.g. `BP_MassBuilding_House`) and a data asset (e.g. `MEC_MassBuilding_House`). To make your own assets, you have to modify these 2 files. 

In the blueprint file, you have to modify the static mesh and the collision capsule.
In the data asset, you have to edit the Pioneer Trait - which currently has a Name field, a thumbnail and a radius. 
