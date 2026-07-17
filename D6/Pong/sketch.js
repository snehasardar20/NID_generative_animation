let gameBall;
let lPaddle, rPaddle;
function setup() {
  createCanvas(innerWidth, innerHeight);
  gameBall = new Ball(width/2, height/2, 50);
  lPaddle = new Paddle(0,height/2,500,20);
  rPaddle = new Paddle(width-20,height/2,500,20);
}

function draw() {
  background(220);
  line(width/2,0, width/2,height);
  gameBall.drawBall();
  lPaddle.drawPaddle();
  rPaddle.drawPaddle();
  if(keyIsDown(38)) //up arrow
  {
    rPaddle.movePaddleUp();
  }
  if(keyIsDown(40)) //down arrow
  {
    rPaddle.movePaddleDown();
  }
  if(keyIsDown(87)) //w
  {
    lPaddle.movePaddleUp();
  }
  if(keyIsDown(83)) //s
  {
    lPaddle.movePaddleDown();
  }


  //ball movements
  gameBall.moveBall();
  gameBall.checkCollision(lPaddle);
  gameBall.checkCollision(rPaddle);
}
