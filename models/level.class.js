class Level {
    enemies;
    clouds;
    backgroundObjects;
    throwableObjects;
    coins;
    levelEndX = 700 * 5 + 150;

    /**
     * Initializes the level with the provided entities and objects.
     * @param {Array<Enemy>} enemies - The enemies in the level.
     * @param {Array<ThrowableObject>} throwableObjects - The throwable objects in the level.
     * @param {Array<Coin>} coins - The coins in the level.
     * @param {Array<Cloud>} clouds - The clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - The background objects in the level.
     */
    constructor(enemies, throwableObjects, coins, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.throwableObjects = throwableObjects;
        this.coins = coins;
    }
}
