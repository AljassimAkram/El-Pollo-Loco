class Coin extends MovebaleObject {
    x = 200 + Math.random() * 2000;
    y = 50 + Math.random() * 150;

    IMAGES_COINS = [
        "./assets/img/8_coin/coin_1.png",
        "./assets/img/8_coin/coin_2.png",
    ];

    constructor() {
        super().loadImage(
            "./assets/img/8_coin/coin_1.png",
        );
        this.loadImages(this.IMAGES_COINS);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 3000 / 10);

    }
}
