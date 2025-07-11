## **Game Design Document: Project GEOMETRON**

**Version:** 1.0
**Date:** July 10, 2025

### **1. Game Overview**

**Project: GEOMETRON** is an educational puzzle game where players operate a stylish, retro-futuristic "Geometric Analysis Terminal." Through a tactile, physical-feeling interface of switches and buttons, players learn and discover fundamental and advanced geometric theorems. The game is less about free-form drawing and more about logical deduction and operating a cool piece of virtual hardware.

* **Genre:** Educational Puzzle, Simulation
* **Platform:** HTML5 (Web Browser)
* **Engine:** p5.js
* **Target Audience:** STEM students, puzzle game enthusiasts, and anyone with an appreciation for retro-tech aesthetics.

---

### **2. Core Design Pillars**

1.  **Tactile, Physical Interface:** Every interaction should feel like operating a real, physical machine. The distinction between state-based **switches** (inputs) and action-based **buttons** (commands) is paramount. Sound and animation are key to making the console feel satisfying to use.
2.  **Rewarding Discovery:** The player's goal is to uncover geometric truths. The "aha!" moments—like when three points align to form the Euler line or nine points fall perfectly on the Nine-Point Circle—are the central rewards.
3.  **Cohesive Retro-Tech Aesthetic:** The entire presentation is filtered through the lens of a CRT monitor from an alternate-history 1980s. All visuals (glow, scanlines, pixelated fonts) and audio (hums, clacks, zaps) must conform to this theme.

---

### **3. Gameplay Loop**

The core gameplay is a deliberate, satisfying cycle:

1.  **OBSERVE:** The player reads the objective on the left-hand monitor. (`"Find the center of the incircle."`)
2.  **SELECT:** The player determines the necessary inputs for the required construction (e.g., three points for an angle bisector). They flip the corresponding **Input Switches** on the console to the 'ON' position.
3.  **EXECUTE:** The relevant **Function Buttons** on the console light up. The player presses the correct button (`[ANGLE BISECTOR]`) to issue a command to the machine.
4.  **ANALYZE:** The machine performs the construction on the visual display. The player analyzes the result and determines the next step, repeating the loop until the objective is complete.

---

### **4. Core Mechanics & Controls**

The game is controlled entirely through the **Operator's Console**.

#### **Input Switches**
A fixed bank of toggle switches representing points (`[A]`, `[B]`, `[C]`, etc.).
* All switches are always present.
* Each switch has an associated "Status Light." The light is OFF if the point has no position and turns ON permanently once the point is generated on screen.
* Flipping a switch to 'ON' selects that point as an input for a function.

#### **Function Buttons**
A fixed set of push-buttons for executing commands. Buttons only light up and become pressable when the correct number/type of inputs are selected.

* **Creation Buttons:**
    * `[GENERATE POINT]`: Assigns a random position to the point selected by a single Input Switch.
    * `[CREATE SEGMENT]`: Creates a line segment between two selected points.
* **Construction Buttons:**
    * `[MIDPOINT]`: Finds the midpoint of a segment (2 points).
    * `[PERP. BISECTOR]`: Creates the perpendicular bisector of a segment (2 points).
    * `[ANGLE BISECTOR]`: Creates the bisector of an angle (3 points). The game will need a way to specify which point is the vertex.
    * `[ALTITUDE]`: Creates the altitude from one point to the opposite side (3 points).
* **Utility Buttons:**
    * `[RESET PUZZLE]`: Clears all constructions, leaving the initial points.

---

### **5. Game Progression**

The game is structured as a series of "puzzles" or "objectives," introducing one new concept at a time.

1.  **Level 0: System Boot-Up (Tutorial)**
    * **Objective:** Generate the initial triangle.
    * **Mechanic Learned:** `[GENERATE POINT]` and `[CREATE SEGMENT]`.
2.  **Level 1: The Circumcenter**
    * **Objective:** Find the center of the circumcircle.
    * **Mechanic Learned:** `[MIDPOINT]` and `[PERP. BISECTOR]`.
3.  **Level 2: The Incenter**
    * **Objective:** Find the center of the incircle.
    * **Mechanic Learned:** `[ANGLE BISECTOR]`.
4.  **Level 3: The Euler Line**
    * **Objective:** Discover the line connecting the Orthocenter, Circumcenter, and Centroid.
    * **Mechanics Learned:** `[ALTITUDE]` to find the Orthocenter; combining existing skills to find the Centroid.
5.  **Level 4: The Nine-Point Circle**
    * **Objective:** Uncover the nine special points that lie on a single circle.
    * **Mechanics Learned:** A combination of all previously learned skills. This is the grand finale puzzle.

---

### **6. UI and Art Direction**

* **Layout:** A dual-monitor setup with the Operator's Console below, as per the final ASCII mockup.
* **Visual Style:** Heavy CRT aesthetic. Everything glows. Use of scanlines, screen curvature, and high-contrast colors (e.g., magenta, cyan, gold on a dark blue/charcoal background). Fonts should be pixelated or monospace.
* **Sound Design:** Crucial for the tactile feel.
    * **Ambient:** A low, constant electronic hum.
    * **Switches:** A sharp, satisfying "clack."
    * **Buttons:** A deeper, momentous "ker-chunk" or "click."
    * **Feedback:** "Zaps" for line creation, "chimes" or "power-ups" for discovering key points.
