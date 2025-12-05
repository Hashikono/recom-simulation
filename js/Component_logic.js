//Individual ports
class ComponentPort {
    constructor(e, r, type, io){
        //Electric power
        ePow = e;
        //Redstone power
        rPow = r;
        //block type;
        typ = type;
        //i/o list
        iox = io;
    }

    getEPower() {
        return ePow; //boolean
    }
    
    getRPower() {
        return rPow; //integer
    }

    getType(){
        return typ; //string
    }

    getState() {
        return iox[0]; //string
    }

    getPrior() {
        //priority = redirection
        return iox[1]; //boolean
    }
}

//Block main structure (applies exclusively to dust)
class Block {
        constructor(blockTyp, portList){
        this.blockType = blockTyp;
        this.ports = portList;
        /* [north, east, south, west] (objects)

        //AS OF NOW, I/O COUNT IS DEPRECATED
        /*
        this.inputCount = 0;
        this.outputCount = 0;

        //establish io count
        for (let i = 0; i < this.ports.length; i++){
            if (this.ports[i] == "input"){
                this.inputCount++;
            } else if (this.ports[i] == "output"){
                this.outputCount++;
            }
        }
        console.log(`Inputs: ${this.inputCount} | Outputs: ${this.outputCount}`);
        */
    }

    //gets the block's type
    getType(){
        return this.blockType;
    }

    //get methods for port objects
    getNorthPort(){
        return ports[0];
    }

    getEastPort(){
        return ports[1];
    }

    getSouthPort(){
        return ports[2];
    }

    getWestPort(){
        return ports[3];
    }

    //tests if the block has power
    //(Only applies to simulation)
    powerTest() {
        if (north.ePower() || east.ePower() || south.ePower() || west.ePower()){
            return true;
        }
        else{
            console.log("No power detected");
        }
    }

    //returns highest possible redstone power ouput value (minus one for spacing)
    travellingPowerOutput(){
        let max = 1;
        for (let i = 0; i < this.ports.length; i++){
            if (this.ports[i].getType() == "input" && this.ports[i].rPower() > max){
                max = ports[i].rPower();
            }
        }
        return max-1;
    }
    
    //returns highest possible redstone power ouput value (no travelling)
    fixedPowerOutput(){
        let max = 1;
        for (let i = 0; i < this.ports.length; i++){
            if (this.ports[i].getType() == "input" && this.ports[i].rPower() > max){
                max = ports[i].rPower();
            }
        }
        return max;
    }

    //returns bool value if block has a priority port (mainly for redstone_dust)
    priorityExistence(){
        let existence = false;
        for (let i = 0; i < this.ports.length; i++){
            if (this.ports[i].getPrior() == true){
                existence = true;
            }
        }
        return existence;
    }

}

//Block Ref: getType(str) | get(dir)Port(obj) | powerTest(bool) | travelling/fixedPowerOutput(int) | priorityExistence(bool)
//Port Ref: getEPower(bool) | getRPower(int) | getType(str) | getState(str) | getPrior(bool)

//SECTION Update/Analysis

//generic empty block generator (borders will be air)
function genEmptyBlock(){
    return new Block("air","",[new ComponentPort(false, 0, "air", ["output", false]), new ComponentPort(false, 0, "air", ["output", false]), new ComponentPort(false, 0, "air", ["output", false]), new ComponentPort(false, 0, "air", ["output", false])]);
}

//block objects (begins with inititialization) | stores image sources from updates
//Array.from({length:6}, () => Array.from({length:6}, genEmptyBlock()));
var blocksList = Array.from({length:6}, () => Array.from({length:6}, genEmptyBlock()));
var imgList = Array.from({length:6}, () => Array.from({length:6}, 0));


//Updates the blocks list (and image list)
function update(){
    //version one of blocks
    let blocksV1 = blocksList;
    //version two of blocks (actively constructing)
    let blocksV2 = [];
    for(let r = 0; r < blocksV1.length; r++){
        for (let c = 0; c < blocksV1[0].length; c++){
            if (blocksV1[r][c].getType() =="redstone_block"){
                redstone_block(r,c);
            }
            else if (blocksV1[r][c].getType() =="redstone_dust"){
                redstone_dust(r,c);
            } 
            else if (blocksV1[r][c].getType() =="redstone_repeator"){
                redstone_repeator(r,c);
            } 
            else if (blocksV1[r][c].getType() =="redstone_comparator"){
                redstone_comparator(r,c);
            } 
            else if (blocksV1[r][c].getType() =="redstone_lamp"){
                redstone_lamp(r,c);
            } 
            else if (blocksV1[r][c].getType() =="oak_button"){
                oak_button(r,c);
            } 
            else if (blocksV1[r][c].getType() =="note_block"){
                note_block(r,c);
            } 
            else if (blocksV1[r][c].getType() =="lever"){
                lever(r,c);
            } 
            else if (blocksV1[r][c].getType() =="observer"){
                observer(r,c);
            } 
            else if (blocksV1[r][c].getType() =="cobblestone"){
                cobblestone(r,c);
            }
        }
    }

    blocksList = blocksV2;
}   


