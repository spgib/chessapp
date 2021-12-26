import rawMoves from "./rawMoves";

const totalBoardMoves = board => {
  let totalMoves = [];

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (board[x][y].type) {
        totalMoves.push({
          type: board[x][y].type,
          origin: {row: x, column: y},
          color: board[x][y].color,
          targets: rawMoves(board, x, y)
        })
      }
    }
  }

  return totalMoves;
}

export default totalBoardMoves;