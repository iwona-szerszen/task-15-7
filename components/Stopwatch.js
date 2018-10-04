class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.running = false;
		this.state = {
			results: [],
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		}
	}

	reset() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}

	format() {
		return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
	}

	pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = `0${result}`;
		}
		return result;
	}

	start = () => {
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if (!this.running) return;
		this.calculate();
	}

	calculate() {		
		const times = Object.assign({}, this.state.times);
		
		times.miliseconds += 1;

		if (times.miliseconds >= 100) {
			times.seconds += 1;
			times.miliseconds = 0;
		}

		if (times.seconds >= 60) {
			times.minutes += 1;
			times.seconds = 0;
		}		

		this.setState({ times });
	}

	stop = () => {
		this.running = false;
		clearInterval(this.watch);
	}

	saveTime() {
		const results = this.state.results.slice();
		results.push(this.format());
		
		this.setState({ results });
	}

	resetTimer = () => {
		this.stop();
		this.saveTime();
		this.reset();	
	}

	resetResults = () => {
		this.setState({results: []});
	}

	render() {
		return (
			<div>
				<nav className="controls">
					<a href="#" key="start" onClick={this.start}>Start</a>
					<a href="#" key="stop" onClick={this.stop}>Stop</a>
					<a href="#" key="reset-timer" onClick={this.resetTimer}>Reset</a>
				</nav>
				<div className="stopwatch">
					{this.format()}
				</div>
				<nav className="list-header">
					<a href="#" key="reset-results" onClick={this.resetResults}>Reset list</a>
					<div className="list-title">Time results list:</div>
				</nav>
				<Results items={this.state.results} />
			</div>
		);
	}
}