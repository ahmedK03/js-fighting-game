const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// add white background to the canvas
c.fillRect(0, 0, canvas.width, canvas.height);

// add a gravity var to elemenate the space under the player
const gravity = 0.7;
// create the players
class Sprite {
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
  }

  shape() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    // only showing the attackBox while actually attacking
    // if (this.isAttacking) {
    // attack box
    c.fillStyle = "green";
    c.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height
    );
    // }
  }

  update() {
    this.shape();

    // update the attackBox position manually
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
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

const p1 = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  color: "#f4fa43",
  offset: {
    x: 0,
    y: 0,
  },
});

const p2 = new Sprite({
  position: {
    x: 500,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "#34c9eb",
  //   adding offset to adjust the attackBox rectangle
  offset: {
    x: -50,
    y: 0,
  },
});

/**
 *
 *if we tried to press a and d together, a would overight the movement of d.
 *So we need to make it more sensitive using the loop function
 *
 */
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

function animationLoop() {
  window.requestAnimationFrame(animationLoop);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  p1.update();
  p2.update();

  // making sure the players stop at evety frame we're not pressing any key
  p1.velocity.x = 0;
  p2.velocity.x = 0;

  // p1 movement
  if (keys.a.pressed && p1.lastKey === "a") {
    p1.velocity.x = -5;
  } else if (keys.d.pressed && p1.lastKey === "d") {
    p1.velocity.x = 5;
  }

  // p2 movement
  if (keys.ArrowLeft.pressed && p2.lastKey === "ArrowLeft") {
    p2.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && p2.lastKey === "ArrowRight") {
    p2.velocity.x = 5;
  }

  // detect for collision
  if (
    p1.attackBox.position.x + p1.attackBox.width >= p2.position.x &&
    p1.attackBox.position.x <= p2.position.x + p2.width && // dummy condition to stop after passing p2
    // collision on the Y axis
    p1.attackBox.position.y + p1.attackBox.height >= p2.position.y &&
    p1.attackBox.position.y <= p2.position.y + p2.height &&
    // is attacking ??
    p1.isAttacking
  ) {
    //  to prevent the multiple attacks << repeating hit serveral times >>
    p1.isAttacking = false;
    console.log("hit");
  }
}

animationLoop();

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w":
      p1.velocity.y = -17;
      break;
    case "a":
      keys.a.pressed = true;
      p1.lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      p1.lastKey = "d";
      break;

    case " ":
      p1.attack();
      break;

    case "ArrowUp":
      p2.velocity.y = -17;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      p2.lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      p2.lastKey = "ArrowRight";
      break;
  }
});

window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }

  switch (key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
  }
});
