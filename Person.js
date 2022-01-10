class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movementProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;
        /*this is a flag to make sure this script passes only for the player to be controlled
        * set to true in OverworldMap under mainHero gameObjects*/

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }

    update(state) {
        if (this.movementProgressRemaining > 0) {
            this.updatePosition();
        } else {
            /*more cases for starting to walk will come here*/

            /*case: we're keyboard ready and have an arrow pressed*/
            if (this.isPlayerControlled && state.arrow) {
                this.startBehaviour(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state);
        }
    }

    /*this method explicitly fires the walk command without it having to come from the arrow keys*/
    startBehaviour(state, behaviour) {
        /*set character direction to whatever behaviour has*/
        this.direction = behaviour.direction;
        /*stop if space is not free*/
        if (behaviour.type === "walk") {
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            }
            /*walk*/
            state.map.moveWall(this.x, this.y, this.direction);
            this.movementProgressRemaining = 16;
        }
    }

    updatePosition() {
        /*executes directionUpdate when there is still pixels left to move on the grid*/
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movementProgressRemaining -= 1;
    }

    /*this method controls and updates the sprite animation*/
    updateSprite() {
        if (this.movementProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
    }
}