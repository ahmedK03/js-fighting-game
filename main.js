const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
this.lastKey;

// add white background to the canvas

c.fillRect(0, 0, canvas.width, canvas.height);

// add a gravity var to elemenate the space under the player 
const gravity = 0.2;
// create the players
class Sprite {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        // this.height = 150;
    }

    height = 150;

    shape() {
        c.fillStyle = '#bbf';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.shape();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if ((this.position.y + this.height + this.velocity.y) >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
}

const p1 = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    }
}
);

const p2 = new Sprite({
    position: {
        x: 500,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
});


/**
 * creating another variable to save the last key state and fix the movement
 * when adjusting p2, it will overwrite the value for p1. So we'll add the property to the class to make it unique to every player
 */
let lastKey;

/**
 * 
 * 
 *if we tried to press a and d together, a would overight the movement of d.
 *So we need to make it more sensitive using the loop function
 * 
 */
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }

};

function animationLoop() {
    window.requestAnimationFrame(animationLoop);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    p1.update();
    p2.update();
    
    // making sure the players stop at evety frame we're not pressing any key
    p1.velocity.x = 0;
    p2.velocity.x = 0;
    
    // p1 movement
    if (keys.a.pressed && lastKey === 'a') {
        p1.velocity.x = -1;
    } else if (keys.d.pressed && lastKey === 'd') {
        p1.velocity.x = 1;
    }

    // p2 movement
    if(keys.ArrowLeft.pressed && p2.lastKey === 'ArrowLeft') {
        p2.velocity.x = -1;
    } else if (keys.ArrowRight.pressed && p2.lastKey === 'ArrowRight') {
        p2.velocity.x = 1;
    }
}

animationLoop();

window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            p1.velocity.y = -10;
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            p2.lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            p2.lastKey = 'ArrowRight';
            break;
    }

});

window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            p1.velocity.y -= gravity;
            break;
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }

    switch(key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
    }

});