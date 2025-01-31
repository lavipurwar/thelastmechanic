class Hammer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.width = 100;
    this.height = 20;
  }

  move(direction) {
    if (direction === 'UP') {
      this.y -= 20;
    } else if (direction === 'DOWN') {
      this.y += 20;
    }
  }

  resetPosition() {
    this.x = this.originalX;
    this.y = this.originalY;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(5000)); 
    fill(150, 75, 0); 
    rect(-5, 0, 10, 100);
    fill(100);
    triangle(5, 40, 20, 0, 5, -0);
    pop();
  }
}
