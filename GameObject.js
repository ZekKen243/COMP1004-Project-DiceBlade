class GameObject {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        /*position for the object, uses config when a value is passed, otherwise 0*/
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
            gameObject: this, /*this gives it access to properties above*/
            src: config.src || "assets/sprites/entities/mainHero.png", /*the sprite sheet to be used*/
        })

    }

    update() {

    }
}