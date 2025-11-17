//SECTION Ports
class ComponentPort {
    constructor(e, r, io){
        //Electric power
        ePow = e;
        //Redstone power
        rPow = r;
        //i/o list
        iox = io;
    }

    getEPower() {
        return ePow; //boolean
    }
    
    getRPower() {
        return rPow; //integer
    }

    getType() {
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
        //REVIEW Is i/o count necessary?? (cause if it's not an input, it's an output, regardless of being empty)
        constructor(portList){
        this.ports = portList;
        // [north, east, south, west] (objects)
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


//SECTION Update/Analysis
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
*/

//generic empty block generator
function genEmptyBlock(){
    return new Block(new ComponentPort(false, 0, "empty", false), new ComponentPort(false, 0, "empty", false), new ComponentPort(false, 0, "empty", false), new ComponentPort(false, 0, "empty", false));
}

//generic blocks version
const blocksV0 = Array.from({length:6}, () => Array.from({length:6}, genEmptyBlock()));
//converting blocks to objects
var blocksObj = blocksV0;

//ONLY converts the grid into an objects list
function conversion(){
    //version one of blocks
    let blocksV1 = blocksObj;
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
    blocksObj = blocksV2;
    //no return statement...already accessible in blocksObj
}

//updates the str of blocks (concerns versions)
function updateStr(x,y,block){
    str[x][y] = block;
}


//!SECTION

//REVIEW ORGANIZE NOTES BELOW   
//SECTION API
/*
//ANCHOR Basic Notes (Pt.1)

- Power = redstone signals
- Electricity = actual power
- you have to check all sides of the redstone dust
- redstone dust is composed of 4 ports, the dust itself is the processor that 
  determines what to output...
- The grid will give a list for the blocks
- translated into a list of objects
    - Each block is an object that holds the connections
- The HTMl page will actually store all attrbutes of a given block (only way to actively store it in the html page)
    - this is because of the annoying rality that the user updates the grid THEMSELVES

SPECIAL CASES:
- Redstone blocks have an rpower of 16
    - block next to it wil output 15 (x-1)
- repeators have an rpower of 17
    - blocks that detect 17 will output 15 (x-2)
-------------------------------------------------------------------------------
//ANCHOR Basic Notes (Pt.2)
General:
- Input
    - Electric (e) power (only to simulate detecting power)
    - Redstone (r) power (minus 1)
    - connection (direction-ish)
        - A B C D
    - Are the blocks surrounding recievers or transmitter (i/o)
        - reciever priority

- Output (with priority)
    - calculated power

- Block string values
    - cobblestone
    - redstone_dust
    - redstone_repeator
    - redstone_comparator

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
        
-------------------------------------------------------------------------------
//ANCHOR Hierarchy & Typing

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
        - "none" - empty port (can refer to empty block or wall)

    - Priority(output ports) - boolean
        - true - priority connection 
        - false - no priority or empty port

- io examples:
    - Input 0 : powered cobblestone
    - Input 1 : redstone block, repeator (from output side), redstone dust, etc.
        - the redstone (dust) will recieve the power either way, priority only affects the direction of output
    - Output 0 : redstone lamps, chest(cannot emit redstone but exists), cobblestone
    - Output 1 : pistons, repeators (to input side), etc.
    - Empty 0 : Not connected to anything (air block)
    - Empty 1 : Doesn't exist

- tentative blocks
    - redstone dust (always has priority)
    - cobble stone (never has priority)

Variables/Parameters (redstone-dust):
*connection - object_list[north, east, south, west]
    - north - north port (front)
    - east - east port (right)
    - south - south port (back)
    - west - west port (left)

    later:
        - "top" - top port (top)
        - "bottom" - bottom port (bottom)

-------------------------------------------------------------------------------
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

--------------------------------------------(SPLIT)
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
                io (list)
            ],
            [
                e (integer),
                r (integer),
                io (list)
            ],
            [
                e (integer),
                r (integer),
                io (list)
            ],
            [
                e (integer),
                r (integer),
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
                [
                    type (string),
                    priority (boolean)
                ]
            ],
            [
                e (integer),
                r (integer),
                [
                    type (string),
                    priority (boolean)
                ]
            ],
            [
                e (integer),
                r (integer),
                [
                    type (string),
                    priority (boolean)
                ]
            ],
            [
                e (integer),
                r (integer),
                [
                    type (string),
                    priority (boolean)
                ]
            ]
        ]
        - ADDING MORE BLOCKS (AND THEIR PORTS)
    ]
    - ADDING MORE ROWS (AND THEIR BLOCKS)
]

//!SECTION

-------------------------------------------------------------------------------

//ANCHOR Procedure loop:
> extract 2D list from grid
> translate all blocks to a list of objects
> analyze list of objects
    > All blocks check surrounding in version 1
    > If the block powering the current block was ON in version 1
    
> implement updates to blocks

- Note, this will make the redstone travel +1 for every update
- A block being powered cannot power the block being powered
*/
//!SECTION

