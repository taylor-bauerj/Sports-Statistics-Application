import React, {Component} from 'react';

import SearchBar from './search_bar';
import TeamList from './team_list';
import TeamDetails from './team_details';

const url = "https://www.thesportsdb.com/api/v1/json/1/";
// list all seasons for certain league id
const ALL_SEASONS = url + "search_all_seasons.php?id=";
// list all events for certain league and season + league_id + &s= + season_id
const EVENTS_SEASON = url + "eventsseason.php?id=";
// search for team by name
const SEARCH_TEAM = url + "searchteams.php?t=";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: [],
            selectedTeam: null,
            seasons: [],
            homeGames: [],
            awayGames: [],
            allGames: []
        };

        this.teamSearch("Seattle Sea");
    }

    teamSearch(teamName) {
        let request = new XMLHttpRequest();
        let search = teamName.replace(" ", "_");

        let self = this;
        request.open("GET", SEARCH_TEAM + search, true);

        request.onload = function () {
            let data = JSON.parse(this.response);
            let teams = data.teams;

            if(!teams) return;

            self.setState({
                teams: teams,
                selectedTeam: teams[0]
            });

            if(self.state.selectedTeam) self.getSeasons(self.state.selectedTeam.idLeague);

        }
        request.send();
    }

    getSeasons(gameId) {
        let request = new XMLHttpRequest();

        let self = this;
        request.open("GET", ALL_SEASONS + gameId, true);

        request.onload = function () {
            let data = JSON.parse(this.response);
            if(!self.state.selectedTeam) return;
            self.setState({seasons: data.seasons});
            self.getSeasonEvents(self.state.selectedTeam.idLeague, self.state.seasons[0].strSeason, self.state.selectedTeam.idTeam);
        }
        request.send();
    }

    getSeasonEvents(leagueId, seasonId, teamId) {
        let request = new XMLHttpRequest();

        let self = this;
        request.open("GET", EVENTS_SEASON + leagueId + "&s=" + seasonId, true);

        request.onload = function() {
            let data = JSON.parse(this.response);

            let homeTeam = [];
            let awayTeam = [];

            if(!data.events) return;

            data.events.forEach(el => {
                if(el.idHomeTeam == teamId) homeTeam.push(el);
                if(el.idAwayTeam == teamId) awayTeam.push(el);
            });

            self.setState({
                homeGames: homeTeam,
                awayGames: awayTeam,
                allGames: [homeTeam, awayTeam]
            });
        }
        request.send();
    }

    render() {
        return (
            <div>
                <SearchBar onSearchTermChange={teamName => this.teamSearch(teamName)}/>
                <TeamList
                    teams={this.state.teams}
                    onTeamSelect={selectedTeam => {
                        this.setState({selectedTeam});
                        this.getSeasons(selectedTeam.idLeague);
                    }}
                />
                <TeamDetails
                    team={this.state.selectedTeam}
                    seasons={this.state.seasons}
                    onSeasonClick={(leagueId, seasonId, teamId) => this.getSeasonEvents(leagueId, seasonId, teamId)}
                    allGames={this.state.allGames}
                />
            </div>
        );
    }
}