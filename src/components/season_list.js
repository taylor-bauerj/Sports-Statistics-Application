import React from 'react';
import SeasonListItem from './season_list_item';

const SeasonList = ({seasons, onSeasonClick, team}) => {

    if(!seasons) return <div></div>;
    const seasonList = seasons.slice(0).reverse().map(season => {
        return <SeasonListItem
            season={season}
            key={season.strSeason}
            onSeasonClick={onSeasonClick}
            team={team}
        />;
    });

    return (
        <div className="league-seasons">
            <div className="dropdown show">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                   data-toggle="dropdown" data-flip="false" aria-haspopup="true" aria-expanded="false">
                    Seasons
                </a>

                <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Overall</a>
                    {seasonList}
                </div>
            </div>
        </div>
    );
}

export default SeasonList;