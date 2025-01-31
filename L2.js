////////////////////////////////////////////////////////////////////////
function setupL2()
{
  createSpritesL2();
  setFlags();
  startButton.visible = false;
  solutionButton.visible = false;

}

////////////////////////////////////////////////////////////////////////
function playL2()
{
  if (startButton.mouse.pressing()) 
  {
    world.gravity.y = 10; // Activate gravity 
    box.collider = 'd';    
  }

   if (resetButton.mouse.pressing())
    reset();

  if (kb.pressing('left')) 
  {
    if (box.pos.x > width/2)
    {
      box.pos.x = box.pos.x - 0.8;
      box.pos.y = box.pos.y + 0.6;
    }
    else if (box.pos.x < width/2)
    {
      box.pos.x--;
      box.vel.y = 0.0;
      box.pos.y = 310;
      box.rotation = 0.0;
    }
   
  }
  else if (kb.pressing('right')) 
  { 
      if (box.pos.x > 3/4*width+5)
      {
      box.vel.x = 0.0;
      box.vel.y = 0.0;
      world.gravity.y = 10;
      }
    else  
    {
      box.pos.x++;
      world.gravity.y = 0;
    }
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

}

////////////////////////////////////////////////////////////////////////
function createSpritesL2()
{
  floor = new Sprite(400,355,800,10,'s');
  floor.color = 'black';
  floor.stroke = 'black';
  floor.strokeWeight = 2;

  box = new Sprite(300,315,75,75,'d');
  box.image = packageImage;

  triangle = new Sprite([[width/2, 350], [3/4*width, 200], [3/4*width, 350], [width/2, 350]], 's');
  triangle.collider = 's';
  triangle.color = color(185, 188, 164, 194);
}

