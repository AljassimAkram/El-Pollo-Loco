class Chicken extends MovebaleObject {
    x = 400 + Math.random() * (2000 - 400);
    y = 340;
    width = 80;
    height = 80;
    speed = 0.3 + Math.random() * 0.25;
    damage = 5;
    chickenSound = new Audio("./assets/audio/chicken.mp3");
    hitSound = new Audio("./assets/audio/chicken-noise.mp3");
    roarSound = new Audio("./assets/audio/roar.wav");
    audioVolume = 0.2;
    IMAGES_WALKING = [
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    ];

    constructor() {
        super().loadImage(
            "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
        );
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.moveLeft(this.speed);
        this.chickenSound.volume = this.audioVolume;
        this.hitSound.volume = 0.35;
        this.roarSound.volume = 0.35;
    }

    /**
     * Main animation loop for the chicken.
     * It handles the walking animation and checks if the chicken is dead.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
            if (this.isDead()) {
                super.handleDeath();
            }
        }, 1000 / 10);
    }

    /**
     * Plays the chicken's sound effect.
     * The sound is played with a set volume level.
     */
    playChickenSound() {
        this.chickenSound.play();
    }

    /**
     * Handles the death of the chicken.
     * It plays the death animation and stops further movement.
     */
    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        this.chickenSound.pause();
        this.playHitSound();
        this.playroarSound();
    }

    hit() {
        this.energy = 0;
        this.playAnimation(this.IMAGES_DEAD);
        this.playHitSound();
        this.playroarSound();
    }

    playHitSound() {
        this.hitSound.currentTime = 0;
        this.hitSound.play();
    }
    playroarSound() {

        this.roarSound.currentTime = 0;
        this.roarSound.play();
    }

}
