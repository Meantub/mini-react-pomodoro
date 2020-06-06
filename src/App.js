import React from 'react';
import Moment from 'react-moment';
import { Circle } from 'rc-progress';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            time: ""
        };
    }

    startTimer() {
        const currDate = Date.now();

        this.setState({
            timer: <Moment interval={1000} add={{ minutes: 25 }} date={currDate} durationFromNow onChange={this.onTimerUpdate.bind(this)}></Moment>
        });
    }

    onTimerUpdate(value) {
        this.setState({
            time: value
        });
    }

    convertDurationToPercent(value) {
        if(value == null || value == undefined || value == "") return 0;
        const TOTALTIME = 25*60;
        const regex = /\-([0-5][0-9]):([0-5][0-9])/;
        const matches = value.match(regex);

        const minutes = Number.parseInt(matches[1]);
        const seconds = Number.parseInt(matches[2]);

        const rMinutes = 1 - (minutes/25);
        const rSeconds = 1 - (seconds/60);

        const percent = ((rMinutes * rSeconds)/TOTALTIME)*100
        
        console.log(`${percent}`);
        return percent

    }

    valueIfExists(value, ifDoesNotExist) {
        return value != null || value != "" ? value : ifDoesNotExist;
    }

    render() {
        const timer = (
            <React.Fragment>
                {this.valueIfExists(this.state.timer, "")}
            </React.Fragment>
        );

        const loading = (
            <Circle percent={this.convertDurationToPercent(this.state.time)} strokeWidth="4" />
        );

        return (
            <div className="app-root">
                <button onClick={this.startTimer.bind(this)} >Start</button>
                <hr />
                {timer}
                <div style={{width: 600, height: 400}}>
                    {loading}
                </div>
            </div>
        );
    }
}

export default App;