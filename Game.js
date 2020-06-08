class Game {
	constructor(weaponsQty = 4) {
		this.playersQty = 2;
		this.weaponsQty = weaponsQty;
		this.players = [];
		this.weapons = [];
		this.turnPlayerIndex = 0;
		this.moveMaxAllowed = 3;
		this.plateau = null;
		this.fighting = false;
		this.possibleWeapons = ['rifle', 'canon', 'sniper', 'lightsaber'];
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

	addPlayer(player) {
		this.players.push(player);
	}

	battle() {
		this.fighting = true;
		this.displayBattle();

		$('#attackBtn').click(() => {
			this.currentPlayer.attack(this.otherPlayer);
			this.changePlayer();
		});

		$('#defenseBtn').click(() => {
			// si on se defend
			this.currentPlayer.defend();
			this.changePlayer();
		});
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

	createWeapons() {
		for (let i = 0; i < this.weaponsQty; i++) {
			let weapon = this.generateUniqueWeapon();
			this.weapons.push(new Weapon(weapon.name, weapon.damage));
		}
	}

	displayBattle() {
		$('#rules').hide();
		$('.btn').hide();
		$('#battle').fadeIn(2000);
		$('#battle').fadeOut(1000);
		$('.moves').fadeOut();
		$('#container').fadeOut();
		$('#weapons').fadeOut();
		$('.btn').fadeIn(1000);
	}

	displayPlayers() {
		for (let player of this.players) {
			$('#' + player.id + ' .playerName').text(player.name);
			$('#' + player.id + ' .weapon').text('Arme : ' + player.weapon.name + ' - Dégâts : ' + player.weapon.damage);

			this.plateau.placePlayer(player);
		}
	}

	displayWeapons() {
		for (let index in this.weapons) {
			this.plateau.placeWeapon(this.weapons[index]);
		}
	}

	generateUniqueWeapon() {
		let damage = Math.round(Math.random() * 100);
		let index = Math.floor(Math.random() * this.possibleWeapons.length);
		let name = this.possibleWeapons[index];
		let weapon = new Weapon(name, damage);

		if (this.weapons.includes(weapon)) {
			return generateUniqueWeapon();
		}
		return weapon;
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

	isReady() {
		return this.players.length === this.playersQty;
	}

	intro() {
		// $('#music')[0].pause();
		$('#game').fadeIn(2000); // affiche le jeu
		$('.btn').hide();
		$('#battle').hide();
		$('#restartGame').hide(); // cache le bouton recommencer tant que la partie n'est pas fini
	}

	listenForKeyStroke(e) {
		if (!this.currentPlayer.canMove()) {
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

		this.currentPlayer.highlight();
		this.getNewWeapon();

		if (this.isEnnemyClose()) {
			this.battle();
			return;
		}

		if (this.currentPlayer.moveCount >= this.moveMaxAllowed) {
			this.changePlayer();
			this.currentPlayer.highlight();
		}
	}

	refreshWeapon() {
		for (let player of this.players) {
			$('#' + player.id + ' .weapon').text('Arme : ' + player.weapon.name + ' - Dégâts : ' + player.weapon.damage);
		}
	}

	start() {
		this.intro();

		this.plateau = new Plateau(10, 10, this); //initialiser le plateau avec 10 rangées et 10 colonnes.
		this.plateau.generer();
		this.plateau.placeBlocks(10); // cree 10 cases grises

		this.createWeapons();
		this.displayWeapons();
		this.displayPlayers();

		$('#nameform1').hide(); // cache la page où l'on choisi son nom
		$('#nameform2').hide();

		this.currentPlayer.highlight();

		document.addEventListener('keydown', (e) => this.listenForKeyStroke(e));
	}
}
