// Game states
const GAME_STATE = {
  START: 'start',
  PLAYING: 'playing',
  GAME_OVER: 'game_over'
};

let gameState = GAME_STATE.START;
let score = 0;
let highScore = 0;

// Balloon properties
let balloon;
const BALLOON_RADIUS = 20;
// GRAVITY and LIFT are no longer used for mouse-controlled balloon,
// but kept for declaration consistency.
const GRAVITY = 0.6;
const LIFT = -18; // Increased lift for faster ascent

// Spikes properties
let spikes = [];
const SPIKE_WIDTH = 40;
const SPIKE_GAP_MIN = 120; // Minimum height of the clear path
const SPIKE_GAP_MAX = 200; // Maximum height of the clear path
const SPIKE_SPEED = 4; // Increased spike speed
const SPIKE_SPAWN_INTERVAL = 80; // Decreased interval for faster spike spawning
let lastSpikeSpawnTime = 0;

// --- Declare p5.js axis constants globally ---
// These are the internal values p5.js uses for Y_AXIS and X_AXIS
const Y_AXIS = 1;
const X_AXIS = 2;

// --- Helper function to draw linear gradients ---
// Inspired by https://p5js.org/examples/color-linear-gradient.html
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  if (axis === Y_AXIS) { // Top to bottom
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) { // Left to right
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

// --- Balloon Class ---
class Balloon {
  constructor() {
    this.x = width / 4; // Initial position (will be overridden by mouseX/Y)
    this.y = height / 2; // Initial position (will be overridden by mouseX/Y)
    this.radius = BALLOON_RADIUS;
    this.velocity = 0; // No longer used for mouse-controlled movement
  }

  show() {
    noStroke();
    let c1 = color(255, 150, 150); // Lighter red center
    let c2 = color(200, 50, 50);   // Darker red edge

    // Draw concentric ellipses to simulate radial gradient for the balloon body
    for (let r = this.radius; r > 0; r -= 1) {
      let inter = map(r, 0, this.radius, 0, 1);
      let c = lerpColor(c1, c2, inter);
      fill(c);
      ellipse(this.x, this.y, r * 2);
    }

    // Add a highlight for shine
    fill(255, 255, 255, 150); // White with transparency
    ellipse(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.6);

    // Add a string
    stroke(0);
    strokeWeight(2);
    line(this.x, this.y + this.radius, this.x, this.y + this.radius + 20);

    // Add a basket with rounded corners
    fill(139, 69, 19); // Brown
    noStroke();
    rect(this.x - 15, this.y + this.radius + 15, 30, 20, 5); // 5px rounded corners
  }

  update() {
    // Balloon now follows the mouse pointer directly
    this.x = mouseX;
    this.y = mouseY;

    // Keep balloon within canvas boundaries, accounting for the basket
    // The basket adds 15px (string) + 20px (basket height) = 35px below balloon center
    // Check X boundaries
    if (this.x < this.radius) {
      this.x = this.radius;
    }
    if (this.x > width - this.radius) {
      this.x = width - this.radius;
    }
    // Check Y boundaries
    if (this.y < this.radius) {
      this.y = this.radius;
    }
    if (this.y > height - this.radius - 35) {
      this.y = height - this.radius - 35;
    }
  }

  // The 'up()' method is no longer needed for mouse-controlled movement.
  // I have removed it.

  // Check collision with a spike pair
  collidesWith(spike) {
    // Collision logic remains the same, using this.x and this.y
    // Check collision with top spike section
    if (
      this.x + this.radius > spike.x &&
      this.x - this.radius < spike.x + spike.width &&
      this.y - this.radius < spike.y - spike.gap
    ) {
      return true;
    }

    // Check collision with bottom spike section
    if (
      this.x + this.radius > spike.x &&
      this.x - this.radius < spike.x + spike.width &&
      this.y + this.radius > spike.y
    ) {
      return true;
    }

    return false;
  }
}

// --- Spike Class ---
class Spike {
  constructor(y, gap) {
    this.x = width; // Start from the right edge
    this.y = y; // This 'y' is the top of the clear gap (and also the top of the bottom spike section)
    this.gap = gap; // Height of the clear path for the balloon
    this.width = SPIKE_WIDTH;
    this.speed = SPIKE_SPEED;
    this.passed = false; // To track if balloon has passed for scoring
  }

  show() {
    let c1 = color(0, 180, 0); // Brighter green
    let c2 = color(0, 80, 0);  // Darker green

    // Bottom spike section (from this.y to bottom of canvas)
    setGradient(this.x, this.y, this.width, height - this.y, c1, c2, Y_AXIS);

    // Top spike section (from 0 to this.y - this.gap)
    setGradient(this.x, 0, this.width, this.y - this.gap, c1, c2, Y_AXIS);

    // Add spike tips to the rectangles for a more "spiky" look
    fill(0, 220, 0); // Even brighter green for tips
    noStroke(); // Ensure no stroke for tips
    const tipHeight = 10;
    const numTips = 5; // Number of tips per spike section

    // Tips for the top spike section
    for (let i = 0; i < numTips; i++) {
      let tipX = this.x + (i + 0.5) * (this.width / numTips);
      triangle(
        tipX - tipHeight / 2, this.y - this.gap,
        tipX + tipHeight / 2, this.y - this.gap,
        tipX, this.y - this.gap - tipHeight
      );
    }

    // Tips for the bottom spike section
    for (let i = 0; i < numTips; i++) {
      let tipX = this.x + (i + 0.5) * (this.width / numTips);
      triangle(
        tipX - tipHeight / 2, this.y,
        tipX + tipHeight / 2, this.y,
        tipX, this.y + tipHeight
      );
    }
  }

  update() {
    this.x -= this.speed; // Move spikes to the left
  }

  // Check if the spike is completely off-screen to the left
  offscreen() {
    return this.x + this.width < 0;
  }
}

// --- Main p5.js Functions ---

function setup() {
  createCanvas(windowWidth, windowHeight);
  balloon = new Balloon();
  textAlign(CENTER, CENTER);
  textSize(24);
  // Load high score from local storage, default to 0 if not found
  highScore = getItem('highScore') || 0;
  frameRate(60); // Ensure a consistent 60 FPS
}

function draw() {
  // Background Gradient
  let c1 = color(173, 216, 230); // LightBlue
  let c2 = color(135, 206, 250); // LightSkyBlue
  setGradient(0, 0, width, height, c1, c2, Y_AXIS);

  switch (gameState) {
    case GAME_STATE.START:
      drawStartScreen();
      break;
    case GAME_STATE.PLAYING:
      playGame();
      break;
    case GAME_STATE.GAME_OVER:
      drawGameOverScreen();
      break;
  }
}

function drawStartScreen() {
  fill(255, 165, 0); // Orange text for visibility
  noStroke();
  textSize(32); // Larger text
  text("Avoid the Spikes!", width / 2, height / 2 - 80);
  textSize(20);
  text("Move your mouse to control the balloon", width / 2, height / 2 - 20); // Updated text
  textSize(28); // Larger start prompt
  text("Tap or click to Start", width / 2, height / 2 + 50);
}

function playGame() {
  // Update and show balloon
  balloon.update();
  balloon.show();

  // Spawn new spikes at regular intervals
  if (frameCount - lastSpikeSpawnTime > SPIKE_SPAWN_INTERVAL) {
    let gapHeight = random(SPIKE_GAP_MIN, SPIKE_GAP_MAX);
    // Ensure the gap is not too close to the top or bottom edge
    let spikeY = random(gapHeight + 50, height - 50);
    spikes.push(new Spike(spikeY, gapHeight));
    lastSpikeSpawnTime = frameCount;
  }

  // Update, show, check collision, and remove spikes
  for (let i = spikes.length - 1; i >= 0; i--) {
    let spike = spikes[i];
    spike.update();
    spike.show();

    // Check for collision with the balloon
    if (balloon.collidesWith(spike)) {
      gameState = GAME_STATE.GAME_OVER;
    }

    // Increment score when the balloon successfully passes a spike
    if (spike.x + spike.width < balloon.x - balloon.radius && !spike.passed) {
      score++;
      spike.passed = true; // Mark as passed to avoid counting multiple times
      if (score > highScore) {
        highScore = score;
        storeItem('highScore', highScore); // Save new high score to local storage
      }
    }

    // Remove spikes that have moved off-screen
    if (spike.offscreen()) {
      spikes.splice(i, 1);
    }
  }

  // Display current score and high score
  fill(255); // White text for better contrast against sky gradient
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
  text("High Score: " + highScore, 10, 40);
}

function drawGameOverScreen() {
  fill(255, 165, 0); // Orange text for visibility
  noStroke();
  textSize(32);
  text("Game Over!", width / 2, height / 2 - 100);
  textSize(24);
  text("Final Score: " + score, width / 2, height / 2 - 50);
  text("High Score: " + highScore, width / 2, height / 2);
  textSize(28);
  text("Tap or click to Restart", width / 2, height / 2 + 50);
}

// Reset game variables for a new round
function resetGame() {
  balloon = new Balloon();
  spikes = [];
  score = 0;
  lastSpikeSpawnTime = frameCount;
  gameState = GAME_STATE.PLAYING;
}

// --- User Input Handlers ---

function mousePressed() {
  handleTap();
  return false; // Prevent default browser behavior (like right-click context menu)
}

function touchStarted() {
  handleTap();
  return false; // Prevent default browser behavior (like scrolling/zooming)
}

function handleTap() {
  if (gameState === GAME_STATE.START || gameState === GAME_STATE.GAME_OVER) {
    resetGame();
  }
  // balloon.up() is no longer called here as movement is mouse-controlled
}

// --- Responsiveness ---

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Reset the game if the window is resized while playing
  if (gameState === GAME_STATE.PLAYING) {
    resetGame();
  } else {
    // Re-initialize balloon to new center if not playing, but it will immediately follow mouse
    balloon = new Balloon();
  }
}