// Wind parameters
const windSpeed = 0.05;      // How fast the hair sways
const windMagnitude = 5;     // How far the hair sways horizontally
const windPhaseOffset = 0.5; // Offset for staggering hair movement

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 250, 158); // Soft yellow background

  // --- Head and Face Outline ---
  fill(0,0,0); // Black outline for head
  ellipse(200,215,110,130); // Head outline

  // --- Glasses Frame (Black) ---
  fill(0,0,0);
  rect(153,150,94,92, 0,0,30,30); // Main part of glasses

  // --- Skin Color ---
  fill(245, 155, 66); // Skin tone
  rect(155,150,90,90, 0,0,25,25); // Skin inside glasses

  fill(0,0,0);
  noStroke(); // Remove stroke for hair

  // --- HAIR ANIMATION ---
  // The wind will move the hair slightly horizontally using a sine wave.
  // Each ellipse has a phase offset to make the movement look more natural.

  // Left hair original positions and sizes
  const leftHair = [
    {x: 150, y: 175, w: 20, h: 20, phase: 0},
    {x: 150, y: 160, w: 35, h: 35, phase: 1},
    {x: 170, y: 140, w: 50, h: 50, phase: 2},
    {x: 200, y: 135, w: 60, h: 60, phase: 3},
    {x: 140, y: 180, w: 30, h: 30, phase: 4},
    {x: 135, y: 195, w: 30, h: 30, phase: 5},
    {x: 135, y: 210, w: 30, h: 30, phase: 6},
    {x: 133, y: 235, w: 40, h: 40, phase: 7},
    {x: 140, y: 255, w: 45, h: 45, phase: 8},
    {x: 165, y: 260, w: 45, h: 40, phase: 9},
  ];

  for (let i = 0; i < leftHair.length; i++) {
    const hair = leftHair[i];
    // Calculate horizontal offset based on frameCount and hair's phase
    const offsetX = sin(frameCount * windSpeed + hair.phase * windPhaseOffset) * windMagnitude;
    ellipse(hair.x + offsetX, hair.y, hair.w, hair.h);
  }

  // Right hair original positions and sizes
  const rightHair = [
    {x: 230, y: 140, w: 40, h: 40, phase: 0},
    {x: 245, y: 155, w: 35, h: 35, phase: 1},
    {x: 250, y: 175, w: 20, h: 20, phase: 2},
    {x: 257, y: 177, w: 30, h: 30, phase: 3},
    {x: 260, y: 195, w: 30, h: 30, phase: 4},
    {x: 265, y: 210, w: 30, h: 30, phase: 5},
    {x: 265, y: 235, w: 40, h: 40, phase: 6},
    {x: 260, y: 255, w: 45, h: 45, phase: 7},
    {x: 235, y: 260, w: 45, h: 40, phase: 8},
  ];

  for (let i = 0; i < rightHair.length; i++) {
    const hair = rightHair[i];
    // Offset by PI so right hair sways in the opposite direction
    const offsetX = sin(frameCount * windSpeed + hair.phase * windPhaseOffset + PI) * windMagnitude;
    ellipse(hair.x + offsetX, hair.y, hair.w, hair.h);
  }

  // --- EARS ANIMATION ---
  // Apply a slightly reduced wind effect to the ears
  const earWindMagnitude = windMagnitude * 0.5; // Ears sway less than hair
  const leftEarOffsetX = sin(frameCount * windSpeed) * earWindMagnitude;
  const rightEarOffsetX = sin(frameCount * windSpeed + PI) * earWindMagnitude;

  fill(245, 155, 66); // Skin tone for ears
  noStroke();
  rect(143 + leftEarOffsetX,187,10,22,5,0,0,5); // Left ear skin
  rect(247 + rightEarOffsetX,187,10,22,0,5,5,0); // Right ear skin
  fill(145, 30, 16); // Reddish color for inner ear
  rect(145 + leftEarOffsetX,191,5,14,5,0,0,5); // Left inner ear
  rect(250 + rightEarOffsetX,191,5,14,0,5,5,0); // Right inner ear

  // --- Glasses Rim (Static) ---
  // Assuming glasses are rigid and move with the head (which is static)
  rect(163.5,188.5,28,18, 5,5,5,5);
  rect(207.5,188.5,28,18, 5,5,5,5);
  rect(230,196,20,3);
  rect(180,196,30,3);
  rect(150,196,20,3);

  // --- Skin Overlays (Static) ---
  // These rects create the illusion of skin over hair/glasses, so they don't move independently
  fill(245, 155, 66); // Skin tone
  rect(188,224,24,16, 10,10,0,0); // Skin under mouth
  rect(166,191,23,13, 3,3,3,3); // Skin over left eye
  rect(210,191,23,13, 3,3,3,3); // Skin over right eye

  // --- Eyes (Static) ---
  fill(0,0,0); // Black for pupils
  ellipse(176,198, 10,10); // Left pupil
  ellipse(221,198, 10,10); // Right pupil

  // --- Eye Highlights (Static) ---
  fill(255,255,255); // White for highlights
  ellipse(175,197, 4,4); // Left highlight
  ellipse(220,197, 4,4); // Right highlight

  // --- Mouth (Static) ---
  fill(145, 30, 16); // Reddish for mouth
  rect(190,229,20,3); // Mouth line
}