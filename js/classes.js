//  for the canvas
class Sprite {
  constructor({ position, imgSrc, scale = 1, framesNo = 1 }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.img = new Image();
    this.img.src = imgSrc;
    this.scale = scale;
    this.framesNo = framesNo;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
  }

  draw() {
    c.drawImage(
      this.img,
      // for the animation - adding 4 more argu - specifing the cropped area
      this.currentFrame * (this.img.width / this.framesNo),
      0,
     (this.img.width / this.framesNo),
      this.img.height,
      this.position.x,
      this.position.y,
      (this.img.width / this.framesNo) * this.scale,
      this.img.height * this.scale
    );
  }

  update() {
    this.draw();
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.currentFrame < this.framesNo - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
}

// create the players
class Fighter {
  constructor({ position, velocity, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    // add color var to differ bet p1 & p2
    this.color = color;
    this.height = 150;
    this.width = 50;
    // saving last key state to fix the movement
    this.lastKey;
    // creating the attackBox
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      //   short hand syntax
      offset,
      width: 100,
      height: 50,
    };
    this.isAttacking;
    this.health = 100;
  }

  shape() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // only showing the attackBox while actually attacking
    if (this.isAttacking) {
      // attack box
      c.fillStyle = "green";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update() {
    this.shape();

    // update the attackBox position manually
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 94) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 150);
  }
}
