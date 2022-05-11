const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./assets/background.png",
});

const shop = new Sprite({
  position: {
    x: 630,
    y: 140,
  },
  imgSrc: "./assets/shop.png",
  scale: 2.65,
  framesNo: 6,
});
// add a gravity var to elemenate the space under the player
const gravity = 0.7;

const p1 = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imgSrc: "./assets/samuraiMack/idle.png",
  framesNo: 8,
  scale: 2.5,
  offset: {
    x: 160,
    y: 152,
  },
  states: {
    idle: {
      imgSrc: "./assets/samuraiMack/Idle.png",
      framesNo: 8,
    },
    run: {
      imgSrc: "./assets/samuraiMack/Run.png",
      framesNo: 8,
    },
  },
});

const p2 = new Fighter({
  position: {
    x: 500,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
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

decreaseTimer();

const animationLoop = () => {
  window.requestAnimationFrame(animationLoop);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  p1.update();
  // p2.update();

  // making sure the players stop at evety frame we're not pressing any key
  p1.velocity.x = 0;
  p2.velocity.x = 0;

  // p1 movement
  p1.img = p1.states.idle.img;
  if (keys.a.pressed && p1.lastKey === "a") {
    p1.img = p1.states.run.img;
    p1.velocity.x = -5;
  } else if (keys.d.pressed && p1.lastKey === "d") {
    p1.img = p1.states.run.img;
    p1.velocity.x = 5;
  }

  // p2 movement
  if (keys.ArrowLeft.pressed && p2.lastKey === "ArrowLeft") {
    p2.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && p2.lastKey === "ArrowRight") {
    p2.velocity.x = 5;
  }

  // detect for collision <<for p1>>
  if (
    collisionDamageDetect({
      ele1: p1,
      ele2: p2,
    }) &&
    // is attacking ??
    p1.isAttacking
  ) {
    //  to prevent the multiple attacks << repeating hit serveral times >>
    p1.isAttacking = false;
    console.log("hit p1");
    p2.health -= 10;
    p2HealthBar.style.width = p2.health + "%";
  }

  // detect for collision <<for p2>>
  if (
    collisionDamageDetect({
      ele1: p2,
      ele2: p1,
    }) &&
    // is attacking ??
    p2.isAttacking
  ) {
    //  to prevent the multiple attacks << repeating hit serveral times >>
    p2.isAttacking = false;
    p1.health -= 10;
    p1HealthBar.style.width = p1.health + "%";
    console.log("hit p2");
  }

  // end game based on health
  if (p1.health <= 0 || p2.health <= 0) {
    matchResult();
    clearTimeout(timerId);
  }
};

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
    case "k":
      p2.attack();
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
