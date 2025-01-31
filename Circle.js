class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isBeingDragged = false;
    this.isVisible = true;
  }

  setImage(img) {
    this.image = img;
  }

  display() {
    if (this.isVisible) {
      // imageMode(CENTER);
      image(this.image, this.x, this.y, this.radius * 6, this.radius * 5);
    }
  }

  isMouseOver() {
    return dist(mouseX, mouseY, this.x, this.y) < this.radius;
  }

  startDragging() {
    this.isBeingDragged = true;
  }

  stopDragging() {
    this.isBeingDragged = false;
  }

  drag() {
    if (this.isBeingDragged) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  canMoveOnIncline() {
    return this.radius < 20;
  }
}
