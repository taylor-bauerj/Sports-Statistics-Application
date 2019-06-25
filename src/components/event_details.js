import React from 'react';
import Plot from 'react-plotly.js';

const EventDetails = ({selectedEvent}) => {
    //console.log(selectedEvent);

    if (!selectedEvent) return <div></div>

    const figure = {
        eventData: [
            {
                x: [selectedEvent.strHomeTeam, selectedEvent.strAwayTeam],
                y: [selectedEvent.intHomeScore, selectedEvent.intAwayScore],
                type: 'bar'
            }
        ],
        layout: {
            title: selectedEvent.strEvent + " on " + selectedEvent.dateEvent,
            autosize: true
        }
    }


    return (
        <div className="graph">
            <Plot data={figure.eventData} layout={figure.layout} useResizeHandler={true}/>
        </div>
    );
}

export default EventDetails;