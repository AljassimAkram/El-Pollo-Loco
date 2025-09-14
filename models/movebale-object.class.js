class MovebaleObject extends DrawableObject {
    world;

    gravity = 0;
    force = 40;
    acceleration = 4.5;

    baseY = this.y;

    speed;
    otherDirection = false;
    hasJumped = false;

    energy = 100;
    damage = 0;
    lastHit = 0;

    hasKilled = false;
    hasPlayedAudio = false;

    /**
     * Applies gravity to the object, causing it to fall until it reaches the ground.
     * Gravity is reduced by acceleration until the object is grounded.
     */
    applayGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.gravity > 0) {
                this.y -= this.gravity;
                this.gravity -= this.acceleration;

                if (!this.isAboveGround()) {
                    this.y = this.baseY;
                    this.gravity = 0;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is above the ground.
     * Special case: Always true for ThrowableObject.
     *
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) return true;
        else return this.y < this.baseY;
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovebaleObject} mo The object to check collision with.
     * @returns {boolean} True if the object is colliding, false otherwise.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.RIGHT > mo.x + mo.offset.LEFT &&
            this.y + this.height + this.offset.DOWN > mo.y + mo.offset.UP &&
            this.x + this.offset.LEFT < mo.x + mo.width - mo.offset.RIGHT &&
            this.y + this.offset.UP < mo.y + mo.height - mo.offset.DOWN
        );
    }

    /**
     * Reduces the object's health (energy) by the given damage amount.
     * Prevents repeated damage within a short time period.
     * @param {number} damage The amount of damage to reduce from the object's health.
     */
    hit(damage) {
        if (!this.isHurt()) {
            this.energy -= damage;
            this.hasPlayedAudio = false;
            if (this.energy <= 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    /**
     * Determines if the object is currently hurt (recently hit).
     * @returns {boolean} True if the object was recently hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;

        return timepassed < 1.25;
    }

    /**
     * Checks if the object is dead (its health is 0 or less).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        if (this.energy <= 0) {
            return true;
        }
    }

    /**
     * Determines if the object is near the character (within a certain distance).
     * @returns {boolean} True if the object is near the character, false otherwise.
     */
    toNear() {
        return (
            this.world.character.x + this.world.character.width - this.x > -300
        );
    }

    /**
     * Makes the object jump by setting a specific jump height and applying force.
     * @param {number} jumpheight The height to which the object should jump.
     */
    jump(jumpheight) {
        if (this.gravity === 0) {
            this.y = jumpheight;
            this.gravity = this.force;
        }
    }

    /**
     * Moves the object to the right by a specified speed.
     * @param {number} speed The speed at which the object should move.
     */
    walkRight(speed) {
        this.x += speed;
        this.walkingSound.play();
        this.world.firstInteraction = true;
    }

    /**
     * Moves the object to the left by a specified speed.
     * @param {number} speed The speed at which the object should move.
     */
    walkLeft(speed) {
        this.x -= speed;
        this.walkingSound.play();
        this.world.firstInteraction = true;
    }

    /**
     * Moves the object to the left at a constant speed.
     * @param {number} speed The speed at which the object should move left.
     */
    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60);
    }

    /**
     * Plays an animation by cycling through the given images.
     * @param {Array<string>} images An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgChache[path];
        this.currentImage++;
    }

    /**
     * Plays an animation at a slower speed by limiting the frame rate.
     * @param {Array<string>} images An array of image paths for the animation.
     */
    slowAnimation(images) {
        if (
            !this.lastIdleFrame ||
            Date.now() - this.lastIdleFrame > 1000 / 10
        ) {
            this.playAnimation(images);
            this.lastIdleFrame = Date.now();
        }
    }

    /**
     * Handles the death animation of the object and removes it from the screen after a short delay.
     */
    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            this.y = -1000;
        }, 100);
    }
}
