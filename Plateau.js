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

	changeWeaponType(oldWeapon, newWeapon) {
		oldWeapon.position.cellDom.removeClass(oldWeapon.name + '-cell');
		newWeapon.position.cellDom.addClass(newWeapon.name + '-cell');
		// this.unColorize(oldWeapon.position, oldWeapon.name + '-cell');
		// this.colorize(newWeapon.position, newWeapon.name + '-cell');
	}

	colorize(cell, cssClass) {
		cell.cellDom.addClass(cssClass);
	}

	isCellUsed(cell) {
		let existingCells = this.usedCells.filter((cellule) => {
			return cell.x == cellule.x && cellule.y == cell.y;
		});

		if (existingCells.length > 0) {
			return true;
		}
		return false;
	}

	isBlockCellUsed(cell) {
		let existingCells = this.blockCells.filter((cellule) => {
			return cell.x == cellule.x && cellule.y == cell.y;
		});

		if (existingCells.length > 0) {
			return true;
		}
		return false;
	}

	findFreeCell() {
		let x = Math.floor(Math.random() * this.rowsQty);
		let y = Math.floor(Math.random() * this.colsQty);

		let cell = new Cell(x, y);

		if (this.isCellUsed(cell)) {
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

		for (let y = 0; y < this.rowsQty; y++) {
			let $row = $('<tr class="line"></tr>');

			for (let x = 0; x < this.colsQty; x++) {
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

	// getCellDown(cell) {
	// 	let cellDown = this.cellId(cell.x + 1, cell.y);

	// 	return cellDown;
	// }

	// getCellLeft(cell) {
	// 	let cellLeft = this.cellId(cell.x, cell.y - 1);

	// 	return cellLeft;
	// }

	// getCellRight(cell) {
	// 	let cellRight = this.cellId(cell.x, cell.y + 1);

	// 	return cellRight;
	// }

	// getCellUp(cell) {
	// 	let cellUp = this.cellId(cell.x - 1, cell.y);

	// 	return cellUp;
	// }

	isEastFree(cell) {
		if (cell.east.y > this.maxColValue) {
			return false;
		}

		return true;
	}

	isNorthFree(cell) {
		if (cell.north.y < 0) {
			return false;
		}

		// if (this.usedCells.includes(northCell)) {
		// 	return false;
		// }
		return true;
	}

	isSouthFree(cell) {
		if (cell.south.x > this.maxRowValue) {
			return false;
		}
		return true;
	}

	isWestFree(cell) {
		if (cell.west.y < 0) {
			return false;
		}
		return true;
	}

	movePlayer(player, oldPosition) {
		oldPosition.cellDom.removeClass(player.id + '-cell-blink ' + player.id + '-cell');
		player.position.cellDom.addClass(player.id + '-cell-blink ' + player.id + '-cell');
	}

	placeBlocks(qty) {
		for (let i = 0; i < qty; i++) {
			let cell = this.findFreeCell();
			this.blockCells.push(cell);
			this.usedCells.push(cell);
			this.colorize(cell, 'block-cell');
			// cell.cellDom.addClass('block-cell');
		}
	}

	placePlayer(player) {
		let cell = this.findFreeCellForPlayer();
		this.playerCells.push(cell);
		this.usedCells.push(cell);
		cell.cellDom.addClass(player.id + '-cell');
		// this.colorize(cell, player.id + '-cell');
		player.place(cell, this);
	}

	placeWeapon(weapon) {
		let cell = this.findUsableCell();
		this.weaponCells.push(cell);
		this.usedCells.push(cell);
		cell.cellDom.addClass(weapon.name + '-cell');
		// this.colorize(cell, weapon.name + '-cell');
		weapon.position = cell;
	}

	uncolorize(cell, cssClass) {
		cell.cellDom.removeClass(cssClass);
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
