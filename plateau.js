class Plateau {
	constructor(rowsQty, colsQty) {
		this.rowsQty = rowsQty;
		this.colsQty = colsQty;
		this.usedCells = [];
		this.blockedCells = [];
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

	blockCells(qty) {
		for (let i = 0; i < qty; i++) {
			let cell = this.findFreeCell();
			this.blockedCells.push(cell);
			this.usedCells.push(cell);
			this.blockCellInView(cell);
		}
	}

	blockCellInView(cellId) {
		document.getElementById(cellId).classList.add('blocked-cell');
	}

	findFreeCell() {
		let row = Math.floor(Math.random() * this.rowsQty);
		let column = Math.floor(Math.random() * this.colsQty);
		let cell = this.cellId(column, row);
		let bc = this.blockCells;
		let wc = this.weaponCells;

		if (this.blockedCells.includes(cell)) {
			this.findFreeCell();
		} else {
			this.blockedCells.push(cell);
		}
		if (this.weaponCells.includes(cell)) {
			this.findFreeCell();
		} else {
			this.weaponCells.push(cell);
		}
		if (bc.cell === wc.cell) {
			this.findFreeCell();
		}
		return cell;
	}

	cellId(column, row) {
		return String(column) + String(row);
	}

	weapon(qty) {
		for (let i = 0; i < qty; i++) {
			let cell = this.findFreeCell();
			this.weaponCells.push(cell);
			this.usedCells.push(cell);
			this.weaponCellInView(cell);
		}
	}

	weaponCellInView(cellId) {
		document.getElementById(cellId).classList.add('weapon-cell');
	}
}
let plateau = new Plateau(10, 10); //initialiser le plateau avec 10 rangées et 10 colonnes.
plateau.generer();
plateau.blockCells(5); // cree 5 cases grises
plateau.weapon(5); // cree 5 armes
