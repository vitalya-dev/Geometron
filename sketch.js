// ===================================================================
//
//  Project: GEOMETRON - Refactored Sketch v2
//
// ===================================================================

// --- Global Variables ---
const MONITOR_HEIGHT = 450;
const CONSOLE_HEIGHT = 200;

let monitor;
let operatorConsole;


/**
 * p5.js setup function. Runs once when the program starts.
 */
function setup() {
	createCanvas(800, MONITOR_HEIGHT + CONSOLE_HEIGHT);
	monitor = new Monitor(0, 0, width, MONITOR_HEIGHT);
	operatorConsole = new OperatorConsole(0, MONITOR_HEIGHT, width, CONSOLE_HEIGHT);
}

/**
 * p5.js draw function. Runs continuously in a loop.
 */
function draw() {
	background(20, 25, 40);
	monitor.display();
	operatorConsole.display();
}

/**
 * p5.js mousePressed function. Called automatically on a mouse click.
 */
function mousePressed() {
	operatorConsole.handleInput(mouseX, mouseY);
}


// ===================================================================
//
//  Monitor Class (No changes)
//
// ===================================================================
class Monitor {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}

	drawGrid() {
		stroke(0, 255, 204, 50);
		strokeWeight(1);
		for (let x = 0; x < this.width; x += 20) {
			line(this.x + x, this.y, this.x + x, this.y + this.height);
		}
		for (let y = 0; y < this.height; y += 20) {
			line(this.x, this.y + y, this.x + this.width, this.y + y);
		}
	}
	
	display() {
		push();
		clip(() => {
			rect(this.x, this.y, this.width, this.height);
		});
		this.drawGrid();
		pop();
	}
}


// ===================================================================
//
//  OperatorConsole Class
//  (CHANGED to calculate the absolute position for its children)
//
// ===================================================================
class OperatorConsole {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		
		this.switches = [];
		
		// Define relative positions for the switches inside the console.
		const switch_x = 50;
		const switch_y = 50;
		
		// Calculate the absolute positions and pass them to the ToggleSwitch.
		// The console knows its own position (this.x, this.y) and uses
		// it to determine the final location of its components.
		this.switches.push(new ToggleSwitch('A', this.x + switch_x, this.y + switch_y));
		this.switches.push(new ToggleSwitch('B', this.x + switch_x + 100, this.y + switch_y));
		this.switches.push(new ToggleSwitch('C', this.x + switch_x + 200, this.y + switch_y));
	}
	
	handleInput(mx, my) {
		for (let s of this.switches) {
			if (s.isClicked(mx, my)) {
				s.toggle();
			}
		}
	}

	display() {
		push();
		noStroke();
		fill(26, 34, 51);
		rect(this.x, this.y, this.width, this.height);

		for (let s of this.switches) {
			s.display();
		}
		
		pop();
	}
}


// ===================================================================
//
//  ToggleSwitch Class
//  (CHANGED to be simpler; it only needs its absolute position)
//
// ===================================================================
class ToggleSwitch {
	// The constructor is now simpler. It only needs to know its
	// final, absolute position on the canvas, not how to calculate it.
	constructor(label, absoluteX, absoluteY) {
		this.label = label;
		this.absoluteX = absoluteX;
		this.absoluteY = absoluteY;
		this.width = 80;
		this.height = 100;
		this.isOn = false;
		this.statusLightOn = false;
	}

	isClicked(mx, my) {
		return (
			mx > this.absoluteX &&
			mx < this.absoluteX + this.width &&
			my > this.absoluteY &&
			my < this.absoluteY + this.height
		);
	}
	
	toggle() {
		this.isOn = !this.isOn;
		console.log(`Switch ${this.label} toggled to: ${this.isOn}`);
	}

	display() {
		const x = this.absoluteX;
		const y = this.absoluteY;
	
		stroke(0, 255, 204);
		strokeWeight(3);
		fill(51, 68, 102);
		rect(x, y, this.width, this.height, 5);

		noStroke();
		fill(0, 255, 204);
		textSize(24);
		textAlign(CENTER, CENTER);
		text(`[ ${this.label} ]`, x + this.width / 2, y + 20);

		fill(20, 20, 40);
		rect(x + 30, y + 45, 20, 40, 3);

		fill(200);
		stroke(100);
		let handleY = this.isOn ? y + 50 : y + 70;
		rect(x + 25, handleY, 30, 10, 2);

		fill(150);
		textSize(12);
		text('ON', x + this.width / 2, y + 50);
		text('OFF', x + this.width / 2, y + 80);
	}
}