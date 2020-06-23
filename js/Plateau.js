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
		oldWeapon.position.dom.removeClass(`${oldWeapon.name}-cell`);
		newWeapon.position.dom.addClass(`${newWeapon.name}-cell`);
		// oldWeapon.position.dom.removeClass(oldWeapon.name + '-cell');
		// newWeapon.position.dom.addClass(newWeapon.name + '-cell');
	}

	colorize(cell, cssClass) {
		cell.dom.addClass(cssClass);
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
			let $row = $('<tr></tr>');

			for (let x = 0; x < this.colsQty; x++) {
				let $cell = $(`<td data-x=${x} data-y=${y} class="cell"></td>`);
				$row.append($cell);
			}
			$table.append($row);
		}
		$plateauContainer.html($table);
	}

	isEastFree(cell) {
		// if (cell.east.x > this.maxColValue) {
		// 	return false;
		// }

		return !this.isCellUsed(cell.east);
	}

	isNorthFree(cell) {
		// if (cell.north.y < 0) {
		// 	return false;
		// }

		return !this.isCellUsed(cell.north);
	}

	isSouthFree(cell) {
		if (cell.south.y > this.maxRowValue) {
			return false;
		}

		return !this.isCellUsed(cell.south);
	}

	isWestFree(cell) {
		if (cell.west.x < 0) {
			return false;
		}

		return !this.isCellUsed(cell.west);
	}

	movePlayer(player, oldPosition) {
		oldPosition.dom.removeClass(`${player.id}-cell-blink ${player.id}-cell`);
		player.position.dom.addClass(`${player.id}-cell-blink ${player.id}-cell`);
		// oldPosition.dom.removeClass(player.id + '-cell-blink ' + player.id + '-cell');
		// player.position.dom.addClass(player.id + '-cell-blink ' + player.id + '-cell');
	}

	placeBlocks(qty) {
		for (let i = 0; i < qty; i++) {
			let cell = this.findFreeCell();
			this.blockCells.push(cell);
			this.usedCells.push(cell);
			// this.colorize(cell, 'block-cell');
			cell.dom.addClass('block-cell');
		}
	}

	placePlayer(player) {
		let cell = this.findFreeCellForPlayer();
		this.playerCells.push(cell);
		this.usedCells.push(cell);
		// cell.dom.addClass(player.id + '-cell');
		this.colorize(cell, player.id + '-cell');
		player.place(cell, this);
	}

	placeWeapon(weapon) {
		let cell = this.findUsableCell();
		this.weaponCells.push(cell);
		this.usedCells.push(cell);
		cell.dom.addClass(weapon.name + '-cell');
		// this.colorize(cell, weapon.name + '-cell');
		weapon.position = cell;
	}

	uncolorize(cell, cssClass) {
		cell.dom.removeClass(cssClass);
	}
}
