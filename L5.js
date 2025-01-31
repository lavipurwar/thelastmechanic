////////////////////////////////////////////////////////////////////////
function setupL5()
{
  createSpritesL5();
  setFlags();
}

////////////////////////////////////////////////////////////////////////
function playL5()
{
 
// Create green outline
  fill(37, 190, 70, 22);
  rect(360, 10, 280, 360, 30);

 
  if (startButton.mouse.pressing()) {
    isFalling = true;
  }

  if (resetButton.mouse.pressing()) {
    isFalling = false;
    setupL5();
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

  acceleration = gravity * (2*mass1 - mass2) / (mass1 + mass2);

  if (isFalling) {
    velocity += acceleration;
    mass1Y += velocity;
    mass2Y -= .5*velocity;
    pulley2bY -= .5*velocity;

    if (mass1Y >= 300 || pulley2bY <= pulley2aY + 20) {
      isFalling = false;
      velocity = 0; // Stop the movement
    }
  }

  // Draw the pulleys
  fill(200);
  ellipse(pulley2aX, pulley2aY, pulleyRadius * 2); // Pulley wheel
  ellipse(pulley2bX, pulley2bY, pulleyRadius * 2); // Pulley wheel

  // Draw the string
  stroke(0);
  strokeWeight(2);
  line(mass1X, mass1Y+50, pulley2aX - pulleyRadius, pulley2aY); // String to mass 1
  line(pulley2aX + pulleyRadius, pulley2aY, pulley2bX - pulleyRadius, pulley2bY); // String to mass 1
  line(mass2X, mass2Y, pulley2bX, pulley2bY + pulleyRadius); // String to mass 2
  line(pulley2bX + pulleyRadius, pulley2bY, mass2X + pulleyRadius, 10)
  line(pulley2aX, pulley2aY - pulleyRadius, pulley2aX, 10)

  // Draw the masses
  fill(150);
  ellipse(mass1X, mass1Y+50, 30, 30); // Mass 1 (ball)
   fill(220, 32, 32);
  rect(mass2X-30, mass2Y, 60, 60); // Mass 2 (rectangular block)
}

////////////////////////////////////////////////////////////////////////
function createSpritesL5()
{
  mass1 = 51;
  mass2 = 100;

  // Pulley position
  pulley2aX = 470;
  pulley2aY = 60;

  pulley2bX = 530;
  pulley2bY = 270;

  // Initial positions of the masses
  mass1X = pulley2aX - pulleyRadius;
  mass1Y = pulley2aY + 1; // Left ball starts just below the pulley

  mass2X = pulley2bX;
  mass2Y = pulley2bY + 50; // Right mass starts at the bottom of the canvas
   
}