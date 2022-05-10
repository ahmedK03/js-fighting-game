function collisionDamageDetect({ ele1, ele2 }) {
  return (
    ele1.attackBox.position.x + ele1.attackBox.width >= ele2.position.x &&
    // dummy condition to stop the damage after passing ele2
    ele1.attackBox.position.x <= ele2.position.x + ele2.width &&
    // collision on the Y axis
    ele1.attackBox.position.y + ele1.attackBox.height >= ele2.position.y &&
    ele1.attackBox.position.y <= ele2.position.y + ele2.height
  );
}

function matchResult() {
    const result = document.querySelector("#matchResult");
    result.style.display = "flex";
    
    if (p1.health === p2.health) {
        result.innerText = "Tie";
    } else if (p1.health > p2.health) {
        result.innerText = "Player 1 Wins";
    } else result.innerText = "Player 2 Wins";

    p1.velocity.x = 0;
    p1.velocity.y = 0;
    p2.velocity.x = 0;
    p2.velocity.y = 0;
}

let timer = 20;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 800);
    timer--;
    document.querySelector(".timer").innerHTML = timer;
  } else matchResult();
}