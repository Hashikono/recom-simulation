//Individual ports
class Port { //ePow(bool), rPow(int), blockType(str), io(str), priority(bool)
    constructor(ePow, rPow, conBlockType, io, priority){
        //Electric power
        this.ePow = ePow;
        //Redstone power
        this.rPow = rPow;
        //block type;
        this.conBlockType = conBlockType;
        //input/output
        this.io = io;
        //priority
        this.priority = priority;
    }

    //clone method -_-
    clone() {
        return new Port(this.ePow, this.rPow, this.onBlockType, this.io, this.priority);
    }

    //get methods for port data
    getEPower() { //boolean
        return this.sePow; 
    }
    
    getRPower() { //integer
        return this.rPow; 
    }

    getConBlockType() { //string
        return this.conBlockType; 
    }

    getIo() { //string
        return this.io; 
    }

    getPrior() { //boolean
        //priority = redirection
        return this.priority; 
    }

    //set methods for port data
    setEPower(x) { //boolean
        this.ePow = x; 
    }
    
    setRPower(x) { //integer
        this.rPow = x; 
    }

    setConBlockType(x) { //string
        this.conBlockType = x; 
    }

    setIo(x) { //string
        this.io = x; 
    }

    setPrior(x) { //boolean
        //priority = redirection
        this.priority = x; 
    }
}

//Block main structure
class Block { //blockType(str), direction(int), state(int), imgPower(str), portsList(obj x4)
    constructor(blockType, direction, state, imgPower, img, portsList){
        //block name ("redstone_block")
        this.blockType = blockType;
        //refer to table below
        this.direction = direction;
        //repeator ticks etc.
        this.state = state;
        //"on" or "off"
        this.imgPower = imgPower;
        //stores image paths
        this.img = img;
        //port objects [north, east, south, west] (objects)
        this.portsList = portsList;
    }

    //clone method due to structuredClone() being annoying
    clone() {
        return new Block(this.blockType, this.direction, this.state, this.imgPower, this.img, this.portsList.map(port => port.clone()));
    }

    //get methods for general block data (mainly for image conversion)
    getBlockType(){ //string
        return this.blockType;
    }

    getDirection(){ //integer
        return this.direction;
    }

    getState(){ //integer
        return this.state;
    }

    getImgPower(){ //string
        return this.imgPower;
    }

    getImg(){ //string
        return this.img;
        //return "images/air_1234_1_off.png";
    }

    //set methods for general block data
    setBlockType(x){ //string
        this.blockType = x;
    }

    setDirection(x){ //integer
        this.direction = x;
    }

    setState(x){ //integer
        this.state = x;
    }

    setImgPower(){ //string
        if (this.powerTest("r")){
            this.imgPower = "on";
        }
        else {
            this.imgPower = "off";
        }
    }

    //no parameters - converts attributes to image path
    setImg(){ //string
        //images/redstone_repeator_13_1_off.png
        this.setImgPower();
        img = `images/${this.blockType}_${this.direction}_${this.state}_${this.imgPower}.png`;
    }

    //get methods for port objects
    getNorthPort(){ //object
        return this.portsList[0];
    }

    getEastPort(){ //object
        return this.portsList[1];
    }

    getSouthPort(){ //object
        return this.portsList[2];
    }

    getWestPort(){ //object
        return this.portsList[3];
    }

    //tests if the block has power (e/r)
    powerTest(x) { //boolean
        //tests and updates ePower
        if (x == "e" && (this.getNorthPort().getEPower() || this.getEastPort().getEPower() || this.getSouthPort().getEPower() || this.getWestPort().getEPower())){
            this.portsList[0].setEPower(true);
            this.portsList[1].setEPower(true);
            this.portsList[2].setEPower(true);
            this.portsList[3].setEPower(true);
            return true;
        }
        else if (x == "e") {
            this.sportsList[0].setEPower(false);
            this.sportsList[1].setEPower(false);
            this.sportsList[2].setEPower(false);
            this.sportsList[3].setEPower(false);
            return false
        }
        //only tests rPower
        else if (x == "r" && (this.getNorthPort().getRPower() > 0 || this.getEastPort().getRPower() > 0 || this.getSouthPort().getRPower() > 0 || this.getWestPort().getRPower() > 0)){
            return true;
        }
        else if (x == "r") {
            return false;
        }
    }

