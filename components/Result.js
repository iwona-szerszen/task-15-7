class Result extends React.Component {
	static propTypes = {
		time: React.PropTypes.string.isRequired
	}
	render() {
		return <li className="result">{this.props.time}</li>;
	}
}