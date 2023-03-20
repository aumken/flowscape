let particles = [];
const numberOfParticles = 20000;
const noiseScale = 0.01;

function setup() {
  // 
  createCanvas(1500, 1000);
  for(let i = 0; i < numberOfParticles; i++) {
    particles.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(220,10);
  for(let i = 0; i < numberOfParticles; i++) {
    let a = particles[i]
    point(a.x, a.y);
    let b = noise(a.x * noiseScale, a.y * noiseScale);
    let c = 2 * PI * b;

    a.x -= cos(c);
    a.y -= sin(c);

    if (!visible(a)) {
      a.x = random(width);
      a.y = random(height);
    }
  }
}

function visible(vector) {
  return vector.x <= width && vector.x >=0 && vector.y <= height && vector.y >= 0;
}

function mouseReleased() {
  noiseSeed(millis());
}