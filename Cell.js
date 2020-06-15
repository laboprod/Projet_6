class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	get cellDom() {
		return $(`.cell[data-x=${this.x}][data-y=${this.y}]`);
	}

	get west() {
		let x = this.x - 1;
		let y = this.y;

		return new Cell(x, y);
	}

	get east() {
		let x = this.x + 1;
		let y = this.y;

		return new Cell(x, y);
	}

	get north() {
		let x = this.x;
		let y = this.y - 1;

		return new Cell(x, y);
	}

	get south() {
		let x = this.x;
		let y = this.y + 1;

		return new Cell(x, y);
	}
}
