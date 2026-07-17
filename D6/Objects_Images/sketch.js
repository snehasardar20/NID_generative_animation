let flowers = [];
let flowerImages = [];
let noFlowerImages = 5;
let sway = 0;

function preload() {
  for(let i =0;i<noFlowerImages;i++) {
    flowerImages[i]=loadImage("./assets/"+i+".png");
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  console.log(flowerImages);
  imageMode(CENTER);
  createFlowers(100);
}

function draw() {
  background(255);
  for(let i =0;i<flowers.length;i+=1) {
    flowers[i].drawFlower();
    
  }
  if(keyIsPressed) {
    
    for(let i =0;i<flowers.length;i+=1) {
      sway= 20*noise(10000*i+ frameCount*0.01)-5;
      flowers[i].swayFlower(sway);
    }
  }
}

function createFlowers(no) {
  for(let i =0;i<no;i++) {
    let newFlower = new Flower(random(0,width), random(height/3, height), floor(random(noFlowerImages)));
    flowers.push(newFlower);
  }
}
