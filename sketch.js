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

  // First update all positions
  for (let circle of movers) {
    circle.update();
  }

  // Then check collisions between each pair
  for (let i = 0; i < movers.length; i++) {
    for (let j = i + 1; j < movers.length; j++) {
      movers[i].checkCollision(movers[j]);
    }
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

  checkCollision(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    let dist = sqrt(dx * dx + dy * dy);
    let minDist = this.r + other.r;

    if (dist < minDist) {
      // Normalize direction
      let angle = atan2(dy, dx);
      let targetX = this.x + cos(angle) * minDist;
      let targetY = this.y + sin(angle) * minDist;
      let ax = (targetX - other.x) * 0.05;
      let ay = (targetY - other.y) * 0.05;

      this.dx -= ax;
      this.dy -= ay;
      other.dx += ax;
      other.dy += ay;
    }
  }

  draw() {
    fill(this.c);
    circle(this.x, this.y, this.r);
  }
}
