////////////////////////////////////////////////////////////////////////
function setupL8()
{
  startButton.visible = false;  
  isSetupL8called = true;
  createSpritesL8(); 
  setFlags();
}

function playL8() {

 // Draw main box and screws
  fill(150,170);
  rectMode(CENTER);
  rect(width / 2 - 100, height/2, 120, 190, 30);

  fill(255, 0, 0);
  screwPositions.forEach((pos) => {
    ellipse(pos.x, pos.y, 20);
  }); 

  fill(150,170);
  rect(coverX, coverY, coverWidth, coverHeight, 30);
  fill(255,0,0,170)
  ellipse(screwPositions2[0].x,screwPositions2[0].y, 20);
  ellipse(screwPositions2[1].x,screwPositions2[1].y, 20);

  if (!draggingCoverDisabled) {
    if (kb.pressing('left')) {
      coverX -= 1;
      screwPositions2[0].x -= 1;
      screwPositions2[1].x -= 1;
    }
    else if (kb.pressing('right')) {
      coverX += 1;
      screwPositions2[0].x += 1;
      screwPositions2[1].x += 1;
    }
  }

  screws.forEach((screw) => {
    fill(50);
    ellipse(screw.x, screw.y, screw.size);
  });

  if (screwsLocked.every((locked) => locked)) {
    draggingCoverDisabled = true;
  }


  if (nextButton.mouse.pressing())
  {
    level++;
    reset();
  }

  if (previousButton.mouse.pressing())
  {
    level--;
    gamelevel--;
    reset();
  }

  if (resetButton.mouse.pressing()) {
    reset();
  }

}

function createSpritesL8()
{
  coverX = width / 2 + 120;
  coverY = height / 2;
  coverWidth = 120;
  coverHeight = 190;

  screwsLocked = [false, false];
  screws = [
    { x: width / 2 - 50, y: height / 2 + 100, size: 15, dragging: false },
    { x: width / 2 + 50, y: height / 2 + 100, size: 15, dragging: false },
  ];
  screwPositions = [
    { x: width / 2 - 60, y: height / 2 - 60 },
    { x: width / 2 - 60, y: height / 2 + 50 },
  ];
  screwPositions2 = [
    { x: width / 2 + 82, y: height / 2 - 60 },
    { x: width / 2 + 82, y: height / 2 + 50 },
  ];
}

function mousePressedL8() {
  if (isSetupL8called) {
    screws.forEach((screw) => {
      if (dist(mouseX, mouseY, screw.x, screw.y) < screw.size) {
        screw.dragging = true;
      }
    });
  }
}

function mouseDraggedL8() {
  if (isSetupL8called) {
    screws.forEach((screw) => {
      if (screw.dragging) {
        screw.x = mouseX;
        screw.y = mouseY;
      }
    });
  }
}

function mouseReleasedL8() {
  if (isSetupL8called) {
    screws.forEach((screw, index) => {
    if (screw.dragging) {
      screwPositions.forEach((target) => {
        if (dist(screw.x, screw.y, target.x, target.y) < 12) {
          screw.x = target.x;
          screw.y = target.y;
          screwsLocked[index] = true;
        }
        });
        screw.dragging = false;
      }
    });
  }
}
