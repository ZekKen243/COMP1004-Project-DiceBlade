class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
        /*these image sources are for layering purposes*/

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(this.upperImage, 0, 0)
    }

    /*this method returns true if the user is hitting a wall, otherwise false*/
    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;

            /*determine if this mount should actually mount*/
            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;
        /*start a loop of async events*/
        /*await each one*/
        for (let i=0; i<events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init();
        }

        this.isCutscenePlaying = false;

        /*reset NPCs to do their idle behaviour*/
        Object.values(this.gameObjects).forEach(object => object.doBehaviourEvent(this))
    }

    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const{x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }
}

window.OverworldMaps = {
    TutorialMap: {
        lowerSrc: "assets/sprites/maps/tutorialMapMain.png",
        gameObjects: {
            mainHero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npc1: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(6),
                src: "assets/sprites/entities/Hero1.png",
                behaviourLoop: [
                    { type: "walk", direction: "left" },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "right" },
                    { type: "stand", direction: "down", time: 800 },
                    { type: "walk", direction: "down" },
                ]
            }),
            npc2: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(10),
                src: "assets/sprites/entities/Hero1.png",
                behaviourLoop: [
                    { type: "stand", direction: "left", time: 2500 },
                    { type: "stand", direction: "right", time: 2500 },
                ]
            }),
        },
        walls: {
            [utils.asGridCoord(2,5)] : true,
            [utils.asGridCoord(2,7)] : true,
            [utils.asGridCoord(2,9)] : true,
            [utils.asGridCoord(1,2)] : true,
            [utils.asGridCoord(2,2)] : true,
            [utils.asGridCoord(3,2)] : true,
            [utils.asGridCoord(4,2)] : true,
            [utils.asGridCoord(5,2)] : true,
            [utils.asGridCoord(6,2)] : true,
            [utils.asGridCoord(7,2)] : true,
            [utils.asGridCoord(8,2)] : true,
            [utils.asGridCoord(9,2)] : true,
            [utils.asGridCoord(10,2)] : true,
            [utils.asGridCoord(12,2)] : true,
            [utils.asGridCoord(6, 9)] : true,
            [utils.asGridCoord(6, 10)] : true,
            [utils.asGridCoord(7, 9)] : true,
            [utils.asGridCoord(7, 10)] : true,
            [utils.asGridCoord(10, 5)] : true,
            [utils.asGridCoord(11, 5)] : true,
            [utils.asGridCoord(11, 6)] : true,
            [utils.asGridCoord(11, 7)] : true,
            [utils.asGridCoord(11, 8)] : true,


            /*this is a key for the object*/
        }

    },

    TrainingGrounds: {
        lowerSrc: "assets/sprites/maps/tutorialMap1.png",
        gameObjects: {
            mainHero: new GameObject({
                x: utils.withGrid(2),
                y: utils.withGrid(4),
            }),
            npc1: new GameObject({
                x: 5,
                y: 5,
                src: "assets/sprites/entities/placeholder.png"
            }),
            npc2: new GameObject({
                x: 3,
                y: 3,
                src: "assets/sprites/entities/placeholder.png"
            })
        }
    },
}