class Ball {
  constructor(x, y,size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = 10;
    this.ySpeed = 10;

  }
  drawBall() {
    ellipse(this.x,this.y,this.size);
  }
  moveBall(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    //bounce
    if(this.x>width || this.x<0) {
      this.x = width/2;
      this.y = height/2;
    }
     if(this.y>height || this.y<0) {
      this.ySpeed = -this.ySpeed;
    }
  }
  checkCollision(paddle) {
    if(abs(paddle.x - this.x)<this.size/2 && this.y >paddle.y && this.y<paddle.y+paddle.size) {
      console.log("collision");
      this.xSpeed = -this.xSpeed;
    }
  }
}