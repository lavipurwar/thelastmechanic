let flipper1, flipper2, bar, fixedbar, ball, basket, dominos; 
let fulcrum;
let hammer, ramp1, ramp2, ramp3, ramp4; 
let hammerHandle, hammerHead, hammerHinge, crateR, ball1, ball2;
let bar_solution;
let startButton, resetButton, nextButton, previousButton, solutionButton, homeButton;
let musicNote;
let nextIntroButton, previousIntroButton;
let rotationHandleDistance;
let isDragging;
let initialAngle;
let handleX, handleY;
let result = 0;
let gravityActivated;
let success;
let framesSinceFirstCollision = 10;
let arcSize;
let successSound, introSound, gameSound;
let successHasPlayed;
let turnMusicOff = false;


let introImages = [];
let gameImages = [];
let startIntroButtonImage;
let energymoduleImage;
let creditImage; // Holds the credit image


let currentImageIndex = 0;
let level = 8;
let gamelevel = 0;
let showIntro = true;
let gameOn = false;

let selectedRotationHandle = null;
let selectedTranslationHandle = null;
let hideNavigation = false;

//Krish's variables
let coverX;
let coverY;
let coverWidth;
let coverHeight;
let draggingCover;
let draggingCoverDisabled;
let screwsLocked;
let screws;
let screwPositions;

let pulleyRadius = 30; // Radius of the intro pulley
let draggingPackage = null; // To track the currently dragged package

// Pulley position
let pulley1X, pulley1Y; 
let pulley2aX, pulley2aY;
let pulley2bX, pulley2bY;
let pulley3aX, pulley3aY;
let pulley3bX, pulley3bY;
let pulley3cX, pulley3cY;

let mass1X, mass1Y; // Position of mass 1
let mass2X, mass2Y; // Position of mass 2
let mass3X, mass3Y; // Position of mass 3
let mass1; // Mass of object 1 (kg)
let mass2; // Mass of object 2 (kg)
let mass3; // Mass of object 3 (kg)
let velocity = 0; // Initial velocity
let velocity1 = 0;
let velocity2 = 0;
let velocity3 = 0;
let gravity = 2; // Gravitational acceleration
let acceleration; // Acceleration of the system
let state = 1;
let isFalling = false; // To track if the masses are falling
let isRising = false;
let isStopped = false;
let package1,package2,package3;
let packages;

let isSetupL7called = false;
let isSetupL8called = false;
let isSetupL9called = false;
//Sidh's variables
// let circle, circle1, circle2;
// let counter = 0;
// let splitCircle = false;
// let logImage;
// let tooBigMessage = false;
// let circleMoving = true;



////////////////////////////////////////////////////////////////////////
function preload() {
  // Load the images for the sprites

  introImages[0] = loadImage('assets/intro0.jpg');
  introImages[1] = loadImage('assets/intro1.jpg');
  introImages[2] = loadImage('assets/intro2.jpg');
  introImages[3] = loadImage('assets/intro3.jpg');

  gameImages[0] = loadImage('assets/game0.jpg');
  gameImages[1] = loadImage('assets/game1.jpg');
  gameImages[2] = loadImage('assets/game2.jpg');
  gameImages[3] = loadImage('assets/game3.jpg');
  gameImages[4] = loadImage('assets/game4.jpg');
  gameImages[5] = loadImage('assets/game5.jpg');
  gameImages[6] = loadImage('assets/game6.jpg');
  gameImages[7] = loadImage('assets/game7.jpg');
  gameImages[8] = loadImage('assets/game8.jpg');
  gameImages[9] = loadImage('assets/game9.jpg');
  gameImages[10] = loadImage('assets/game10.jpg');
  gameImages[11] = loadImage('assets/credit.jpg');

  energymoduleImage = loadImage('assets/energy_module2-yellow.png');
  boulderImage = loadImage('assets/boulder.png');
  packageImage = loadImage('assets/package-small.png');


  startIntroButtonImage = loadImage('assets/startbutton-small.png');
  successSound = loadSound("assets/success-small.mp3");
   successSound.volume = 0.3;
  introSound = loadSound("assets/cinematic-cut-small.mp3");

}