    /*tests if the block has priority (outputs lists if it does) [deprecated due to exclusive use outside scope]
    priorityTest(){
        let dirPrior = [];
        if (blocksV1[y-1][x]) dirPrior.push(1);
        if (blocksV1[y][x+1]) dirPrior.push(2);
        if (blocksV1[y+1][x]) dirPrior.push(3);
        if (blocksV1[y][x-1]) dirPrior.push(4);

        return dirPrior;
    }*/

    //returns highest possible redstone power ouput value (minus one for spacing)
    travellingPowerOutput(){ //integer
        let max = 1;
        for (let i = 0; i < this.portsList.length; i++){
            if (this.portsList[i].getIo() == "input" && this.portsList[i].getRPower() > max){
                max = this.portsList[i].getRPower();
            }
        }
        return max-1;
    }
    
    //returns highest possible redstone power ouput value (no travelling)
    fixedPowerOutput(){ //integer
        let max = 1;
        for (let i = 0; i < this.portsList.length; i++){
            if (this.portsList[i].getIo() == "input" && this.portsList[i].getRPower() > max){
                max = this.portsList[i].getRPower();
            }
        }
        return max;
    }

    //returns bool value if block has a priority port (mainly for redstone_dust)
    /*priorityExistence(){ //boolean
        let existence = false;
        for (let i = 0; i < this.portsList.length; i++){
            if (this.portsList[i].getPrior() == true){
                existence = true;
            }
        }
        return existence;
    }*/
}


//SECTION Update/Analysis
//generic block creator (genEmpty = default/single-use)
function genEmptyBlock(){
    return new Block(
        "air", 1234, 1, "off", 
        "images/air_1234_1_off.png", 
        [
            new Port(false, 0, "air", "none", false), 
            new Port(false, 0, "air", "none", false), 
            new Port(false, 0, "air", "none", false), 
            new Port(false, 0, "air", "none", false)
        ]);
}

