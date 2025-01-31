////////////////////////////////////////////////////////////////////////
function setupL6()
{
  createSpritesL6();
  setFlags();  
}

////////////////////////////////////////////////////////////////////////
function playL6()
{
 
// Create green outline
  fill(37, 190, 70, 22);
  rect(360, 10, 280, 360, 30);

  if (startButton.mouse.pressing()) {
    isFalling = true;
  }

  if (resetButton.mouse.pressing()) {
    isFalling = false;
    setupL6();
  }

  if (nextButton.mouse.pressing())
  {
    level++;
    gamelevel++;
    reset();
  }

  if (previousButton.mouse.pressing())
  {
    level--;
    reset();
  }

  acceleration = gravity * (3*mass1 - mass2) / (mass1 + mass2);

  if (isFalling) {
    velocity += acceleration;
    mass1Y += velocity;
    mass2Y -= .33*velocity;
    pulley3bY -= .33*velocity;

    if (mass1Y >= 300 || pulley3bY <= pulley3aY + 20) {
      isFalling = false;
      velocity = 0; // Stop the movement
    }
  }

  // Draw the pulleys
  fill(200);
  ellipse(pulley3aX, pulley3aY, pulleyRadius * 2); // Pulley wheel
  ellipse(pulley3bX, pulley3bY, pulleyRadius * 2); // Pulley wheel
  ellipse(pulley3cX, pulley3cY, pulleyRadius * 2); // Pulley wheel

  // Draw the string
  stroke(0);
  strokeWeight(2);
  line(mass1X, mass1Y+50, pulley3aX - pulleyRadius, pulley3aY); // String to mass 1
  line(pulley3aX + pulleyRadius, pulley3aY, pulley3bX - pulleyRadius, pulley3bY); // String to mass 1
  line(mass2X, mass2Y, pulley3bX, pulley3bY + pulleyRadius); // String to mass 2
  line(pulley3bX, pulley3bY-pulleyRadius, pulley3bX, pulley3cY);
  line(pulley3cX, pulley3bY, pulley3cX + pulleyRadius, pulley3cY);
  line(pulley3aX, pulley3aY - pulleyRadius, pulley3aX, 10);
  line(pulley3cX, pulley3cY - pulleyRadius, pulley3cX, 10);

  // Draw the masses
  fill(150);
  ellipse(mass1X, mass1Y+50, 30, 30); // Mass 1 (ball)
   fill(220, 32, 32);
  rect(mass2X-45, mass2Y, 90, 90); // Mass 2 (rectangular block)
}

function createSpritesL6()
{
  mass1 = 34;
  mass2 = 100;

  // Pulley position
  pulley3aX = 455;
  pulley3aY = 60;

  pulley3bX = 515;
  pulley3bY = 250;

  pulley3cX = 545;
  pulley3cY = 60;

  // Initial positions of the masses
  mass1X = pulley3aX - pulleyRadius;
  mass1Y = pulley3aY + 1; // Left ball starts just below the pulley

  mass2X = pulley3bX;
  mass2Y = pulley3bY + 50; // Right mass starts at the bottom of the canvas
}