//SECTION Ports
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
//!SECTION


//SECTION Block main structure (applies exclusively to dust)
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


    //checks if power exists before any computations
    //(Only applies to simulation)
    powerCheck() {
        if (north.ePower() || east.ePower() || south.ePower() || west.ePower()){
            return true;
        }
        else{
            console.log("No power detected");
        }
    }

    //returns highest redstone power input value
    maxPowerOutput(){
        let max = 0;
        for (let i = 0; i < this.ports.length; i++){
            if (this.ports[i].getType() == "input" && this.ports[i].rPower() > max){
                max = ports[i].rPower();
            }
        }
        return max;
    }
    

    //determines directions of outputs as a list of things to output on
    /*Ref: getEPower(boolean) | getRPower(integer) | getType(string) | getState(string) | getPrior(boolean)
    <div 
        class = "grid-cell"
        id="cell-0-0" 
        data-row = "0"  COORDINATE
        data-col = "0"  COORDINATE
        blockType = "redstone_dust"  LITERAL BLOCK

        northPort = "false, 0, "empty", ["output", false]"
        eastPort = "false, 0, "empty", ["output", false]"
        southPort = "false, 0, "empty", ["output", false]"
        westPort = "false, 0, "empty", ["output", false]"

        <img 
            src = "images/redstone_dust_off_1234.png"
            alt = "images/redstone_dust_off_1234.png"
        >
    </div>
    
    Method: Each port string to array -> each array to 2d array
    determineOutputs() returns this string ^^^
    */
    determineOutputs() {
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

    //Runs an io test on the block
    test() {
        if (this.powerCheck()){

        }
        console.log("This block does not have any power")
    }
    
}
//!SECTION

//SECTION Block List
//NOTE Individual directions of blocks can be switched using a stick
const blockList = [
    {type: "redstone_block", imgLink: "images/redstone_block.png"},
    {type: "redstone_dust", imgLink: "images/redstone_dust_off_1234.png"},
    {type: "redstone_repeator", imgLink: "images/redstone_repeator_1_off_31.png"},
    //{type: "redstone_comparator", imgLink: ""},//FIXME
    //{type: "redstone_lamp", imgLink: ""},//FIXME
    //{type: "oak_button", imgLink: ""},//FIXME
    //{type: "note_block", imgLink: ""},//FIXME
    {type: "lever", imgLink: "images/lever_off.png"},
    //{type: "observer", imgLink: ""}, //FIXME
    {type: "cobblestone", imgLink: "images/cobblestone.png"},
    {type: "air", imgLink: "images/stone.png"}
];



//!SECTION

//SECTION Update/Analysis

//generic empty block generator
function genEmptyBlock(){
    return new Block("air",[new ComponentPort(false, 0, "empty", ["output", false]), new ComponentPort(false, 0, "empty", ["output", false]), new ComponentPort(false, 0, "empty", ["output", false]), new ComponentPort(false, 0, "empty", ["output", false])]);
}

//generic blocks version (initialization)
const blocksV0 = Array.from({length:6}, () => Array.from({length:6}, genEmptyBlock()));
//block objects (begins with inititialization)
var blocksList = blocksV0;
//stores image sources from updates
var imgList = []

//Updates the blocks list (and image list)
function update(){
    //version one of blocks
    let blocksV1 = blocksList;
    //version two of blocks (actively constructing)
    let blocksV2 = [];
    for(let r = 0; r < str.length; r++){ //go through the rows of blocks
        for (let c = 0; c < str[0].length; c++){ //go through the individual columns
            if (str[c] == "empty"){
                /*
                HERE
                */
            } else if (str[c] == "redstone_dust"){

            }
        }
    }
    blocksList = blocksV2;
    //no return statement...already accessible in blocksList
}   

//Implements the blocks list into the grid (HTML creation)
function implementat(){
    const grid = document.getElementById("placementGrid");
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



/*
<div 
        class = "grid-cell"
        id="cell-0-0" COORDINATE EXTRACTION
        <img 
            src = "images/redstone_dust_off_1234.png"
            alt = "images/redstone_dust_off_1234.png"
        >
    </div> 
*/



//!SECTION









//REVIEW Next step, integrate the createGrid() into the update module with all specified port data etc. 
//There are too many attributes bruh

//REVIEW Once you made the integration, the base should be complete and you can start manipulating it by
//updating the block class (finally starting the analysis part)

//REVIEW Also add the missing pictures seen in FIXME anchors


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
- IMAGE STRUCTURE: (block name)_(state [starts at 1])_(power)_(direction).png
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

*io - list[type, priority]
    - Type - string
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


//NOTE list of block types
- Blocks:
    - redstone_block
    - redstone_dust
    - redstone_repeator
    - redstone_comparator
    - redstone_lamp
    - oak_button
    - note_block
    - lever
    - observer
    - cobblestone
    - air
    

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