//NOTE Main block generator
function genBlock(block,y,x){
    let dirTest = edgeIdentifier(y,x);

    //constructing surrounding blocks list
    let surBlock = ["air","air","air","air"];
    if(dirTest.includes(1)){surBlock[0] = blocksV1[y-1][x].getBlockType(); }
    if(dirTest.includes(2)){surBlock[1] = blocksV1[y][x+1].getBlockType(); }
    if(dirTest.includes(3)){surBlock[2] = blocksV1[y+1][x].getBlockType(); }
    if(dirTest.includes(4)){surBlock[3] = blocksV1[y][x-1].getBlockType(); }

    //implementation
    if (block = "air"){
        return new Block(
            block, 1234, 1, "off", 
            "images/air_1234_1_off.png", 
            [
                new Port(false, 0, surBlock[0], "none", false), 
                new Port(false, 0, surBlock[1], "none", false), 
                new Port(false, 0, surBlock[2], "none", false), 
                new Port(false, 0, surBlock[3], "none", false)
            ]);
    }
    else if (block = "redstone_block"){
        return new Block(
            block, 1234, 1, "off", 
            "images/redstone_block_1234_1_off.png", 
            [
                new Port(false, 16, surBlock[0], "output", true), 
                new Port(false, 16, surBlock[1], "output", true), 
                new Port(false, 16, surBlock[2], "output", true), 
                new Port(false, 16, surBlock[3], "output", true)
            ]);
    }
    else if (block = "redstone_dust"){
        return new Block(
            block, 1234, 1, "off", 
            "images/redstone_dust_1234_1_off.png",
            [
                new Port(false, 0, surBlock[0], "none", true), 
                new Port(false, 0, surBlock[1], "none", true), 
                new Port(false, 0, surBlock[2], "none", true), 
                new Port(false, 0, surBlock[3], "none", true)
            ]);
    }
    else if (block = "redstone_repeator"){
        return new Block(
            block, 31, 1, "off", 
            "images/redstone_repeator_31_1_off.png", 
            [
                new Port(false, 0, surBlock[0], "output", true), 
                new Port(false, 0, surBlock[1], "none", false), 
                new Port(false, 0, surBlock[2], "input", true), 
                new Port(false, 0, surBlock[3], "none", false)
            ]);
    }
    else if (block = "redstone_comparator"){
        return new Block(
            block, 31, 1, "off", 
            "images/redstone_comparator_31_1_off.png", 
            [
                new Port(false, 0, surBlock[0], "output", true), 
                new Port(false, 0, surBlock[1], "input", true), 
                new Port(false, 0, surBlock[2], "input", true), 
                new Port(false, 0, surBlock[3], "input", true)
            ]);
    }
    else if (block = "redstone_lamp"){
        return new Block(
            block, 1234, 1, "off", 
            "images/redstone_lamp_1234_1_off.png", 
            [
                new Port(false, 0, surBlock[0], "input", false), 
                new Port(false, 0, surBlock[1], "input", false), 
                new Port(false, 0, surBlock[2], "input", false), 
                new Port(false, 0, surBlock[3], "input", false)
            ]);
    }
    else if (block = "oak_button"){
        return new Block(
            block, 1234, 1, "off", 
            "images/oak_button_1234_1_off.png", 
            [
                new Port(false, 0, surBlock[0], "output", true), 
                new Port(false, 0, surBlock[1], "output", true), 
                new Port(false, 0, surBlock[2], "output", true), 
                new Port(false, 0, surBlock[3], "output", true)
            ]);
    }
    else if (block = "note_block"){
        return new Block(
            block, 1234, 1, "off", 
            "images/note_block_1234_1_off.png", 
            [
                new Port(false, 0, surBlock[0], "input", false), 
                new Port(false, 0, surBlock[1], "input", false), 
                new Port(false, 0, surBlock[2], "input", false), 
                new Port(false, 0, surBlock[3], "input", false)
            ]);
    }
    else if (block = "lever"){
        return new Block(
            block, 1234, 1, "off", 
            "images/lever_1234_1_off.png", 
            [
                new Port(false, 0, surBlock[0], "output", true), 
                new Port(false, 0, surBlock[1], "output", true), 
                new Port(false, 0, surBlock[2], "output", true), 
                new Port(false, 0, surBlock[3], "output", true)
            ]);
    }
    else if (block = "observer"){
        return new Block(
            block, 31, 1, "off", 
            "images/observer_31_1_off.png", 
            [
                new Port(false, 0, surBlock[0], "output", true), 
                new Port(false, 0, surBlock[1], "none", false), 
                new Port(false, 0, surBlock[2], "input", false), 
                new Port(false, 0, surBlock[3], "none", false)
            ]);
    }
    else if (block = "cobblestone"){
        return new Block(
            block, 1234, 1, "off", 
            "images/cobblestone_1234_1_off.png", 
            [
                new Port(true, 0, surBlock[0], "input", false), 
                new Port(true, 0, surBlock[1], "input", false), 
                new Port(true, 0, surBlock[2], "input", false), 
                new Port(true, 0, surBlock[3], "input", false)
            ]);
    }
}

//blocksV1 for setting genBlocks & original data | blocksV2 for updating data and immediately copying it over
var blocksV1;
var blocksV2;
blocksV1 = Array.from({length:6}, () => Array.from({length:6}, () => genEmptyBlock()));
blocksV2 = Array.from({length:6}, () => Array.from({length:6}, () => genEmptyBlock()));

//selection variables
var selectedOption = null;
var selectedBlock = null;

//clear button
function reset(){
    console.log("Block reset!");
    blocksV1 = Array.from({length:6}, () => Array.from({length:6}, () => genEmptyBlock()));
    blocksV2 = Array.from({length:6}, () => Array.from({length:6}, () => genEmptyBlock()));
    update();
}

