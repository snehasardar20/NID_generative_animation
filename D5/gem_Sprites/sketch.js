// Spritesheet variables
let sX = 8;
let sY = 4;
let spriteSheet;

//cel variables
let celW, celH;
let cels = [];

let x =0;

function preload() {
  spriteSheet = loadImage("./images/explosionFull.png")
}
function setup() {
  createCanvas(400,400);
  //calculating the cel width and height
  celW = spriteSheet.width/sX;
  celH = spriteSheet.height/sY;
  //breaking the spritesheet into cels and storing it in an array
  for(let i =0;i<sY;i+=1) {
    for(let j =0;j<sX;j+=1) {
      cels[i*sX + j] = spriteSheet.get(j*celW, i*celH, celW, celH);
    }
  }
}

function draw() {
  background(0);
  if(keyIsPressed==true) {
    x+=1; 
  }
  image(cels[x%32],0,0);
  
}

