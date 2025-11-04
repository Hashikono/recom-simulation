//Redstone dust (main class)
class ports {
    constructor(power, type, priority){
        this.power = power;
        this.type = type;
        this.priority = priority;
    }
    

}

/*
- Power = redstone signals
- electricity = actual power
- you have to check all sides of the redstone dust
- redstone dust is composed of 4 ports, the dust itself is the processor that determines what to output...
-------------------------------------------------------------------------------

Structure:
- Input
    - power (minus 1)
    - connection (direction-ish)
        - A B C D
    - Are the blocks surrounding recievers or transmitter (i/o)
        - reciever priority

- Output (with priority)
    - calculated power

-------------------------------------------------------------------------------

Variables/Parameters (ports):
*Power - integer 
    - (0-16)
    - 16 - reserved for power blocks
    - 0 - no (more) power

*Type - string
    - "input" - input port
    - "output" - output port
    - "none" - empty port

*Priority(output ports) - integer
    - "1" - priority connection
    - "0" - no priority of empty port

*Ticks - clock
- setTimeOut




Variables/Parameters (redstone-dust):
*connection - port[]
    - "f" - front port (front)
    - "b" - back port (back)
    - "l" - left port (left)
    - "r" - right port (right)

    later:
        - "t" - top port (top)
        - "b" - bottom port (bottom)
    

*/
