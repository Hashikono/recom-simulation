//SECTION Ports
class ComponentPort {
    constructor(e, r, io){
        ePow = e;
        rPow = r;
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

//SECTION Block main structure
class Block {
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
//stores all blocks as strings
var str = [["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"]];

//generix empty block
var x = new Block(new ComponentPort(false, 0, "empty", false), new ComponentPort(false, 0, "empty", false), new ComponentPort(false, 0, "empty", false), new ComponentPort(false, 0, "empty", false));
//converting blocks to objects
var blocksV1 = [[x,x,x,x,x,x],[x,x,x,x,x,x],[x,x,x,x,x,x],[x,x,x,x,x,x],[x,x,x,x,x,x],[x,x,x,x,x,x]];
//updated values of blocks
var blocksV2 = blocksV1;

//converts the grid into objects
function conversion(){
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
}

//updates the str of blocks (only)
function updateStr(x,y,block){
    str[x][y] = block;
}

//clears the str list and updates grid
//REVIEW Add the code that updates the grid (document.getElementById() stuff)
function clearGrid(){
    str = [["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"],["x","x","x","x","x","x"]];
}

//!SECTION


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
    - 


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

