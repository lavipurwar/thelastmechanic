function setupL4() {

  createSpritesL4();
  setFlags(); 

}

function playL4() {

  // Create green outline
  fill(37, 190, 70, 22);
  rect(360, 10, 280, 360, 30);

  if (startButton.mouse.pressing()) {
    isFalling = true;
  }

  if (resetButton.mouse.pressing()) {
    isFalling = false;
    reset();
  }

  if (nextButton.mouse.pressing())
  {
    level++;
    reset();
  }

    if (previousButton.mouse.pressing())
  {
    level--;
    reset();
  }

    // Calculate acceleration of the system
  acceleration = gravity * (mass1 - mass2) / (mass1 + mass2);

  // Update velocity and positions if falling
  if (isFalling) {
    velocity += acceleration; // Update velocity
    mass1Y += velocity; // Update position of mass1
    mass2Y -= velocity; // Update position of mass2

    // Stop if masses reach their bounds
    if (mass1Y >= 300 || mass2Y <= pulley1Y + 20) {
      isFalling = false;
      velocity = 0; // Stop the movement
    }
  }

  // Draw the pulley
  fill(200);
  ellipse(pulley1X, pulley1Y, pulleyRadius * 2); // Pulley wheel

  // Draw the string
  stroke(0);
  strokeWeight(2);
  line(mass1X, mass1Y+50, pulley1X - pulleyRadius, pulley1Y); // String to mass 1
  line(mass2X, mass2Y, pulley1X + pulleyRadius, pulley1Y); // String to mass 2

  // Draw the masses
  fill(150);
  ellipse(mass1X, mass1Y+50, 30, 30); // Mass 1 (ball)
  fill(220, 32, 32);
  rect(mass2X - 15, mass2Y, 30, 30); // Mass 2 (rectangular block)  
}

function createSpritesL4()
{
  mass1 = 101;
  mass2 = 100;

  // Pulley position
  pulley1X = width / 2+120;
  pulley1Y = height / 9;

  // Initial positions of the masses
  mass1X = pulley1X - pulleyRadius;
  mass1Y = pulley1Y + 1; // Left ball starts just below the pulley

  mass2X = pulley1X + pulleyRadius;
  mass2Y = height - 150; // Right mass starts at the bottom of the canvas
}