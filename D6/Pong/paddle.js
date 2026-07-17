class Paddle {
  constructor(x, y,size,speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }
  drawPaddle() {
    rect(this.x,this.y,20,this.size);
  }
  movePaddleUp() {
    if(this.y>0) {
      this.y -= this.speed;
    }
    
  }
  movePaddleDown() {
    if(this.y<height) {
      this.y += this.speed;
    }
    
  }
}