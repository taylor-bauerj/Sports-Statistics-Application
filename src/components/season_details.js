import React from 'react';


const SeasonDetails = ({allGames, onEventClick}) => {
    if (allGames.length == 0 || allGames == null) return <ul></ul>

    const homeGames = allGames[0];
    const awayGames = allGames[1];

    let seasonName = '';
    let homeEvents = [];
    let awayEvents = [];

    if (homeGames) {
        homeEvents = homeGames.map(event => {
            seasonName = event.strSeason;
            return (
                <a
                    key={event.idEvent}
                    className="dropdown-item"
                    onClick={() => onEventClick(event)}
                >
                    {event.strAwayTeam} on {event.dateEvent}
                </a>
            );

        });
    }
    if(awayGames) {
        awayEvents = awayGames.map(event => {
           seasonName = event.strSeason;
           return (
               <a
                   key={event.idEvent}
                   className="dropdown-item"
                   onClick={() => onEventClick(event)}
               >
                   {event.strHomeTeam} on {event.dateEvent}
               </a>
           );
        });
    }


    if(homeGames.length == 0) return <div></div>

    return (
        <div>
            <div className="season-title">{seasonName}</div>
            <div className="dropdown show season-details-list">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                   data-toggle="dropdown" data-flip="false" aria-haspopup="true" aria-expanded="false">
                    Home Games
                </a>
                <div className="dropdown-menu">
                    {homeEvents}
                </div>
            </div>
            <div className="dropdown show season-details-list">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                   data-toggle="dropdown" data-flip="false" aria-haspopup="true" aria-expanded="false">
                    Away Games
                </a>
                <div className="dropdown-menu">
                    {awayEvents}
                </div>
            </div>
        </div>
    );
}

export default SeasonDetails;