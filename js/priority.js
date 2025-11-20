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

//----------------------------------------------------------------------------------------------------------

class Block {
        constructor(portList){
        this.ports = portList;
        // [north, east, south, west] (objects)

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

//----------------------------------------------------------------------------------------------------------

//generic empty block generator
function genEmptyBlock(){
    return new Block([new ComponentPort(false, 0, "empty", ["output", false]), new ComponentPort(false, 0, "empty", ["output", false]), new ComponentPort(false, 0, "empty", ["output", false]), new ComponentPort(false, 0, "empty", ["output", false])]);
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

function implementation(){
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.id = `cell-${row}-${col}`;
            grid.appendChild(cell);
        }
    }
}
