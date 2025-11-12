//SECTION Ports
class ports {
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

//SECTION Redstone dust (main/basic structure)
class redstone {
    //NOTE Attributes list
    /*Attributes:
        - Input count
        - Output count
        - x4 e power (exclusive to simulation)
        - x4 r power
        - x4 io
            - type
            - priority
    */

    constructor(directions){
        this.directions = directions;
        // [north, east, south, west]
        this.inputCount = 0;
        this.outputCount = 0;

        //establish io count
        for (let i = 0; i < directions.length; i++){
            if (directions[i] == "input"){
                this.inputCount++;
            } else if (directions[i] == "output"){
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

    //power level output from max power input
    powerOutput(){
        var max = directions[0];
        for (let i = 1; i < this.directions.length; i++){
            if (directions[i].ePower() > max){
                max = directions[i].ePower();
            }
        }
        return max;
    }

    //determines directions of output and inputs
    direction() {
        
    }

    //Runs a test on the block
    test() {
        if (this.powerCheck()){
            this.powerOutput();

        }
        console.log("This block does not have any power")
    }
    
}
//!SECTION


//SECTION Update/Analysis
//strBlocks = 2D array of blocks in string format

var blocks = [] //converting blocks to objects

function update(strBlocks){
    for(let rows = 0; rows < strBlocks.length; rows++){ //go through the rows of blocks
        for (let columns = 0; columns < strBlocks[0].length; columns++){ //go through the individual columns
            for (let portIndex = 0; portIndex < 4; portIndex++){ //for every single one of these blocks, check surrounding

            }
        }
    }
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

//NOTE [2D] blocks
[
    row (list)
]

//NOTE [1D] blocks
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

//NOTE translation individual ports
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
        [ 
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

