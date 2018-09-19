class Results extends React.Component {
	static propTypes = {
		items: React.PropTypes.array.isRequired
	}
	render() {
		const results = this.props.items.map(result => <Result time={result} />);
		return <ol className="results-list">{results}</ol>
	}
}