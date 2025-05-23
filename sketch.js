let circles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    circles.push(new Circle(random(width), random(height), random(-2, 2), random(-2, 2), 15));
  }
}

function draw() {
  background(220);
  
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      circles[i].checkCollision(circles[j]);
    }
  }

  for (let c of circles) {
    c.update();
  }
}

