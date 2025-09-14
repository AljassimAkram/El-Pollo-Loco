let level1;
let chickenAmount = 5;
let smallChickenAmount = 5;
let bottleAmount = 5;
let coinAmount = 10;
let backgroundData = [
    ["./assets/img/5_background/layers/air.png", -719],
    ["./assets/img/5_background/layers/3_third_layer/2.png", -719],
    ["./assets/img/5_background/layers/2_second_layer/2.png", -719],
    ["./assets/img/5_background/layers/1_first_layer/2.png", -719],

    ["./assets/img/5_background/layers/air.png", 0],
    ["./assets/img/5_background/layers/3_third_layer/1.png", 0],
    ["./assets/img/5_background/layers/2_second_layer/1.png", 0],
    ["./assets/img/5_background/layers/1_first_layer/1.png", 0],

    ["./assets/img/5_background/layers/air.png", 719],
    ["./assets/img/5_background/layers/3_third_layer/2.png", 719],
    ["./assets/img/5_background/layers/2_second_layer/2.png", 719],
    ["./assets/img/5_background/layers/1_first_layer/2.png", 719],

    ["./assets/img/5_background/layers/air.png", 719 * 2],
    ["./assets/img/5_background/layers/3_third_layer/1.png", 719 * 2],
    ["./assets/img/5_background/layers/2_second_layer/1.png", 719 * 2],
    ["./assets/img/5_background/layers/1_first_layer/1.png", 719 * 2],

    ["./assets/img/5_background/layers/air.png", 719 * 3],
    ["./assets/img/5_background/layers/3_third_layer/2.png", 719 * 3],
    ["./assets/img/5_background/layers/2_second_layer/2.png", 719 * 3],
    ["./assets/img/5_background/layers/1_first_layer/2.png", 719 * 3],

    ["./assets/img/5_background/layers/air.png", 719 * 4],
    ["./assets/img/5_background/layers/3_third_layer/1.png", 719 * 4],
    ["./assets/img/5_background/layers/2_second_layer/1.png", 719 * 4],
    ["./assets/img/5_background/layers/1_first_layer/1.png", 719 * 4],

    ["./assets/img/5_background/layers/air.png", 719 * 5],
    ["./assets/img/5_background/layers/3_third_layer/2.png", 719 * 5],
    ["./assets/img/5_background/layers/2_second_layer/2.png", 719 * 5],
    ["./assets/img/5_background/layers/1_first_layer/2.png", 719 * 5],
];

/**
 * Generates a specified amount of elements of a given class.
 * @param {Function} ElementClass - The class constructor to instantiate elements.
 * @param {number} amount - The number of elements to generate.
 * @returns {Array} The array of generated elements.
 */
function generateElements(ElementClass, amount) {
    const elements = [];
    for (let i = 0; i < amount; i++) {
        elements.push(new ElementClass());
    }
    return elements;
}

/**
 * Generates background objects from the provided data.
 * @param {Array} data - The background data consisting of image paths and positions.
 * @returns {Array} The array of BackgroundObject instances.
 */
function generateBackgroundObjects(data) {
    return data.map(
        ([image, position]) => new BackgroundObject(image, position)
    );
}

/**
 * Sets up the level with chickens, small chickens, bottles, coins, clouds, and background objects.
 */
function setLevel() {
    level1 = new Level(
        [
            ...generateElements(Chicken, chickenAmount),
            ...generateElements(SmallChicken, smallChickenAmount),
            new Endboss(),
        ],
        [...generateElements(Bottle, bottleAmount)],
        [...generateElements(Coin, coinAmount)],
        new Cloud(),
        generateBackgroundObjects(backgroundData)
    );
}
