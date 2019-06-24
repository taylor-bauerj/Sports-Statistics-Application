import React from 'react';

const TeamListItem = ({team, onTeamSelect}) => {
    return (
        <li onClick={() => onTeamSelect(team)} className="list-group-item team-item" >
            <div>
                <img src={team.strTeamLogo} className="team-image"/>
            </div>
            <div>
                <div className="team-name">{team.strTeam}</div>
                <div className="stadium-location">{team.strStadium}<br/> {team.strStadiumLocation}</div>
            </div>
        </li>
    );
}

export default TeamListItem;