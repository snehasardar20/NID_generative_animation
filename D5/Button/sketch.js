let bRadius = 50;
function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  ellipse(200, 200, 2*bRadius);
  rect(0, 0, 100, 50);
}

function mouseClicked() {
  // console.log("clicked");
  //code for rectangle button
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 50) {
    console.log("clicked in rectangle button");
    background("teal");
  }
  //code for circle button
  let distanceFromCenter = dist(200, 200, mouseX, mouseY);
  if (distanceFromCenter < bRadius) { //50 is the radius of the circle
    console.log("clicked in the ellipse button");
    background("yellow");
  }
}
