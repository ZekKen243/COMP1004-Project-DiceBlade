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

            /*establish the "camera" person*/
            const cameraPerson = this.map.gameObjects.mainHero;


            /*clears the canvas*/
            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

            /*update all objects*/
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })

            /*draw lower layer*/
            this.map.drawLowerImage(this.ctx, cameraPerson);

            /*draw game objects*/
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
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
        console.log(this.map.walls);
        this.map.mountObjects();
        this.directionInput= new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();

        this.map.startCutscene([
            { type: "textMessage", text: "Hello! Welcome to Dice Blade!"}
            /*{ who: "hero", type: "walk", direction: "left" },
            { who: "npc1", type: "stand", direction: "left", time: 1000 },
            { who: "npc1", type: "walk", direction: "left" },
            { who: "npc1", type: "walk", direction: "left" },*/
        ])
    }

}

