function setupL3()
{
  createSpritesL3();
  setFlags();

}

////////////////////////////////////////////////////////////////////////
function playL3()
{
    if (car.collides(building)) 
    {
      success = true;
    // console.log(bar.position);
    // console.log(bar2.position);
    // console.log(bar.rotation);
    // console.log(bar2.rotation);
      car.visible = false;
      wheelsFront.visible = false;
      wheelsRear.visible = false;
      }

    successMessage();

  if (kb.pressing('left')) 
   {
    axleRear.speed = axleRear.speed -5;
    axleFront.speed = axleFront.speed - 5;
    }
    // axleRear.speed--;
  else if (kb.pressing('right')) 
    {
    axleRear.maxPower = 1000;
    axleFront.maxPower = 1000;
    axleRear.speed = axleRear.speed + 5;
    axleFront.speed = axleFront.speed + 5;
   }
  else if (kb.pressing('down')) axleRear.speed = 0;
  else axleRear.enableMotor = false;
  
  if (startButton.mouse.pressing()) 
  {
    world.gravity.y = 10; // Activate gravity
    bar.collider = 's';
    bar2.collider = 's';
    car.collider = 'd';
    wheelsFront.collider = 'd';
    wheelsRear.collider = 'd';
    wheelsFront.collider = 'd';
    wheelsRear.collider = 'd';
  }

   if (resetButton.mouse.pressing())
   {
     reset();
   }    

    if (solutionButton.mouse.pressing())
     drawSolutionL3();

  
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
}

function drawSolutionL3()
{
  bar.pos.x= 395.48;
  bar.pos.y= 294;
  bar2.pos.x= 570;
  bar2.pos.y= 220;
  bar.rotation= -32.05;
}

////////////////////////////////////////////////////////////////////////
function createSpritesL3()
{
    stairs = new Sprite(460, 290, [0,-90, 50, 90, 30, -90, 50, 90, 
    30, -90, 50, 90, 30, -90, 50, 90, 30, -90, 90, 90], 's');
    stairs.stroke = color(225, 22, 127, 199);
    stairs.strokeWeight = 7;
    
    car = new Sprite(150, 300, 100, 30,'s');
    car.color = color(225, 49, 225, 200);
    wheelsFront = new Sprite(180, 325, 20,'s');
    wheelsFront.color = color(26, 197, 182, 200);
    wheelsRear = new Sprite(120, 325, 20,'s');
    wheelsRear.color = color(26, 197, 182, 200);

    axleFront = new WheelJoint(car, wheelsFront);
    axleRear = new WheelJoint(car, wheelsRear);

    building = new Sprite(710,230,130,260,'k');
    building.color = color(0, 0, 0, 0);
    building.stroke = color(0, 0, 0, 0);

    bar = new Sprite(220,75,280,15,'k');
    addRotationHandle(bar, bar.halfWidth + 10);
    addTranslationHandle(bar);
    bar.color = "yellow";

    bar2 = new Sprite(450,75,120,15,'k');
    addRotationHandle(bar2, bar2.halfWidth + 10);
    addTranslationHandle(bar2);
    bar2.color ="yellow";
    

    floor = new Sprite(width/2, height-95, width, 10, 's');
    floor.color = color(0,0,0);

}