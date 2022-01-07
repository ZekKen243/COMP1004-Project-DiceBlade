class DirectionInput {
    constructor() {
        this.heldDirections = [];

        this.map = {
            "KeyW" : "up",
            "KeyA" : "left",
            "KeyS" : "down",
            "KeyD" : "right",
            "ArrowUp" : "up",
            "ArrowLeft" : "left",
            "ArrowDown" : "down",
            "ArrowRight" : "right",
        }
    }

    /*returns the direction that is currently held*/
    get direction() {
        return this.heldDirections[0];
    }


    /*takes the key input from the user*/
    init() {
        document.addEventListener("keydown", e => {
            /*console.log(e.code);*/
            const dir = this.map[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
                console.log(this.heldDirections)
            }
            /*if the direction input is invalid, un-shifts the input so that the program is looking at the start of the array*/
        });

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
                /*removes 1 entry from the array*/
            }
            /*removes the last entry in the direction array when the key is lifted */
        })
    }
}