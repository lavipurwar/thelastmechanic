////////////////////////////////////////////////////////////////////////
function setupL10()
{
  setFlags();  
}

////////////////////////////////////////////////////////////////////////
function playL10()
{
  // Ensure only the home button is visible
  homeButton.visible = true;
  startButton.visible = false;
  nextButton.visible = true;
  previousButton.visible = true;
  resetButton.visible = false;
  solutionButton.visible = false;

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

}