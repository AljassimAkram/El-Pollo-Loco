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
  * Mutes all game sounds.
  */
    muteSound() {
        this.muteGlobalSounds();
        this.muteWorldSounds();
    }

    /**
     * Mutes global sounds such as background audio and music.
     */
    muteGlobalSounds() {
        backgroundAudio.forEach(bgAudio => bgAudio.muted = true);
        backgroundMusic.muted = true;
    }

    /**
     * Mutes all sounds that belong to world objects
     * (enemies, throwable objects, character, status).
     */
    muteWorldSounds() {
        this.world.level.enemies.forEach(enemy => {
            enemy.chickenSound.muted = true;
            if (enemy.hitSound) enemy.hitSound.muted = true;
            if (enemy.attackSound) enemy.attackSound.muted = true;
            if (enemy.roarSound) enemy.roarSound.muted = true;
        });

        this.world.level.throwableObjects.forEach(obj => {
            if (obj instanceof ThrowableObject) obj.splashSound.muted = true;
        });

        this.world.characterSounds.forEach(s => s.muted = true);
        this.world.statusSounds.forEach(s => s.muted = true);
    }

    /**
     * Unmutes all game sounds.
    */
    unMuteSound() {
        this.unMuteGlobalSounds();
        this.unMuteWorldSounds();
    }

    /**
     * Unmutes global sounds such as background audio and music.
     */
    unMuteGlobalSounds() {
        backgroundAudio.forEach(bgAudio => bgAudio.muted = false);
        backgroundMusic.muted = false;
    }

    /**
     * Unmutes all sounds that belong to world objects
     * (enemies, throwable objects, character, status).
     */
    unMuteWorldSounds() {
        this.world.level.enemies.forEach(enemy => {
            enemy.chickenSound.muted = false;
            if (enemy.hitSound) enemy.hitSound.muted = false;
            if (enemy.attackSound) enemy.attackSound.muted = false;
            if (enemy.roarSound) enemy.roarSound.muted = false;
        });

        this.world.level.throwableObjects.forEach(obj => {
            if (obj instanceof ThrowableObject) obj.splashSound.muted = false;
        });

        this.world.characterSounds.forEach(s => s.muted = false);
        this.world.statusSounds.forEach(s => s.muted = false);
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