//Implements the blocks list into the grid (HTML creation)
function implement(){
    //empties current div
    const grid = document.getElementById("placementGrid");
    const refDiv = document.createElement("div");
    refDiv.className = "grid-container";
    refDiv.id = "placementGrid";
    grid.replaceWith(refDiv);
    //adds stuff to the div
    for (let r = 0; r < 6; r++){
        for (let c = 0; c < 6; c++){
            //cell division
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.id = `cell-${r}-${c}`;
                //image
                const image = document.createElement("img");
                image.src = imgList[r][c];
                image.alt = imgList[r][c];
                cell.appendChild(image);
            grid.appendChild(cell);
        }
    }
}


//!SECTION

/*//SECTION Specific block update types
> Checks surrounding of the block in V1
    > Determine status in input/output type ports
> update all port attributes of the block
> update image if necessary (on/off)

*/

function redstone_block_update(x,y){
    //
}

function redstone_dust_update(x,y){
    //
}

function redstone_repeator_update(x,y){
    //
}

function redstone_comparator_update(x,y){
    //
}

function redstone_lamp_update(x,y){
    //
}

function oak_button_update(x,y){
    //
}

function note_block_update(x,y){
    //
}

function lever_update(x,y){
    //
}

function observer_update(x,y){
    //
}

function cobblestone_update(x,y){
    //
}

//!SECTION

/*
//REVIEW You may need to add another data type to the block class to handle variations of blocks,
         variations and all

         You may need to think about also making the name on every block something standard (like 
         blocks without variations shoud still have those just in case at 1)

//REVIEW maybe update naming conventions on attributes, bcs right now, .type() can mean
         a lot of different things lol

//REVIEW Rename all images to the new format
//IMAGE STRUCTURE: (block name)_(direction)_(state [starts at 1])_(power on/off).png

//REVIEW create update functions for each block
*/






//SECTION Structure code


        // Set up event listeners
function setupEventListeners() {
    // Block selection
    document.querySelectorAll('.block').forEach(block => {
        block.addEventListener('click', function() {
            // Remove selection from all blocks
            document.querySelectorAll('.block').forEach(b => b.classList.remove('selected'));
            
            // Select this block
            this.classList.add('selected');
            selectedBlock = this.dataset.blockId;
            
            console.log(`Selected block: ${getBlockName(selectedBlock)}`);
        });
    });

    // Grid cell placement
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.addEventListener('click', function() {
            if (!selectedBlock) {
                alert('Please select a block first!');
                return;
            }
            
            const row = parseInt(this.dataset.row);
            const col = parseInt(this.dataset.col);
            
            placeBlock(row, col, selectedBlock);
        });
    });

    // Control buttons
    document.getElementById('showArrayBtn').addEventListener('click', show2DArray);
    document.getElementById('clearBtn').addEventListener('click', clearGrid);
}


// Clear the entire grid
function clearGrid() {
    // Reset the 2D array
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            gridArray[row][col] = null;
        }
    }
    
    // Reset the visual grid
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.style.backgroundColor = '';
        cell.style.opacity = '';
        cell.title = '';
    });
    
    document.getElementById('arrayDisplay').innerHTML = '';
    console.log('Grid cleared!');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', /*Initialize*/);

//!SECTION


/*DEPRECATED: stores all blocks as strings (with their attributes) - Don't need to anymore cause direct object conversion is possible
var str = [];
function stringConversion(){
    for (let r = 0; r < 6; r++){
        for (let c = 0; c < 6; c++){
            //get the elements in teh grid by their data set and create 
        }
    }
}
//clears the str list and updates grid
function clearGrid(){
    str = [["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"]];
}
//updates the str of blocks (concerns versions)
function updateStr(x,y,block){
    str[x][y] = block;
}
*/
/* DEPRECATED: priority check and calculations within the block object
function test() {
    //list of output/port indexes
    let outputList = [];
    //check for priority existence
    let priorityExist = false;
    //logs the ports with priority for analysis only
    let priorityList = [];
    //analyzing priority effect on output implementation (merely for console-logging)
    let outputAllowance = ["north","east","south","west"];

    for (let i = 0; i < this.ports.length; i++){
        //checks if priority exists
        if (this.ports[i].getPrior()){
            priorityExist = true;
            priorityList.push(i);
        }
    }
    
    if (priorityExist){ //priority exists
        if (priorityList.length == 1){ //only one priority

        } else { //more than 1 priority
        
        }
    } else { //priority doesn't exist
        
    }
    //allowed ports
    console.log(`Allowed ports: ${outputAllowance}`);
    return outputList;
}
*/


