class Results extends React.Component {
	static propTypes = {
		items: React.PropTypes.array.isRequired
	}
	render() {
		const results = this.props.items.map((result, index) => <Result key={index} time={result} />);
		return <ol className="results-list">{results}</ol>
	}
}