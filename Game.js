class Game {
	constructor(playersQty = 2) {
		this.playersQty = playersQty;
		this.players = [];
		this.weapons = [];
		this.turnPlayerIndex = 0;
		this.moveMaxAllowed = 3;
		this.plateau = null;
		this.fighting = false;
	}

	get currentPlayer() {
		return this.players[this.turnPlayerIndex];
	}

	get otherPlayer() {
		if (this.turnPlayerIndex === 0) {
			return this.players[1];
		}

		return this.players[0];
	}

	isReady() {
		return this.players.length === this.playersQty;
	}

	battle() {
		this.fighting = true;
		$('#' + this.currentPlayer.id + ' .showPlayer').addClass('highlight');

		$('#' + this.currentPlayer.id + ' .Att').click(function () {
			if (!this.otherPlayer.defend) {
				//si le joueur adverse ne se defend pas
				this.otherPlayer.health = this.otherPlayer.health - this.currentPlayer.weapon.damage;
			} else {
				//si le joueur adverse se defend
				this.otherPlayer.health = this.otherPlayer.health - this.currentPlayer.weapon.damage / 2;
			}
			$('#' + this.otherPlayer.id + ' #pb-player')
				.css('width', this.otherPlayer.health + '%')
				.text(this.otherPlayer.health); // met a jour la barre de vie
		});

		// if (this.player.canAttack()) {
		// 	this.player.attack();
		// 	this.player.resetAttackCount();
		// }

		// if (this.otherPlayer.health > 0) {
		// 	this.player.resetAttackCount();
		// 	this.changePlayer();
		// } else {
		// 	this.player.win();
		// }
	}

	addPlayer(player) {
		this.players.push(player);
	}

	createWeapons() {
		this.weapons.push(new Weapon('rifle', 20));
		this.weapons.push(new Weapon('canon', 30));
		this.weapons.push(new Weapon('sniper', 40));
		this.weapons.push(new Weapon('lightsaber', 50));

		for (let index in this.weapons) {
			this.plateau.placeWeapon(this.weapons[index]);
		}
	}

	displayPlayers() {
		for (let player of this.players) {
			$('#' + player.id + ' .playerName').text(player.name);
			$('#' + player.id + ' .weapon').text('Arme : ' + player.weapon.name + ' - Dégâts : ' + player.weapon.damage);

			this.plateau.placePlayer(player);
		}
	}

	highlightCurrentPlayer() {
		$('#' + this.currentPlayer.id).addClass('highlight-current-player');
		$('#' + this.currentPlayer.id + ' .moves').text('Reste : ' + (this.moveMaxAllowed - this.currentPlayer.moveCount) + ' déplacements ');
	}

	intro() {
		$('#intro').hide();
		// $('#music')[0].pause();
		$('#game').fadeIn(2000); // affiche le jeu
		$('#restartGame').hide(); // cache le bouton recommencer tant que la partie n'est pas fini
	}

	start() {
		this.intro();

		this.plateau = new Plateau(10, 10, this); //initialiser le plateau avec 10 rangées et 10 colonnes.
		this.plateau.generer();
		this.plateau.placeBlocks(10); // cree 10 cases grises

		this.createWeapons();
		this.displayPlayers();

		$('#nameform1').hide(); // cache la page où l'on choisi son nom
		$('#nameform2').hide();

		this.highlightCurrentPlayer();

		document.addEventListener('keydown', (e) => this.listenForKeyStroke(e));
	}

	listenForKeyStroke(e) {
		if (!this.canMove(this.currentPlayer)) {
			return;
		}
		switch (e.which) {
			case 40:
				this.currentPlayer.moveDown();
				break;
			case 38:
				this.currentPlayer.moveUp();
				break;
			case 37:
				this.currentPlayer.moveLeft();
				break;
			case 39:
				this.currentPlayer.moveRight();
				break;
		}

		this.highlightCurrentPlayer();
		this.getNewWeapon();

		if (this.isEnnemyClose()) {
			this.battle();
			return;
		}

		if (this.currentPlayer.moveCount >= this.moveMaxAllowed) {
			this.changePlayer();
			this.highlightCurrentPlayer();
		}
	}

	refreshWeapon() {
		for (let player of this.players) {
			$('#' + player.id + ' .weapon').text('Arme : ' + player.weapon.name + ' - Dégâts : ' + player.weapon.damage);
		}
	}

	changeWeapon(newWeapon) {
		let actualWeapon = this.currentPlayer.weapon;
		let weapons = this.weapons.filter(function (weapon) {
			return weapon.position !== newWeapon.position;
		});
		this.currentPlayer.weapon = newWeapon;
		actualWeapon.position = this.currentPlayer.position;
		weapons.push(actualWeapon);
		this.weapons = weapons;
		this.plateau.changeWeaponType(newWeapon, actualWeapon);
		this.refreshWeapon();
	}

	getNewWeapon() {
		let playerPosition = this.currentPlayer.position;
		let weapon = this.weapons.filter(function (weapon) {
			return weapon.position == playerPosition;
		});
		if (weapon.length) {
			this.changeWeapon(weapon[0]);
		}
	}

	isEnnemyClose() {
		if (this.currentPlayer.position + 1 == this.otherPlayer.position) {
			return true;
		}
		if (this.currentPlayer.position - 1 == this.otherPlayer.position) {
			return true;
		}
		if (this.currentPlayer.position + 10 == this.otherPlayer.position) {
			return true;
		}
		if (this.currentPlayer.position - 10 == this.otherPlayer.position) {
			return true;
		}
		if (this.otherPlayer.position + 1 == this.currentPlayer.position) {
			return true;
		}
		if (this.otherPlayer.position - 1 == this.currentPlayer.position) {
			return true;
		}
		if (this.otherPlayer.position + 10 == this.currentPlayer.position) {
			return true;
		}
		if (this.otherPlayer.position - 10 == this.currentPlayer.position) {
			return true;
		}
		return false;
	}

	canMove(player) {
		if (this.fighting) {
			return false;
		}
		if (player.moveCount >= this.moveMaxAllowed) {
			alert('le nombre max de déplacements tu as atteint');
			return false;
		}
		return true;
	}

	changePlayer() {
		if (this.turnPlayerIndex === 1) {
			this.turnPlayerIndex = 0;
		} else {
			this.turnPlayerIndex = 1;
		}

		$('#' + this.currentPlayer.id).addClass('highlight-current-player');
		$('#' + this.otherPlayer.id).removeClass('highlight-current-player');

		$('.' + this.currentPlayer.id + '-cell').addClass(this.currentPlayer.id + '-cell-blink');
		$('.' + this.otherPlayer.id + '-cell').removeClass(this.otherPlayer.id + '-cell-blink');

		this.currentPlayer.resetMoveCount();
	}
}
