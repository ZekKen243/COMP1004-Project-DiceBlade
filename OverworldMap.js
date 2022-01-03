class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
        /*these image sources are for layering purposes*/
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0)
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0)
    }
}

window.OverworldMaps = {
    TutorialMap: {
        lowerSrc: "assets/sprites/maps/tutorialMapMain.png",
        gameObjects: {
            mainHero: new GameObject({
                x: 5,
                y: 6,
            }),
            npc1: new GameObject({
                x: 1,
                y: 1,
                src: "assets/sprites/entities/placeholder.png"
            })
        }
    },

    TrainingGrounds: {
        lowerSrc: "assets/sprites/maps/tutorialMap1.png",
        gameObjects: {
            mainHero: new GameObject({
                x: 2,
                y: 4,
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