class StatusBar extends DrawableObject {
    percentage = 100;
    width = 180;
    height = 50;
    x = 0;
    y = 0;

    constructor() {
        super();
    }

    /**
     * Resolves the correct image index based on the current percentage.
     * The method returns an index that corresponds to a visual representation of the current status percentage.
     *
     * @returns {number} The index of the image to display based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        else if (this.percentage >= 80) return 4;
        else if (this.percentage >= 60) return 3;
        else if (this.percentage >= 40) return 2;
        else if (this.percentage >= 20) return 1;
        else if (this.percentage > 0) return 0;
        else if (this.percentage <= 0) return 0;
    }
}
