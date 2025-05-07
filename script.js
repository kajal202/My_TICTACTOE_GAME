
let turn = "X";
let isgameover = false;
let turnCount = 0;

// Function to change the turn
const changeTurn = () => (turn === "X" ? "0" : "X");

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of wins) {
    let [a, b, c] = combo;
    if (
      boxtext[a].innerText === boxtext[b].innerText &&
      boxtext[c].innerText === boxtext[b].innerText &&
      boxtext[a].innerText !== ""
    ) {
      document.querySelector(".info").innerText = `${boxtext[a].innerText} Won!`;
      isgameover = true;

      // Highlight winning boxes
      let boxes = document.getElementsByClassName("box");
      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");
      return; // Exit after win
    }
  }

  // If all turns played and no winner
  if (turnCount === 9 && !isgameover) {
    document.querySelector(".info").innerText = "It's a draw!";
    isgameover = true;
  }
};

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !isgameover) {
      boxtext.innerText = turn;
      turnCount++;
      checkWin();
      if (!isgameover) {
        turn = changeTurn();
        document.querySelector(".info").innerText = `Turn for ${turn}`;
      }
    }
  });
});

// Reset button logic
document.getElementById("reset").addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  boxtexts.forEach((el) => (el.innerText = ""));

  // Remove win classes
  document.querySelectorAll(".box").forEach((el) => el.classList.remove("win"));

  turn = "X";
  turnCount = 0;
  isgameover = false;
  document.querySelector(".info").innerText = "Turn for " + turn;
});
