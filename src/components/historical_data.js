import React, {Component} from 'react';
import Plot from 'react-plotly.js';

class HistoricalData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            graphData: [],
            matchedEvents: [],
            layout: []
        }

        this.getHistoricalData();
    }

    checkStatus(response) {
        if (response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }

    parseJSON(response) {
        return response.json();
    }


    getHistoricalData() {
        let matchedEvents = [];
        const teamId = this.props.team.idTeam;

        let self = this;

        let urls = [];
        this.props.seasons.map(season => {
            urls.push('https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=' + self.props.team.idLeague + '&s=' + season.strSeason);
        });

        Promise.all(urls.map(url =>
            fetch(url)
                .then(self.checkStatus)
                .then(self.parseJSON)
        ))
            .then(data => {
                    if (!data || !self.props.selectedEvent) return;
                    data.map(season => {
                        season.events.filter(event => {
                            if (event.idHomeTeam == self.props.team.idTeam && event.idAwayTeam == self.props.selectedEvent.idAwayTeam ||
                                event.idHomeTeam == self.props.selectedEvent.idAwayTeam && event.idAwayTeam == self.props.team.idTeam) {
                                matchedEvents.push(event);
                            }
                        })
                    });

                    let x = [];
                    let teamScore = [];
                    let opponentScore = [];
                    let opponentName = self.props.selectedEvent.strAwayTeam;
                    if (teamId == self.props.selectedEvent.idAwayTeam) opponentName = self.props.selectedEvent.strHomeTeam;

                    matchedEvents.filter(e => {
                        let homeId = e.idHomeTeam;

                        x.push(e.dateEvent);

                        if (homeId == teamId) {
                            teamScore.push(e.intHomeScore);
                            opponentScore.push(e.intAwayScore);
                        } else {

                            teamScore.push(e.intAwayScore);
                            opponentScore.push(e.intHomeScore);
                        }
                    });

                    console.log(self.props.selectedEvent);

                    const teamLine = {
                        x: x,
                        y: teamScore,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'blue'},
                        name: self.props.team.strTeam
                    };
                    const opponentLine = {
                        x: x,
                        y: opponentScore,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                        name: opponentName
                    };
                    const layout = {
                        title: self.props.team.strTeam + " vs " + opponentName + " historically",
                        autosize: true
                    }

                    self.setState({
                        graphData: [teamLine, opponentLine],
                        matchedEvents: matchedEvents,
                        layout: layout
                    });
                }
            );
    }


    render() {
        if (!this.props.selectedEvent) return <div></div>;
        if (this.state.matchedEvents.length > 0) {
            return (
                <div className="graph">
                    <Plot data={this.state.graphData} layout={this.state.layout} useResizeHandler={true}/>
                </div>
            );
        }
        return <span>Loading...</span>;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.selectedEvent != prevProps.selectedEvent) {
            this.getHistoricalData();
        }
    }
}

export default HistoricalData;