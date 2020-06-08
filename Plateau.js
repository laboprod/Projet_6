class Plateau {
	constructor(rowsQty, colsQty, game) {
		this.rowsQty = rowsQty;
		this.colsQty = colsQty;
		this.maxRowValue = rowsQty - 1;
		this.maxColValue = colsQty - 1;
		this.usedCells = [];
		this.usableCells = [];
		this.blockCells = [];
		this.playerCells = [];
		this.weaponCells = [];
		this.game = game;
	}

	cellId(x, y) {
		return $(`.cell[data-x=${x}][data-y=${y}]`);
	}

	changeWeaponType(oldWeapon, newWeapon) {
		this.unColorize(oldWeapon.position, oldWeapon.name + '-cell');
		this.colorize(newWeapon.position, newWeapon.name + '-cell');
	}

	// colorize(id, cssClass) {
	// 	document.getElementsByClassName(id).classList.add(cssClass);
	// }

	findFreeCell() {
		let x = Math.floor(Math.random() * this.rowsQty);
		let y = Math.floor(Math.random() * this.colsQty);
		let cell = this.cellId(x, y);

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
		let $plateauContainer = $('#tableau');
		let $table = $('<table></table>');

		for (let x = 0; x < this.rowsQty; x++) {
			let $row = $('<tr class="line"></tr>');

			for (let y = 0; y < this.colsQty; y++) {
				let $cell = $(`<td data-x=${x} data-y=${y} class="cell"></td>`);
				$row.append($cell);
			}
			$table.append($row);
		}
		$plateauContainer.html($table);
	}

	// generer() {
	// 	let table = '';
	// 	for (let r = 0; r < this.rowsQty; r++) {
	// 		table += '<tr>';
	// 		for (let c = 0; c < this.colsQty; c++) {
	// 			let id = String(c) + String(r);
	// 			table += "<td id='" + id + "'></td>"; // donner un Identifiant à chaque case du plateau
	// 		}
	// 		table += '</tr>';
	// 	}
	// 	let tableau = "<table id='plateau'>" + table + '</table>';
	// 	document.getElementById('container').innerHTML = tableau;
	// }

	getCellDown(cell) {
		let cellDown = this.cellId(cell.x, cell.y + 1);

		return cellDown;
	}

	getCellLeft(cell) {
		let cellLeft = this.cellId(cell.x - 1, cell.y);

		return cellLeft;
	}

	getCellRight(cell) {
		let cellRight = this.cellId(cell.x + 1, cell.y);

		return cellRight;
	}

	getCellUp(cell) {
		let cellUp = this.cellId(cell.x, cell.y - 1);

		return cellUp;
	}

	isEastFree(cell) {
		let eastCell = this.getCellRight(cell);

		if (this.usedCells.includes(eastCell)) {
			return false;
		}
		return true;
	}

	isNorthFree(cell) {
		let northCell = this.getCellUp(cell);

		if (this.usedCells.includes(northCell)) {
			return false;
		}
		return true;
	}

	isSouthFree(cell) {
		let southCell = this.getCellDown(cell);

		if (this.usedCells.includes(southCell)) {
			return false;
		}
		return true;
	}

	isWestFree(cell) {
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
			// this.colorize(cell, 'block-cell');
			cell.addClass('block-cell');
		}
	}

	placePlayer(player) {
		let cell = this.findFreeCellForPlayer();
		this.playerCells.push(cell);
		this.usedCells.push(cell);
		cell.addClass(player.id + '-cell');
		// this.colorize(cell, player.id + '-cell');
		player.place(cell, this);
	}

	placeWeapon(weapon) {
		let cell = this.findUsableCell();
		this.weaponCells.push(cell);
		this.usedCells.push(cell);
		// this.colorize(cell, weapon.name + '-cell');
		weapon.position = cell;
	}

	unColorize(id, cssClass) {
		document.getElementById(id).classList.remove(cssClass);
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
