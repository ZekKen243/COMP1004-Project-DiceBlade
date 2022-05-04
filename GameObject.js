class GameObject {
    constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        /*position for the object, uses config when a value is passed, otherwise 0*/
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this, /*this gives it access to properties above*/
            src: config.src || "assets/sprites/entities/mainHero.png", /*the sprite sheet to be used*/
        });

        this.behaviourLoop = config.behaviourLoop || [];
        this.behaviourLoopIndex = 0;

    }

    mount(map) {
        console.log("mounting")
        this.isMounted = true;
        map.addWall(this.x, this.y);

        /*If there is behaviour, kick off after a short delay*/
        setTimeout(() => {
            this.doBehaviourEvent(map);
        }, 10)
    }

    update() {

    }

    async doBehaviourEvent(map) {

        /*don't do anything if there is a more important cutscene or no config to do anything*/
        if (map.isCutscenePlaying || this.behaviourLoop.length === 0 || this.isStanding) {
            return;
        }

        /*set up event with relevant info*/
        let eventConfig = this.behaviourLoop[this.behaviourLoopIndex];
        eventConfig.who = this.id;

        const eventHandler = new OverworldEvent({ map, event: eventConfig });
        await eventHandler.init();
        /*makes sure that the current event is finished before executing the next event*/

        /*set the next event to fire*/
        this.behaviourLoopIndex += 1;
        if (this.behaviourLoopIndex === this.behaviourLoop.length) {
            this.behaviourLoopIndex = 0;
        }

        /*do again*/
        this.doBehaviourEvent(map);
    }
}