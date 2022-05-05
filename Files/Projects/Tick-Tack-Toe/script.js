"use strict";
console.log("Welcome to Tick Tack Toe");
let music = new Audio("files/music.mp3");
let audioTurn = new Audio("files/ting.mp3");
let gameover = new Audio("files/gameover.mp3");
let isGameOver = false;
let turn = "X";

//Change Turns X-O
function changeTurn() {
  if (turn === "X") return "O";
  return "X";
}

//Check for win
function checkWin() {
  let boxTexts = document.getElementsByClassName("boxText");
  let wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  wins.forEach((e) => {
    if (
      boxTexts[e[0]].innerText === boxTexts[e[1]].innerText &&
      boxTexts[e[1]].innerText === boxTexts[e[2]].innerText &&
      boxTexts[e[0]].innerText !== ""
    ) {
      console.log("Winner!!");
      document.getElementsByClassName("info")[0].innerText =
        boxTexts[e[0]].innerText + " Wins!!";
      isGameOver = true;
      document
        .querySelector(".imgBox")
        .getElementsByTagName("img")[0].style.height = "17vh";
    }
  });
}

//Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxText");
  element.addEventListener("click", function () {
    if (boxText.innerText === "") {
      boxText.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isGameOver) {
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

let reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  console.log("Reset");
  let boxTexts = document.querySelectorAll(".boxText");
  Array.from(boxTexts).forEach((e) => {
    e.innerText = "";
    turn = "X";
    document.querySelector(".info").innerText = "Turn for " + turn;
    isGameOver = false;
    document
      .getElementsByClassName("imgBox")[0]
      .getElementsByTagName("img")[0].style.height = 0;
  });
});
