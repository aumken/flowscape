# flowscape

Visualize the effect of Perlin noise on vector fields.

Made with: p5.js, JavaScript, HTML, CSS

the concept and applications of 'perlin noise' are fascinating. i was first introduced to perlin noise when i tried to wrap my head around terrain generation in minecraft. i understand perlin noise to be the bridge between something random and natural -- pseudo-random signals crafted to mimic the irregularities of textures, gradients, or motion. (click the vector field to change flow direction!)

perlin noise was invented by ken perlin in 1983 as a way of creating more natural looking cgi for the movie 'tron'. using a smooth and continuous function, perlin noise is capable of creating pseudo-random values at different points in space and meshing them together using gradient vectors to make a smooth noise function.

i was particularly interested in modeling the flow of liquids using a perlin noise *flow field*, which uses perlin noise to generate a vector field. The vectors point in a given direction based on the perlin noise value at that point. and by animating the flow of particles based on those noise values, organic and natural-looking animations can be developed.

to create perlin noise flow fields, i used the p5 javascript library through the p5.vscode extension. p5 has it's own native online editor and preview, but to get it running on visual studio, all i had to do was open the command pallette and enter 'create p5.js project'. to see the visualization, click 'go live' at the bottom right of visual studio and take a trip to your localhost.

im going to attempt to break down the code.

```
let particles = [];  
const numberOfParticles = 20000;  
const noiseScale = 0.01;
```

- here im setting up an array of particles that we will create later. the two constants are pretty self-explanatory, `numberOfParticles` is the number of particles that will be part of our flow field and the `noiseScale` is the factor by which we will have to scale down the x and y so we can 'zoom in' on the noise -- otherwise our display will be too grainy.



```
function setup() {  
  createCanvas(1500, 1000);  
  for(let i = 0; i < numberOfParticles; i++) {  
    particles.push(createVector(random(width), random(height)));  
  }  
}
```

- the `setup()` function will enable us to create the canvas for the vector field and it will start to push particles of random heights and widths to the array we made earlier.



```
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
```

- the `draw()` function will first create a background that is based on two parameters.
	 1. the desired 'brightness' of the background, 0 being black and 255 being white.
	 2. the opacity of the background -- this adds a trailing effect to the moving particles

- the for loop is the core of the `draw()` function, where each particle is assigned an angle in radians based on the `noiseSeed` of the program, and then using basic trig we can modify the x and y positions of a particle. if desired, you can multiply by a desired speed and change the direction of particle flow from right to left by doing this:

  ```
  a.x += cos(c) * speed;  
  a.y += sin(c) * speed;
  ```

- i'll discuss the `!visible` logic below



```
function visible(vector) {  
  return vector.x <= width && vector.x >=0 && vector.y <= height && vector.y >= 0;  
}
```

- this function just determines if we 'lose' a particle over the edge of the canvas so that we can have it reassigned a new x and y position in the `draw()` function.



```
function mouseReleased() {  
  noiseSeed(millis());  
}
```

  when we click and release our mouse, the `mouseReleased()` function will reassign the `noiseSeed` based on the number of milliseconds that have passed since the `setup()` function was called, so that there is always a new `noiseSeed` whenever the mouse is clicked and released.