/*
//SECTION API
-----------------------------------------------------------------------------------------
//NOTE Notes:

General:
- Power = redstone signals
- Electricity = actual power (simulation only)
- you have to check all sides of the redstone dust
    - redstone dust is composed of 4 ports, the dust itself is the processor that 
      determines what to output...

Translation:
- translated into a list of objects
    - Each block is an object that holds the connections
- The HTMl page will actually store all attrbutes of a given block (only way to actively store it in the html page)
    - this is because of the annoying reality that the user updates the grid THEMSELVES

Special case:
- Redstone blocks have an rpower of 16
    - block next to it will be inputted a 16 then output 15 (x-1)

Directions:
- numbers will be in value order (24,34,13,etc.) [ONLY DUST]
    - repeators etc. will start with the side of the input and then output (ex. 42)
- in images, they represents both inputs and outputs available 
    - the code will determine what is an input/output
- IMAGE STRUCTURE: (block name)_(direction)_(state [starts at 1])_(power on/off).png
    - every block will process this semi-uniquely


        1
    4   +   2
        3
---------------------
        N
    W   +   E
        S
        
        
Procedure loop:
> extract 2D list from grid
> translate all blocks to a list of objects
> analyze list of objects
    > All blocks check surrounding in version 1
    > If the block powering the current block was ON in version 1
    
> implement updates to blocks

- Note, this will make the redstone travel -1 for every update
- A block being powered cannot power the block being powered
-----------------------------------------------------------------------------------------
//NOTE Hierarchy & Typing

Variables/Parameters (ports):
*ePower - boolean
    - true - power is detected/passed
    - false - power is absent/retains

*rPower - integer 
    - (0-16)
    - 16 - reserved for power blocks
    - 0 - no (more) power

*type - string
    - "redstone_block"
    - "redstone_dust"
    - "redstone_repeator"
    - "redstone_comparator"
    - "redstone_lamp"
    - "oak_button"
    - "note_block"
    - "lever"
    - "observer"
    - "cobblestone"
    - "air"

*io - list[type, priority]
    - State - string
        - "input" - input port
        - "output" - output port

    - Priority(output ports) - boolean
        - true - priority connection 
        - false - no priority or empty port

-----------------------------------------------------------------------------------------
//NOTE Data storage (examples)

- io examples:
    - Input 0 : powered cobblestone
    - Input 1 : redstone block, repeator (from output side), redstone dust, etc.
        - the redstone (dust) will recieve the power either way, priority only affects the direction of output
    - Output 0 : redstone lamps, chest(cannot emit redstone but exists), cobblestone
    - Output 1 : pistons, repeators (to input side), etc.
    - Empty 0 : Not connected to anything (air block)
    - Empty 1 : Doesn't exist
    

//!SECTION
-----------------------------------------------------------------------------------------
//SECTION Array structure (2d & 5d):

//NOTE [1D] blocks
[
    row (list)
]

//NOTE [2D] blocks
[
    [
        block (string)
    ]
]

---------------------------------------------(SPLIT)
//NOTE translation to objects rows
[
    row (list)
]

//NOTE translation to objects
[
    [
        block (object)
    ]
]

//NOTE translation individual ports/directions
[ 
    [
        [
            port_1 (object),
            port_2 (object),
            port_3 (object),
            port_4 (object)
        ]
    ]
]

//NOTE data of individual ports
[ 
    [
        [ (BLOCKS - can individually access all info below)
            [
                e (integer),
                r (integer),
                typ (string),
                io (list)
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                io (list)
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                io (list)
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                io (list)
            ]
        ]
    ]
]

//NOTE Io list extended
[ 
    [
        [ 
            [
                e (integer),
                r (integer),
                typ (string),
                [
                    state (string),
                    priority (boolean)
                ]
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                [
                    state (string),
                    priority (boolean)
                ]
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                [
                    state (string),
                    priority (boolean)
                ]
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                [
                    state (string),
                    priority (boolean)
                ]
            ]
        ]
        - ADDING MORE BLOCKS (AND THEIR PORTS)
    ]
    - ADDING MORE ROWS (AND THEIR BLOCKS)
]

//!SECTION
-----------------------------------------------------------------------------------------
*/

