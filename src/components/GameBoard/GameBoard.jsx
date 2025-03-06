export default function GameBoard({
  onPlayerMove,
  board,
  // activePlayerSymbol,
}) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => <li key={rowIndex}>
        <ol>
          {row.map((symbol, symbolIndex) => <li key={symbolIndex}>
            <button
              disabled={symbol}
              onClick={() => onPlayerMove(rowIndex, symbolIndex)}
            >
              { symbol }
            </button>
          </li>)}
        </ol>
      </li>)}
    </ol>
  )
}