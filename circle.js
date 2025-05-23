class Circle {
  constructor(x, y, dx, dy, radius) {
    this.position = createVector(x, y);
    this.velocity = createVector(dx, dy);
    this.acceleration = createVector(0, 0);
    this.r = radius;
    this.c = color(random(255), random(255), random(255));
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.applyGravity();

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    this.acceleration.mult(0);

    this.bounceEdges();
    this.draw();
  }

  applyGravity() {
    let gravity = createVector(0, 0.1);
    this.applyForce(gravity);
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
    let diff = p5.Vector.sub(other.position, this.position);
    let dist = diff.mag();
    let minDist = this.r + other.r;

    if (dist < minDist) {
      let angle = diff.heading();
      let target = p5.Vector.add(this.position, p5.Vector.fromAngle(angle).mult(minDist));
      let ax = (target.x - other.position.x) * 0.05;
      let ay = (target.y - other.position.y) * 0.05;

      this.velocity.x -= ax;
      this.velocity.y -= ay;
      other.velocity.x += ax;
      other.velocity.y += ay;
    }
  }

  draw() {
    fill(this.c);
    circle(this.position.x, this.position.y, this.r);
  }
}
