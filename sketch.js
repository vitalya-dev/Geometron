// A class to represent a single toggle switch on the console
class ToggleSwitch {
	// We pass the console's y-offset to position the switch correctly
	constructor(label, x, y, offsetY) {
		this.label = label;
		// The switch's absolute position on the canvas
		this.absoluteX = x;
		this.absoluteY = y + offsetY;
		this.width = 80;
		this.height = 100;
		this.isOn = false;
		this.statusLightOn = false; // As per GDD, light is off until point is generated
	}

	// Check if a mouse click is inside the switch's bounds
	isClicked(mx, my) {
		return (
			mx > this.absoluteX &&
			mx < this.absoluteX + this.width &&
			my > this.absoluteY &&
			my < this.absoluteY + this.height
		);
	}
	
	// Toggle the switch state
	toggle() {
		this.isOn = !this.isOn;
		console.log(`Switch ${this.label} toggled to: ${this.isOn}`);
	}

	// Draw the switch on the main canvas
	display() {
		const x = this.absoluteX;
		const y = this.absoluteY;
	
		// --- Draw the switch body ---
		stroke(0, 255, 204); // Cyan outline
		strokeWeight(3);
		fill(51, 68, 102); // Dark blue-gray
		rect(x, y, this.width, this.height, 5);

		// --- Draw the label ---
		noStroke();
		fill(0, 255, 204);
		textSize(24);
		textAlign(CENTER, CENTER);
		text(`[ ${this.label} ]`, x + this.width / 2, y + 20);

		// --- Draw the toggle slot ---
		fill(20, 20, 40);
		rect(x + 30, y + 45, 20, 40, 3);

		// --- Draw the toggle handle based on state ---
		fill(200);
		stroke(100);
		let handleY = this.isOn ? y + 50 : y + 70;
		rect(x + 25, handleY, 30, 10, 2);

		// --- Draw the "ON" / "OFF" text ---
		fill(150);
		textSize(12);
		text('ON', x + this.width / 2, y + 50);
		text('OFF', x + this.width / 2, y + 80);
	}
}

// --- Global Variables ---
const MONITOR_HEIGHT = 450;
const CONSOLE_HEIGHT = 200;
let switches = [];

function setup() {
	// Create a single, tall canvas for the entire UI
	createCanvas(800, MONITOR_HEIGHT + CONSOLE_HEIGHT);

	// Define the Y-position where the console area begins
	const consoleYOffset = MONITOR_HEIGHT;

	// Initialize our switches, passing the console's Y-offset
	switches.push(new ToggleSwitch('A', 50, 50, consoleYOffset));
	switches.push(new ToggleSwitch('B', 150, 50, consoleYOffset));
	switches.push(new ToggleSwitch('C', 250, 50, consoleYOffset));
}

function draw() {
	background(20, 25, 40); // Clear with a base color

	drawMonitor();
	drawConsole();
}

function drawMonitor() {
	// We can use clip() to ensure monitor drawings don't spill into the console
	push();
	clip(() => {
		rect(0, 0, width, MONITOR_HEIGHT);
	});
	
	// -- Draw monitor contents here --
	stroke(0, 255, 204, 50); // Faint cyan gridlines
	drawGrid();
	
	pop();
}

function drawConsole() {
	// Draw the console's background panel
	noStroke();
	fill(26, 34, 51); // Dark blue-gray from your CSS
	rect(0, MONITOR_HEIGHT, width, CONSOLE_HEIGHT);

	// Draw each switch
	for (let s of switches) {
		s.display();
	}
}

// This p5.js function is called automatically whenever the mouse is clicked
function mousePressed() {
	for (let s of switches) {
		if (s.isClicked(mouseX, mouseY)) {
			s.toggle();
		}
	}
}

// Helper function to draw a retro grid on the monitor
function drawGrid() {
	strokeWeight(1);
	for (let x = 0; x < width; x += 20) {
		line(x, 0, x, MONITOR_HEIGHT);
	}
	for (let y = 0; y < height; y += 20) {
		line(0, y, width, y);
	}
}