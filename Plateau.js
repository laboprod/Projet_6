class Plateau {
	constructor(rowsQty, colsQty, game) {
		this.rowsQty = rowsQty;
		this.colsQty = colsQty;
		this.usedCells = [];
		this.usableCells = [];
		this.blockCells = [];
		this.playerCells = [];
		this.weaponCells = [];
		this.game = game;
	}

	cellId(column, row) {
		return String(column) + String(row);
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

	findFreeCellForPlayer() {
		let cell = this.findFreeCell();

		if (this.isNorthFree(cell) && this.isSouthFree(cell) && this.isWestFree(cell) && this.isEastFree(cell)) {
			return cell;
		}
		return this.findFreeCellForPlayer();
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

	getCellDown(cell) {
		let cellDown = parseInt(cell) + 1;

		if (cellDown < 10) {
			cellDown = String('0') + String(cellDown);
		}
		return cellDown;
	}

	getCellLeft(cell) {
		let cellLeft = parseInt(cell) - 10;

		if (cellLeft < 10) {
			cellLeft = String('0') + String(cellLeft);
		}
		return cellLeft;
	}

	getCellRight(cell) {
		let cellRight = parseInt(cell) + 10;

		if (cellRight < 10) {
			cellRight = String('0') + String(cellRight);
		}
		return cellRight;
	}

	getCellUp(cell) {
		let cellUp = parseInt(cell) - 1;

		if (cellUp < 10) {
			cellUp = String('0') + String(cellUp);
		}

		return cellUp;
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

	movePlayer(player, oldPosition) {
		$('#' + oldPosition).removeClass(player.id + '-cell-blink ' + player.id + '-cell');
		$('#' + player.position).addClass(player.id + '-cell-blink ' + player.id + '-cell');
	}

	placeBlocks(qty) {
		for (let i = 0; i < qty; i++) {
			let cell = this.findFreeCell();
			this.blockCells.push(cell);
			this.usedCells.push(cell);
			this.colorize(cell, 'block-cell');
		}
	}

	placePlayer(player) {
		let cell = this.findFreeCellForPlayer();
		this.playerCells.push(cell);
		this.usedCells.push(cell);
		this.colorize(cell, player.id + '-cell');
		player.place(cell, this);
	}

	placeWeapon(weapon) {
		let cell = this.findUsableCell();
		this.weaponCells.push(cell);
		this.usedCells.push(cell);
		this.colorize(cell, weapon.name + '-cell');
		weapon.position = cell;
	}

	unColorize(id, cssClass) {
		document.getElementById(id).classList.remove(cssClass);
	}

	changeWeaponType(oldWeapon, newWeapon) {
		this.unColorize(oldWeapon.position, oldWeapon.name + '-cell');
		this.colorize(newWeapon.position, newWeapon.name + '-cell');
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
