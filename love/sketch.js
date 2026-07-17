// --- sketch.js ---

function setup() {
  // Use the provided screen size for the canvas
  createCanvas(1524, 857);
  // Set color mode to HSB for easier gradient and color manipulation
  // Hue: 0-360, Saturation: 0-100, Brightness: 0-100, Alpha: 0-100
  colorMode(HSB, 360, 100, 100, 100);
  noStroke(); // No outlines for the shapes, aiming for a softer look
}

function draw() {
  // Create a subtle gradient background from a warm pink to a soft purple
  for (let i = 0; i < height; i++) {
    // Interpolate color based on vertical position
    let inter = map(i, 0, height, 0, 1);
    // lerpColor() blends two colors together
    let c = lerpColor(color(330, 80, 90), color(280, 60, 70), inter); // Pink to purple
    stroke(c); // Set the interpolated color for the line
    line(0, i, width, i); // Draw a horizontal line across the canvas
  }
  noStroke(); // Reset stroke to none for the hearts

  // Use blendMode(SCREEN) for a soft, glowing overlap effect for the hearts
  // This makes the colors add up, creating brighter, more luminous areas where hearts overlap.
  blendMode(SCREEN);

  // Draw a main heart in the center, slightly offset upwards
  let mainSize = width * 0.3; // Make the heart size responsive to canvas width
  fill(340, 80, 100, 90); // Bright pink heart
  drawHeart(width / 2, height / 2 - mainSize * 0.1, mainSize);

  // Draw multiple smaller hearts scattered around the canvas
  // These hearts will have varying sizes, hues, and opacities
  for (let i = 0; i < 20; i++) {
    let x = random(width); // Random x position
    let y = random(height); // Random y position
    let size = random(width * 0.05, width * 0.15); // Random size
    let hue = random(300, 360); // Hues between purple-pink and red
    let saturation = random(50, 90);
    let brightness = random(70, 100);
    let opacity = random(20, 80); // Varying transparency

    fill(hue, saturation, brightness, opacity);
    drawHeart(x, y, size);
  }

  // Add a subtle pulsing animation to a couple of hearts
  // sin(frameCount * speed) creates a smooth oscillation
  let pulseSize = sin(frameCount * 0.05) * 10 + 50; // Pulsates between 40 and 60 pixels
  fill(340, 80, 100, 90); // Bright pink for the pulsing hearts
  drawHeart(width * 0.2, height * 0.2, pulseSize); // Top-left pulsing heart
  drawHeart(width * 0.8, height * 0.8, pulseSize); // Bottom-right pulsing heart

  // Reset blend mode to default (BLEND) for any future drawings, if needed
  blendMode(BLEND);
}

// Custom function to draw a heart shape using Bezier curves
// Bezier curves allow for smooth, organic shapes
function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y); // Start at the bottom point of the heart
  // First Bezier curve for the right side of the heart
  bezierVertex(
    x + size / 2, y - size / 2, // Control point 1
    x + size, y, // Control point 2
    x, y + size // End point (top-right curve)
  );
  // Second Bezier curve for the left side of the heart
  bezierVertex(
    x - size, y, // Control point 1
    x - size / 2, y - size / 2, // Control point 2
    x, y // End point (back to the bottom)
  );
  endShape(CLOSE); // Close the shape to fill it
}