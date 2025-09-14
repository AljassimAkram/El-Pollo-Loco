class DrawableObject {
    x = 120;
    y = 240;
    width = 100;
    height = 100;
    img;
    imgChache = [];
    currentImage = 0;
    offset = {
        LEFT: 5,
        RIGHT: 5,
        UP: 5,
        DOWN: 5,
    };

    /**
     * Loads a single image from the given path.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images from an array of paths into the image cache.
     * @param {Array<string>} arr - An array of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgChache[path] = img;
        });
    }

    /**
     * Draws the object onto the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
