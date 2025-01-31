////////////////////////////////////////////////////////////////////////
function setupL0()
{
  createSpritesL0();
  setFlags();
  previousButton.visible = false;
  solutionButton.visible = false;
  startButton.visible = false;
}

////////////////////////////////////////////////////////////////////////
function playL0()
{	

  gravityActivated = true;

  if (gravityActivated)
  {
    world.gravity.y = 10; // Activate gravity  
    bar.collider = 'd'
    ball.collider = 'd';
    ball2.collider = 'd'; 
  }

  if (kb.pressing('left')) fulcrum.pos.x = fulcrum.pos.x - .5 ;
  else if (kb.pressing('right')) fulcrum.pos.x = fulcrum.pos.x + .5 ;
  else fulcrum.vel.x = 0;

  if (nextButton.mouse.pressing())
  {
    level++;
    gamelevel++;
    reset();
  }

  if (resetButton.mouse.pressing())
    reset();
}

////////////////////////////////////////////////////////////////////////
function createSpritesL0()
{
    bar = new Sprite(400,320,400,10);
    bar.color = 'black';
    bar.stroke = 'black';
    bar.strokeWeight = 4;
    bar.collider = 's';

    bar1 = new Sprite(205,300,10,30);
    bar1.color = 'black';
    bar1.stroke = 'black';
    bar1.strokeWeight = 4;

    bar2 = new Sprite(270,300,10,30);
    bar2.color = 'black';
    bar2.stroke = 'black';
    bar2.strokeWeight = 4;

    bar3 = new Sprite(530,300,10,30);
    bar3.color = 'black';
    bar3.stroke = 'black';
    bar3.strokeWeight = 4;

    bar4 = new Sprite(595,300,10,30);
    bar4.color = 'black';
    bar4.stroke = 'black';
    bar4.strokeWeight = 4;

    fulcrum = new Sprite([[14, 14], [-20, 50], [50, 50], [14, 14]]);
    fulcrum.position = createVector(400,350);
    fulcrum.color = 'pink';   
    fulcrum.stroke = 'black';

    lever = new GlueJoint(bar1, bar);
    lever1 = new GlueJoint(bar2, bar);
    lever2 = new GlueJoint(bar3,bar);
    lever3 = new GlueJoint(bar4,bar);

    floor = new Sprite(400,365,800,5, 's');
    floor.color = 'black';
    floor.stroke = 'black';
    floor.strokeWeight = 4;

    ball = new Sprite(240,305,20, 20,'k');
    ball.color = '#a6825a';
    ball2 = new Sprite(560,295,40,40,'k');
    ball2.color = '#a6825a';
}

