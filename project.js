// 1. Deposit some money
// 2. Determine the number or lines to bet
// 3. Collect a bet amount
// 4. Split the slot machine
// 5. Check if user won
// 6. Give the user their winnings
// 7. Play again or add more funds

const prompt = require("prompt-sync")();

// GLOBAL VARIABLES

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SUMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// function deposit() {

// }

// modern function declaration method

// 1.
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositNumber = parseFloat(depositAmount);

    if (isNaN(numberDepositNumber) || numberDepositNumber <= 0) {
      console.log("Invalid deposit number , try again.");
    } else {
      return numberDepositNumber;
    }
  }
};

// 2.

const getNumberofLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on(1-3): ");
    const numberofLines = parseFloat(lines);

    if (isNaN(numberofLines) || numberofLines <= 0 || numberofLines > 3) {
      console.log("Invalid number of lines selected , try again.");
    } else {
      return numberofLines;
    }
  }
};

// 3.

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet , try again.");
    } else {
      return numberBet;
    }
  }
};

// 4.

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex];
      reels[i].push(selectedSymbol);
      reelSymbols.splice(randomIndex, 1);

      //   console.log(randomIndex);
      //   console.log(selectedSymbol);
      //   console.log(reelSymbols)
    }
  }
  //   console.log(symbols)
  //   console.log(reels);

  return reels;
};

// Transposing the reels array

const transpose = (reels) => {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;

  /* 

  [A B C] [D E F] [G H I]
  
  [A D G] [B E F] [C F I] 
  
  */
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

// 5.

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * SUMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};

// CORE LOGIC = 6 + 7

const game = () => {
  let balance = deposit();

  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberofLines();
    const bet = getBet(balance, getNumberofLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnigns = getWinnings(rows, bet, numberOfLines);
    balance += winnigns;
    console.log("You won , $" + winnigns.toString());

    if (balance <= 0) {
      console.log("YOU RAN OUT OF MONEY. :(");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)?");

    if (playAgain != "y" && playAgain != "Y") break;
  }
};

game();
