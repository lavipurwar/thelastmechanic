////////////////////////////////////////////////////////////////////////
function setupL1()
{
  createSpritesL1();
  setFlags();
  
}

////////////////////////////////////////////////////////////////////////
function playL1()
{
  
	if (resetButton.mouse.pressing())
    reset();

  if (startButton.mouse.pressing()) 
  {
    gravityActivated = true;
  }

  if (gravityActivated)
  {
    ball.collider = 'd';
    world.gravity.y = 10; // Activate gravity
    lever.collider = 'd'
  }

    if (kb.pressing('left')) fulcrum.pos.x--;
    else if (kb.pressing('right')) fulcrum.pos.x++;
    else fulcrum.vel.x = 0;

 // Check for collision with the basket and if the ball has come to a stop
  if (energy.collides(flipper1)) {
    success = true; // Set success flag to true      
    flipper1.rotationSpeed = 2;
    flipper2.rotationSpeed = 2;
    //console.log(fulcrum.pos.x);
  }

    successMessage();

   if (nextButton.mouse.pressed()) {
      level++; // Move to the next level
      reset(); // Start the next level      
    }

  if (solutionButton.mouse.pressing())
  {
      drawSolutionL1();
  }


  if (previousButton.mouse.pressing())
  {
    level--;
    reset();
  }

}

function drawSolutionL1()
{  
  fulcrum.pos.x = 316;
}

////////////////////////////////////////////////////////////////////////
function createSpritesL1()
{
  fulcrum = new Sprite([[14, 14], [-20, 50], [50, 50], [14, 14]]);
  fulcrum.position = createVector(355,340);
  fulcrum.color = 'lightblue';   
  fulcrum.stroke = 'black';
  base = new Sprite(600, 260, 10, 190, 's')
  base.color = color(0,0,0);

  flipper1 = new Sprite(600, height/2.5, 150, 30, 'k');
	flipper1.color = color(212, 0, 255, 201);
	
  flipper2 = new Sprite(600, height/2.5, 30, 150, 'k');
	flipper2.color = color(212, 0, 255, 201);
	
  baseframe = new Sprite(600, height/2.5, 20, 's'); // Static base
  baseframe.color = color(50); // Gray base

  energy = new Sprite(420,310,30);
  energy.image = energymoduleImage;
  energy.stroke = color(255, 230, 0);
  

  lever = new Sprite(350,313,250,10,'s');
  lever.color = 'lightblue';   
  lever.stroke = 'black';


  floor = new Sprite(400,360,800,10,'s');
  floor.color = color(0, 0, 0, 143);

  incline = new Sprite(30, 120, 400, 30, 's');
  incline.rotation = 50;
  incline.stroke = color(0,0,0,100);
  incline.color = color(0,0,0,100);

  ball = new Sprite(140,160,90,'s');
  ball.image = boulderImage;


}

