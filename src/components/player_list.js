import React, {Component} from 'react';
import PlayerListItem from './player_list_item';

class PlayerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadedPlayers: false,
            playerList: []
        }

        this.getPlayers(props.team.strTeam);
    }

    getPlayers(teamName) {
        const url = 'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=';
        let search = teamName.replace(" ", "_");
        let self = this;

        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", url + search, true);
            request.onload = function () {
                let data = JSON.parse(this.response);
                resolve(data);
            }

            request.send();
        }).then(response => {
            if (!response.player) return;
            const playerList = response.player.map(player => {
                return <PlayerListItem
                    player={player}
                    key={player.idPlayer}
                    onPlayerClick={self.props.onPlayerClick}
                />
            });
            self.setState({
                loadedPlayers: true,
                playerList: playerList
            })
        });

    }

    render() {
        if (!this.state.loadedPlayers) {
            return <div>Loading Players</div>
        }

        return (
            <div className="player-list">
                <div className="dropdown show">
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button"
                       data-toggle="dropdown" data-flip="false" aria-haspopup="true" aria-expanded="false">
                        Current Players
                    </a>

                    <div className="dropdown-menu">
                        {this.state.playerList}
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.team.idTeam != this.props.team.idTeam) {
            this.getPlayers(this.props.team.strTeam);
        }
    }

}

export default PlayerList;