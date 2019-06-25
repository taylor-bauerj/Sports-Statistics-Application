import React, {Component} from 'react';
import SeasonList from './season_list';
import SeasonDetails from './season_details';
import EventDetails from './event_details';
import HistoricalData from './historical_data';
import PlayerList from './player_list';

class TeamDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedEvent: null,
            historicalData: [],
            selectedPlayer: null
        };
    }

    render() {
        if (!this.props.team) {
            return (
                <img src="../../public/Image/loading.gif" className="ajax-loader"/>
            );
        }
        return (
            <div className="team-details col-md-12">
                <div className="team-logo">
                    <img src={this.props.team.strTeamLogo}/>
                    <div className="team-description-text overflow-auto">{this.props.team.strDescriptionEN}</div>
                </div>
                <div className="description-container">
                    <div className="team-description">
                        <PlayerList
                            team={this.props.team}
                            onPlayerClick={selectedPlayer => {
                                this.setState({selectedPlayer})
                            }}
                        />
                        <SeasonList
                            seasons={this.props.seasons}
                            onSeasonClick={this.props.onSeasonClick}
                            team={this.props.team}
                        />
                        <div className="season-name">
                            <SeasonDetails
                                allGames={this.props.allGames}
                                onEventClick={selectedEvent => {
                                    this.setState({selectedEvent});
                                }}
                            />
                        </div>
                    </div>
                    <div className="season-details">
                        <EventDetails
                            selectedEvent={this.state.selectedEvent}
                        />
                        <HistoricalData
                            team={this.props.team}
                            seasons={this.props.seasons}
                            selectedEvent={this.state.selectedEvent}
                        />
                    </div>

                </div>
            </div>
        );
    }
}

export default TeamDetails;