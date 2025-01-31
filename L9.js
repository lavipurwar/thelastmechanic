////////////////////////////////////////////////////////////////////////
function setupL9()
{
  startButton.visible = false;  
  isSetupL9called = true;
  createSpritesL9(); 
  setFlags(); 
}
 
function playL9() {
 
  fill(255, 0, 0);
  screwPositions.forEach((pos) => {
    ellipse(pos.x, pos.y, 12);
  });
 
  fill(241, 213, 130, 200);
  rect(coverX, coverY, coverWidth, coverHeight);
 
  screws.forEach((screw) => {
    fill(174, 168, 174);
    ellipse(screw.x, screw.y, screw.size);
  });
 
  if (screwsLocked.every((locked) => locked)) {
    draggingCover = false;
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
 
 successMessage();
}
 
function createSpritesL9()
{
  coverX = 0;
  coverY = 0;
  coverWidth = 310;
  coverHeight = 290;
  draggingCover = false;
  draggingCoverDisabled = false;
  screwsLocked = [false, false, false, false];
  screws = [
    { x: 0, y: 0, size: 15, dragging: false },
    { x: 0, y: 0, size: 15, dragging: false },
    { x: 0, y: 0, size: 15, dragging: false },
    { x: 0, y: 0, size: 15, dragging: false },
  ];
  screwPositions = [
    { x: width / 3 - 93, y: height / 2 - 158 },
    { x: width / 2 + 86, y: height / 2 - 158 },
    { x: width / 3 - 93, y: height / 2 + 133 },
    { x: width / 2 + 86, y: height / 2 + 133 },
  ];
 
  coverX = width / 2 + 220;
  coverY = (height / 2 - 158 + height / 2 + 133)/2;
 
  screws.forEach((screw, index) => {
    screw.x = width / 3 - 190;
    screw.y = height / 2 - 50 + index * 40;
  });
}
 
function mousePressedL9() {
  if (isSetupL9called) {
    if (draggingCoverDisabled) {
      return;
    }
 
    if (
      mouseX > coverX - coverWidth / 2 &&
      mouseX < coverX + coverWidth / 2 &&
      mouseY > coverY - coverHeight / 2 &&
      mouseY < coverY + coverHeight / 2
    ) {
      draggingCover = true;
    }
 
    screws.forEach((screw) => {
      if (dist(mouseX, mouseY, screw.x, screw.y) < screw.size) {
        screw.dragging = true;
      }
    });
  }
}
 
function mouseDraggedL9() {
  if (isSetupL9called) {
    if (draggingCover && !draggingCoverDisabled) {
      coverX = mouseX;
      coverY = mouseY;
    }
 
    screws.forEach((screw) => {
      if (screw.dragging) {
        screw.x = mouseX;
        screw.y = mouseY;
      }
    });
  }
}
 
function mouseReleasedL9() {
  if (isSetupL9called) {
    draggingCover = false;
    screws.forEach((screw, index) => {
    if (screw.dragging) {
      screwPositions.forEach((target) => {
        if ( 
        Math.abs(
          (Math.min(
            coverX + coverWidth / 2,
              width / 2 + 80
            ) -
              Math.max(coverX - coverWidth / 2, width / 2 - 80)) *
              (Math.min(
                coverY + coverHeight / 2,
                height / 2 + 95
              ) -
                Math.max(
                  coverY - coverHeight / 2,
                  height / 2 - 95))
        ) /
            (160 * 190) >=
            0.5 &&
          dist(screw.x, screw.y, target.x, target.y) < 12
        ) {
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