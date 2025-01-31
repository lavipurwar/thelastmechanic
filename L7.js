////////////////////////////////////////////////////////////////////////
function setupL7()
{
  createSpritesL7();
  setFlags();  
}

function playL7() {

  fill(150, 12, 143, 169);
  rect(0, 50, 900, 20); // Top conveyor belt
  rect(0, 350, 900, 20); // Bottom conveyor belt



  if (startButton.mouse.pressing()) {
    isRising = true;
  }


  if (resetButton.mouse.pressing()) {
    isRising = false;
    isStopped = false;
    packages.remove();
    setupL7();
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
    gamelevel--;
    reset();
  }

    // Draw pulleys
  fill(200);
  ellipse(pulley1X, pulley1Y, pulleyRadius * 2); // Pulley 1
  ellipse(pulley2aX, pulley2aY, pulleyRadius * 2); // Pulley 2a
  ellipse(pulley2bX, pulley2bY, pulleyRadius * 2); // Pulley 2b
  ellipse(pulley3aX, pulley3aY, pulleyRadius * 2); // Pulley 3a
  ellipse(pulley3bX, pulley3bY, pulleyRadius * 2); // Pulley 3b
  ellipse(pulley3cX, pulley3cY, pulleyRadius * 2); // Pulley 3c

  // Draw the masses
  fill(150);
  ellipse(mass1X, mass1Y, 30, 30); // Mass 1
  ellipse(mass2X, mass2Y, 30, 30); // Mass 2
  ellipse(mass3X, mass3Y, 30, 30); // Mass 3

  if (packages.mouse.hovering()) cursor('grab');
  else cursor('default');
  
  packages.forEach((pkg) => {
    
    if (pkg.mouse.dragging()) {
      pkg.moveTowards(mouse.x + pkg.mouse.x, mouse.y + pkg.mouse.y, 1);
      draggingPackage = pkg;
    } else {
      pkg.speed = 0;
    }

  });

  // Draw the strings
  stroke(0);
  strokeWeight(2);
  line(mass1X, mass1Y - 15, pulley1X - pulleyRadius, pulley1Y);
  line(mass2X, mass2Y - 15, pulley2aX - pulleyRadius, pulley2aY); // String to pulley 2a
  line(mass3X, mass3Y - 15, pulley3aX - pulleyRadius, pulley3aY);
  line(pulley2aX + pulleyRadius, pulley2aY, pulley2bX - pulleyRadius, pulley2bY);
  line(pulley2bX + pulleyRadius, pulley2bY, pulley2bX + pulleyRadius, pulley2aY + 10);
  line(pulley3aX + pulleyRadius, pulley3aY, pulley3bX - pulleyRadius, pulley3bY);
  line(pulley3bX, pulley3bY - pulleyRadius, pulley3cX - pulleyRadius, pulley3cY);
  line(pulley3bX + pulleyRadius, pulley3bY, pulley3cX + pulleyRadius, pulley3cY);

  let pkg1 = null;
  let pkg2 = null;
  let pkg3 = null;

  packages.forEach((pkg) => {
    if (pkg.position.x === pulley1X + pulleyRadius) {
      pkg1 = pkg;
    } else if (pkg.position.x === pulley2bX) {
      pkg2 = pkg;
    } else if (pkg.position.x === pulley3bX) {
      pkg3 = pkg;
    }
  });

  // Assign default values if no package is matched
  if (!pkg1) pkg1 = package1;
  if (!pkg2) pkg2 = package2;
  if (!pkg3) pkg3 = package3;

  if (isRising) {

    line(pulley1X+pulleyRadius,pulley1Y,pkg1.position.x,pkg1.position.y);
    line(pulley2bX,pulley2bY+pulleyRadius,pkg2.position.x,pkg2.position.y);
    line(pulley3bX,pulley3bY+pulleyRadius,pkg3.position.x,pkg3.position.y);

    velocity3 += .05;
    mass3Y += velocity3;
    pkg3.position.y -= .33*velocity3;
    pulley3bY -= .33*velocity3;

    if (mass3Y >= 330) {
      velocity3 = 0; // Stop the movement
      isRising = false;
    }

    if (pkg2 !== package3) {
      velocity2 += .05;
      mass2Y += velocity2;
      pkg2.position.y -= .5*velocity2;
      pulley2bY -= .5*velocity2;

      if (mass2Y >= 330) {
        velocity2 = 0; // Stop the movement
        isRising = false;
      }
    }

    if (pkg1 === package1) {
      velocity1 += .05;
      mass1Y += velocity1;
      pkg1.position.y -= velocity1;

      if (mass1Y >= 330) {
        velocity1 = 0; // Stop the movement
        isRising = false;
      }
    }

    isStopped = true;

  }

  if (isStopped) {    
    line(pulley1X+pulleyRadius,pulley1Y,pkg1.position.x,pkg1.position.y);
    line(pulley2bX,pulley2bY+pulleyRadius,pkg2.position.x,pkg2.position.y);
    line(pulley3bX,pulley3bY+pulleyRadius,pkg3.position.x,pkg3.position.y);
  }
  
  successMessage();  

}

