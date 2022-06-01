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
    jump: {
      imgSrc: "./assets/samuraiMack/Jump.png",
      framesNo: 2,
    },
    fall: {
      imgSrc: "./assets/samuraiMack/Fall.png",
      framesNo: 2,
    },
    attack1: {
      imgSrc: "./assets/samuraiMack/Attack1.png",
      framesNo: 6,
    },
    takeHit: {
      imgSrc: "./assets/samuraiMack/take_hit.png",
      framesNo: 4,
    },
    death: {
      imgSrc: "./assets/samuraiMack/Death.png",
      framesNo: 6,
    },
  },
  attackBox: {
    offset: {
      x: 120,
      y: 50,
    },
    width: 150,
    height: 50,
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

  imgSrc: "./assets/Kenji/idle.png",
  framesNo: 4,
  scale: 2.5,
  offset: {
    x: 160,
    y: 165,
  },
  states: {
    idle: {
      imgSrc: "./assets/Kenji/Idle.png",
      framesNo: 4,
    },
    run: {
      imgSrc: "./assets/Kenji/Run.png",
      framesNo: 8,
    },
    jump: {
      imgSrc: "./assets/Kenji/Jump.png",
      framesNo: 2,
    },
    fall: {
      imgSrc: "./assets/Kenji/Fall.png",
      framesNo: 2,
    },
    attack1: {
      imgSrc: "./assets/Kenji/Attack1.png",
      framesNo: 4,
    },
    takeHit: {
      imgSrc: "./assets/Kenji/take_hit.png",
      framesNo: 3,
    },
    death: {
      imgSrc: "./assets/Kenji/Death.png",
      framesNo: 7,
    },
  },
  attackBox: {
    offset: {
      x: -120,
      y: 50,
    },
    width: 240,
    height: 50,
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
  c.fillStyle = "rgb(250, 250, 249, 0.15)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  p1.update();
  p2.update();

  // making sure the players stop at evety frame we're not pressing any key
  p1.velocity.x = 0;
  p2.velocity.x = 0;

  // p1 movement
  if (keys.a.pressed && p1.lastKey === "a") {
    p1.switchSpriteStates("run");
    p1.velocity.x = -5;
  } else if (keys.d.pressed && p1.lastKey === "d") {
    p1.switchSpriteStates("run");
    p1.velocity.x = 5;
  } else p1.switchSpriteStates("idle");

  // jump & fall sprite for p1
  if (p1.velocity.y < 0) {
    p1.switchSpriteStates("jump");
  } else if (p1.velocity.y > 1) {
    p1.switchSpriteStates("fall");
  }
  // p2 movement
  if (keys.ArrowLeft.pressed && p2.lastKey === "ArrowLeft") {
    p2.switchSpriteStates("run");
    p2.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && p2.lastKey === "ArrowRight") {
    p2.switchSpriteStates("run");
    p2.velocity.x = 5;
  } else p2.switchSpriteStates("idle");

  // jump & fall sprite for p2
  if (p2.velocity.y < 0) {
    p2.switchSpriteStates("jump");
  } else if (p2.velocity.y > 1) {
    p2.switchSpriteStates("fall");
  }

  // detect for collision <<for p1>>
  if (
    collisionDamageDetect({
      ele1: p1,
      ele2: p2,
    }) &&
    // is attacking ??
    p1.isAttacking &&
    p1.currentFrame === 4
  ) {
    //  to prevent the multiple attacks << repeating hit serveral times >>
    p1.isAttacking = false;
    p2.takeHit(10);
    gsap.to(p2HealthBar, {
      width: p2.health + "%",
    });
  }

  // if p1 misses
  if (p1.isAttacking && p1.currentFrame === 4) p1.isAttacking = false;

  // detect for collision <<for p2>>
  if (
    collisionDamageDetect({
      ele1: p2,
      ele2: p1,
    }) &&
    // is attacking ??
    p2.isAttacking &&
    p2.currentFrame === 2
  ) {
    //  to prevent the multiple attacks << repeating hit serveral times >>
    p2.isAttacking = false;
    p1.takeHit(5);
    gsap.to(p1HealthBar, {
      width: p1.health + "%",
    });
  }

  // if p2 misses
  if (p2.isAttacking && p2.currentFrame === 2) p2.isAttacking = false;
  // end game based on health
  if (p1.health <= 0 || p2.health <= 0) {
    matchResult();
    clearTimeout(timerId);
  }
};

animationLoop();

window.addEventListener("keydown", ({ key }) => {
  if (!p1.dead) {
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
    }
  }
  if (!p2.dead) {
    switch (key) {
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
