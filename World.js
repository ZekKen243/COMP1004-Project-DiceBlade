class World {
    constructor(config) {
        this.element = config.element; /*pass in an element for the world to work on*/
        this.canvas = this.element.querySelector(".gameCanvas"); /*canvas tag*/
        this.ctx = this.canvas.getContext("2d"); /*drawing to the context of the canvas,
        gives access to the drawing methods on canvas elements*/
        /*this all draws image data onto the canvas tag*/
        this.map = null;
    }

    /*the game loop which executes each frame*/
    startGameLoop() {
        const step = () => {
            /*console.log("stepping");*/

            /*clears the canvas*/
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

            /*draw lower layer*/
            this.map.drawLowerImage(this.ctx);

            /*draw game objects*/
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction
                })
                object.sprite.draw(this.ctx);
            })
            /*draw upper layer*/

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        this.map = new OverworldMap(window.OverworldMaps.TutorialMap);
        /*console.log("world: Hello!", this);*/
        this.directionInput= new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();

    }

}

