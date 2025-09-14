class Bottle extends MovebaleObject {
    x = 400 + Math.random() * (2000 - 400);
    y = 340;
    height = 80;
    width = 80;
    offset = { ...this.offset, LEFT: 40 };

    IMAGES_BOTTLE = [
        "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    constructor() {
        super().loadImage(
            "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        );
        this.loadImages(this.IMAGES_BOTTLE);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 3000 / 10);

    }
}
