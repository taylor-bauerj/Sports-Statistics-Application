import React from 'react';
import TeamListItem from './team_list_item';

const TeamList = props => {
    const teamItems = props.teams.map(team => {
        return <TeamListItem
            key={team.idTeam}
            team={team}
            onTeamSelect={props.onTeamSelect}
        />
    });
    return (
        <ul className="list-group list-group-horizontal team-list">
            {teamItems}
        </ul>
    );
}

export default TeamList;