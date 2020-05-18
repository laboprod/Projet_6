class Player {
	name;
	weapon;
	health;
	attackCount;
	attack;
	defend;
	plateau;
	position;
	moveCount;

	constructor(name, id) {
		this.name = name;
		this.id = id;
		this.weapon = new Weapon('pistol', 10, 1);
		this.health = 100;
		this.attackCount = 0;
		this.attack = false;
		this.defend = true;
		this.position = null;
		this.moveCount = 0;
	}

	attack() {
		this.attack = true;
		this.attackCount++;

		let nextPlayer = game.otherPlayer;

		if (!nextPlayer.defend) {
			//si le joueur adverse ne se defend pas
			nextPlayer.health = nextPlayer.health - this.weapon.damage;
		} else {
			//si le joueur adverse se defend
			nextPlayer.health = nextPlayer.health - this.weapon.damage / 2;
		}
		$('#pb-player' + nextPlayerNumber)
			.css('width', nextPlayer.health + '%')
			.text(nextPlayer.health); // met a jour la barre de vie
	}

	canAttack() {
		if (this.attackCount > 0) {
			return false;
		}
		return true;
	}

	// battle() {
	// 	let currentPlayerNumber = this.id;
	// 	let nextPlayer = game.otherPlayer();

	// 	// desactivateButtons();

	// 	$('.showPlayer' + currentPlayerNumber).addClass('highLight'); // highlight en jaune les boutons du joueur qui joue
	// 	$('#player' + currentPlayerNumber + 'Att').click(function () {
	// 		this.attack = false;

	// 		if (this.currentPlayer.canAttack()) {
	// 			this.currentPlayer.attack();
	// 			this.currentPlayer.resetAttackCount();
	// 		}

	// 		if (nextPlayer.health > 0) {
	// 			this.resetAttackCount();
	// 			game.changePlayer();
	// 		} else {
	// 			this.currentPlayer.win();
	// 		}
	// 	});
	// 	$('#player' + currentPlayerNumber + 'Def').click(function () {
	// 		// si on se defend
	// 		this.attackCount++;
	// 		this.defend = true;
	// 		game.changePlayer();
	// 	});
	// }

	win() {
		let nextPlayerNumber = nextPlayer.id;
		let currentPlayerNumber = this.id;

		$('#pb-player' + nextPlayerNumber)
			.text('0')
			.css('width', '0%');
		$('.showPlayer' + currentPlayerNumber).removeClass('highLight');
		setTimeout(function () {
			alert(`${this.name} a gagné le combat !`);
		}, 1000);
		$('#restartGame').show();
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

	desactivateButtons() {
		$('#player' + this.id + 'Att', '#player' + this.id + 'Def').off('click');
		$('.showPlayer' + this.id).removeClass('highLight');
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
		this.desactivateButtons();
	}

	resetAttackCount() {
		this.attackCount = 0;
	}

	resetMoveCount() {
		this.moveCount = 0;
	}
}

// 	recoitCoupPar(attaquant) {
// 		this.nbreCoupRecu++;

// 		if (!this.estVivant) {
// 			throw new Error(this.name + ' est deja mort');
// 		}
// 		if (this.name == attaquant.name) {
// 			throw new Error('je ne peux pas mattaquer moi-meme');
// 		}
// 		if (this.defend === false) {
// 			this.health -= attaquant.weapon.damage;
// 		} else {
// 			this.health -= attaquant.weapon.damage / 2;
// 		}

// 		this.afficher(`
// 		${this.name} recoit un coup par ${attaquant.name}`);

// 		if (this.health < 0) {
// 			this.health = 0;
// 			if (this.nbreCoupRecu > 1) {
// 				this.afficher(`${this.name} est mort après ${this.nbreCoupRecu} coups.`);
// 			} else {
// 				this.afficher(`${this.name} est mort après ${this.nbreCoupRecu} coup.`);
// 			}
// 			return;
// 		}

// 		return this.health;
// 	}
// 	get estVivant() {
// 		if (this.health <= 0) {
// 			return false;
// 		}
// 		return true;
// 	}

// 	afficher(message) {
// 		document.querySelector('body').innerHTML += message;
// 	}
// 	getNewWeapon(weapon) {
// 		this.weapon = weapon;
// 	}