//...
//this function tests the character count of the blocksV1 object to see how absurd storing an entire web app's data in one variable is
//Because there's no way to recover the original code of an object declaration, this prcedure finds the character count of an object's declaration assuming it was a newly declared list of new objects...
function testAbsurdity(option){
    let organizedAbsurdText = JSON.stringify(blocksV1, null, 2);
    let absurdText = JSON.stringify(blocksV1, null, 0);

    /*
    const characters: 
    new Block("", , , "", "", [new Port(, , "", "", ), new Port(, , "", "", ), new Port(, , "", "", ), new Port(, , "", "", )]);
    
    dynamic characters(ish): air | 1234 | 1 | off | images/air_1234_1_off.png | false | 
                        false | 0 | air | output | false
                        false | 0 | air | output | false
                        false | 0 | air | output | false
                        false | 0 | air | output | false
    */
    
    //1 = character count of declaration
    if (option = 1){
        const characters = `new Block("", , , "", "", [new Port(, , "", "", ), new Port(, , "", "", ), new Port(, , "", "", ), new Port(, , "", "", )]);`;
        let dynCharBlock = blocksV1.getBlockName().length + blocksV1.getDirection().toString().length + blocksV1.getState().toString().length + blocksV1.getImgPower().length + blocksV1.getImg().length;
        
        let dynCharNorth = blocksV1.getNorthPort().getEPower().toString().length + blocksV1.getNorthPort().getRPower().toString().length + blocksV1.getNorthPort().getConBlockType().length + blocksV1.getNorthPort().getIo().length + blocksV1.getNorthPort().getPrior().toString().length;
        
        let dynCharEast = blocksV1.getEastPort().getEPower().toString().length + blocksV1.getEastPort().getRPower().toString().length + blocksV1.getEastPort().getConBlockType().length + blocksV1.getEastPort().getIo().length + blocksV1.getEastPort().getPrior().toString().length; 
        
        let dynCharSouth = blocksV1.getSouthPort().getEPower().toString().length + blocksV1.getSouthPort().getRPower().toString().length + blocksV1.getSouthPort().getConBlockType().length + blocksV1.getSouthPort().getIo().length + blocksV1.getSouthPort().getPrior().toString().length;
        
        let dynCharWest = blocksV1.getWestPort().getEPower().toString().length + blocksV1.getWestPort().getRPower().toString().length + blocksV1.getWestPort().getConBlockType().length + blocksV1.getWestPort().getIo().length + blocksV1.getWestPort().getPrior().toString().length;

        return characters.length + dynCharBlock + dynCharNorth + dynCharEast + dynCharSouth + dynCharWest;
    } 

    //2 = one line JSON 
    else if (option = 2) {
        return absurdText;
    } 

    //3 = organized JSON
    else if (option = 3) {
        return organizedAbsurdText;
    }
}

//tests and returns for available directions
function edgeIdentifier(y,x){
    let dirAvail = [1,2,3,4];
    if (y-1 < 0) dirAvail.splice(dirAvail.indexOf(1),1);
    if (x+1 > 6) dirAvail.splice(dirAvail.indexOf(2),1);
    if (y+1 > 6) dirAvail.splice(dirAvail.indexOf(3),1);
    if (x-1 < 0) dirAvail.splice(dirAvail.indexOf(4),1);
    return dirAvail;
}

//tests ePower on surrounding blocks
function ePowerTest(y,x){
    let power = false;
    let testBlocks = edgeIdentifier(y,x);

    //sets ePower for all ports
    //*small comment, I love how references work bcs it only changes the obj and not the string (when I used an oddly specific feature in coding that the designers may or may not have intentially made moment lol)
    if (testBlocks.includes(1) && blocksV1[y][x].getBlockType() != "air" && blocksV1[y-1][x].powerTest("e")){power = true; }
    else if (testBlocks.includes(2) && blocksV1[y][x].getBlockType() != "air" && blocksV1[y][x+1].powerTest("e")){power = true; }
    else if (testBlocks.includes(3) && blocksV1[y][x].getBlockType() != "air" && blocksV1[y+1][x].powerTest("e")){power = true; }
    else if (testBlocks.includes(4) && blocksV1[y][x].getBlockType() != "air" && blocksV1[y][x-1].powerTest("e")){power = true; }

    return power;
}

