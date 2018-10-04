class Stopwatch extends React.Component {
	constructor(display) {
		super();
		this.state = {
			running: false,
			results: [],
			display: display,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		}
		//this.resetTimer();
		this.print();
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

	print() {
		this.setState({
			display: {
				innerText: this.format()
			}
		});
	}

	/*
	print() {
		this.setState({display.innerText: this.format()});
	}
	*/

	/*
	print() {
		this.display.innerText = this.format(this.times);
	}
	*/

	format() {
		return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
	}

	pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = `0${result}`;
		}
		return result;
	};

	start = () => {
		if (!this.state.running) {
			this.setState({running: true});
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if (!this.state.running) return;
		this.calculate();
		this.print();
	}

	calculate() {
		this.setState({
			times: {
				miliseconds: miliseconds + 1
			}
		});
		if (this.state.times.miliseconds >= 100) {
			this.setState({
				times: {
					seconds: seconds + 1,
					miliseconds: 0
				}
			});
		}
		if (this.state.times.seconds >= 60) {
			this.setState({
				times: {
					minutes: minutes + 1,
					seconds: 0
				}
			});
		}

		/*this.setState({times.miliseconds: times.miliseconds + 1});
		if (this.state.times.miliseconds >= 100) {
			this.setState({
				times.seconds: times.seconds + 1;
				times.miliseconds: 0;
			});
		}
		if (this.state.times.seconds >= 60) {
			this.setState({
				times.minutes: times.minutes + 1;
				times.seconds: 0;
			});
		}
		*/
	}

	stop = () => {
		this.setState({running: false});
		clearInterval(this.watch);
	}

	saveTime() {
		this.setState({results: results.push(this.format())});
	}

	resetTimer = () => {
		this.stop();
		this.saveTime();
		this.reset();
		this.print();
		//ReactDOM.render(<Results items={this.results} />, document.getElementById('results'));
	}

	resetResults = () => {
		this.setState({results: []});
		//ReactDOM.render(<Results items={this.results} />, document.getElementById('results'));
	}

	render() {
		return (
			<div>
				<nav className="controls">
					<a href="#" key="start" onClick={this.start}>Start</a>
					<a href="#" key="stop" onClick={this.stop}>Stop</a>
					<a href="#" key="reset-timer" onClick={this.resetTimer}>Reset</a>
				</nav>
				//<div className="stopwatch"></div>
				<nav className="list-header">
					<a href="#" key="reset-results" onClick={this.resetResults}>Reset list</a>
					<div className="list-title">Time results list:</div>
				</nav>
				<Results items={this.state.results} />
				//<div key="results"></div>
			</div>
		);
	}
}