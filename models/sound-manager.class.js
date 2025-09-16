class SoundManager {
    /**
     * Creates an instance of SoundManager.
     * @param {World} world - The current game world instance.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Gets the mute status from localStorage.
     * @returns {boolean} True if muted, false otherwise.
     */
    getMuteStatus() {
        let muteStatus = localStorage.getItem("isMuted");
        return JSON.parse(muteStatus);
    }

    /**
     * Checks the current mute status and applies
     * mute or unmute accordingly.
     */
    checkMuteStatus() {
        if (this.getMuteStatus()) this.muteSound();
        else if (!this.getMuteStatus()) this.unMuteSound();
    }

    /**
     * Mutes all game sounds:
     *  Background audio
     *  Enemy sounds
     *  Throwable object sounds
     *  Character sounds
     *  Background music
     */
    muteSound() {
        backgroundAudio.forEach(bgAudio => {
            bgAudio.muted = true;
        });
        this.world.level.enemies.forEach(enemy => {
            enemy.chickenSound.muted = true;
            if (enemy.hitSound) enemy.hitSound.muted = true;
            if (enemy.attackSound) enemy.attackSound.muted = true;
        });
        this.world.level.throwableObjects.forEach(throwableObject => {
            if (throwableObject instanceof ThrowableObject)
                throwableObject.splashSound.muted = true;
        });
        this.world.characterSounds.forEach(character => {
            character.muted = true;
        });
        this.world.statusSounds.forEach(sound => {
            sound.muted = true;
        });
        backgroundMusic.muted = true;
    }

    /**
     * Unmutes all game sounds:
     *  Background audio
     *  Enemy sounds
     *  Throwable object sounds
     *  Character sounds
     *  Background music
     */
    unMuteSound() {
        backgroundAudio.forEach(bgAudio => {
            bgAudio.muted = false;
        });
        this.world.level.enemies.forEach(enemy => {
            enemy.chickenSound.muted = false;
            if (enemy.hitSound) enemy.hitSound.muted = false;
            if (enemy.attackSound) enemy.attackSound.muted = false;
        });
        this.world.level.throwableObjects.forEach(throwableObject => {
            if (throwableObject instanceof ThrowableObject)
                throwableObject.splashSound.muted = false;
        });
        this.world.characterSounds.forEach(characterSound => {
            characterSound.muted = false;
        });

        this.world.statusSounds.forEach(sound => {
            sound.muted = false;
        });
        backgroundMusic.muted = false;
    }

    /**
     * Plays background audio and music:
     *  Randomly selects one of the background audio tracks
     *  Sets volumes for audio and music
     *  Repeats playback at random intervals (1s–5s)
     */
    playAudio() {
        let randomNumber = Math.round(Math.random() * 2);
        backgroundAudio[randomNumber].volume = 0.02;
        backgroundMusic.volume = 0.04;
        backgroundAudio[randomNumber].play();
        backgroundMusic.play();

        let randomInterval = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        setTimeout(() => this.playAudio(), randomInterval);
    }
}
