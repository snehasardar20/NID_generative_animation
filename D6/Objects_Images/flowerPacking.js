let count = 0;

let flowerImages = [];
let noFlowerImages = 5;
let flowers=[];

function preload() {
  for (let i = 0; i < noFlowerImages; i++) {
    flowerImages[i] = loadImage("./assets/" + i + ".png");
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(220);
  for(let i =0;i<100;i++) {
    flowers.push(new Flower(random(width), random(height),floor(random(noFlowers))));
  }

}
function draw() {
  for(let i =0;i<100;i++) {
    flowers[i].drawFlower();
  }

}
