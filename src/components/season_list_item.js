import React from 'react';

const SeasonListItem = ({season, onSeasonClick, team}) => {
    return (
        <a onClick={() => onSeasonClick(team.idLeague, season.strSeason, team.idTeam)}
           className="dropdown-item"
        >
            {season.strSeason}
        </a>);
}

export default SeasonListItem;