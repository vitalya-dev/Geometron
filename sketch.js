// ===================================================================
//
//  Project: GEOMETRON - Refactored Sketch v5
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
		
		stroke(0, 255, 204);
		strokeWeight(4);
		noFill();
		rect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
		
		pop();
	}
}


// ===================================================================
//
//  OperatorConsole Class (No changes)
//
// ===================================================================
class OperatorConsole {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		
		this.switches = [];
		
		const switch_x = 50;
		const switch_y = 50;
		
		this.switches.push(new ToggleSwitch('A', this.x + switch_x, this.y + switch_y));
		this.switches.push(new ToggleSwitch('B', this.x + switch_x + 80, this.y + switch_y));
		this.switches.push(new ToggleSwitch('C', this.x + switch_x + 160, this.y + switch_y));
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
//  (CHANGED to use color instead of text for ON state)
//
// ===================================================================
class ToggleSwitch {
	constructor(label, absoluteX, absoluteY) {
		this.label = label;
		this.absoluteX = absoluteX;
		this.absoluteY = absoluteY;
		this.width = 60;
		this.height = 80;
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
	
		// Draw the switch body
		stroke(0, 255, 204);
		strokeWeight(3);
		fill(51, 68, 102);
		rect(x, y, this.width, this.height, 5);

		// Draw the label
		noStroke();
		fill(0, 255, 204);
		textSize(20);
		textAlign(CENTER, CENTER);
		text(`[ ${this.label} ]`, x + this.width / 2, y + 15);

		// Draw the toggle slot
		fill(20, 20, 40);
		rect(x + 22, y + 32, 16, 34, 3);

		// --- CHANGED: Set handle color based on state ---
		stroke(100);
		if (this.isOn) {
			fill(0, 255, 0); // Bright green for ON
		} else {
			fill(200); // Default gray for OFF
		}

		// Draw the toggle handle
		let handleY = this.isOn ? y + 36 : y + 54;
		rect(x + 18, handleY, 24, 10, 2);

		// --- REMOVED: The "ON" / "OFF" text is no longer drawn ---
	}
}