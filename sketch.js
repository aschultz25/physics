let movers = [];
let G = 0.1;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    movers.push(new Circle(random(width), random(height), random(-1, 1), random(-1, 1), 10));
  }
  ellipseMode(RADIUS);
}

function draw() {
  background(220);
  for (let circle of movers) {
    circle.update();
  }
}

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = radius;
    this.c = color(random(255), random(255), random(255)); // random RGB
  }

  update() {
    this.applyGravity();
    this.move();
    this.bounceEdges();
    this.draw();
  }

  applyGravity() {
    this.dy += G;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  bounceEdges() {
    if (this.x < this.r) {
      this.x = this.r;
      this.dx *= -1;
    }
    if (this.x > width - this.r) {
      this.x = width - this.r;
      this.dx *= -1;
    }
    if (this.y < this.r) {
      this.y = this.r;
      this.dy *= -1;
    }
    if (this.y > height - this.r) {
      this.y = height - this.r;
      this.dy *= -1;
    }
  }

  draw() {
    fill(this.c);
    circle(this.x, this.y, this.r);
  }
}
