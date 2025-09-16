class Endboss extends MovebaleObject {
    x = 3650;
    y = 55;
    baseY = this.y;
    width = 400;
    height = 400;

    offset = {
        LEFT: 60,
        RIGHT: 2.5,
        UP: 35,
        DOWN: 2.5,
    };

    damage = 5;
    energy = 115;
    chickenSound = new Audio("./assets/audio/chicken.mp3");
    hitSound = new Audio("./assets/audio/endboss-noise.mp3");
    audioVolume = 0.25;
    hasSpottedPlayer = false;
    walkingInterval = null;
    attackInterval = null;
    deadInterval = null;
    isAttacking = false;
    hasJumped = false;
    FOLLOW_SPEED = 0.5;
    FOLLOW_SPEED_ON_SCREEN = 2;
    ATTACK_RANGE_X = 150;
    ATTACK_RANGE_Y = 180;
    ATTACK_SPEED_BASE = 0;
    IMAGES_WALKING = [
        "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
        "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
        "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_ATTACK = [
        "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
        "./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_HURT = [
        "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
        "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
        "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
        "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    constructor() {
        super().loadImage(
            "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applayGravity();
        this.chickenSound.volume = this.audioVolume;
        this.hitSound.volume = 1;
        this.speed = this.FOLLOW_SPEED;
    }

    /** Starts the main animation loop. */
    animate() {
        setInterval(() => this.updateState(), 100);
    }

    isHurt() {
        let timePassed = (new Date().getTime() - this.lastHit) / 1100;
        return timePassed < 1.75;

    }

    /** Decides which state to handle. */
    updateState() {
        if (this.isDead()) return this.handleState("dead");
        if (this.isHurt()) return this.handleState("hurt");
        if (this.isCloseToCharacter()) return this.handleState("attack");
        if (!this.hasSpottedPlayer && this.toNear && this.toNear())
            return this.handleState("alert");
        this.handleState("walk");
    }

    /** Executes behavior for given state. */
    handleState(s) {
        if (s === "dead") { this.stopAttack(); this.stopWalking(); this.handleDead(); }
        else if (s === "hurt") { this.stopAttack(); this.handleHurt(); }
        else if (s === "attack") { this.handleAttack(); }
        else if (s === "alert") { this.stopAttack(); this.handleAlert(); }
        else { this.stopAttack(); this.handleWalking(); }
    }

    /**
     * Stops walking by clearing the walking interval.
    */
    stopWalking() {
        if (this.walkingInterval) {
            clearInterval(this.walkingInterval);
            this.walkingInterval = null;
        }
    }

    /**
     * Stops attacking, resets state and speed.
     */
    stopAttack() {
        if (this.attackInterval) {
            clearInterval(this.attackInterval);
            this.attackInterval = null;
        }
        this.isAttacking = false;
        this.setFollowSpeed();
    }

    /**
     * Plays hurt animation and triggers jump reaction.
     */
    handleHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.hasJumped) {
            this.jump(5);
            this.hasJumped = true;
        } else if (this.y >= this.baseY) {
            this.hasJumped = false;
        }
    }

    /**
     * Handles death animation and falling down effect.
     */
    handleDead() {
        if (this.deadInterval) return;
        this.deadInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
            this.y += 10;
        }, 1000 / 10);
    }

    /**
     * Plays alert animation and sets follow speed.
     */
    handleAlert() {
        this.playAnimation(this.IMAGES_ALERT);
        this.setFollowSpeed();
    }

    /**
     * Attack ONLY: stop walking movement and play attack animation.
     */
    handleAttack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            this.stopWalking();
        }
        this.speed = this.ATTACK_SPEED_BASE;
        if (this.world && this.world.character) {
            this.otherDirection = this.world.character.x > this.x;
        }
        if (!this.attackInterval) {
            this.attackInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_ATTACK);
            }, 1000 / 10);
        }
    }

    /**
     * Plays walking animation and starts movement if not attacking.
    */
    handleWalking() {
        if (this.isAttacking) return;
        this.playAnimation(this.IMAGES_WALKING);
        this.setFollowSpeed();
        if (!this.walkingInterval) this.startWalkingInterval();
    }

    /**
     * Starts the walking interval for following or patrolling.
    */
    startWalkingInterval() {
        this.walkingInterval = setInterval(() => {
            if (!this.world) return;
            if (!this.hasSpottedPlayer && this.isOnScreen()) {
                this.hasSpottedPlayer = true;
                this.setFollowSpeed();
            }
            if (this.hasSpottedPlayer) {
                this.followCharacter();
            } else if (this.x > 500) {
                this.x -= this.speed;
                this.otherDirection = false;
            }
        }, 1000 / 80);
    }

    /**
     * Determines if the Endboss is close enough to the character to attack.
     * Robust: X und Y (Zentren) werden geprüft.
    */
    isCloseToCharacter() {
        if (!this.world || !this.world.character) return false;
        const c = this.world.character;
        const bossCenterX = this.x + this.width / 2;
        const bossCenterY = this.y + this.height / 2;
        const charCenterX = c.x + c.width / 2;
        const charCenterY = c.y + c.height / 2;
        const dx = Math.abs(bossCenterX - charCenterX);
        const dy = Math.abs(bossCenterY - charCenterY);
        return dx <= this.ATTACK_RANGE_X && dy <= this.ATTACK_RANGE_Y;
    }

    /**
     * Checks if the Endboss is currently visible on the screen.
     */
    isOnScreen() {
        if (!this.world) return false;
        const screenLeft = -this.world.camera_x;
        const screenRight = screenLeft + this.world.canvas.width;
        return this.x + this.width > screenLeft && this.x < screenRight;
    }

    /**
     * Move towards the character while NOT attacking.
     */
    followCharacter() {
        if (this.isAttacking || !this.world || !this.world.character) return;

        if (this.x > this.world.character.x) {
            this.x -= this.speed;
            this.otherDirection = false;
        } else {
            this.x += this.speed;
            this.otherDirection = true;
        }
    }

    /**
     * Adjusts the current movement speed based on whether the player is visible.
    */
    setFollowSpeed() {
        this.speed = this.hasSpottedPlayer
            ? this.FOLLOW_SPEED_ON_SCREEN
            : this.FOLLOW_SPEED;
    }

    hit(damage) {
        const prev = this.energy;   // Energie vorher
        super.hit(damage);          // Basisklasse (mit i-frames etc.)
        if (this.energy < prev) {   // nur wenn wirklich Schaden
            this.playHitSound();
        }
    }


    /**
     * Plays the Endboss hit sound effect.
     */
    playHitSound() {
        this.hitSound.currentTime = 0;
        this.hitSound.play();
    }

}
