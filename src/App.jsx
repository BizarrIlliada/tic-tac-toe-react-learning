import GameBoard from './components/GameBoard/GameBoard';
import Log from './components/Log/Log';
import Player from './components/Players/Player';

import { useState } from 'react';
import { PLAYERS, WINNING_COMBINATIONS } from './data/constants';
import GameOver from './components/GameOver/GameOver';

function deriveActivePlayer(logs) {
  let currentPlayer = 'X';

  if (logs[0] && logs[0].player === 'X') {
    currentPlayer = '0';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, users) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = users[firstSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(logs) {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  for (const log of logs) {
    const { square, player } = log;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [users, setUsers] = useState(PLAYERS);
  const [logs, setLogs] = useState([]);

  const currentPlayer = deriveActivePlayer(logs);
  const gameBoard = deriveGameBoard(logs);
  const winner = deriveWinner(gameBoard, users);
  const isDraw = logs.length === 9 && !winner;

  function handlePlayerMove(rowIndex, colIndex) {
    setLogs(prevLogs => {
      const currentPlayer = deriveActivePlayer(prevLogs);

      const updatedLogs = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevLogs,
      ];

      return updatedLogs;
    });
  }

  function handleChangePlayerName(symbol, newName) {
    setUsers((prevUsers) => {
      return {
        ...prevUsers,
        [symbol]: newName,
      }
    });
  }

  function restartGame() {
    setLogs([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player
            initialPlayerName={users['X']}
            playerSymbol="X"
            isActive={currentPlayer === 'X'}
            onPlayerRename={handleChangePlayerName}
          />
          <Player
            initialPlayerName={users['0']}
            playerSymbol="0"
            isActive={currentPlayer === '0'}
            onPlayerRename={handleChangePlayerName}
          />
        </ol>

        { (winner || isDraw) && <GameOver winner={winner} onRestartGame={restartGame} /> }

        <GameBoard
          activePlayerSymbol={currentPlayer}
          board={gameBoard}
          onPlayerMove={handlePlayerMove}
        />
      </div>

      <Log logs={logs} />
    </main>
  )
}

export default App
