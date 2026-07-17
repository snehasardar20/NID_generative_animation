let cars = [];
let myCar, yourCar;
function setup() {
  createCanvas(innerWidth, innerHeight);

}

function draw() {
  background(220);
  for(let i =0;i<cars.length;i++) {
    cars[i].drawCar();
    cars[i].moveCar();
  }
}

function mousePressed() {
  let randomColour = color(random(0,255), random(0,255), random(0,255));
  let newCar = new Car(mouseX,mouseY,random(50,200),randomColour,20);
  cars.push(newCar);
}
