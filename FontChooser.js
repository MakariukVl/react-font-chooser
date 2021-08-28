class FontChooser extends React.Component {

	constructor(props) {
		super(props);
		var isBold;
		switch (this.props.bold) {
			case 'true':
				isBold = true; break;
			case 'false':
				isBold = false; break;
			default:
				isBold = false; break;
		}

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
	sizeDbClickHandler() {
		this.setState({ size: this.state.defaultSize });
	}

	render() {
		var classHidden = this.state.isHidden ? 'hidden' : undefined;
		var weight = this.state.isBold ? 'bold' : 'normal';
		var isChecked = this.state.isBold;
		var size = this.state.size + 'px';
		var color = this.state.size == this.state.min || this.state.size == this.state.max ? 'red' : 'black';

		return (
			<div>
				<label htmlFor="boldCheckbox" className={classHidden}>bold:</label>
				<input type="checkbox" id="boldCheckbox" checked={isChecked} className={classHidden} onChange={this.boldChangeHandler.bind(this)} />
				<label htmlFor="fontSizeSpan" className={classHidden}>, size:</label>
				<button id="decreaseButton" className={classHidden} onClick={this.decreaseClickHandler.bind(this)}>-</button>
				<span id="fontSizeSpan" className={classHidden} style={{ color: color }} onDoubleClick={this.sizeDbClickHandler.bind(this)}>{this.state.size}</span>
				<button id="increaseButton" className={classHidden} onClick={this.increaseClickHandler.bind(this)}>+</button><br className={classHidden} />
				<span id="textSpan" onClick={this.hiddenClickHandler.bind(this)} style={{ fontWeight: weight, fontSize: size }}>{this.props.text}</span>
			</div>
		);
	}
}

