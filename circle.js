class Circle {
  constructor(x, y, dx, dy, radius) {
    this.position = createVector(x, y);
    this.velocity = createVector(dx, dy);
    this.acceleration = createVector(0, 0);
    this.r = radius;
    this.c = color(random(255), random(255), random(255));
  }

  update() {
    this.applyGravity();
    this.repelFromMouse();

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.bounceEdges();
    this.draw();
  }

  applyGravity() {
    this.applyForce(createVector(0, 0.1));
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  repelFromMouse() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(this.position, mouse);
    let distance = dir.mag();
    let minDist = 50;

    if (distance < minDist) {
      dir.normalize();
      let strength = (minDist - distance) / minDist;
      dir.mult(strength * 0.5);
      this.applyForce(dir);
    }
  }

  bounceEdges() {
    if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    }
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    }
    if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
    if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
    }
  }

  checkCollision(other) {
    let d = p5.Vector.dist(this.position, other.position);
    return d < this.r + other.r;
  }

  burst() {
    let newCircles = [];
    for (let i = 0; i < 3; i++) {
      let angle = random(TWO_PI);
      let speed = random(1, 3);
      let dx = cos(angle) * speed;
      let dy = sin(angle) * speed;
      newCircles.push(new Circle(this.position.x, this.position.y, dx, dy, this.r / 2));
    }
    return newCircles;
  }

  draw() {
    fill(this.c);
    noStroke();
    circle(this.position.x, this.position.y, this.r * 2);
  }
}
