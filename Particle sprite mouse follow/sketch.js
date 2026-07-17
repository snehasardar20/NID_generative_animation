
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0, 20); 
  particles.push(new Particle(mouseX, mouseY));
  

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.gravity = createVector(0, 0.05);
    this.radius = random(2, 8);
    this.color = color(random(255), random(255), random(255), random(100, 200));
    this.lifespan = 255; 
  }

  update() {
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
    this.lifespan -= 5;
  }

  display() {
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.lifespan);
  
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
}