import { useState } from 'react';

export default function Player({
  initialPlayerName,
  playerSymbol,
  isActive,
  onPlayerRename,
}) {
  const [playerName, setPlayerName] = useState(initialPlayerName);
  const [isEditing, setIsEditing] = useState(false);

  function handleChangePlayerName(event) {
    console.log(event.target.value);

    setPlayerName(event.target.value)
  }

  function editUserName(symbol, newName) {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onPlayerRename(symbol, newName);
    }
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        { isEditing
          ? <input type="text" required value={playerName} onChange={handleChangePlayerName} />
          : <span className="player-name">{ playerName }</span>
        }

        <span className="player-symbol">
          { playerSymbol }
        </span>

        <button onClick={() => editUserName(playerSymbol, playerName)}>
          { isEditing ? 'Save' : 'Edit' }
        </button>
      </span>
    </li>
  )
}