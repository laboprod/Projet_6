class Plateau {
	constructor(rowsQty, colsQty) {
		this.rowsQty = rowsQty;
		this.colsQty = colsQty;
		this.usedCells = [];
		this.usableCells = [];
		this.blockCells = [];
		this.playerCells = [];
		this.weaponCells = [];
	}
	generer() {
		let table = '';
		for (let r = 0; r < this.rowsQty; r++) {
			table += '<tr>';
			for (let c = 0; c < this.colsQty; c++) {
				let id = String(c) + String(r);
				table += "<td id='" + id + "'></td>"; // donner un Identifiant à chaque case du plateau
			}
			table += '</tr>';
		}
		let tableau = "<table id='plateau'>" + table + '</table>';
		document.getElementById('container').innerHTML = tableau;
	}

	colorize(id, cssClass) {
		document.getElementById(id).classList.add(cssClass);
	}

	findFreeCell() {
		let row = Math.floor(Math.random() * this.rowsQty);
		let column = Math.floor(Math.random() * this.colsQty);
		let cell = this.cellId(column, row);

		if (this.usedCells.includes(cell)) {
			return this.findFreeCell();
		}
		return cell;
	}

	findUsableCell() {
		let cell = this.findFreeCell();

		if (this.isNorthFree(cell)) {
			return cell;
		}

		if (this.isSouthFree(cell)) {
			return cell;
		}

		if (this.isWestFree(cell)) {
			return cell;
		}

		if (this.isEastFree(cell)) {
			return cell;
		}
		return this.findUsableCell();
	}

	isNorthFree(cell) {
		if (cell % 10 === 0) {
			return false;
		}

		let northCell = cell - 1;

		if (northCell < 10) {
			northCell = String('0') + String(northCell);
		}
		if (this.usedCells.includes(northCell)) {
			return false;
		}
		return true;
	}
	isSouthFree(cell) {
		if (cell % 2 === 1) {
			return false;
		}
		let southCell = cell + 1;

		if (southCell < 10) {
			southCell = String('0') + String(southCell);
		}
		if (this.usedCells.includes(southCell)) {
			return false;
		}
		return true;
	}
	isWestFree(cell) {
		if (String('0') + 1 <= cell <= String('0') + 9) {
			return false;
		}

		let westCell = cell - 10;

		if (westCell < 10) {
			westCell = String('0') + String(westCell);
		}
		if (this.usedCells.includes(westCell)) {
			return false;
		}
		return true;
	}
	isEastFree(cell) {
		if (91 <= cell <= 99) {
			return false;
		}

		let eastCell = cell + 10;

		if (eastCell < 10) {
			eastCell = String('0') + String(eastCell);
		}
		if (this.usedCells.includes(eastCell)) {
			return false;
		}
		return true;
	}

	cellId(column, row) {
		return String(column) + String(row);
	}

	placeWeapon(weapon) {
		let cell = this.findUsableCell();
		this.weaponCells.push(cell);
		this.usedCells.push(cell);
		this.colorize(cell, weapon.name + '-cell');
	}

	placePlayer(player) {
		let cell = this.findUsableCell();
		this.playerCells.push(cell);
		this.usedCells.push(cell);
		this.colorize(cell, player.name + '-cell');
	}

	placeBlocks(qty) {
		for (let i = 0; i < qty; i++) {
			let cell = this.findFreeCell();
			this.blockCells.push(cell);
			this.usedCells.push(cell);
			this.colorize(cell, 'block-cell');
		}
	}

	// place(qty, type) {
	// 	for (let i = 0; i < qty; i++) {
	// 		let cell = this.findFreeCell();
	// 		let key = type + 'Cells';
	// 		this[key].push(cell);
	// 		this.usedCells.push(cell);
	// 		this.colorize(cell, type + '-cell');
	// 	}
	// }
}
