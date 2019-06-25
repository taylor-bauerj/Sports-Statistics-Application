import React from 'react';

const PlayerListItem = ({player, onPlayerClick}) => {
    return (
      <a key={player.idPlayer}
         className="dropdown-item"
         onClick={() => onPlayerClick(player.idPlayer)}
      >
          {player.strPlayer}
      </a>
    );
}

export default PlayerListItem;