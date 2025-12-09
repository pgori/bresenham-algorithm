// create the image data
const imageWidth = 20;
const imageHeight = 10;
const imageData = createImageData();
/**
 * Creates an array of booleans where a pixel
 * is "on" when the value is `true` and "off"
 * when the value is `false`.
 *
 * The pixel values are stored in rows
 * (row-major order) where the index of a
 * pixel in the array can be found via:
 *
 *     index = y * imageWidth + x
 *
 * `x` is the horizontal position in the image
 * and `y` is the vertical position from the top
 * left corner.
 *
 * Note: This function has a return type annotation
 * of `boolean[]`. That means it's an array of
 * booleans. We'll learn more about this in a
 * future module.
 */
function createImageData() {
    // create array of size `length` containing `false` values
    const length = imageWidth * imageHeight;
    return new Array(length).fill(false);
}
function drawCircle(cx, cy, radius) {
    // Convert to integer if necessary
    const centerX = Math.round(cx);
    const centerY = Math.round(cy);
    let r = Math.round(radius);
    let x = 0;
    let y = r;
    let d = 3 - 2 * r; // initial decision
    // Auxiliar function to draw the 8 simetric points
    function draw8Pixels(x, y) {
        drawDot(centerX + x, centerY + y);
        drawDot(centerX - x, centerY + y);
        drawDot(centerX + x, centerY - y);
        drawDot(centerX - x, centerY - y);
        if (x !== y) { // avoid drawing twice in diagonals
            drawDot(centerX + y, centerY + x);
            drawDot(centerX - y, centerY + x);
            drawDot(centerX + y, centerY - x);
            drawDot(centerX - y, centerY - x);
        }
    }
    // Draws the axis first (optional, but avoid flaws at small r)
    drawDot(centerX + r, centerY);
    drawDot(centerX - r, centerY);
    drawDot(centerX, centerY + r);
    drawDot(centerX, centerY - r);
    while (x <= y) {
        draw8Pixels(x, y);
        if (d < 0) {
            d += 4 * x + 6;
        }
        else {
            d += 4 * (x - y) + 10;
            y--;
        }
        x++;
    }
}
/**
 * Draws a dot at the specific position by setting the pixel as 'on'
 *
 * @param x - the first input number
 * @param y - the second input number
 * @returns nothing/void
 *
 */
function drawDot(x, y) {
    if (isPointInImage(x, y)) {
        imageData[y * imageWidth + x] = true;
    }
}
/**
 * Gets if the provided point is in the image.
 * @param x - The horizontal position within
 * the image.
 * @param y - The vertical position within
 * the image.
 */
function isPointInImage(x, y) {
    return x >= 0 && x < imageWidth && y >= 0 && y < imageHeight;
}
/**
 * Outputs the image data state to the console.
 * @param onChar - Character to render an
 * "on" pixel with.
 * @param offChar - Character to render an
 * "off" pixel with.
 */
function outputImage(onChar = "X", offChar = " ") {
    let text = "";
    for (let i = 0; i < imageData.length; i++) {
        if (i > 0 && i % imageWidth === 0) {
            text += "\n"; // new line
        }
        text += imageData[i] ? onChar : offChar;
    }
    console.log(text);
}
function main() {
    const args = process.argv.slice(2);
    if (args.length !== 3) {
        console.log('Usage: node index.js <cx> <cy> <radius>');
        process.exit(1);
    }
    const cx = Number(args[0]);
    const cy = Number(args[1]);
    const radius = Number(args[2]);
    if (isNaN(cx) || isNaN(cy) || isNaN(radius)) {
        console.log('Arguments must be valid numbers!');
        process.exit(1);
    }
    drawCircle(cx, cy, radius);
    outputImage();
}
main();