////////////////////////////////////////////////////////////////////////
function setup() {
  // add nothing inside the paranthese to get full screen canvas
  new Canvas(800,457);

  setFont(20);
  makeMusicNote();   

  if (showIntro)
  {
    setupButtons();      
  }
  else if (gameOn)
  {    
    // nextIntroButton.visible = false;
    // previousIntroButton.visible = false;
    // skipIntroButton.visible = false;
    commonSprites();
    checkNavigation();
    switch (level)
    {
    case 0:
      setupL0();
      break;
    case 1:
      setupL1();
      break;
    case 2: 
      setupL2();
      break;
    case 3: 
      setupL3();
      break;
    case 4: 
      setupL4();
      break;
    case 5: 
      setupL5();
      break;
    case 6: 
      setupL6();
      break;
    case 7: 
      setupL7();
      break;
    case 8: 
      setupL8();
      break;
    case 9: 
      setupL9();
      break;
    case 10: 
      setupL10();
      break;
    case 11: 
      setupL11();
      break;
    default:    
    }
  }
  
}

function checkNavigation()
{
  if (hideNavigation)
  {
    startButton.visible = false;
    nextButton.visible = false;
    previousButton.visible = false;
    homeButton.visible = false;
    solutionButton.visible = false;
    resetButton.visible = false;
    skipIntroButton.visible = false;
  }
}
////////////////////////////////////////////////////////////////////////
function draw() {
  clear();

  if (musicNote.mouse.pressed())
  {
    turnMusicOff = !turnMusicOff;
     //console.log("music off from mouse press");
  }

    if (turnMusicOff)
      introSound.pause();


  if (showIntro) 
  {
    displayIntroImages();
    userStartAudio().then(() => {
    if (!introSound.isPlaying() && !turnMusicOff) 
      {
        introSound.play();
        //console.log("music on");
      }
    else ;//console.log("music off");
     });
  } 

  if (gameOn)
  {
    displaygameImages();
    introSound.pause();

    if (homeButton.mouse.pressing())
      {
        console.log("home");
        showIntro = true;
        gameOn = false;
        currentImageIndex = 0;
        turnMusicOff = false;
        allSprites.remove();
        level = 0;
        gamelevel = 0;
        setup();
        return;
      }

    switch (level)
    {
    case 0:
      playL0();
      break;
    case 1:
      playL1();
      break;
    case 2: 
      playL2();
      break;
    case 3: 
      playL3();
      break;
    case 4: 
      playL4();
      break;
    case 5: 
      playL5();
      break;
    case 6: 
      playL6();
      break;
    case 7: 
      playL7();
      break;
    case 8: 
      playL8();
      break;
    case 9: 
      playL9();
      break;
    case 10: 
      playL10();
      break;
    case 11: 
      playL11();
      break;
    default:
    }
  
    // Draw all sprites

  allSprites.draw();

  for (let sprite of allSprites) {
    if (sprite.rotationHandle) {
      if (selectedRotationHandle && selectedRotationHandle.parentSprite === sprite) {
        let angle = atan2(mouseY - sprite.y, mouseX - sprite.x);
        sprite.rotation = angle;
      }
      drawRotationHandle(sprite);
    }

    if (sprite.translationHandle) {
      if (sprite.mouse.dragging()) {
       sprite.moveTowards(mouse.x + sprite.mouse.x, mouse.y + sprite.mouse.y, 1);
      }
      drawTranslationHandle(sprite);
    }

    if (sprite.mouse.released())
    {
    sprite.vel.x = 0;
    sprite.vel.y = 0;
    }
  }
  }
}

function displaygameImages()
{
   background(0);
   image(gameImages[level], 0, 0);
}


function displayIntroImages() {
  background(0);

  image(introImages[currentImageIndex], 0, 0);

  if (currentImageIndex == 0)
  {
      previousIntroButton.visible = false;
      nextIntroButton.visible = false;
      startIntroButton.visible = true;
  }

  else 
  {
    previousIntroButton.visible = true;
    nextIntroButton.visible = true;
    startIntroButton.visible = false;
  }
  if (startIntroButton.mouse.pressed())
    nextImage();

  if (nextIntroButton.mouse.pressed()) 
    nextImage();

  if (previousIntroButton.mouse.pressed())
    previousImage();

  if (skipIntroButton.mouse.pressed())
  {
    showIntro = false;
    gameOn = true;
    currentImageIndex = 0;
    turnMusicOff = true;
    allSprites.remove();
    level = 0;
    gamelevel = 0;
    setup();
  }

}

