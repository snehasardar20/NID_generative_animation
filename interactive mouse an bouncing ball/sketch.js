
let ballX;
let ballY;
let ballRadius = 30; 
let ballVX = 5;     
let ballVY = 0;     
let gravity = 0.5;  
let bounceFactor = 0.8; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  ballX = width / 2;
  ballY = height / 2;
  noStroke();
}

function draw() {
  background(220); 
  ballVY += gravity;

  
  ballX += ballVX;
  ballY += ballVY;


  if (ballX + ballRadius > width) {
    ballX = width - ballRadius; 
    ballVX *= -bounceFactor;    
  } else if (ballX - ballRadius < 0) {
    ballX = ballRadius;         
    ballVX *= -bounceFactor;    
  }

 
  if (ballY + ballRadius > height) {
    ballY = height - ballRadius;
    ballVY *= -bounceFactor;    
    if (abs(ballVY) < 1) {
      ballVY = 0;
      ballY = height - ballRadius;
    }
  } else if (ballY - ballRadius < 0) {
    ballY = ballRadius;          
    ballVY *= -bounceFactor;     
  }

  fill(0, 100, 255); 
  circle(ballX, ballY, ballRadius * 2); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ballX = width / 2;
  ballY = height / 2;
}


function mousePressed() {
  ballX = mouseX; 
  ballY = mouseY; 
  ballVY = -15; 
  ballVX = random(-10, 10); 
}


function touchStarted() {
  mousePressed(); 
  return false;
}