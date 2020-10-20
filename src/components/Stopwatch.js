import React, {Component} from 'react';

class Stopwatch extends Component {

    state = {
        isRunning: false,
        elapsedTime: 0,
        previousTime: 0
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 10);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    tick = () => {
        if(this.state.isRunning) {
            const now = Date.now();
            this.setState( prevState => ({
                previousTime: now,
                elapsedTime: prevState.elapsedTime + (now - this.state.previousTime)
            }));
        }
    }

    handleStopwatch = () => {
        this.setState(prevState => ({
            isRunning: !prevState.isRunning
        }));
        if(!this.state.isRunning) {
            this.setState({ previousTime: Date.now() });
        }
    }

    handleReset = () => {
        this.setState({ elapsedTime: 0 });
    }

    render() {
        let seconds = Math.floor(this.state.elapsedTime / 1000).toString().padStart(2, '0');
        const tensHundreds = Math.floor((this.state.elapsedTime % 1000) / 10).toString().padStart(2, '0');
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        if(minutes > 0){
            seconds = (parseInt(seconds, 10) - (minutes * 60)).toString().padStart(2, '0');
        }

        return(
            <div className="stopwatch">
                <h2>Stopwatch</h2>
                <span className="stopwatch-time">
                    {minutes > 0 ? `${minutes}:` : ''}{seconds}:{tensHundreds}
                </span>
                <button onClick={this.handleStopwatch}>
                    { this.state.isRunning ? 'Stop' : 'Start' }
                </button> 
                <button onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

export default Stopwatch;