function setupButtons() {

  // textFont(ChalkboyFont);

  startIntroButton = new Sprite(width/2, height/2+115, 100,41, 'k');
  startIntroButton.image = startIntroButtonImage;


  nextIntroButton = new Sprite(width - 35, height - 15, 65,25, 'k');
  nextIntroButton.textSize = 16;
  nextIntroButton.text ="Next";
  nextIntroButton.color = color(218, 210, 210, 150);
  nextIntroButton.stroke = color(218, 210, 210);

  previousIntroButton = new Sprite(35, height - 15, 65,25, 'k');
  previousIntroButton.textSize = 16;
  previousIntroButton.text ="Previous";
  previousIntroButton.color = color(218, 210, 210, 150);
  previousIntroButton.stroke = color(218, 210, 210);

  skipIntroButton = new Sprite(width - 45, 15, 85, 25, 'k');
  skipIntroButton.textSize = 16;
  skipIntroButton.text ="Skip Intro";
  skipIntroButton.color = color(218, 210, 210, 150);
  skipIntroButton.stroke = color(218, 210, 210);

}

function nextImage() {
  if (currentImageIndex < introImages.length - 1) {
    currentImageIndex++;
  } else {
    showIntro = false;
    gameOn = true;
    currentImageIndex = 0;
    turnMusicOff = true;
    allSprites.remove();
    level = 0;
    gamelevel = 0;
    setup();
  }
}

function previousImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
  }
}

////////////////////////////////////////////////////////////////////////
function mousePressed() {
  // Check for rotation handle
  selectedRotationHandle = null;
  for (let sprite of allSprites) {
    if (sprite.rotationHandle) {
      let angle = sprite.rotation;
      let rotationHandleX = sprite.x + cos(angle) * sprite.rotationHandle.offset;
      let rotationHandleY = sprite.y + sin(angle) * sprite.rotationHandle.offset;

      if (dist(mouseX, mouseY, rotationHandleX, rotationHandleY) < 15) {
        selectedRotationHandle = sprite.rotationHandle;
        return;
      }
    }
  }

  // Check for translation handle
  selectedTranslationHandle = null;
  for (let sprite of allSprites) {
    if (sprite.translationHandle) {
      if (dist(mouseX, mouseY, sprite.x, sprite.y) < 35) {
        selectedTranslationHandle = sprite.translationHandle;
        return;
      }
    }
  }

    switch (level) {
    case 8:
      mousePressedL8();
      break;
    case 9:
      mousePressedL9();
      break;
    default:
  }
}

function mouseDragged() {
  switch (level) {
    case 8:
      mouseDraggedL8();
      break;
    case 9:
      mouseDraggedL9();
      break;
    default:
  }
}

////////////////////////////////////////////////////////////////////////
function mouseReleased() {
  selectedRotationHandle = null;
  selectedTranslationHandle = null;
  allSprites.vel.x = 0;
  allSprites.vel.y = 0;

    switch (level) {
    case 8:
      mouseReleasedL8();
      break;
    case 9:
      mouseReleasedL9();
      break;
    default:
  }
}


////////////////////////////////////////////////////////////////////////
function drawRotationHandle(sprite) {
  let angle = sprite.rotation;
  let handleX = sprite.x + cos(angle) * sprite.rotationHandle.offset;
  let handleY = sprite.y + sin(angle) * sprite.rotationHandle.offset;

  textFont('Helvetica'); 
  arcSize = sprite.height + 12;
  textSize(arcSize);
  textAlign(CENTER, CENTER);
  push();
  translate(handleX, handleY+2);
  rotate(angle);
  fill(255, 255, 255);
  stroke('gray');
  text("\u2938", 0, 0); // Unicode character ⤸
  pop();


}

////////////////////////////////////////////////////////////////////////
function drawTranslationHandle(sprite) {
  let handleX = sprite.x;
  let handleY = sprite.y;

  textFont('Helvetica'); 
  textSize(arcSize-7);
  textAlign(CENTER, CENTER);
  push();
  translate(handleX, handleY+2);
  fill(255, 255, 255);
  stroke('gray');
  text("\u2723", 0, 0); // Unicode character ✣
  pop();
}