//Updates the blocks list (and image list)
function update(){
    console.log("Block update!")
    //Does the corresponding update function for each corresponding block
    for(let r = 0; r < blocksV1.length; r++){
        for (let c = 0; c < blocksV1[0].length; c++){
            if (blocksV1[r][c].getBlockType() =="air"){
                continue;
            } 
            else if (blocksV1[r][c].getBlockType() =="redstone_block"){
                redstone_block_update(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="redstone_dust"){
                redstone_dust(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="redstone_repeator"){
                redstone_repeator(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="redstone_comparator"){
                redstone_comparator(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="redstone_lamp"){
                redstone_lamp(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="oak_button"){
                oak_button(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="note_block"){
                note_block(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="lever"){
                lever(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="observer"){
                observer(r,c);
            } 
            else if (blocksV1[r][c].getBlockType() =="cobblestone"){
                cobblestone(r,c);
            }
        }
    }
    
    blocksV1 = blocksV2.map(row => row.map(bloc => bloc.clone()));
    implement();
}   

//Implements the blocks list into the grid (HTML creation)
function implement(){
    //empties current div
    const grid = document.getElementById("placementGrid");
    grid.innerHTML = '';
    //adds stuff to the div
    for (let r = 0; r < 6; r++){
        for (let c = 0; c < 6; c++){
            //cell division
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.id = `cell-${r}-${c}`;
            cell.dataset.row = r;
            cell.dataset.col = c;
                //image creation
                const image = document.createElement("img");
                image.src = blocksV1[r][c].getImg();
                image.alt = blocksV1[r][c].getImg();
                cell.appendChild(image);
            grid.appendChild(cell);
        }
    }
}

//Block placement & selection
function eventListener(){
    
}

//!SECTION


//SECTION Onsite processes
//Initial loading of content
window.onload = (() => {update(); console.log("Content Initial load!")});

document.addEventListener("DOMContentLoaded", function () {
    let opt = document.getElementById("blockPalette");
    let pla = document.getElementById("placementGrid");

    //selection manager - options palette
    opt.addEventListener("click", function(opt) {
        console.log("OPTIONS palette event listener activated")
        //initial element test (if outside; removes all selected)
        const option = opt.target.closest(".options");
        if(!option) {
            selectedOption.classList.remove("selected");
            selectedBlock.classList.remove("selected");
            selectedOption = null;
            selectedBlock = null;
            return;
        }
        
        //element toggle (if you click the same element twice)
        if (selectedOption == option) {
            option.classList.remove("selected");
            selectedOption = null;
            return;
        }
        
        //resets selection    
        if (selectedOption) selectedOption.classList.remove("selected");

        //reassigns option
        option.classList.add("selected");
        selectedOption = option;

        //match instance
        //if(selectedBlock){
        //    selectedOption.classList.remove("selected");
        //    selectedBlock.classList.remove("selected");
        //    selectedOption = null;
        //    selectedBlock = null;
        //    console.log("Ready for block reassignment");
        //}

        console.log("Selected option", option.dataset.opt)
    });

    //selection manager - block grid
    pla.addEventListener("click", function(bloc) {
        console.log("BLOCK grid event listener activated")
        //initial element test (if outside; removes all selected)
        const block = bloc.target.closest(".grid-cell");
        if(!block) {
            selectedOption.classList.remove("selected");
            selectedBlock.classList.remove("selected");
            selectedOption = null;
            selectedBlock = null;
            return;
        }

        //element toggle (if you click the same element twice)
        if (selectedBlock == block) {
            block.classList.remove("selected");
            selectedBlock = null;
            return;
        }

        //resets selection    
        if (selectedBlock) selectedBlock.classList.remove("selected");

        //reassigns block
        block.classList.add("selected");
        selectedBlock = block;

        //match instance
        if(selectedOption){
            selectedOption.classList.remove("selected");
            selectedBlock.classList.remove("selected");
            selectedOption = null;
            selectedBlock = null;
            console.log("Ready for block reassignment");
        }

        //console.log("Selected block", block.dataset.row, block.dataset.col)
    });
});


//DEBUGGING
console.log("Event listener tests...");
console.log("existence of block-palette element", document.getElementById("blockPalette"));
console.log("existence of placement-grid element", document.getElementById("placementGrid"));
console.log("options element?", document.querySelectorAll(".options").length);
console.log("block element?", document.querySelectorAll(".grid-cell").length);

document.getElementById("blockPalette").addEventListener("click", function (testing) {console.log("blockPalette was clicked", testing.target);});
document.getElementById("placementGrid").addEventListener("click", function (testing) {console.log("placementGrid was clicked", testing.target);});

//!SECTION


/*//SECTION Specific block update types
> direction/state attributes
> surrounding of the block in V1
> all port attributes of the block (input/output)
> image if necessary (on/off)


Port Ref:  new Port(ePow(bool), rPow(int), conBlockType(str), io(str), priority(bool))
           s/getEPower(bool) | s/getRPower(int) | s/getConBlockType(str) | s/getIo(str) | s/getPrior(bool)

Block Ref: new Block(blockType(str), direction(int), state(int), imgPower(str), img(str), portsList(obj x4))
           s/getBlockType(str) | s/getDirection(int) | s/getState(int) | s/getImgPower(str) | s/getImg(str)
           get[dir]Port(obj) | powerTest(bool) | travelling/fixedPowerOutput(int)
           *setImg() & setImgPower() has no parameters | powerTest() requires parameter "e" or "r"

Function Ref: genEmptyBlock() | genBlock(block,y,x) | testAbsurdity(option) | edgeIdentifier(y,x) | ePowertest(y,x)

Implementation Ref: update() | implement() | eventListener() | reset()

*/

function redstone_block_update(y,x){
    if (ePowerTest(y,x)){
        blocksV2[y][x] = blocksV1[y][x].clone();
    }
    blocksV2[y][x].setImg();
}

function redstone_dust_update(y,x){
    if (ePowerTest(y,x)){
        //direction availability - initial cleaning of edge "blocks"
        let dirTest = edgeIdentifier(y,x);

        //direction priority - testing priority in surrounding blocks
        let dirPrior = [];
        if (dirTest.includes(1) && blocksV1[y-1][x].getSouthPort().getPrior()) dirPrior.push(1);
        if (dirTest.includes(2) && blocksV1[y][x+1].getWestPort().getPrior()) dirPrior.push(2);
        if (dirTest.includes(3) && blocksV1[y+1][x].getNorthPort().getPrior()) dirPrior.push(3);
        if (dirTest.includes(4) && blocksV1[y][x-1].getEastPort().getPrior()) dirPrior.push(4);
        
        //direction establishment
        if (dirPrior.length == 0 || dirPrior.length == 4){
            blocksV1[y][x].setDirection(1234);
        }
        else if (dirPrior.length == 1){
            if (dirPrior[0] == 1 || dirPrior[0] == 3){
                blockV1[y][x].setDirection(13);
            }
            else if (dirPrior[0] == 2 || dirPrior[0] == 4){
                blockV1[y][x].setDirection(24);
            }
        }
        else if (dirPrior.length == 2 || dirPrior.length == 3){
            blockV1[y][x].setDirection(dirPrior.join(""));
        }

        //update port i/o (deprecated because redstone is just "special"...)
        //if (dirTest.includes(1) && blocksV2[y-1][x].getBlockType() != "redstone_dust") blocksV2[y][x].getNorthPort().setIo((() => {if (blocksV2[y-1][x].getSouthPort().getIo() == "input"){return output;} else {return "input";}})());
        //if (dirTest.includes(2) && blocksV2[y][x+1].getBlockType() != "redstone_dust") blocksV2[y][x].getEastPort().setIo((() => {if (blocksV2[y][x+1].getWestPort().getIo() == "input"){return output;} else {return "input";}})());
        //if (dirTest.includes(3) && blocksV2[y+1][x].getBlockType() != "redstone_dust") blocksV2[y][x].getSouthPort().setIo((() => {if (blocksV2[y+1][x].getNorthPort().getIo() == "input"){return output;} else {return "input";}})());
        //if (dirTest.includes(4) && blocksV2[y][x-1].getBlockType() != "redstone_dust") blocksV2[y][x].getWestPort().setIo((() => {if (blocksV2[y][x-1].getEastPort().getIo() == "input"){return output;} else {return "input";}})());
        
        //rPower establishment
        if (blocksV1[y][x].getDirection().includes("1") && dirTest.includes(1) && blocksV2[y-1][x].getPort().getIo() == "output") blocksV2[y][x].getNorthPort().setRPower(blocksV2[y-1][x].getSouthPort().travellingPowerOutput());
        if (blocksV1[y][x].getDirection().includes("2") && dirTest.includes(2) && blocksV2[y][x+1].getPort().getIo() == "output") blocksV2[y][x].getEastPort().setRPower(blocksV2[y][x+1].getWestPort().travellingPowerOutput());
        if (blocksV1[y][x].getDirection().includes("3") && dirTest.includes(3) && blocksV2[y+1][x].getPort().getIo() == "output") blocksV2[y][x].getSouthPort().setRPower(blocksV2[y+1][x].getNorthPort().travellingPowerOutput());
        if (blocksV1[y][x].getDirection().includes("4") && dirTest.includes(4) && blocksV2[y][x-1].getPort().getIo() == "output") blocksV2[y][x].getWestPort().setRPower(blocksV2[y][x-1].getEastPort().travellingPowerOutput());

        //on/off establishment
        //REVIEW If this doesn't work, try this: (dirTest.includes(1) && blocksV1[y-1][x].getSouthPort().getIo() == "output" && blocksV1[y-1][x].getSouthPort().getRPower() > 0) || (dirTest.includes(2) && blocksV1[y][x+1].getWestPort().getIo() == "output" && blocksV1[y][x+1].getWestPort().getRPower() > 0) || (dirTest.includes(3) && blocksV1[y+1][x].getNorthPort().getIo() == "output" && blocksV1[y+1][x].getNorthPort().getRPower() > 0) || (dirTest.includes(4) && blocksV1[y][x-1].getEastPort().getIo() == "output" && blocksV1[y][x-1].getEastPort().getRPower() > 0)
        if (blocksV1[y][x].powerTest("r")){
            blocksV2.setState("on");
        }
        else {
            blocksV2.setState("off");
        }

        blocksV2[y][x].setImg();
    }
}

function redstone_repeator_update(y,x){
    if (ePowerTest(y,x)){
        //
        blocksV2[y][x].setImg();
    }
}

function redstone_comparator_update(y,x){
    if (ePowerTest(y,x)){
        //
        blocksV2[y][x].setImg();
    }
}

function redstone_lamp_update(y,x){
    if (ePowerTest(y,x)){
        //
        blocksV2[y][x].setImg();
    }
}

function oak_button_update(y,x){
    if (ePowerTest(y,x)){
        //
        blocksV2[y][x].setImg();
    }
}

function note_block_update(y,x){
    if (ePowerTest(y,x)){
        //
        blocksV2[y][x].setImg();
    }
}

function lever_update(y,x){
    if (ePowerTest(y,x)){
        //
        blocksV2[y][x].setImg();
    }
}

function observer_update(y,x){
    if (ePowerTest(y,x)){
        //
        blocksV2[y][x].setImg();
    }
}

function cobblestone_update(y,x){
    if (ePowerTest(y,x)){
        //
        blocksV2[y][x].setImg();
    }
}



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
- IMAGE STRUCTURE: (block type)_(direction)_(state [starts at 1])_(power on/off).png
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

*io - string
    - "input" - input port
    - "output" - output port
    - "none" - regular port
    *outputs flow into inputs

*Priority(output ports) - boolean
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
*/
/*
-----------------------------------------------------------------------------------------
//NOTE  Array structure Expanded (4d):

[
    [
        {
            blockType(str),
            direction(int),
            state(int),
            imgPower(str),
            [
                e (integer),
                r (integer),
                typ (string),
                state (string),
                priority (boolean)
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                state (string),
                priority (boolean)
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                state (string),
                priority (boolean)
            ],
            [
                e (integer),
                r (integer),
                typ (string),
                state (string),
                priority (boolean)
            ]
        }
        - ADDING MORE BLOCKS (AND THEIR PORTS)
    ]
]

-----------------------------------------------------------------------------------------
*/

