class Player {
	name;
	weapon;
	health;
	attackCount;
	defending;
	plateau;
	position;
	moveCount;

	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.weapon = new Weapon('pistol', 10);
		this.health = 100;
		this.attackCount = 0;
		this.defending = false;
		this.position = null;
		this.moveCount = 0;
	}

	defend() {
		this.attackCount++;
		this.defending = true;
		this.resetAttackCount();
	}

	attack(otherPlayer) {
		this.attackCount++;
		this.defending = false;

		if (!otherPlayer.defending) {
			//si le joueur adverse ne se defend pas
			otherPlayer.health = otherPlayer.health - this.weapon.damage;
		} else {
			otherPlayer.health = otherPlayer.health - this.weapon.damage / 2;
		}
		if (otherPlayer.health < 0) {
			otherPlayer.health = 0;
		}

		$('#' + otherPlayer.id + ' #progress-bar')
			.css('width', otherPlayer.health + '%')
			.text(otherPlayer.health);

		if (otherPlayer.health == 0) {
			this.win();
			return;
		}
		this.resetAttackCount();
	}

	canMove() {
		if (game.fighting) {
			return false;
		}
		if (this.moveCount >= game.moveMaxAllowed) {
			return false;
		}
		return true;
	}

	canMoveDown() {
		let cell = this.position;

		if (cell % 10 === 9) {
			return false;
		}
		let southCell = this.plateau.getCellDown(cell);

		if (this.plateau.blockCells.includes(String(southCell))) {
			return false;
		}
		return true;
	}

	canMoveLeft() {
		let cell = this.position;

		if (cell <= String('0') + 9) {
			return false;
		}
		let westCell = this.plateau.getCellLeft(cell);

		if (this.plateau.blockCells.includes(String(westCell))) {
			return false;
		}
		return true;
	}

	canMoveRight() {
		let cell = this.position;

		if (cell >= 9 + String('0')) {
			return false;
		}
		let eastCell = this.plateau.getCellRight(cell);

		if (this.plateau.blockCells.includes(String(eastCell))) {
			return false;
		}
		return true;
	}

	canMoveUp() {
		let cell = this.position;

		if (cell % 10 === 0) {
			return false;
		}
		let northCell = this.plateau.getCellUp(cell);

		if (this.plateau.blockCells.includes(String(northCell))) {
			return false;
		}

		return true;
	}

	highlight() {
		$('#' + this.id).addClass('highlight-current-player');
		$('#' + this.id + ' .moves').text('Reste : ' + (game.moveMaxAllowed - this.moveCount) + ' déplacements ');
		$('#' + this.id + ' .turn').text('A toi de jouer !');
	}

	moveDown() {
		if (!this.canMoveDown()) {
			alert('En bas tu ne peux pas aller...');
			return;
		}
		let oldPosition = this.position;
		let newPosition = this.plateau.getCellDown(oldPosition);
		this.position = newPosition;
		this.moveCount++;
		this.plateau.movePlayer(this, oldPosition);
	}

	moveLeft() {
		if (!this.canMoveLeft()) {
			alert('A gauche tu ne peux pas aller...');
			return;
		}
		let oldPosition = this.position;
		let newPosition = this.plateau.getCellLeft(oldPosition);
		this.position = newPosition;
		this.moveCount++;
		this.plateau.movePlayer(this, oldPosition);
	}

	moveRight() {
		if (!this.canMoveRight()) {
			alert('A droite tu ne peux pas aller...');
			return;
		}
		let oldPosition = this.position;
		let newPosition = this.plateau.getCellRight(oldPosition);
		this.position = newPosition;
		this.moveCount++;
		this.plateau.movePlayer(this, oldPosition);
	}

	moveUp() {
		if (!this.canMoveUp()) {
			alert('En haut tu ne peux pas aller...');
			return;
		}
		let oldPosition = this.position;
		let newPosition = this.plateau.getCellUp(oldPosition);
		this.position = newPosition;
		this.moveCount++;
		this.plateau.movePlayer(this, oldPosition);
	}

	place(cell, plateau) {
		this.position = cell;
		this.plateau = plateau;
	}

	resetAttackCount() {
		this.attackCount = 0;
	}

	resetMoveCount() {
		this.moveCount = 0;
	}

	win() {
		setTimeout(() => {
			alert(this.name + ' a gagné le combat !');
		}, 1000);
		$('.btn').hide();
		$('.turn').hide();
		$('#restartGame').fadeIn(2000);
	}
}
