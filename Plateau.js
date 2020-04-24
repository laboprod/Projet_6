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

		let northCell = this.getCellUp(cell);

		if (this.usedCells.includes(northCell)) {
			return false;
		}
		return true;
	}

	getCellUp(cell) {
		let cellUp = cell - 1;

		if (cellUp < 10) {
			cellUp = String('0') + String(cellUp);
		}

		return cellUp;
	}

	isSouthFree(cell) {
		if (cell % 10 === 9) {
			return false;
		}
		let southCell = this.getCellDown(cell);

		if (this.usedCells.includes(southCell)) {
			return false;
		}
		return true;
	}

	getCellDown(cell) {
		let cellDown = cell + 1;

		if (cellDown < 10) {
			cellDown = String('0') + String(cellDown);
		}
		return cellDown;
	}

	isWestFree(cell) {
		if (cell <= String('0') + 9) {
			return false;
		}
		// if (String('0') + 1 <= cell <= String('0') + 9) {
		// 	return false;
		// }

		let westCell = this.getCellLeft(cell);

		if (this.usedCells.includes(westCell)) {
			return false;
		}
		return true;
	}

	getCellLeft(cell) {
		let cellLeft = cell - 10;

		if (cellLeft < 10) {
			cellLeft = String('0') + String(cellLeft);
		}
		return cellLeft;
	}

	isEastFree(cell) {
		if (cell >= 9 + String('0')) {
			return false;
		}
		// if (91 <= cell <= 99) {
		// 	return false;
		// }

		let eastCell = this.getCellRight(cell);

		if (this.usedCells.includes(eastCell)) {
			return false;
		}
		return true;
	}

	getCellRight(cell) {
		let cellRight = cell + 10;

		if (cellRight < 10) {
			cellRight = String('0') + String(cellRight);
		}
		return cellRight;
	}

	cellId(column, row) {
		return String(column) + String(row);
	}

	placeWeapon(weapon) {
		let cell = this.findUsableCell();
		this.weaponCells.push(cell);
		this.usedCells.push(cell);
		this.colorize(cell, weapon.name + '-cell');
		weapon.position = cell;
	}

	movePlayer(player, oldPosition) {
		let oldCell = document.getElementById(oldPosition);
		let newCell = document.getElementById(player.position);
		oldCell.classList.remove(player.side + '-cell');
		newCell.classList.add(player.side + '-cell');
	}

	placePlayer(player) {
		let cell = this.findUsableCell();
		this.playerCells.push(cell);
		this.usedCells.push(cell);
		this.colorize(cell, player.side + '-cell');
		player.place(cell, this);
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
