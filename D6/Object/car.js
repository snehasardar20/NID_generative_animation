class Car {
  constructor(x,y,size,colour,wheel) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.colour =  colour;
    this.wheel = wheel; 
    this.speed = random(1,5);
  }

  drawCar() {
    fill(this.colour);
    rect(this.x,this.y,this.size, 40);
    fill(20);
    ellipse(this.x+10,this.y+40,this.wheel);
    ellipse(this.x+this.size-10,this.y+40,this.wheel);
  }

  moveCar() {
    this.x -= this.speed;
    if(this.x <0 || this.x>width-this.size) {
      this.speed = -this.speed;
    }
  }
}