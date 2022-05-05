// "use strict";
//height = y-axis = perpandicular
//width = x-axis
function load_images() {
  enemy_image = new Image();
  enemy_image.src = "Assets/v1.png";

  playerp = new Image();
  playerp.src = "Assets/superhero.png";

  gemm = new Image();
  gemm.src = "Assets/gemm.png";
}

function isOverlap(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  ) {
    return true;
  }

  return false;
}

function init() {
  canvas = document.getElementById("myCanvas");
  //   console.log(canvas);
  w = 700;
  h = 400;
  canvas.height = h;
  canvas.width = w;
  gameOver = false;

  pen = canvas.getContext("2d"); //Use to draw on the web page on the flow

  //   box = {
  //     x: 150,
  //     y: 50,
  //     h: 60,
  //     w: 60,
  //     speed: 20,
  //   };

  e1 = { x: 150, y: 130, w: 60, h: 60, speed: 20 };
  e2 = { x: 300, y: 90, w: 60, h: 60, speed: 30 };
  e3 = { x: 450, y: 140, w: 60, h: 60, speed: 40 };
  player = {
    x: 20,
    y: h / 2,
    w: 60,
    h: 60,
    speed: 20,
    moving: "false",
    health: 100,
  };
  gem = { x: w - 100, y: h / 2, w: 60, h: 60 };
  enemy = [e1, e2, e3];
  winning = { x: w - 100 + 20, y: h / 2, w: 60, h: 60 };
  canvas.addEventListener("mousedown", function () {
    console.log("Mouse Pressed");
    player.moving = true;
  });

  canvas.addEventListener("mouseup", function () {
    console.log("Mouse Released");
    player.moving = false;
  });
}

function draw() {
  pen.clearRect(0, 0, w, h); //Delete the old objects and then draw the new, updated ones
  pen.fillStyle = "red"; //Change color of the pen
  //   pen.fillRect(box.x, box.y, box.w, box.h); //Make rectangle
  //   pen.drawImage(enemy_image, box.x, box.y, box.w, box.h);

  pen.drawImage(playerp, player.x, player.y, player.w, player.h);
  pen.drawImage(gemm, gem.x, gem.y, gem.w, gem.h);

  for (let i = 0; i < enemy.length; i++) {
    pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
  }

  pen.fillStyle = "white";
  pen.fillText("Score = " + player.health, 10, 10);
}

function update() {
  //   box.y += box.speed; //Move box downward

  //checks of the bowndaries and bouncing
  //   if (box.y >= h - box.h || box.y <= 0) box.speed *= -1;

  if (player.moving == true) {
    player.x += player.speed;
    player.health += 20;
    // player.moving = "false";
  }

  if (player.health <= 0) {
    alert("Game Over");
    gameOver = true;
  }

  if (isOverlap(player, winning)) {
    console.log("You Win");
    alert("Win");
    gameOver = true;
  }

  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].speed;
    if (enemy[i].y >= h - enemy[i].h || enemy[i].y <= 0) enemy[i].speed *= -1;
  }

  for (let i = 0; i < enemy.length; i++) {
    if (isOverlap(player, enemy[i])) {
      player.health -= 40;
    }
  }
}

function gameloop() {
  draw();
  update();
  if (gameOver) {
    clearInterval(f);
  }
}

//main

load_images();
init();
var f = setInterval(gameloop, 75);
