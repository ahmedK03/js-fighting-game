const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

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
        this.position.y += this.velocity.y;

        if((this.position.y + this.height + this.velocity.y) >= canvas.height) {
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

function animationLoop() {
    window.requestAnimationFrame(animationLoop);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    p1.update();
    p2.update();
}

animationLoop();