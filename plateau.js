class Plateau {
	constructor(rowsQty, colsQty) {
		this.rowsQty = rowsQty;
		this.colsQty = colsQty;
		this.usedCells = [];
		this.blockCells = [];
		this.warriorCells = [];
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

		if (this.isNorthFree()) {
			return cell;
		}

		if (this.isSouthFree()) {
			return cell;
		}

		if (this.isWestFree()) {
			return cell;
		}

		if (this.isEastFree()) {
			return cell;
		}
		return this.findUsableCell();
	}

	isNorthFree() {
		let northCell = (this.cellId -= 1);
		if (this.usedCells.includes(northCell)) {
			return this.findUsableCell();
		}
	}
	isSouthFree() {}
	isWestFree() {}
	isEastFree() {}

	cellId(column, row) {
		return String(column) + String(row);
	}

	placeWeapon(weapon) {
		let cell = this.findFreeCell();
		this.weaponCells.push(cell);
		this.usedCells.push(cell);
		this.colorize(cell, weapon.nom + '-cell');
	}

	placeWarrior(warrior) {
		let cell = this.findFreeCell();
		this.warriorCells.push(cell);
		this.usedCells.push(cell);
		this.colorize(cell, warrior.pseudo + '-cell');
	}

	place(qty, type) {
		for (let i = 0; i < qty; i++) {
			let cell = this.findFreeCell();
			let key = type + 'Cells';
			this[key].push(cell);
			this.usedCells.push(cell);
			this.colorize(cell, type + '-cell');
		}
	}
}
