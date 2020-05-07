class Game {
	constructor(playersQty = 2) {
		this.playersQty = playersQty;
		this.players = [];
		this.turnPlayerIndex = 0;
		this.moveMaxAllowed = 3;
	}

	isReady() {
		return this.players.length === this.playersQty;
	}

	addPlayer(player) {
		this.players.push(player);
	}

	start() {
		let player1 = this.players[0];
		let player2 = this.players[1];
		$('#showNamePlayer1').text(player1.name); // affiche le nom du joueur sous son personnage
		$('#showNamePlayer2').text(player2.name);
		$('#currentWeaponP1').text('Arme : ' + player1.weapon.name + ' - Dégâts : ' + player1.weapon.damage); // affiche l'arme actuelle
		$('#currentWeaponP2').text('Arme : ' + player2.weapon.name + ' - Dégâts : ' + player2.weapon.damage);

		$('#beforeGameStarts1').hide(); // cache la page où l'on choisi son nom
		$('#beforeGameStarts2').hide();
		$('#intro').hide();
		// $('#music')[0].pause();
		$('#game').fadeIn(2000); // affiche le jeu
		$('#restartGame').hide(); // cache le bouton recommencer tant que la partie n'est pas fini

		let plateau = new Plateau(10, 10, this); //initialiser le plateau avec 10 rangées et 10 colonnes.
		plateau.generer();
		plateau.placeBlocks(10); // cree 10 cases grises

		let rifle = new Weapon('rifle', 20);
		let canon = new Weapon('canon', 30);
		let sniper = new Weapon('sniper', 40);
		let lightsaber = new Weapon('lightsaber', 50);

		plateau.placeWeapon(rifle);
		plateau.placeWeapon(canon);
		plateau.placeWeapon(lightsaber);
		plateau.placeWeapon(sniper);
		plateau.placePlayer(player1);
		plateau.placePlayer(player2);
		document.addEventListener('keydown', (e) => {
			let player = this.players[this.turnPlayerIndex];

			if (!this.canMove(player)) {
				return;
			}
			switch (e.which) {
				case 40:
					player.moveDown();
					break;
				case 38:
					player.moveUp();
					break;
				case 37:
					player.moveLeft();
					break;
				case 39:
					player.moveRight();
					break;
			}
			console.log(player1.position);
			console.log(player2.position);
			$('#movesP1').text('Reste : ' + (this.moveMaxAllowed - player1.moveCount) + ' déplacements ');
			$('#movesP2').text('Reste : ' + (this.moveMaxAllowed - player2.moveCount) + ' déplacements ');

			this.isEnnemyClose();
			this.checkWhoCanMove();
		});
	}

	isEnnemyClose() {
		let player = this.players[this.turnPlayerIndex];
		let player1 = this.players[0];
		let player2 = this.players[1];

		if (player1.position + 1 == player2.position) {
			player.battle(player);
		}
		if (player1.position - 1 == player2.position) {
			player.battle(player);
		}
		if (player1.position + 10 == player2.position) {
			player.battle(player);
		}
		if (player1.position - 10 == player2.position) {
			player.battle(player);
		}
		return;
	}

	canMove(player) {
		if (player.moveCount >= this.moveMaxAllowed) {
			alert('le nombre max de déplacements tu as atteint');
			return false;
		}
		return true;
	}

	checkWhoCanMove() {
		let player = this.players[this.turnPlayerIndex];

		if (player.moveCount >= this.moveMaxAllowed) {
			this.changePlayer();
		}
	}

	changePlayer() {
		let player = this.players[this.turnPlayerIndex];
		player.resetMoveCount();
		if (this.turnPlayerIndex === 0) {
			this.turnPlayerIndex = 1;
		} else {
			this.turnPlayerIndex = 0;
		}
	}
}
