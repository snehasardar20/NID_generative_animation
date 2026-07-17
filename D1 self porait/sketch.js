function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255, 250, 158);
  fill(0,0,0);
  ellipse(200,215,110,130);
  fill(0,0,0);
  rect(153,150,94,92, 0,0,30,30);
  fill(245, 155, 66);
  rect(155,150,90,90, 0,0,25,25);
  
  fill(0,0,0);
  noStroke();
  
  //hair
  ellipse(150,175,20,20);
  ellipse(150,160,35,35);
  ellipse(170,140,50,50);
  ellipse(200,135,60,60);
  ellipse(140,180,30,30);
  ellipse(135,195,30,30);
  ellipse(135,210,30,30);
  ellipse(133,235,40,40);
  ellipse(140,255,45,45);
  ellipse(165,260,45,40);
  
  ellipse(230,140,40,40);
  ellipse(245,155,35,35);
  ellipse(250,175,20,20);
  ellipse(250,175,20,20);
  ellipse(257,177,30,30);
  ellipse(260,195,30,30);
  ellipse(265,210,30,30);
  ellipse(265,235,40,40);
  ellipse(260,255,45,45);
  ellipse(235,260,45,40);

   //ear
   fill(245, 155, 66);
  noStroke();
  rect(143,187,10,22,5,0,0,5);
  rect(247,187,10,22,0,5,5,0);
  fill(145, 30, 16);
  rect(145,191,5,14,5,0,0,5);
  rect(250,191,5,14,0,5,5,0);
  

  //glass rim
  rect(163.5,188.5,28,18, 5,5,5,5);
  rect(207.5,188.5,28,18, 5,5,5,5);
  rect(230,196,20,3);
  rect(180,196,30,3);
  rect(150,196,20,3);
  
  
  //skin over
  fill(245, 155, 66);
  rect(188,224,24,16, 10,10,0,0);
  rect(166,191,23,13, 3,3,3,3);
  rect(210,191,23,13, 3,3,3,3);
  
  //eyeball
  fill(0,0,0);
  ellipse(176,198, 10,10);
  ellipse(221,198, 10,10);
  
  //eye highlight
  fill(255,255,255);
  ellipse(175,197, 4,4);
  ellipse(220,197, 4,4);
  
  //mouth
  fill(145, 30, 16);
  rect(190,229,20,3);
  
}