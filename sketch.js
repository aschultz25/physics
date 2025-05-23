let circles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    circles.push(new Circle(random(width), random(height), random(-2, 2), random(-2, 2), 15));
  }
}

function draw() {
  background(220);

  for (let i = circles.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (circles[i] && circles[j]) {
        if (circles[i].checkCollision(circles[j])) {
          let newCircles = circles[i].burst().concat(circles[j].burst());
          circles.splice(i, 1);
          circles.splice(j, 1);
          circles = circles.concat(newCircles);
          break;
        }
      }
    }
  }

  for (let c of circles) {
    c.update();
  }
}
