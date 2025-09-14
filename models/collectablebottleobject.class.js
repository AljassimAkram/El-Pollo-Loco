class Bottle extends DrawableObject {
    x = 400 + Math.random() * (2000 - 400);
    y = 330;
    offset = { ...this.offset, LEFT: 40 };

    IMAGES_BOTTLE = [
        "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        let path = this.IMAGES_BOTTLE[Math.floor(Math.random() * 2)];
        this.img = this.imgChache[path];
    }
}