function mouseReleasedL7() {
  if (draggingPackage) {
    let swapped = false;

    // Check for overlap with other packages
    packages.forEach((pkg) => {
      if (pkg !== draggingPackage && isOverlaps(pkg, draggingPackage)) {
        // Swap positions with the overlapping package
        let tempX = pkg.position.x;
        let tempBottomY = pkg.position.y + pkg.height / 2;

        // Align pkg with draggingPackage's original bottom edge
        pkg.position.x = draggingPackage.originalPosition.x;
        pkg.position.y =
          draggingPackage.originalPosition.y +
          draggingPackage.height / 2 -
          pkg.height / 2;

        pkg.originalPosition.x = pkg.position.x;
        pkg.originalPosition.y = pkg.position.y;

        // Align draggingPackage with pkg's original bottom edge
        draggingPackage.position.x = tempX;
        draggingPackage.position.y =
          tempBottomY - draggingPackage.height / 2;

        draggingPackage.originalPosition.x = draggingPackage.position.x;
        draggingPackage.originalPosition.y = draggingPackage.position.y;

        swapped = true;
      }
    });

    // If no overlap, reset to the original position
    if (!swapped) {
      draggingPackage.position.x = draggingPackage.originalPosition.x;
      draggingPackage.position.y = draggingPackage.originalPosition.y;
    }

    // Clear the draggingPackage
    draggingPackage = null;
  }
}


function isOverlaps(pkg1, pkg2) {
  // Calculate the edges of the first package
  let left1 = pkg1.position.x - pkg1.width / 2;
  let right1 = pkg1.position.x + pkg1.width / 2;
  let top1 = pkg1.position.y - pkg1.height / 2;
  let bottom1 = pkg1.position.y + pkg1.height / 2;

  // Calculate the edges of the second package
  let left2 = pkg2.position.x - pkg2.width / 2;
  let right2 = pkg2.position.x + pkg2.width / 2;
  let top2 = pkg2.position.y - pkg2.height / 2;
  let bottom2 = pkg2.position.y + pkg2.height / 2;

  // Check for overlap
  return !(left1 > right2 || 
           right1 < left2 || 
           top1 > bottom2 || 
           bottom1 < top2);
}

function createSpritesL7()
{
  mass1 = 55;
  mass2 = 25;
  mass3 = 85;

  pulley1X = 125;
  pulley1Y = 60;

  pulley2aX = 345;
  pulley2aY = 60;
  pulley2bX = 405;
  pulley2bY = 225;

  pulley3aX = 625;
  pulley3aY = 60;
  pulley3bX = 685;
  pulley3bY = 225;
  pulley3cX = 715;
  pulley3cY = 60;

  mass1X = pulley1X - pulleyRadius;
  mass1Y = pulley1Y + 50;

  mass2X = pulley2aX - pulleyRadius;
  mass2Y = pulley2aY + 50;

  mass3X = pulley3aX - pulleyRadius;
  mass3Y = pulley3aY + 50;

  packages = new Group();
  
  // packages.color =  color(220, 32, 32);
  package1 = new packages.Sprite(pulley2bX, 350 - 12.5, 25, 25,'k');
  package1.layer = 3;
  package2 = new packages.Sprite(pulley3bX, 350 - 27.5, 55, 55,'k');
  package2.layer = 2;
  package3 = new packages.Sprite(pulley1X+pulleyRadius, 350 - 42.5, 85, 85,'k');
  package3.layer = 1;
  packages.forEach((pkg) => {
    pkg.originalPosition = { x: pkg.position.x, y: pkg.position.y };
  });
}