class Sprite {
    /*this class controls the state of the sprite*/
    constructor(config) {

        /*setting up the image*/
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true
        }

        /*configuring animation and initial state*/
        this.animations = config.animations || {
            "idle-down": [ [0,0] ],
            "idle-up": [ [0,1] ],
            "idle-right": [ [0,2] ],
            "idle-left": [ [0,3] ],
            "walk-down": [ [1,0],[0,0],[3,0],[0,0] ], /*these series shows what frame within the spritesheet to take from*/
            "walk-up": [ [1,1],[0,1],[3,1],[0,1] ],
            "walk-right": [ [1,2],[0,2],[3,2],[0,2] ],
            "walk-left": [ [1,3],[0,3],[3,3],[0,3] ]
        }
        this.currentAnimation = "walk-down" //config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        /*this number represents how many game loop frames will be used to show one frame of the sprite*/
        /*increasing this value will result in the animation looking slower*/
        /*decreasing this value will result in the animation looking faster*/
        this.animationFrameProgress = this.animationFrameLimit;
        /*tracks the current progress of the animation frames left*/

        /*reference the game object*/
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }
    /*this method is responsible for returning what animation it is on and also what frame*/

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
        /*this check makes sure that a repeating animation is played through smoothly*/

    }
    /*controls what animation should be played*/

    updateAnimationProgress() {
        /*downtick frame progress*/
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        /*reset counter if animationFrameProgress !> 0*/
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        /*catches the frame upticking out of bounds*/
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx) {
        const x = this.gameObject.x - 8;
        const y = this.gameObject.y - 12;

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 32, frameY * 32,
            32,32,
            x,y,
            32,32,
            )
        this.updateAnimationProgress();
    }
}