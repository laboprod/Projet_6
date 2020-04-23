class Player {
	name;
	side;
	weapon;
	health;
	nbreCoupRecu;
	defend;
	plateau;
	position;
	myTurn;

	constructor(name, side) {
		this.name = name;
		this.side = side;
		this.weapon = new Weapon('pistol', 10);
		this.health = 100;
		this.nbreCoupRecu = 0;
		this.defend = false;
		this.position = null;
		this.myTurn = false;
	}

	// move() {
	// 	$(document).keydown(function (e) {
	// 		if (plateau.isEastFree(this.position)) {
	// 			if (e.which == 39) {
	// 				// droite
	// 				player.position = player.position + 10;
	// 				$(player.side).prependTo($(player.position));
	// 				if (player.position == weapon.position) {
	// 					getNewWeapon();
	// 				}
	// 			}
	// 		}
	// 		if (isWestFree()) {
	// 			if (e.which == 37) {
	// 				// gauche
	// 				player.position = player.position - 10;
	// 				$(player.side).prependTo($(player.position));
	// 				if (player.position == weapon.position) {
	// 					getNewWeapon();
	// 				}
	// 			}
	// 		}
	// 		if (isNorthFree()) {
	// 			if (e.which == 38) {
	// 				// haut
	// 				player.position--;
	// 				$(player.side).prependTo($(player.position));
	// 				if (player.position == weapon.position) {
	// 					getNewWeapon();
	// 				}
	// 			}
	// 		}
	// 		if (isSouthFree()) {
	// 			if (e.which == 40) {
	// 				// bas
	// 				player.position++;
	// 				$(player.side).prependTo($(player.position));
	// 				if (player.position == weapon.position) {
	// 					getNewWeapon();
	// 				}
	// 			}
	// 		}
	// 	});
	// }

	// getNewWeapon(weapon) {
	// 	this.weapon = weapon;
	// }

	blockPlayer() {
		this.myTurn = false;
		this.desactivateButtons();
	}

	desactivateButtons() {
		$('#player' + this.side + 'Att', '#player' + this.side + 'Def').off('click');
		$('.showPlayer' + this.side).removeClass('highLight');
	}

	nextTurn() {
		if (count % 2 === 0) {
			// si c'est chiffre pair, c'est le tour du joueur 1
			player = player1;
		} else {
			player = player2;
		}
	}

	battle(player) {
		desactivateButtons();
		if (player === player1) {
			battleSystem(player1, player2);
		} else {
			battleSystem(player2, player1);
		}
	}

	battleSystem(currentPlayer, nextPlayer) {
		let currentPlayerNumber;
		let nextPlayerNumber;

		if (currentPlayer === player1) {
			currentPlayerNumber = 1;
			nextPlayerNumber = 2;
		} else {
			currentPlayerNumber = 2;
			nextPlayerNumber = 1;
		}

		$('.showPlayer' + currentPlayerNumber).addClass('highLight'); // highlight lesboutons du joueur qui joue
		$('#player' + currentPlayerNumber + 'Att').click(function () {
			// bouton attaque
			count++;
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
				nextTurn();
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
			count++;
			currentPlayer.defend = true;
			nextTurn();
		});
	}

	place(cell, plateau) {
		this.position = cell;
		this.plateau = plateau;
		this.blockPlayer();
	}

	canMoveUp() {
		let cell = this.position;

		if (cell % 10 === 0) {
			return false;
		}
		let northCell = this.plateau.getCellUp(cell);

		if (this.plateau.blockCells.includes(northCell)) {
			return false;
		}
		return true;
	}

	moveUp() {
		if (!this.canMoveUp()) {
			alert('En haut tu ne peux pas aller...');
		}
		let oldPosition = this.position;
		let newPosition = this.plateau.getCellUp(oldPosition);
		this.plateau.movePlayer(this, oldPosition, newPosition);
	}

	play() {
		this.myTurn = true;
		$('#ATH' + this.side).addClass('ath');
		let self = this;
		document.addEventListener('keydown', (e) => {
			switch (e.which) {
				case 40:
					self.moveDown();
					break;
				case 38:
					self.moveUp();
					break;
				case 37:
					self.moveLeft();
					break;
				case 39:
					self.moveRight();
					break;
			}
		});
	}
}

// 	turn() {
// 		if (this.currentPlayer == player1) {
// 			this.currentEnemy = player1;
// 			this.currentPlayer = player2;
// 		} else if (this.currentPlayer == player2) {
// 			this.currentEnemy = player2;
// 			this.currentPlayer = player1;
// 		}
// 	}

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
