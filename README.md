# recom-simulation
(tldr) Redstone logic simulation for basic components, to reference for physical PCB-based Redstone component interaction. The simulation takes into consideration Redstone power (rPower) and Electricity (ePower) to promote accuracy of the physical product.

## Story
(If you want to read) So one day FroggLeo and I randomly wondered, "What if Minecraft Redstone but in real life..." So we did just that. Utilizing small 4x4 cm plastic cubes powered by custom PCBs and connected via Pogo Pins, FroggLeo handled the [Hardware](https://github.com/FroggLeo/pcb-redstone?tab=readme-ov-file) while I dealt with trying to find out how to code the thing in the first place. Recom-simulation or Redstone Component Simulation refers to my attempts to create a reference for the actual firmware on a web-application, which would then be transcribed into the micropython code that the RP2040 can read/execute. We ended up deprecating or putting on hold a bunch of blocks throughout the process and the blocks present in the options palette in the simulation are the ones we have already established to be in perfect working condition. We hope you can somehow use this for your own Minecraft projects...whatever they may be ^_^

## Features
* Near accurate Minecraft Redstone Simulation
* Electric presence simulation
* Stepper type updater
* Redstone Lamps light up (So coool XD)

## Known Bugs
* Apparently the blocks may flash a bit when placing them (especially if you are running the code on the github website)
* Redstone lamps don't transmit Redstone Signals/Power (would make the program incredibly slower to add another traceback function)

## Installation Instructions
You have **2** options:

1. **Play on the Github site**
    * Go to the Github page: https://hashikono.github.io/recom-simulation/recom_simulation.html
    * (See **Usage** below)

2. **Downloading the file**
    * Find the latest release [here](https://github.com/Hashikono/recom-simulation/releases)
    * Download the zip file and extract it
    * Open **recom_simulation.html** on the latest version of your browser

## Usage
* Click on the various blocks in the block palette to choose a block to use
    * Note that the block will stay in use unless you click outside of the placement grid
* Click on any of the bottom placement grid cells to place your desired block (stone blocks)
* To allow for the components to update, you must place a (battery) cobblestone block near or right next to the power-source block (Redstone Blocks are power-source blocks)
* <u>**IMPORTANT:**</u> The green totally unmissable "Update (spam)" button at the top acts like a stepper, if you want to update your grid fully you must **SPAM** the button!!!
* To clear the grid, simply press the "Clear" button
* To get rid of individual blocks, just click the "stone" block at the very end of the palette (stone = empty/air)

## Future Work
* Addition of more blocks (the ones we deprecated)
* Software implementation via micropython ([Hardware](https://github.com/FroggLeo/pcb-redstone?tab=readme-ov-file))
* GUI improvement to be more performative
* Local storage integration
* Continuous updates (considering that they don't crash the computer)
* Anything else my 4am brain can think of...

This project was made for [Hack Club](https://hackclub.com/) - [Midnight](https://midnight.hackclub.com/)

