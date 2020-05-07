class Player {
	name;
	side;
	weapon;
	health;
	attackCount;
	nbreCoupRecu;
	defend;
	plateau;
	position;
	moveCount;

	constructor(name, side) {
		this.name = name;
		this.side = side;
		this.weapon = new Weapon('pistol', 10);
		this.health = 100;
		this.attackCount = 0;
		this.nbreCoupRecu = 0;
		this.defend = false;
		this.position = null;
		this.moveCount = 0;
	}

	// getNewWeapon(weapon) {
	// 	this.weapon = weapon;
	// }

	battle(player) {
		let player1 = game.players[0];
		let player2 = game.players[1];
		player.desactivateButtons();
		if (player === player1) {
			this.battleSystem(player1, player2);
		} else {
			this.battleSystem(player2, player1);
		}
	}

	battleSystem(currentPlayer, nextPlayer) {
		let player = game.players[game.turnPlayerIndex];
		let player1 = game.players[0];
		let player2 = game.players[1];
		let currentPlayerNumber;
		let nextPlayerNumber;

		if (currentPlayer === player1) {
			currentPlayerNumber = 1;
			nextPlayerNumber = 2;
		}
		if (currentPlayer === player2) {
			currentPlayerNumber = 2;
			nextPlayerNumber = 1;
		}

		$('.showPlayer' + currentPlayerNumber).addClass('highLight'); // highlight lesboutons du joueur qui joue
		$('#player' + currentPlayerNumber + 'Att').click(function () {
			// bouton attaque
			currentPlayer.attackCount++;
			currentPlayer.defend = false;
			if (nextPlayer.defend === false) {
				//si le joueur adverse ne se defend pas
				nextPlayer.health = nextPlayer.health - currentPlayer.weapon.damage;
			} else {
				//si le joueur adverse se defend
				nextPlayer.health = nextPlayer.health - currentPlayer.weapon.damage / 2;
			}
			$('#pb-player' + nextPlayerNumber)
				.css('width', nextPlayer.health + '%')
				.text(nextPlayer.health); // met a jour la barre de vie

			if (nextPlayer.health > 0) {
				// si le joueur n'est pas mort, on continue le combat en changeant de joueur
				player.nextTurn();
			} else {
				// sinon, combat terminé, proposition de refaire une partie
				$('#pb-player' + nextPlayerNumber)
					.text('0')
					.css('width', '0%');
				$('.showPlayer' + currentPlayerNumber).removeClass('highLight');
				setTimeout(function () {
					alert(`${currentPlayer.name} a gagné le combat !`);
				}, 1000);
				$('#restartGame').show();
			}
		});
		$('#player' + currentPlayerNumber + 'Def').click(function () {
			// si on se defend
			this.attackCount++;
			currentPlayer.defend = true;
			player.nextTurn();
		});
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
		$('#player' + this.side + 'Att', '#player' + this.side + 'Def').off('click');
		$('.showPlayer' + this.side).removeClass('highLight');
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

	nextTurn() {
		let player = game.players[game.turnPlayerIndex];
		player.resetAttackCount();
		// if (game.turnPlayerIndex === 0) {
		// 	game.turnPlayerIndex = 1;
		// } else {
		// 	game.turnPlayerIndex = 0;
		// }

		let player1 = game.players[0];
		let player2 = game.players[1];

		if (this.attackCount % 2 === 0) {
			// si c'est chiffre pair, c'est le tour du joueur 1
			player = player1;
		} else {
			player = player2;
		}
	}

	place(cell, plateau) {
		this.position = cell;
		this.plateau = plateau;
		this.desactivateButtons();
	}

	play() {
		$('#ATH' + this.side).addClass('ath');
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
