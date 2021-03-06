//  for the canvas
class Sprite {
  constructor({
    position,
    imgSrc,
    scale = 1,
    framesNo = 1,
    offset = { x: 0, y: 0 },
  }) {
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
    this.offset = offset;
  }

  draw() {
    c.drawImage(
      this.img,
      // for the animation - adding 4 more argu - specifing the cropped area
      this.currentFrame * (this.img.width / this.framesNo),
      0,
      this.img.width / this.framesNo,
      this.img.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.img.width / this.framesNo) * this.scale,
      this.img.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;
    if (this.framesElapsed % this.framesHold === 0) {
      if (this.currentFrame < this.framesNo - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
  update() {
    this.draw();
    this.animateFrames();
  }
}

// create the players
class Fighter extends Sprite {
  /**
   * deleted the draw method from Fighter since we're extending from Sprite
   * inherit the properties from Sprite to Fighter << like imgSrc, scale
   * inherit the constructor methods via super() method
   * removed position from Fighter to inherit it from Sprite
   * copied the Frame properties to Fighter since they have values and it's overkill to define them in Sprite Constructor
   */

  constructor({
    position,
    velocity,
    imgSrc,
    scale = 1,
    framesNo = 1,
    offset = { x: 0, y: 0 },
    // for running and etc
    states,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imgSrc,
      scale,
      framesNo,
      offset,
    });
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.framesHold = 10;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.dead = false;
    // saving last key state to fix the movement
    this.lastKey;
    // creating the attackBox
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      //   shorthand syntax
      offset: attackBox.offset,
      width: attackBox.width,
      height: attackBox.height,
    };
    this.isAttacking;
    this.health = 100;
    this.states = states;

    for (const state in this.states) {
      states[state].img = new Image();
      states[state].img.src = states[state].imgSrc;
    }
  }

  update() {
    this.draw();
    if (!this.dead) this.animateFrames();

    // update the attackBox position manually
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // attack rectangle
    // c.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 94) {
      this.velocity.y = 0;
      this.position.y = 331;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.switchSpriteStates("attack1");
    this.isAttacking = true;
  }

  takeHit(val) {
    this.health -= val;

    if (this.health <= 0) {
      this.switchSpriteStates("death");
    } else this.switchSpriteStates("takeHit");
  }

  switchSpriteStates(sprite) {
    // when player dies
    if (this.img === this.states.death.img) {
      if (this.currentFrame === this.states.death.framesNo - 1)
        this.dead = true;
      return;
    }

    // overriding all other animation when attack animation
    if (
      this.img === this.states.attack1.img &&
      this.currentFrame < this.states.attack1.framesNo - 1
    )
      return;

    // when player gets hit
    if (
      this.img === this.states.takeHit.img &&
      this.currentFrame < this.states.takeHit.framesNo - 1
    )
      return;

    switch (sprite) {
      case "idle":
        if (this.img !== this.states.idle.img) {
          this.img = this.states.idle.img;
          this.framesNo = this.states.idle.framesNo;
          this.currentFrame = 0;
        }
        break;
      case "run":
        if (this.img !== this.states.run.img) {
          this.img = this.states.run.img;
          this.framesNo = this.states.run.framesNo;
          this.currentFrame = 0;
        }
        break;
      case "jump":
        if (this.img !== this.states.jump.img) {
          this.img = this.states.jump.img;
          this.framesNo = this.states.jump.framesNo;
          this.currentFrame = 0;
        }
        break;
      case "fall":
        if (this.img !== this.states.fall.img) {
          this.img = this.states.fall.img;
          this.framesNo = this.states.fall.framesNo;
          this.currentFrame = 0;
        }
        break;
      case "attack1":
        if (this.img !== this.states.attack1.img) {
          this.img = this.states.attack1.img;
          this.framesNo = this.states.attack1.framesNo;
          this.currentFrame = 0;
        }
        break;
      case "takeHit":
        if (this.img !== this.states.takeHit.img) {
          this.img = this.states.takeHit.img;
          this.framesNo = this.states.takeHit.framesNo;
          this.currentFrame = 0;
        }
        break;
      case "death":
        if (this.img !== this.states.death.img) {
          this.img = this.states.death.img;
          this.framesNo = this.states.death.framesNo;
          this.currentFrame = 0;
        }
        break;
    }
  }
}
