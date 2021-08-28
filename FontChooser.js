class FontChooser extends React.Component {

	constructor(props) {
		super(props);
		var isBold = this.props.bold == 'true' ? true : false;

		var min = Number(this.props.min);
		var max = Number(this.props.max);

		if (this.props.min <= 0) min = 1;
		if (this.props.min > this.props.max) {
			min = Number(this.props.max);
			max = Number(this.props.min);
		}

		var size = Number(this.props.size);
		if (size < min) size = min;
		if (size > max) size = max;

		this.state = {
			min: min,
			max: max,
			size: size,
			defaultSize: size,
			isBold: isBold,
			isHidden: true
		}
	}

	hiddenClickHandler() {
		this.setState({ isHidden: !this.state.isHidden });
	}
	boldChangeHandler() {
		this.setState({ isBold: !this.state.isBold });
	}
	increaseClickHandler() {
		if (this.state.size + 1 <= this.state.max)
			this.setState({ size: this.state.size + 1 });
	}
	decreaseClickHandler() {
		if (this.state.size - 1 >= this.state.min)
			this.setState({ size: this.state.size - 1 });
	}
	sizeDoubleClickHandler() {
		this.setState({ size: this.state.defaultSize });
	}

	render() {
		var weight = this.state.isBold ? 'bold' : 'normal';
		var isChecked = this.state.isBold;
		var size = this.state.size + 'px';
		var color = this.state.size == this.state.min || this.state.size == this.state.max ? 'red' : 'black';

		return (
			<div>
				<label htmlFor="boldCheckbox" hidden={this.state.isHidden}>bold:</label>
				<input type="checkbox" id="boldCheckbox" checked={isChecked} onChange={this.boldChangeHandler.bind(this)} hidden={this.state.isHidden} />
				<label htmlFor="fontSizeSpan" hidden={this.state.isHidden}>, size:</label>
				<button id="decreaseButton" onClick={this.decreaseClickHandler.bind(this)} hidden={this.state.isHidden}>-</button>
				<span id="fontSizeSpan" style={{ color: color }} onDoubleClick={this.sizeDoubleClickHandler.bind(this)} hidden={this.state.isHidden}>{this.state.size}</span>
				<button id="increaseButton" onClick={this.increaseClickHandler.bind(this)} hidden={this.state.isHidden}>+</button><br hidden={this.state.isHidden} />
				<span id="textSpan" onClick={this.hiddenClickHandler.bind(this)} style={{ fontWeight: weight, fontSize: size }}>{this.props.text}</span>
			</div>
		);
	}
}

