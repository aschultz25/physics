let circles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    circles.push(new Circle(random(width), random(height), random(-2, 2), random(-2, 2), 15));
  }
}

function draw() {
  background(220);

  let collisions = [];
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      if (circles[i].checkCollision(circles[j])) {
        collisions.push([i, j]);
      }
    }
  }

  collisions.sort((a, b) => b[1] - a[1]);
  for (let [i, j] of collisions) {
    if (circles[i] && circles[j]) {  
      
      let centerX = (circles[i].position.x + circles[j].position.x) / 2;
      let centerY = (circles[i].position.y + circles[j].position.y) / 2;

      circles.splice(j, 1);
      circles.splice(i, 1);

      let numNew = 3
      for (let k = 0; k < numNew; k++) {
        circles.push(new Circle(
          centerX,
          centerY,
          random(-3, 3),
          random(-3, 3),
          7 
        ))
      }
    }
  }

  for (let c of circles) {
    c.update();
  }
}
