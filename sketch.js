/**
 * setup() is called once when the program starts.
 * It's used to define initial environment properties like
 * screen size and background color.
 */
function setup() {
	// Create a canvas that is 800 pixels wide and 600 pixels tall.
	createCanvas(800, 600);
}

/**
 * draw() is called continuously and is the main function
 * for drawing shapes, text, and images to the screen.
 */
function draw() {
	// Set the background to a dark charcoal color, fitting our theme.
	background(20);

	// This is a placeholder to show that the canvas is working.
	// We'll draw a simple white ellipse in the center of the canvas.
	fill(255); // Set fill color to white
	noStroke(); // No outline for the shape
	ellipse(width / 2, height / 2, 50, 50); // Draw a circle
}