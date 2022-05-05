function init() {
  canvas = document.getElementById("mycanvas");
  W = H = canvas.width = canvas.height = 990;
  pen = canvas.getContext("2d");
  cs = 66;
  game_over = false;
  score = 0;

  food_img = new Image();
  food_img.src = "Assets/apple.png";

  trophy = new Image();
  trophy.src = "Assets/trophy.png";

  food = getRandomFood();

  snake = {
    init_len: 5,
    color: "rgb(4, 50, 2)",
    //color : blue;
    cells: [],
    direction: "right",
    createSnake: function () {
      // The snake is created from right to left initally
      //x : 4, y : 0 = head
      for (var i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },
    drawSnake: function () {
      pen.fillStyle = "rgb(204, 0, 0)";
      // pen.fillStyle = "red"; //head

      pen.fillRect(this.cells[0].x * cs, this.cells[0].y * cs, cs - 3, cs - 3);
      for (var i = 1; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 3,
          cs - 3
        );
      }
    },

    updateSnake: function () {
      //Remove the last cell and add it to the front
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;
      //Self Bite
      for (let i = 1; i < snake.cells.length; i++) {
        if (snake.cells[i].x == headX && snake.cells[i].y == headY) {
          game_over = true;
          return;
        }
      }

      //Food Colision
      if (headX == food.x && headY == food.y) {
        console.log("Food eaten");
        food = getRandomFood();
        score++;
      } else {
        this.cells.pop();
      }

      var nextX, nextY;
      //Movement
      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }

      this.cells.unshift({ x: nextX, y: nextY });

      /*Write a Logic that prevents snake from going out*/
      var last_x = Math.round(W / cs);
      var last_y = Math.round(H / cs);
      //Boundary conditions
      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x - 1 ||
        this.cells[0].y > last_y - 1
      ) {
        game_over = true;
      }
    },
  };

  snake.createSnake();

  //snake direction and conditions
  function keyPressed(e) {
    if (e.key == "ArrowRight" && snake.direction != "left") {
      snake.direction = "right";
      console.log("right");
    } else if (e.key == "ArrowLeft" && snake.direction != "right") {
      snake.direction = "left";
      console.log("left");
    } else if (e.key == "ArrowUp" && snake.direction != "down") {
      snake.direction = "up";
      console.log("up");
    } else if (e.key == "ArrowDown" && snake.direction != "up") {
      snake.direction = "down";
      console.log("down");
    }
  }

  document.addEventListener("keydown", keyPressed);
}

function draw() {
  //console.log("In Draw");

  pen.clearRect(0, 0, W, H);
  snake.drawSnake();

  pen.fillStyle = food.color;
  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);

  pen.drawImage(trophy, 18, 20, cs, cs);
  pen.fillStyle = "blue";
  pen.font = "20px Roboto";
  if (score < 10) {
    pen.fillText(score, 47, 47);
  } else {
    pen.fillText(score, 44, 47);
  }
}

function update() {
  snake.updateSnake();
}

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - cs)) / cs);
  var foodY = Math.round((Math.random() * (H - cs)) / cs);

  // for (let i = 0; i < snake.cells.length; i++) {
  //   if (snake.cells[i].x == foodX && snake.cells[i].y == foodY) {
  //     //   return getRandomFood();
  //     console.log("collide");
  //   }
  // }

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}

function gameloop() {
  if (game_over == true) {
    clearInterval(f);
    alert("Game Over");
    return;
  }
  draw();
  update();
}

init();

var f = setInterval(gameloop, 100);