function setFont(size)
{
  textFont("cursive");
  textSize(size);
  textAlign(CENTER);
}
 

function makeMusicNote()
{
    // Create a sprite for the music note
    //ellipse(width-25, height-40, 50,50);
   musicNote = new Sprite(width-25, height-80, 50, 50, 'k');
  // Customize the appearance with a Unicode character
    musicNote.draw = function () {
    textAlign(CENTER, CENTER);
    textFont("Helvetica");
    textSize(25);
    fill(255, 255, 255);
    text(turnMusicOff ? "\u266B" : "\u266B", 0, 0); // \u266B for music, \u1F507 for no music
    textFont('Verdana');
    textSize(15);
    text(turnMusicOff ? "off" : "on", 0, 20); // \u266B for music, \u1F507 for no music
  };

}
////////////////////////////////////////////////////////////////////////
function commonSprites()
{
  setFont(16);
  startButton = new Sprite(40,20, 65,25, 'k');
  startButton.text = "Run";
  //startButton.color = 'white';
  startButton.color = color(255, 255, 255, 200);
  // startButton.strokeWeight = 0;

  homeButton = new Sprite(40, 50, 65,25, 'k');
  homeButton.text = "Home";
  homeButton.color = color(255, 255, 255, 200);


  resetButton = new Sprite(width-40,50, 65, 25, 'k');
  resetButton.text = "Reset";
  resetButton.color = color(255, 255, 255, 200);

  nextButton = new Sprite(width-40, 20, 65, 25, 'k');
  nextButton.text = "Next";
  nextButton.color = color(255, 255, 255, 200);

  previousButton = new Sprite(width-40, 80, 65, 25, 'k');
  previousButton.text = "Previous";
  previousButton.color = color(255, 255, 255, 200);
  

  solutionButton = new Sprite(40, 80, 65,25, 'k');
  solutionButton.text = "Solution";
  solutionButton.color = color(255, 255, 255, 200);  

}

////////////////////////////////////////////////////////////////////////
function reset() 
{
  allSprites.remove();
  clear();
  setup();  
}

////////////////////////////////////////////////////////////////////////
function setFlags()
{
  gravityActivated = false; // Deactivate gravity.
  success = false;
  isDragging = false;
  successHasPlayed = false; 
  isFalling = false; 
}

////////////////////////////////////////////////////////////////////////
/**
 * Adds a rotation handle to an existing sprite.
 * @param {Sprite} sprite - The sprite to add a rotation handle to.
 * @param {number} offset - The distance of the handle from the sprite center.
 */
function addRotationHandle(sprite, offset) {
  sprite.rotationHandle = {
    parentSprite: sprite, // Link to the parent sprite
    offset: offset,       // Distance from the sprite center
  };
}

////////////////////////////////////////////////////////////////////////
/**
 * Adds a translation handle to an existing sprite.
 * @param {Sprite} sprite - The sprite to add a translation handle to.
 */
function addTranslationHandle(sprite) {
  sprite.translationHandle = {
    parentSprite: sprite, // Link to the parent sprite
    offset: 0,            // Centered on the sprite
  };
}

////////////////////////////////////////////////////////////////////////
// Display success message if the ball stops in the basket
  function successMessage()
  {
    
    if (success) 
      {
        // textFont(ChalkboyFont);
        setFont(20);        
        text.color = color(255, 255, 255, 200); 
        text('Level ' + gamelevel + ' of 4 Completed!', canvas.w/2, 30);
        if (!successSound.isPlaying() && !successHasPlayed) 
          {
            if (!turnMusicOff) 
               console.log("tone");
              successSound.play();
              successHasPlayed = true;
          }
      }
    else 
    {    
        setFont(20);        
        text.color = color(255, 255, 255, 200); 
        text('Level ' + gamelevel + ' of 4!', canvas.w/2, 30);
      }
  }
  

////////////////////////////////////////////////////////////////////////
  function keyPressed()
  {
    //allSprites.debug = !allSprites.debug;
  }

  function handleLevelTransition() {
    successMessage();

  if (nextButton.mouse.pressed()) {
      level++; // Move to the next level
      reset(); // Start the next level
    }
  }

